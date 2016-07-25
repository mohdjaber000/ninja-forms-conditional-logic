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
		},

		renderFieldSelect: function() {
			return '<select><option>-- SELECT A FIELD</option></select>';
		},

		renderCompSelect: function() {
			return '<select><option>equals</option></select>';
		}

	});

	return controller;
} );