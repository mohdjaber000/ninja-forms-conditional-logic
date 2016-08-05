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
    private $when;
    private $then;
    private $else;
    private $fields;

    public function __construct( $condition, &$fieldsCollection )
    {
        $this->when = $condition[ 'when' ];
        $this->then = $condition[ 'then' ];
        $this->else = $condition[ 'else' ];
        $this->fields = $fieldsCollection;
    }

    public function process()
    {
        array_walk( $this->when, array( $this, 'compare' ) );
        $result = array_reduce( $this->when, array( $this, 'evaluate' ), true );
        $trigger = ( $result ) ? $this->then : $this->else;
        array_map( array( $this, 'trigger' ), $trigger );
    }

    private function compare( &$when )
    {
        $field_value = $this->fields->get_field( $when[ 'key' ] )->get_setting( 'value' );
        $when[ 'result' ] = $this->{ $when[ 'comparator' ] }( $field_value, $when[ 'value' ] );
    }

    private function evaluate( $current, $when )
    {
        return ( 'AND' == $when[ 'connector' ] ) ? $current && $when[ 'result' ] : $current || $when[ 'result' ];
    }

    private function trigger( $trigger )
    {
        $field = $this->fields->get_field( $trigger[ 'key' ] );

        NF_ConditionalLogic()->trigger( $trigger[ 'trigger' ] )->process( $field );
    }

    /*
    |--------------------------------------------------------------------------
    | Comparisons
    |--------------------------------------------------------------------------
    */

    public function contains( $comparison, $value )
    {
        return ( false !== strpos( $comparison, $value ) );
    }

}
