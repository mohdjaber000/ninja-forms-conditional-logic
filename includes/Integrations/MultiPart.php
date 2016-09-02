<?php

final class NF_ConditionalLogic_Integrations_MultiPart
{
    public function __construct()
    {
        add_filter( 'ninja_forms_conditional_logic_triggers', array( $this, 'register_triggers' ), 10, 1 );
        add_filter( 'ninja_forms_conditional_logic_trigger_type_part', array( $this, 'get_part' ), 10, 2 );
    }

    public function register_triggers( $triggers )
    {
        $triggers[ 'hide_part' ] = array(
            'key'      => 'hide_part',
            'label'    => __( 'Hide Part', 'ninja-forms-conditional-logic' ),
            'instance' => new NF_ConditionalLogic_Triggers_HidePart()
        );

        $triggers[ 'show_part' ] = array(
            'key'      => 'show_part',
            'label'    => __( 'Show Part', 'ninja-forms-conditional-logic' ),
            'instance' => new NF_ConditionalLogic_Triggers_ShowPart()
        );

        return $triggers;
    }

    public function get_part( $key, $data )
    {
        $form = Ninja_Forms()->form( $data[ 'form_id' ] )->get();

        $formContentData =  $form->get_setting( 'formContentData' );

        if( ! $formContentData ) return false;

        $parts = array();
        foreach( $formContentData as $content ){
            if( 'part' != $content[ 'type' ] || $key != $content[ 'key' ] ) continue;
            array_push( $parts, $content );
        }

        if( ! is_array( $parts ) ) return false;

        return array_shift( $parts );
    }

    public static function extract_field_keys( $part )
    {
        if( ! isset( $part[ 'formContentData' ] ) ) return array();
        $field_keys = array();
        foreach( $part[ 'formContentData' ] as $content ){
            $field_key = ( is_string( $content ) ) ? $content : self::extract_field_key( $content );
            array_push( $field_keys, $field_key );
        }
        return $field_keys;
    }

    public static function extract_field_key( $content )
    {
        return '';
    }


}
