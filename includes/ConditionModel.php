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

    public function __construct( $condition, &$fieldsCollection )
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
        switch( $when[ 'type' ] ){
            case 'field':
                if( ! $when[ 'key' ] ) return;
                $fieldModel = $this->fields->get_field($when['key']);
                $value = $fieldModel->get_setting('value');
                break;
            case 'date':
                $value = new DateTime();
                $date_format = Ninja_Forms()->get_setting( 'date_format' );
                $when[ 'value' ] = DateTime::createFromFormat( $date_format, $when[ 'value' ] );
                break;
            default:
                // Type not identified.
                return;
        }

        $when[ 'result' ] = NF_ConditionalLogic()->comparator( $when[ 'comparator' ] )->compare( $value, $when[ 'value' ] );
    }

    private function evaluate( $current, $when )
    {
        if( ! isset( $when[ 'result' ] ) ) return true;
        return ( 'AND' == $when[ 'connector' ] ) ? $current && $when[ 'result' ] : $current || $when[ 'result' ];
    }

    private function trigger( $trigger )
    {
        $field = $this->fields->get_field( $trigger[ 'key' ] );

        $triggerModel = NF_ConditionalLogic()->trigger( $trigger[ 'trigger' ] );

        if( ! $triggerModel ) return;

        $triggerModel->process( $field );
    }

}
