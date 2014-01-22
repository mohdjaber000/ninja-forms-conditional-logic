<?php

function ninja_forms_conditionals_field_filter( $form_id ){
	global $ninja_forms_loading, $ninja_forms_processing;

	if ( isset ( $ninja_forms_loading ) ) {
		$all_fields = $ninja_forms_loading->get_all_fields();
	} else {
		$all_fields = $ninja_forms_processing->get_all_fields();
	}

	foreach ( $all_fields as $field_id => $user_value ) {
		if ( isset ( $ninja_forms_loading ) ) {
			$field = $ninja_forms_loading->get_field_settings( $field_id );
		} else {
			$field = $ninja_forms_processing->get_field_settings( $field_id );
		}

		$data = apply_filters( 'ninja_forms_field', $field['data'], $field_id );

		$x = 0;
		$display_style = '';

		if( isset ( $data['conditional'] ) AND is_array ( $data['conditional'] ) AND !empty ( $data['conditional'] ) ){
			$action_pass = array();

			foreach( $data['conditional'] as $conditional ){
				$action = $conditional['action'];
				$con_value = $conditional['value'];
				if(isset( $conditional['cr']) AND is_array($conditional['cr']) AND !empty($conditional['cr'])){
					$pass_array = array();
					$x = 0;
					
					foreach($conditional['cr'] as $cr){
						
						$pass_array[$x] = false;
						if( isset ( $ninja_forms_loading ) ) {
							$user_value = $ninja_forms_loading->get_field_value( $cr['field'] );
						}else{
							$user_value = $ninja_forms_processing->get_field_value( $cr['field'] );
						}

						if( isset( $cr['value'] ) ){
							if( is_array( $user_value ) ){
								foreach( $user_value as $v ){
									if( !$pass_array[$x] ){
										$pass_array[$x] = ninja_forms_conditional_compare($v, $cr['value'], $cr['operator']);
									}else{
										break;
									}
								}
							}else{
								$pass_array[$x] = ninja_forms_conditional_compare($user_value, $cr['value'], $cr['operator']);
							}
						}else{
							$pass_array[$x] = true;
						}

						$x++;

					}
					
				}
				
				if( isset ( $pass_array ) and is_array( $pass_array ) ){
					if( $conditional['connector'] == 'and' ){
						$pass = true;
					}else if( $conditional['connector'] == 'or' ){
						$pass = false;
					}

					foreach( $pass_array as $p ){
						if( $conditional['connector'] == 'and' ){
							if( $pass ){
								$pass = $p;
							}else{
								break;
							}
						}else if( $conditional['connector'] == 'or' ){
							if( $pass ){
								break;
							}else{
								$pass = $p;
							}
						}
					}
				}

				if ( isset ( $pass ) and ( !isset ( $action_pass[$action][$con_value] ) OR !$action_pass[$action][$con_value] ) ) {
					$action_pass[$action][$con_value] = $pass;
				}
			}
		
			foreach( $data['conditional'] as $conditional ){
				$action = $conditional['action'];
				$con_value = $conditional['value'];
				$pass = $action_pass[$action][$con_value];

				switch( $conditional['action'] ){
					case 'show':
						if( !$pass ){
							$data['display_style'] = 'display:none;';
							$data['visible'] = false;
							$data['class'] .= ',ninja-forms-field-calc-no-new-op,ninja-forms-field-calc-no-old-op';
							// Set our $calc to 0 if we're dealing with a list field.
							if ( $field['type'] == '_list' ) {
								if ( isset ( $data['list']['options'] ) AND is_array ( $data['list']['options'] ) ) {
									for ($x=0; $x < count( $data['list']['options'] ) ; $x++) {
										$data['list']['options'][$x]['calc'] = '';
									}
								}							
							}
						}else{
							$data['display_style'] = '';
							$data['visible'] = true;
						}
						break;
					case 'hide':
						if( $pass ){
							$data['display_style'] = 'display:none;';
							$data['visible'] = false;
							$data['class'] .= ',ninja-forms-field-calc-no-new-op,ninja-forms-field-calc-no-old-op';
							// Set our $calc to 0 if we're dealing with a list field.
							if ( $field['type'] == '_list' ) {
								if ( isset ( $data['list']['options'] ) AND is_array ( $data['list']['options'] ) ) {
									for ($x=0; $x < count( $data['list']['options'] ) ; $x++) {
										$data['list']['options'][$x]['calc'] = '';
									}
								}							
							}
						} else {
							$data['display_style'] = '';
							$data['visible']= true;
						}
						break;
					case 'change_value':
						if( $pass ){
							$data['default_value'] = $conditional['value'];
						}
						break;
					case 'add_value':
						if( $pass ){
							if( !isset( $conditional['value']['value'] ) ){
								$value = $conditional['value']['label'];
							}else{
								$value = $conditional['value'];
							}
							if( !isset( $data['list']['options'] ) OR !is_array( $data['list']['options'] ) ){
								$data['list']['options'] = array();
							}
							array_push( $data['list']['options'], $value );						
						}
						break;
					case 'remove_value':
						if( $pass ){
							if( isset( $data['list']['options'] ) AND is_array( $data['list']['options'] ) ){
								for ($x=0; $x < count( $data['list']['options'] ) ; $x++) { 
									if( isset( $data['list_show_value'] ) AND $data['list_show_value'] == 1 ){
										if( $data['list']['options'][$x]['value'] == $conditional['value'] ){
											$data['list']['options'][$x]['display_style'] = 'display:none;';
											$data['list']['options'][$x]['disabled'] = true;
										}
									}else{
										if( $data['list']['options'][$x]['label'] == $conditional['value'] ){
											$data['list']['options'][$x]['display_style'] = 'display:none;';
											$data['list']['options'][$x]['disabled'] = true;
										}
									}
								}
								$data['list']['options'] = array_values( $data['list']['options'] );
							}
						}
						break;
					default:
						$data['conditional_action'] = $conditional['action'];
						$data['conditional_pass'] = $pass;
				}
			}

			$field['data'] = $data;
			if ( isset ( $ninja_forms_loading ) ) {
				$ninja_forms_loading->update_field_settings( $field_id, $field );
			} else {
				$ninja_forms_processing->update_field_settings( $field_id, $field );
			}
		}
	}
}

add_action( 'ninja_forms_display_init', 'ninja_forms_conditionals_field_filter' );
add_action( 'ninja_forms_pre_process', 'ninja_forms_conditionals_field_filter' );