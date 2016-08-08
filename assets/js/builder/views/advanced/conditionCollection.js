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
		},

        onRender: function() {
            if ( 0 == this.collection.length ) {
                this.collection.add();
            }
        },

        onBeforeDestroy: function() {
            if ( 0 == this.collection.length ) return;
            if ( '' == this.collection.models[0].get('key') ) {
                this.collection.reset();
            }
        }
	});

	return view;
} );
