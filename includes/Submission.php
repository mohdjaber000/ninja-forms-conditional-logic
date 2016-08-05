<?php

final class NF_ConditionalLogic_Submission
{
    public function __construct()
    {
        add_filter( 'ninja_forms_submit_data', array( $this, 'submission' ) );
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
}