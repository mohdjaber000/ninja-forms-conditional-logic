<?php
function nf_cl_notification_settings( $id ) {
	global $ninja_forms_fields;

	$conditions = nf_cl_get_conditions( $id );
	if ( empty ( $conditions ) ) {
		$add_button_style = '';
	} else {
		$add_button_style = 'display:none;';
	}
	?>
	<tbody id="nf-conditions">
		<tr>
			<th scope="row"><?php _e( 'Conditional Processing', 'ninja-forms-conditionals' ); ?></label></th>
			<td>
				<div id="nf_cl_conditions">
					<a href="#" class="nf-cl-add button-secondary add-condition" style="<?php echo $add_button_style; ?>"><div class="dashicons dashicons-plus-alt"></div> Add</a>
				</div>
			</td>
		</tr>
	</tbody>

	<script type="text/html" id="tmpl-nf-cl-condition">
		<div id="nf_cl_condition_<%= cond_id %>" class="nf-cl-condition" name=""><!-- Opening Conditional Logic Div -->
			<div class="nf-cl-condition-title">
				<select id="" name="conditions[<%= cond_id %>][action]" class="nf-cl-conditional-action">
					<option value="process" <% if ( 'process' == action ) { %> selected="selected" <% } %>><?php _e( 'Process This', 'ninja-forms-conditionals' ); ?></option>
					<option value="noprocess" <% if ( 'noprocess' == action ) { %> selected="selected" <% } %>><?php _e( 'Do Not Process This', 'ninja-forms-conditionals' ); ?></option>
				</select>
				<?php _e( 'If', 'ninja-forms-conditionals' ); ?>
				<select name="conditions[<%= cond_id %>][connector]">
					<option value="and" <% if ( 'and' == connector ) { %> selected="selected" <% } %>><?php _e( 'All', 'ninja-forms-conditionals' ); ?></option>
					<option value="or" <% if ( 'or' == connector ) { %> selected="selected" <% } %>><?php _e( 'Any', 'ninja-forms-conditionals' ); ?></option>
				</select>
				<?php _e( 'of the following criteria are met', 'ninja-forms-conditionals' ); ?>: <a href="#" id="" name="" class="button-secondary nf-cl-add add-cr" data-cond-id="<%= cond_id %>"><div class="dashicons dashicons-plus-alt" data-cond-id="<%= cond_id %>"></div><span class="spinner" style="float:left;"></span> <?php _e( 'Add Criteria', 'ninja-forms-conditionals' ); ?></a>
				<a href="#" class="nf-cl-delete delete-condition" style=""><div class="dashicons dashicons-dismiss"></div></a>
			</div>
			<div id="" class="nf-cl-criteria"></div>
		</div> <!-- Close Conditional Logic Div -->
	</script>

	<script type="text/html" id="tmpl-nf-cl-criteria">
		<div class="single-criteria" id="<%= div_id %>">
			<a href="#" class="nf-cl-delete delete-cr" style=""><div class="dashicons dashicons-dismiss"></div></a>
			<select name="<%= cr_name %>[field]" class="cr-field" id="" title="" data-cr-id="<%= cr_id %>" data-num="<%= num %>" data-cond-id="<%= cond_id %>">
				<option value=""><?php _e( '-- Select A Field', 'ninja-forms-conditionals' ); ?></option>
				<% _.each( fields, function( field ) { 
					if ( selected_field == field.id ) {
						var selected = 'selected="selected"';
					} else {
						var selected = '';
					}
					%>
					<option value="<%= field.id %>" <%= selected %>>ID: <%= field.id %> - <%= field.label %></option>
				<% }); %>
			</select>
			<span class="cr-compare"></span>
			<span class="cr-value"></span>
		</div>
	</script>

	<script type="text/html" id="tmpl-nf-cl-criteria-compare">
		<select name="<%= cr_name %>[compare]">
			<%
			if ( typeof fields[ selected_field ] !== 'undefined' ) {
				_.each( fields[ selected_field ].compare, function( value, key ) {
					%>
					<option value="<%= key %>" <% if ( compare == key ) { %>selected="selected"<% }  %>><%= value %></option>
					<%
				} );
			}
			%>
		</select>
	</script>	

	<script type="text/html" id="tmpl-nf-cl-criteria-value">
		<%
		if ( typeof fields[selected_field] !== 'undefined' ) {
			var type = fields[selected_field].conditions.type;
			if ( type == 'text' ) {
				%>
				<input type="text" name="<%= cr_name %>[value]" value="<%= value %>">
				<%
			} else if ( type == 'select' ) {
				%>
				<select name="<%= cr_name %>[value]">
					<%
					_.each( fields[selected_field].conditions.options, function( opt ) {
						if ( value == opt.value ) {
							var selected = 'selected="selected"';
						} else {
							var selected = '';
						}
						%>
						<option value="<%= opt.value %>" <%= selected %>><%= opt.label %></option>
						<%
					});
					%>
				</select>
				<%
			} else if ( type == 'textarea' ) {
				%>
				<textarea name="<%= cr_name %>[value]" style="vertical-align:top"><%= value %></textarea>
				<%
			}
		}
		%>
	</script>

	<?php
}

add_action( 'nf_edit_notification_settings', 'nf_cl_notification_settings' );

/**
 * Hook into our notification save action
 *
 * @since 1.2.8
 * @return void
 */
function nf_cl_save_notification( $n_id, $data, $new ) {
	// Bail if we don't have any conditional data.
	if ( ! isset ( $data['conditions'] ) || ! is_array ( $data['conditions'] ) ) {
		// Loop through our current conditions and remove any that weren't sent.
		$conditions = nf_cl_get_conditions( $n_id );

		foreach ( $conditions as $cond_id ) {
			nf_cl_delete_condition( $cond_id );
		}
		return false;	
	}

	// Loop through our current conditions and remove any that weren't sent.
	$conditions = nf_cl_get_conditions( $n_id );

	foreach ( $conditions as $cond_id ) {
		if ( ! isset ( $data['conditions'][ $cond_id ] ) ) {
			nf_cl_delete_condition( $cond_id );
		}
	}
	
	// $data['conditions'] will store all the information about our conditions.
	foreach ( $data['conditions'] as $cond_id => $d ) { // Loop through our conditions and save the data.
		if ( 'new' == $cond_id ) {
			// If we are creating a new condition, insert it and grab the id.
			$cond_id = nf_cl_insert_condition( $n_id );
		}

		// Delete criteria that has been removed.
		$criteria = nf_cl_get_criteria( $cond_id );
		foreach ( $criteria as $cr_id ) {
			if ( ! isset ( $d['criteria'][ $cr_id ] ) ) {
				nf_delete_object( $cr_id );
			}
		}

		// Loop through any new criteria.
		if ( isset ( $d['criteria']['new'] ) ) {
			foreach ( $d['criteria']['new'] as $cr ) {
				$cr_id = nf_cl_insert_criteria( $cond_id );
				foreach ( $cr as $key => $value ) {
					// Insert our meta values
					nf_update_object_meta( $cr_id, $key, $value );
				}
			}
			unset( $d['criteria']['new'] );
		}

		if ( isset ( $d['criteria'] ) ) {
			foreach ( $d['criteria'] as $cr_id => $cr ) {
				foreach ( $cr as $key => $value ) {
					nf_update_object_meta( $cr_id, $key, $value );
				}					
			}
			unset ( $d['criteria'] );
		}

		// Save our other condition values.
		foreach ( $d as $key => $value ) {
			nf_update_object_meta( $cond_id, $key, $value );
		}
	}	

}

add_action( 'nf_save_notification', 'nf_cl_save_notification', 10, 3 );

/**
 * Hook into processing and modify our notifications
 *
 * @since 1.2.8
 * @return void
 */
function nf_cl_notification_process( $id ) {
	global $ninja_forms_processing;

	// Check to see if this notification is active. If it isn't, we don't want to check anything else.
	if ( ! Ninja_Forms()->notification( $id )->active )
		return false;

	// Check to see if we have any conditions on this notification
	$conditions = nf_cl_get_conditions( $id );

	if ( empty ( $conditions ) || ! is_array ( $conditions ) )
		return false;

	foreach ( $conditions as $cond_id ) {
		// Grab our action
		$action = nf_get_object_meta_value( $cond_id, 'action' );
		// Grab our connector
		$connector = nf_get_object_meta_value( $cond_id, 'connector' );
		// Grab our criteria
		$criteria = nf_cl_get_criteria( $cond_id );
		$pass_array = array();
		foreach ( $criteria as $cr_id ) {
			$field = nf_get_object_meta_value( $cr_id, 'field' );
			$compare = nf_get_object_meta_value( $cr_id, 'compare' );
			$value = nf_get_object_meta_value( $cr_id, 'value' );
			$user_value = $ninja_forms_processing->get_field_value( $field );
			$pass_array[] = ninja_forms_conditional_compare( $value, $user_value, $compare );
		}
		// Check our connector. If it is set to "all", then all our criteria have to match.
		if ( 'and' == $connector ) {
			$pass = true;
			foreach ( $pass_array as $p ) {
				if ( ! $p ) {
					$pass = false;
					break;
				}
			}
		} else { // If our connector is set to "any", then only one criteria has to match.
			$pass = false;
			foreach ( $pass_array as $p ) {
				if ( $p ) {
					$pass = true;
					break;
				}
			}
		}

		if ( $pass ) {
			if ( 'process' == $action ) {
				Ninja_Forms()->notification( $id )->active = true;
			} else if ( 'noprocess' == $action ) {
				Ninja_Forms()->notification( $id )->active = false;
			}
		} else {
			if ( 'process' == $action ) {
				Ninja_Forms()->notification( $id )->active = false;
			} else if ( 'noprocess' == $action ) {
				Ninja_Forms()->notification( $id )->active = true;
			}
		}
	}
}

add_action( 'nf_notification_before_process', 'nf_cl_notification_process' );
