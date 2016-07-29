/**
 * Conditon Model
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [ 'models/whenCollection', 'models/thenCollection' ], function( WhenCollection, ThenCollection ) {
	var model = Backbone.Model.extend( {
		defaults: {
			collapsed: false
		},

		initialize: function() {
			this.set( 'when', new WhenCollection( this.get( 'when' ) ) );
			this.set( 'then', new ThenCollection( this.get( 'then' ) ) );

			nfRadio.channel( 'conditions' ).trigger( 'init:model', this );
		}
	} );
	
	return model;
} );