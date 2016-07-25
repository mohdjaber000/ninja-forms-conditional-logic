/**
 * Handle showing/hiding fields
 * 
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			nfRadio.channel( 'nf_cl_hide_field' ).reply( 'pass', this.hideField, this );
			nfRadio.channel( 'nf_cl_hide_field' ).reply( 'fail', this.showField, this );

			nfRadio.channel( 'nf_cl_show_field' ).reply( 'pass', this.showField, this );
			nfRadio.channel( 'nf_cl_show_field' ).reply( 'fail', this.hideField, this );
		},

		hideField: function( conditionModel, then ) {
			var targetFieldModel = nfRadio.channel( 'form-' + conditionModel.collection.formModel.get( 'id' ) ).request( 'get:fieldByKey', then.key );
			targetFieldModel.set( 'visible', false );
			targetFieldModel.trigger( 'change:value', targetFieldModel );
			nfRadio.channel( 'fields' ).request( 'remove:error', targetFieldModel.get( 'id' ), 'required-error' );
		},

		showField: function( conditionModel, then ) {
			var targetFieldModel = nfRadio.channel( 'form-' + conditionModel.collection.formModel.get( 'id' ) ).request( 'get:fieldByKey', then.key );
			targetFieldModel.set( 'visible', true );
			targetFieldModel.trigger( 'change:value', targetFieldModel );
		}
	});

	return controller;
} );