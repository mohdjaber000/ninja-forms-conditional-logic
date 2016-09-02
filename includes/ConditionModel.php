<?php

/**
 * Condition Model
 *
 * This class handles the processing of an individual form condition.
 *
 * @package     Ninja Forms - Conditional Logic
 * @subpackage  Conditions
 * @author      Kyle B. Johnson
 * @copyright   Copyright (c) 2016, The WP Ninjas
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       3.0.0
 */

final class NF_ConditionalLogic_ConditionModel
{
    private $when = array();
    private $then = array();
    private $else = array();
    private $fields;
    private $data;

    public function __construct( $condition, &$fieldsCollection, $data )
    {
        if( isset( $condition[ 'when' ] ) ) {
            $this->when = $condition[ 'when' ];
        }

        if( isset( $condition[ 'then' ] ) ) {
            $this->then = $condition[ 'then' ];
        }

        if( isset( $condition[ 'else' ] ) ) {
            $this->else = $condition[ 'else' ];
        }

        $this->fields = $fieldsCollection;

        $this->data = $data;
    }

    public function process()
    {
        array_walk( $this->when, array( $this, 'compare' ) );
        $result = array_reduce( $this->when, array( $this, 'evaluate' ), true );

        $triggers = ( $result ) ? $this->then : $this->else;
        array_map( array( $this, 'trigger' ), $triggers );

        return $result;
    }

    private function compare( &$when )
    {
        if( ! $when[ 'key' ] ) return;
        $fieldModel = $this->fields->get_field( $when[ 'key' ] );
        $field_value = $fieldModel->get_setting( 'value' );
        $when[ 'result' ] = NF_ConditionalLogic()->comparator( $when[ 'comparator' ] )->compare( $field_value, $when[ 'value' ] );
    }

    private function evaluate( $current, $when )
    {
        if( ! isset( $when[ 'result' ] ) ) return true;
        return ( 'AND' == $when[ 'connector' ] ) ? $current && $when[ 'result' ] : $current || $when[ 'result' ];
    }

    private function trigger( $trigger )
    {
        $triggerModel = NF_ConditionalLogic()->trigger( $trigger[ 'trigger' ] );

        if( ! $triggerModel ) return;

        switch( $trigger[ 'type' ] ) {
            case 'field':
                $target = $this->fields->get_field( $trigger['key'] );
                break;
            default:
                $target = apply_filters( 'ninja_forms_conditional_logic_trigger_type_' . $trigger[ 'type' ], $trigger[ 'key' ], $this->data );
        }

        if( ! $target ) return;

        $triggerModel->process( $target, $this->fields, $this->data );
    }

}
