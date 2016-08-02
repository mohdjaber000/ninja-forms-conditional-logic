/**
 * Handle selecting/deselecting list options
 * 
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			nfRadio.channel( 'condition:trigger' ).reply( 'select_option', this.selectOption, this );

			nfRadio.channel( 'condition:trigger' ).reply( 'deselect_option', this.deselectOption, this );
		},

		selectOption: function( conditionModel, then ) {
			/*
			 * Our value won't be an array, but our list field values are stored as arrays.
			 * We need to put our then.value into an array.
			 */
			var tmp = _.clone( then );
			tmp.value = [ tmp.value ];
						
			/*
			 * select_option is an alias for change_value, so we just send out a radio message for that.
			 */
			nfRadio.channel( 'condition:trigger' ).request( 'change_value', conditionModel, tmp );
		},

		deselectOption: function( conditionModel, then ) {
			var targetFieldModel = nfRadio.channel( 'form-' + conditionModel.collection.formModel.get( 'id' ) ).request( 'get:fieldByKey', then.key );
			var currentValue = targetFieldModel.get( 'value' );
			currentValue = _.without( currentValue, then.value );
			targetFieldModel.set( 'value', currentValue );
			targetFieldModel.trigger( 'reRender', targetFieldModel );
		},

	});

	return controller;
} );