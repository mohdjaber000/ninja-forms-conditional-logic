<?php

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
        $this->{ $trigger[ 'trigger' ] }( $field );
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

    /*
    |--------------------------------------------------------------------------
    | Triggers
    |--------------------------------------------------------------------------
    */

    public function show_field( $field )
    {
        if( $field->get_setting( 'value' ) ) return;

        $submitted_value = $field->get_setting( 'submitted_value' );
        $field->update_setting( 'value', $submitted_value );
    }

    public function hide_field( &$field )
    {
        $value = $field->get_setting( 'value' );
        $field->update_setting( 'value', false );
        $field->update_setting( 'submitted_value', $value );
    }
}
