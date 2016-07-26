/**
 * Adds template helpers for the fields conditional logic setting type
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			this.listenTo( nfRadio.channel( 'cl_condition' ), 'init:settingModel', this.addTemplateHelpers );
		},

		addTemplateHelpers: function( model ) {
			model.set( 'renderFieldSelect', this.renderFieldSelect );
			model.set( 'renderCompSelect', this.renderCompSelect );
			model.set( 'renderValueInput', this.renderValueInput );
		},

		renderFieldSelect: function() {
			return '<div class="nf-setting nf-one-third"><label class="nf-select"><select><option>FIELD</option></select><div></div></label></div>';
		},

		renderCompSelect: function() {
			return '<div class="nf-setting nf-one-third"><label class="nf-select"><select><option>equals</option></select><div></div></label></div>';
		},

		renderValueInput: function() {
			return '<div class="nf-setting nf-one-third"><label class="nf-input"><input type=text value="" /></label></div>';
		}

	});

	return controller;
} );
