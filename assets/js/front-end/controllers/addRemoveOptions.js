/**
 * Handle adding or removing an option from our list
 * 
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			nfRadio.channel( 'nf_cl_add_option' ).reply( 'pass', this.addOption, this );
			nfRadio.channel( 'nf_cl_add_option' ).reply( 'fail', this.removeOption, this );

			nfRadio.channel( 'nf_cl_remove_option' ).reply( 'pass', this.removeOption, this );
			nfRadio.channel( 'nf_cl_remove_option' ).reply( 'fail', this.addOption, this );
		},

		addOption: function( conditionModel, then ) {
			var targetFieldModel = nfRadio.channel( 'form-' + conditionModel.collection.formModel.get( 'id' ) ).request( 'get:fieldByKey', then.key );
			var options = targetFieldModel.get( 'options' );
			options.push( then.option );
			targetFieldModel.set( 'options', options );
			targetFieldModel.trigger( 'reRender', targetFieldModel );
		},

		removeOption: function( conditionModel, then ) {
			var targetFieldModel = nfRadio.channel( 'form-' + conditionModel.collection.formModel.get( 'id' ) ).request( 'get:fieldByKey', then.key );
			var options = targetFieldModel.get( 'options' );
			options = _.without( options, _.findWhere( options, then.option ) );
			targetFieldModel.set( 'options', options );
			targetFieldModel.trigger( 'reRender', true );
		}
	});

	return controller;
} );