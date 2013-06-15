<?php

add_action( 'init', 'ninja_forms_register_conditionals_req_fields' );
function ninja_forms_register_conditionals_req_fields(){
	add_action( 'ninja_forms_pre_process', 'ninja_forms_conditionals_req_fields', 12 );
}

function ninja_forms_conditionals_req_fields(){
	global $ninja_forms_processing;

	$all_fields = $ninja_forms_processing->get_all_fields();

	if( is_array( $all_fields ) AND !empty( $all_fields ) ){
		foreach( $all_fields as $field_id => $user_value ){
			
			$field_row = $ninja_forms_processing->get_field_settings( $field_id );
			$data = $field_row['data'];
			if(isset($data['conditional']) AND is_array($data['conditional'])){
				foreach($data['conditional'] as $conditional){
					if(is_array($conditional['cr']) AND !empty($conditional['cr'])){
						foreach($conditional['cr'] as $cr){
							if( is_object( $ninja_forms_processing)){
								$user_value = $ninja_forms_processing->get_field_value($cr['field']);
							}else{
								$field_row = ninja_forms_get_field_by_id( $cr['field'] );
								$field_data = $field_row['data'];

								if( isset( $field_data['default_value'] ) ){
									$user_value = $field_data['default_value'];
								}else{
									$user_value = '';
								}
							}
							if( isset( $cr['value'] ) ){
								$pass = ninja_forms_conditional_compare($user_value, $cr['value'], $cr['operator']);
							}else{
								$pass = true;
							}
						}
					}
					
					switch( $conditional['action'] ){
						case 'show':
							if( !$pass ){
								if( $field_row['type'] != '_spam' ){
									$field_row['data']['req'] = 0;
									$ninja_forms_processing->update_field_settings( $field_id, $field_row );
								}
							}
							break;
						case 'hide':
							if( $pass ){
								if( $field_row['type'] != '_spam' ){
									$field_row['data']['req'] = 0;
									$ninja_forms_processing->update_field_settings( $field_id, $field_row );
								}
							}
							break;
					}
				}
			}
		}
	}
}