<?php

final class NF_ConditionalLogic_Submission
{
    public function __construct()
    {
        add_filter( 'ninja_forms_submit_data', array( $this, 'parse_fields' ) );
        add_filter( 'ninja_forms_pre_validate_field_settings', array( $this, 'before_validate_field' ) );

        add_filter( 'ninja_forms_submission_actions', array( $this, 'parse_actions' ), 10, 2 );
        add_filter( 'ninja_forms_submission_actions_preview', array( $this, 'parse_actions' ), 10, 2 );
    }

    public function parse_fields( $data )
    {
        if( ! isset( $data[ 'settings' ][ 'conditions' ] ) ) return $data;

        $fieldsCollection = new NF_ConditionalLogic_FieldsCollection( $data[ 'fields' ] );

        foreach( $data[ 'settings' ][ 'conditions' ] as $condition ){
            $condition = new NF_ConditionalLogic_ConditionModel( $condition, $fieldsCollection, $data );
            $condition->process();
        }

        $fieldsCollection = apply_filters( 'ninja_forms_conditional_logic_parse_fields', $fieldsCollection );
        $data[ 'fields' ] = $fieldsCollection->to_array();

        return $data;
    }

    public function before_validate_field( $field_settings )
    {
        if( ! isset( $field_settings[ 'conditionally_required' ] ) ) return $field_settings;

        $field_settings[ 'required' ] = $field_settings[ 'conditionally_required' ];

        unset( $field_settings[ 'conditionally_required' ] );

        return $field_settings;
    }

    public function parse_actions( $actions, $form_data )
    {
        $fieldsCollection = new NF_ConditionalLogic_FieldsCollection( $form_data[ 'fields' ] );

        array_walk( $actions, array( $this, 'parse_action' ), $fieldsCollection );

        return $actions;
    }

    public function parse_action( &$action, $key, $fieldsCollection )
    {
        $action_condition = ( is_object( $action ) ) ? $action->get_setting( 'conditions' ) : $action[ 'settings' ][ 'conditions' ];

        if( ! $action_condition ) return;

        unset( $action_condition[ 'then' ] );
        unset( $action_condition[ 'else' ] );

        foreach( $action_condition[ 'when' ] as &$when ){
            $when[ 'connector' ] = ( 'all' == $action_condition[ 'connector' ] ) ? 'AND' : 'OR';
        }
        $default = ( 'all' == $action_condition[ 'connector' ] );

        $condition = new NF_ConditionalLogic_ConditionModel( $action_condition, $fieldsCollection, array(), $default );
        $result = $condition->process();

        if( 1 != $action_condition[ 'process' ] ) {
            $result = ! $result;
        }

        if( is_object( $action ) ){
            $action->update_setting( 'active', $result );
        } else {
            $action[ 'settings' ][ 'active' ] = $result;
        }
    }

}