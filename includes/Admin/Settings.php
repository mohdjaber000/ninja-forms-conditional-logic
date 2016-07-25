<?php if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Class NF_ConditionalLogic_Admin_Settings
 */
final class NF_ConditionalLogic_Admin_Settings
{
    public function __construct()
    {
        add_filter( 'ninja_forms_from_settings_types',     array( $this, 'form_settings_types' ), 10, 1 );
        add_filter( 'ninja_forms_localize_forms_settings', array( $this, 'form_settings' ),      10, 1 );
    }

    public function form_settings_types( $types )
    {
        $types[ 'conditional_logic' ] = array(
            'id'       => 'conditional_logic',
            'nicename' => __( 'Conditional Logic', 'ninja-forms-conditional-logic' ),
        );

        return $types;
    }

    public function form_settings( $form_settings )
    {
        $form_settings[ 'conditional_logic' ] = array(
            'cl_test'               => array(
                'name'              => 'cl_test',
                'type'              => 'cl_condition',
                'label'             => __( 'Cool Test', 'ninja-forms-conditional-logic' ),
                'width'             => 'one-half',
                'group'             => 'primary',
            ),
        );

        return $form_settings;
    }

} // End Class NF_ConditionalLogic_Admin_Settings
