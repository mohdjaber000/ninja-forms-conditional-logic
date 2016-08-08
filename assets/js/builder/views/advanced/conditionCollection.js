/**
 * Collection view for our conditions
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [ 'views/advanced/conditionItem' ], function( conditionItem ) {
	var view = Marionette.CollectionView.extend({
		childView: conditionItem,

		initialize: function( options ) {
			this.collection = options.dataModel.get( 'conditions' );
		}
	});

	return view;
} );