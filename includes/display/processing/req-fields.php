<?php

add_action( 'init', 'ninja_forms_register_conditionals_req_fields' );
function ninja_forms_register_conditionals_req_fields(){
	add_action( 'ninja_forms_pre_process', 'ninja_forms_conditionals_req_fields', 12.5 );
}

function ninja_forms_conditionals_req_fields(){
	global $ninja_forms_processing;

	$all_fields = $ninja_forms_processing->get_all_fields();

	if( is_array( $all_fields ) AND !empty( $all_fields ) ){
		foreach( $all_fields as $field_id => $user_value ){
			
			$field_row = $ninja_forms_processing->get_field_settings( $field_id );
			$data = $field_row['data'];
			if(isset($data['conditional']) AND is_array($data['conditional'])){
				$pass_array = array();
				$action_pass = array();
				$x = 0;
				foreach($data['conditional'] as $conditional){
					if(is_array($conditional['cr']) AND !empty($conditional['cr'])){
						$con_value = $conditional['value'];
						$action = $conditional['action'];
						foreach($conditional['cr'] as $cr){
							
							$user_value = $ninja_forms_processing->get_field_value($cr['field']);
							
							if( isset( $cr['value'] ) ){
								if( is_array( $user_value ) ){
									foreach( $user_value as $v ){
										if( !isset ( $pass_array[$x] ) ){
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
					if( is_array( $pass_array ) ){
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

				foreach($data['conditional'] as $conditional){
					$action = $conditional['action'];
					$con_value = $conditional['value'];
					$pass = $action_pass[$action][$con_value];
					switch( $conditional['action'] ){
						case 'show':
							if( !$pass ){
								if( $field_row['type'] != '_spam' ){
									$field_row['data']['req'] = 0;
									$ninja_forms_processing->update_field_settings( $field_id, $field_row );
									$ninja_forms_processing->remove_field_value( $field_id );
								}
							}
							break;
						case 'hide':
							if( $pass ){
								if( $field_row['type'] != '_spam' ){
									$field_row['data']['req'] = 0;
									$ninja_forms_processing->update_field_settings( $field_id, $field_row );
									$ninja_forms_processing->remove_field_value( $field_id );
								}
							}
							break;
					}
				}
			}
		}
	}
}