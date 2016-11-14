<?php

final class NF_ConditionalLogic_FieldsCollection
{
    private $fields;

    public function __construct( $fields = array(), $form_id )
    {
        foreach( $fields as $field ){

            $fieldModel = Ninja_Forms()->form( $form_id )->get_field( $field[ 'id' ] );
            unset( $field[ 'id' ] );

            $field_value = ( isset( $field[ 'settings' ][ 'value' ] ) ) ? $field[ 'settings' ][ 'value' ] : null;
            $fieldModel->update_setting( 'value', $field_value );

            if( $fieldModel->get_tmp_id() && isset( $field[ 'key' ] ) ){
                $fieldModel->update_setting( 'key', $field[ 'key' ] );
            }

            if( isset( $field[ 'settings' ] ) ) {
                $settings = array_merge( $field[ 'settings' ], $fieldModel->get_settings());
            } else {
                $settings = array_merge( $field, $fieldModel->get_settings());
            }

            $fieldModel->update_settings( $settings );

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
        return Ninja_Forms()->form()->get_field();
    }

    public function to_array()
    {
        $fields = array();
        foreach( $this->fields as $field ){
            $settings = $field->get_settings();
            $settings[ 'id' ] = ( $field->get_tmp_id() ) ? $field->get_tmp_id() : $field->get_id();
            $fields[ $field->get_id() ] = $settings;
        }
        return $fields;
    }
}
