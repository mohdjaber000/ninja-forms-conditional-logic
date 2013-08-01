jQuery(document).ready(function($) {
	
	/* * * Conditional Settings JS * * */
	
	//Listen to the "hidden list value" checkbox.
	$(document).on( 'change', '.ninja-forms-field-list-show-value', function(){
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_list_show_value", "");
		var new_values = new Object();
		if(this.checked){
			$(".ninja-forms-field-" + field_id + "-list-option-value").each(function(){
				var x = this.id.replace("ninja_forms_field_" + field_id + "_list_option_", "");
				x = x.replace("_value_span", "");
				new_values[x] = $(this).children(".ninja-forms-field-list-option-value").val();
			});
			$(".ninja-forms-field-" + field_id + "-list-option-value").show();
			$(".ninja-forms-field-conditional-cr-field").each(function(){
				if(this.value == field_id){
					$(this).nextElementInDom(".ninja-forms-field-conditional-cr-value-list:first").children('option').each(function(){
						this.value = new_values[this.title];
					});
				}
			});
			$(".ninja-forms-field-" + field_id + "-conditional-value").each(function(){
				$(this).children('option').each(function(){
					this.value = new_values[this.title];
				});
			});
		}else{

			$("#ninja_forms_field_" + field_id + "_list_options").children(".ninja-forms-field-" + field_id + "-list-option").find(".ninja-forms-field-list-option-label").each(function(){
				var parent_id = $(this).parent().parent().parent().parent().parent().prop("id");

				var x = parent_id.replace("ninja_forms_field_" + field_id + "_list_option_", "");

				new_values[x] = this.value;
			});
			
			$(".ninja-forms-field-conditional-cr-field").each(function(){
				if(this.value == field_id){
					$(this).nextElementInDom(".ninja-forms-field-conditional-cr-value-list:first").children('option').each(function(){
						this.value = new_values[this.title];
					});
				}
			});	
			
			$(".ninja-forms-field-" + field_id + "-conditional-value").each(function(){
				$(this).children('option').each(function(){
					this.value = new_values[this.title];
				});
			});
			
			$(".ninja-forms-field-" + field_id + "-list-option-value").hide();			
		}
	});
	
	//Conditional Action Change
	$(document).on( 'change', '.ninja-forms-field-conditional-action', function(){
		var value_id = this.id.replace('action', 'value');
		var label_id = this.id.replace('action', 'value_label');
		var form_id = $("#_form_id").val();
		var field_id = $(this).parent().parent().attr("name");
		var conditional_value_type = $("#ninja_forms_field_" + field_id + "_conditional_value_type").val();
		var list_show_value = $("#ninja_forms_field_" + field_id + "_list_show_value").prop("checked");
		var x = $(".ninja-forms-field-" + field_id + "-conditional").length;
		x--;
		var action_slug = this.value;
		var field_data = ninja_forms_serialize_data( field_id );

		$.post(ajaxurl, { form_id: form_id, field_id: field_id,  x: x, action_slug: action_slug, field_data: field_data, action:"ninja_forms_change_action"}, function(response){

			$("#ninja_forms_field_" + field_id + "_" + x + "_value_span").prop("innerHTML", response.new_html);

			if(response.new_type == 'list'){
				$("#" + value_id).children().remove().end();
				$(".ninja-forms-field-" + field_id + "-list-option").each(function(){

					var label = $(this).find(".ninja-forms-field-list-option-label").val();

					if(list_show_value){
						var value = $(this).find(".ninja-forms-field-list-option-value").val();
					}else{
						var value = label;
					}

					var i = this.id.replace("ninja_forms_field_" + field_id + "_list_option_", "");
					$("#" + value_id).append('<option value="' + value + '" title="' + i + '">' + label + '</option>');
				});
			}

		});
	});
	
	//Add New Conditional
	$(document).on( 'click', '.ninja-forms-field-add-conditional', function(event){
		event.preventDefault();
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_add_conditional", "");
		var form_id = $("#_form_id").val();
		var x = $(".ninja-forms-field-" + field_id + "-conditional").length;
		$.post(ajaxurl, { form_id: form_id, field_id: field_id,  x: x, action:"ninja_forms_add_conditional"}, function(response){
			$("#ninja_forms_field_" + field_id + "_conditionals").append(response);
		});
	});

	//Remove Conditional
	$(document).on( 'click', '.ninja-forms-field-remove-conditional', function(event){
		event.preventDefault();
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_remove_conditional", "");
		var x = this.name;
		$("#ninja_forms_field_" + field_id + "_conditional_" + x).remove();	
	});
	
	//Add New Criterion
	$(document).on( 'click', '.ninja-forms-field-add-cr', function(event){
		event.preventDefault();
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_add_cr", "");
		var form_id = $("#_form_id").val();
		var x = this.name;
		var y = $(".ninja-forms-field-" + field_id + "-conditional-" + x + "-cr").length;
		$.post(ajaxurl, { form_id: form_id, field_id: field_id, x: x, y: y, action:"ninja_forms_add_cr"}, function(response){
			$("#ninja_forms_field_" + field_id + "_conditional_" + x + "_cr").append(response.new_html);
			var title = '';
			var title_id = '';
			$(".ninja-forms-field-title").each(function(){
				title = this.innerHTML;
				if( title.length > 30 ){
					title = title.substring(0,30) + "...";
				}
				title_id = this.id.replace("ninja_forms_field_", "");
				title_id = title_id.replace("_title", "");
				$(".ninja-forms-field-conditional-cr-field > option").each(function(){
					if(this.value == title_id){
						this.text = "ID: " + title_id + " - " + title;
					}
				});
			});
		});
	});
	
	//Remove Criterion
	$(document).on( 'click', '.ninja-forms-field-remove-cr', function(event){
		event.preventDefault();
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_remove_cr", "");
		var x = this.name;
		var y = this.rel;
		$("#ninja_forms_field_" + field_id + "_conditional_" + x + "_cr_" + y).remove();
	});
	
	//Change Criterion Select List
	$(document).on( 'change', '.ninja-forms-field-conditional-cr-field', function(){
		var field_id = this.id.replace("ninja_forms_field_", "");
		field_id = field_id.replace("_cr_field", "");
		var tmp = this.title.split("_");
		var x = tmp[0];
		var y = tmp[1];
		var field_value = this.value;
		
		if(this.value != ''){
			$.post(ajaxurl, { field_id: field_id, field_value: field_value, x: x, y: y, action:"ninja_forms_change_cr_field"}, function(response){
				$("#ninja_forms_field_" + field_id + "_conditional_" + x + "_cr_" + y + "_value").prop("innerHTML", response.new_html);
				if(response.new_type == 'list'){
					$(".ninja-forms-field-" + field_value + "-list-option").each(function(){
						var label = $(this).find(".ninja-forms-field-list-option-label").val();
						if($("#ninja_forms_field_" + field_value + "_list_show_value").prop("checked") == true){
							var value = $(this).find(".ninja-forms-field-list-option-value").val();
						}else{
							var value = label;
						}
						var i = this.id.replace("ninja_forms_field_" + field_value + "_list_option_", "");
						$('select[name="ninja_forms_field_' + field_id + '\\[conditional\\]\\[' + x + '\\]\\[cr\\]\\[' + y + '\\]\\[value\\]"]').append('<option value="' + value + '" title="' + i + '">' + label + '</option>');
					});
				}
			});
		}else{
			$("#ninja_forms_field_" + field_id + "_conditional_" + x + "_cr_" + y + "_value").prop("innerHTML", "");
		}
	});
	
	/* * * End Conditional Settings JS * * */
}); //Document.read();

function ninja_forms_serialize_data( field_id ){
	var data = jQuery('input[name^=ninja_forms_field_' + field_id + ']');
	var field_data = jQuery(data).serializeFullArray();
	return field_data;
}