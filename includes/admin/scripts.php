<?php
add_action( 'admin_enqueue_scripts', 'ninja_forms_conditionals_admin_js', 10, 2 );
function ninja_forms_conditionals_admin_js( $page ){
	global $ninja_forms_fields;

	if( isset( $_REQUEST['page'] ) AND $_REQUEST['page'] == 'ninja-forms' ){

		$form_id = isset ( $_REQUEST['form_id'] ) ? $_REQUEST['form_id'] : '';

		if ( defined( 'NINJA_FORMS_JS_DEBUG' ) && NINJA_FORMS_JS_DEBUG ) {
			$suffix = '';
			$src = 'dev';
		} else {
			$suffix = '.min';
			$src = 'min';
		}

		wp_enqueue_script( 'nf-cl-admin',
			NINJA_FORMS_CON_URL .'/js/' . $src . '/ninja-forms-conditionals-admin' . $suffix . '.js',
			array( 'jquery', 'ninja-forms-admin' ) );

		if ( empty ( $form_id ) )
			return false;

		$fields = Ninja_Forms()->form( $form_id )->fields;

		/**
		 * We need to localize our script so that we have the appropriate JSON values to work with our backbone/underscore templates.
		 * First, we'll get a list of conditionals currently on this object.
		 * We need to check and see if we are on a notification page or editing a form.
		 */
		$conditions_json = array();
		if ( isset ( $_REQUEST['notification-action'] ) && 'edit' == $_REQUEST['notification-action'] ) {
			$n_id = isset ( $_REQUEST['id'] ) ? $_REQUEST['id'] : '';
			if ( ! empty ( $n_id ) ) {
				$conditionals = nf_cl_get_conditions( $n_id );
				foreach ( $conditionals as $cond_id ) {
					$action = nf_get_object_meta_value( $cond_id, 'action' );
					$criteria = nf_cl_get_criteria( $cond_id );
					$criteria_json = array();
					foreach ( $criteria as $cr_id ) {
						$selected_field = nf_get_object_meta_value( $cr_id, 'field' );
						$compare = nf_get_object_meta_value( $cr_id, 'compare' );
						$value = nf_get_object_meta_value( $cr_id, 'value' );
						$criteria_json[] = array( 'id' => $cr_id, 'field' => $selected_field, 'compare' => $compare, 'value' => $value );
					}
					$connector = nf_get_object_meta_value( $cond_id, 'connector' );
					$conditions_json[ $cond_id ] = array( 'id' => $cond_id, 'action' => $action, 'connector' => $connector, 'criteria' => $criteria_json );
				}
			}
		}

		/**
		 * Now we get a list of all of our fields and their conditional values.
		 * $cl_fields will hold our fields and their labels.
		 * $field_conditions will hold our field type conditional settings.
		 */
		$cl_fields = array();
		$field_conditions = array();
		foreach ( $fields as $field ) {
			$field_type = $field['type'];
			$field_id = $field['id'];
			if ( isset ( $ninja_forms_fields[ $field_type ]['process_field'] ) && $ninja_forms_fields[ $field_type ]['process_field'] ) {
				$label = nf_get_field_admin_label( $field_id );
				$con_value = isset ( $ninja_forms_fields[ $field_type ]['conditional']['value'] ) ? $ninja_forms_fields[ $field_type ]['conditional']['value'] : array( 'type' => 'text' );
				$type = $con_value['type'];
				if ( 'list' == $type ) {
					if ( is_array ( $field['data']['list']['options'] ) ) {
						$list_options = array();
						foreach ( $field['data']['list']['options'] as $opt ) {
							$opt_label = $opt['label'];
							$opt_value = $opt['value'];
							if ( ! isset ( $field['data']['list_show_value'] ) || $field['data']['list_show_value'] != 1 ) {
								$opt_value = $opt['label'];
							}
							$list_options[] = array( 'value' => $opt_value, 'label' => $opt_label );
						}
						$con_value = array( 'type' => 'select', 'options' => $list_options );
					}
				} else if ( '_checkbox' == $field_type ) {
					$options[] = array( 'value' => 'checked', 'label' => __( 'Checked', 'ninja-forms' ) );
					$options[] = array( 'value' => 'unchecked', 'label' => __( 'Unchecked', 'ninja-forms' ) );
					$con_value = array( 'type' => 'select', 'options' => $options );
				}
				$cl_fields[ $field_id ] = array( 'id' => $field_id, 'label' => $label, 'conditions' => $con_value );
			}
		}
		wp_localize_script( 'nf-cl-admin', 'nf_cl', array( 'fields' => $cl_fields, 'conditions' => $conditions_json ) );
	}
}

add_action( 'admin_enqueue_scripts', 'ninja_forms_conditionals_admin_css' );
function ninja_forms_conditionals_admin_css(){
	if( isset( $_REQUEST['page'] ) AND $_REQUEST['page'] == 'ninja-forms' ){
		wp_enqueue_style('ninja-forms-conditionals-admin', NINJA_FORMS_CON_URL .'/css/ninja-forms-conditionals-admin.css', array( 'ninja-forms-admin' ) );
	}
}