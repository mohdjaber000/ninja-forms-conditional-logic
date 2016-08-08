/**
 * Collection view for our when collection
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [ 'views/actions/whenItem' ], function( WhenItem ) {
	var view = Marionette.CollectionView.extend({
		childView: WhenItem,

		initialize: function( options ) {

		}

	} );

	return view;
} );