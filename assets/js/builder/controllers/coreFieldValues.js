/**
 * Returns the type of input value we'd like to use.
 * This covers all the core field types.
 *
 * Add-ons can copy this code structure in order to get custom "values" for conditions.
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			nfRadio.channel( 'conditions-textarea' ).reply( 'get:valueInput', this.getTextareaValue );
			nfRadio.channel( 'conditions-checkbox' ).reply( 'get:valueInput', this.getCheckboxValue );
			nfRadio.channel( 'conditions-listcheckbox' ).reply( 'get:valueInput', this.getListCheckboxValue );
		},

		getTextareaValue: function( key, trigger, value ) {
			var template = _.template( jQuery( '#nf-tmpl-cl-value-textarea' ).html() );
			return template( { value: value } );
		},

		getCheckboxValue: function( key, trigger, value ) {
			var template = _.template( jQuery( '#nf-tmpl-cl-value-checkbox' ).html() );
			return template( { value: value } );
		},

		getListCheckboxValue: function( key, trigger, value ) {
			var fieldModel = nfRadio.channel( 'fields' ).request( 'get:field', key );
			var options = fieldModel.get( 'options' );

			var template = _.template( jQuery( '#nf-tmpl-cl-value-listcheckbox' ).html() );
			return template( { options: options, value: value } );
		},


	});

	return controller;
} );
