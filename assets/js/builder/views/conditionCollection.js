/**
 * Collection view for our conditions
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [ 'views/conditionItem' ], function( ConditionItem ) {
	var view = Marionette.CollectionView.extend({
		childView: ConditionItem,

		initialize: function( options ) {
			this.collection = options.dataModel.get( 'conditions' );
		}
	});

	return view;
} );