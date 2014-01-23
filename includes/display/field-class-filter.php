<?php

/* 
 *
 * Function that loops through all of our fields and adds a listner class if this field is referenced in another conditional.
 *
 * @since 1.2.1
 * @return void
 */

function ninja_forms_conditionals_field_class_filter( $form_id ) {
	global $ninja_forms_loading, $ninja_forms_processing;
	$watch_fields = array();
	if ( isset ( $ninja_forms_loading ) ) {
		$field_results = $ninja_forms_loading->get_all_fields();
	} else {
		$field_results = $ninja_forms_processing->get_all_fields();
	}

	foreach($field_results as $f_id => $user_value ){
		if ( isset ( $ninja_forms_loading ) ) {
			$field = $ninja_forms_loading->get_field_settings( $f_id );
		} else {
			$field = $ninja_forms_processing->get_field_settings( $f_id );
		}
		$data = $field['data'];
		if(isset($data['conditional']) AND is_array($data['conditional'])){
			foreach($data['conditional'] as $conditional){
				if(isset($conditional['cr']) AND is_array($conditional['cr'])){
					foreach($conditional['cr'] as $cr){
						if ( isset ( $ninja_forms_loading ) ) {
							$cr_field_class = $ninja_forms_loading->get_field_setting( $cr['field'], 'field_class' );
						} else {
							$cr_field_class = $ninja_forms_processing->get_field_setting( $cr['field'], 'field_class' );
						}

						if ( strpos ( $cr_field_class, 'ninja-forms-field-conditional-listen' ) === false ) {
							$cr_field_class .= ' ninja-forms-field-conditional-listen ';
						}

						if ( isset ( $ninja_forms_loading ) ) {
							$ninja_forms_loading->update_field_setting( $cr['field'], 'field_class', $cr_field_class );
						} else {
							$ninja_forms_processing->update_field_setting( $cr['field'], 'field_class', $cr_field_class );
						}

					}
				}
			}
		}
	}
}

add_action( 'ninja_forms_display_init', 'ninja_forms_conditionals_field_class_filter', 10, 2 );
add_action( 'ninja_forms_pre_process', 'ninja_forms_conditionals_field_class_filter', 10, 2 );