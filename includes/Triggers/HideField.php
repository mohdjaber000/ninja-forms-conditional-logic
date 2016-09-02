<?php

final class NF_ConditionalLogic_Triggers_HideField implements NF_ConditionalLogic_Trigger
{
    public function process( NF_Database_Models_Field &$field )
    {
        $value = $field->get_setting( 'value' );
        $field->update_setting( 'value', false );
        $field->update_setting( 'submitted_value', $value );

        // Hidden fields should NOT be validated for required.
        if( 1 == $field->get_setting( 'required' ) ) {

            // Set bypass flag.
            $field->update_setting('conditionally_required', false);
        }
    }
}