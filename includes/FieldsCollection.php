<?php

final class NF_ConditionalLogic_FieldsCollection
{
    private $fields;

    public function __construct( $fields = array() )
    {
        foreach( $fields as $field ){
            $value = $field[ 'value' ];
            $field = Ninja_Forms()->form()->get_field( $field[ 'id' ] );
            $field->update_setting( 'value', $value );
            $this->fields[] = $field;
        }
    }

    public function get_field( $key_or_id )
    {
        $property = ( is_numeric( $key_or_id ) ) ? 'id' : 'key';
        foreach( $this->fields as $field ){
            if( $key_or_id == $field->get_setting( $property ) ) return $field;
        }
        return false;
    }

    public function to_array()
    {
        $fields = array();
        foreach( $this->fields as $field ){
            $fields[] = array(
                'id' => $field->get_id(),
                'value' => $field->get_setting( 'value' )
            );
        }
        return $fields;
    }
}
