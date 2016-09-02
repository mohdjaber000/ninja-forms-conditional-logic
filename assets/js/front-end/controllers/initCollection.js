/**
 * Initialise condition collection
 * 
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [ 'models/conditionCollection' ], function( ConditionCollection ) {
	var controller = Marionette.Object.extend( {
		initialize: function( formModel ) {
			var collection = new ConditionCollection( formModel.get( 'conditions' ), { formModel: formModel } );
		}
	});

	return controller;
} );