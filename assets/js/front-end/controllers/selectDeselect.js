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
			nfRadio.channel( 'nf_cl_select_option' ).reply( 'pass', this.selectOption, this );
			nfRadio.channel( 'nf_cl_select_option' ).reply( 'fail', this.deselectOption, this );

			nfRadio.channel( 'nf_cl_deselect_option' ).reply( 'pass', this.deselectOption, this );
			nfRadio.channel( 'nf_cl_deselect_option' ).reply( 'fail', this.selectOption, this );
		},

		selectOption: function( conditionModel, then ) {
			/*
			 * select_option is an alias for change_value, so we just send out a radio message for that.
			 */
			nfRadio.channel( 'nf_cl_change_value' ).request( 'pass', conditionModel, then );
		},

		deselectOption: function( conditionModel, then ) {
			var targetFieldModel = nfRadio.channel( 'form-' + conditionModel.collection.formModel.get( 'id' ) ).request( 'get:fieldByKey', then.key );
			var currentValue = targetFieldModel.get( 'value' );
			
			currentValue = _.difference( currentValue, then.value );
			targetFieldModel.set( 'value', currentValue );
			targetFieldModel.trigger( 'reRender', targetFieldModel );
		},

	});

	return controller;
} );