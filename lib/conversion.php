<?php

final class NF_ConditionalLogic_Conversion
{
    public function __construct()
    {
        add_filter( 'ninja_forms_after_upgrade_settings', array( $this, 'upgrade_field_settings' ) );
    }

    function upgrade_field_settings( $form_data )
    {

    }
}
