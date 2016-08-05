<?php

final class NF_ConditionalLogic_Triggers_HideField implements NF_ConditionalLogic_Trigger
{
    public function process( NF_Database_Models_Field &$field )
    {
        $value = $field->get_setting( 'value' );
        $field->update_setting( 'value', false );
        $field->update_setting( 'submitted_value', $value );
    }
}