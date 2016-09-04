<?php

final class NF_ConditionalLogic_FieldsCollection
{
    private $fields;

    public function __construct( $fields = array() )
    {
        foreach( $fields as $field ){

            $fieldModel = Ninja_Forms()->form()->get_field( $field[ 'id' ] );
            unset( $field[ 'id' ] );

            if( $fieldModel->get_tmp_id() && isset( $field[ 'key' ] ) ){
                $fieldModel->update_setting( 'key', $field[ 'key' ] );
            }

            $settings = $field->get_settings();
            $field->update_settings( $field, $settings );

            $this->fields[] = $fieldModel;
        }
    }

    public function get_field( $key_or_id )
    {
        $property = ( is_numeric( $key_or_id ) ) ? 'id' : 'key';
        foreach( $this->fields as $field ){
            $setting = $field->get_setting( $property );
            if( $key_or_id == $setting ) return $field;
        }
        return false;
    }

    public function to_array()
    {
        $fields = array();
        foreach( $this->fields as $field ){
            $fields[] = array(
                'id' => ( $field->get_tmp_id() ) ? $field->get_tmp_id() : $field->get_id(),
                'value' => $field->get_setting( 'value' ),
                'conditionally_required' => $field->get_setting( 'conditionally_required' )
            );
        }
        return $fields;
    }
}
