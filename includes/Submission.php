<?php

final class NF_ConditionalLogic_Submission
{
    public function __construct()
    {
        add_filter( 'ninja_forms_submit_data', array( $this, 'submission' ) );
        add_filter( 'ninja_forms_pre_validate_field_settings', array( $this, 'pre_validate_field_settings' ) );
    }

    public function submission( $data )
    {
        $fieldsCollection = new NF_ConditionalLogic_FieldsCollection( $data[ 'fields' ] );

        foreach( $data[ 'settings' ][ 'conditions' ] as $condition ){
            $condition = new NF_ConditionalLogic_ConditionModel( $condition, $fieldsCollection );
            $condition->process();
        }

        $data[ 'fields' ] = $fieldsCollection->to_array();

        return $data;
    }

    public function pre_validate_field_settings( $field_settings )
    {
        if( ! isset( $field_settings[ 'conditionally_required' ] ) ) return $field_settings;

        $field_settings[ 'required' ] = $field_settings[ 'conditionally_required' ];

        unset( $field_settings[ 'conditionally_required' ] );

        return $field_settings;
    }
}