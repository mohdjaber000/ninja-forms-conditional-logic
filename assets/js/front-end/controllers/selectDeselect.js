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
			 * Get our field model and set this option's "selected" property to 1
			 */
			var targetFieldModel = nfRadio.channel( 'form-' + conditionModel.collection.formModel.get( 'id' ) ).request( 'get:fieldByKey', then.key );
			targetFieldModel.set( 'clean', false ); // Allows for changes to default values.

			var options = targetFieldModel.get( 'options' );

			var option = _.find( options, { value: then.value } );
			option.selected = 1;

			targetFieldModel.set( 'options', options );
			targetFieldModel.set( 'value', option.value ); // Propagate the selected option to the model's value.

			/*
			 * Re render our field
			 */
			targetFieldModel.trigger( 'reRender', targetFieldModel );
		},

		deselectOption: function( conditionModel, then ) {
			/*
			 * When we are trying to deselect our option, we need to change it's "selected" property to 0 AND change its value.
			 */
			var targetFieldModel = nfRadio.channel( 'form-' + conditionModel.collection.formModel.get( 'id' ) ).request( 'get:fieldByKey', then.key );

			/*
			 * Set "selected" to 0.
			 */
			var options = targetFieldModel.get( 'options' );
			var option = _.find( options, { value: then.value } );
			option.selected = 0;
			targetFieldModel.set( 'options', options );

			/*
			 * Update our value
			 */
			var currentValue = targetFieldModel.get( 'value' );
			if ( _.isArray( currentValue ) ) {
				currentValue = _.without( currentValue, then.value );
			} else {
				currentValue = '';
			}
			targetFieldModel.set( 'value', currentValue );

			/*
			 * Re render our field
			 */
			targetFieldModel.trigger( 'reRender', targetFieldModel );
		},

	});

	return controller;
} );