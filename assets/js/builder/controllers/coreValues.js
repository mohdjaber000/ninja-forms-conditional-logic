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
			nfRadio.channel( 'conditions-checkbox' ).reply( 'get:valueInput', this.getCheckboxValue );
			nfRadio.channel( 'conditions-list' ).reply( 'get:valueInput', this.getListValue );
		},

		getCheckboxValue: function( key, trigger, value ) {
			var template = _.template( jQuery( '#nf-tmpl-cl-value-checkbox' ).html() );
			return template( { value: value } );
		},

		getListValue: function( key, trigger, value ) {
			var fieldModel = nfRadio.channel( 'fields' ).request( 'get:field', key );
			var options = fieldModel.get( 'options' );
			var template = _.template( jQuery( '#nf-tmpl-cl-value-list' ).html() );
			return template( { options: options, value: value } );
		},


	});

	return controller;
} );
