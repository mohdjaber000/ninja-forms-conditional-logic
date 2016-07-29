/**
 * Updates condition settings on field change or drawer close
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			this.listenTo( nfRadio.channel( 'conditions' ), 'change:setting', this.updateSetting );
		},

		updateSetting: function( e, dataModel ) {
			var value = jQuery( e.target ).val();
			var id = jQuery( e.target ).data( 'id' );
			dataModel.set( id, value );

			// Set our 'clean' status to false so that we get a notice to publish changes
			nfRadio.channel( 'app' ).request( 'update:setting', 'clean', false );
			nfRadio.channel( 'app' ).request( 'update:db' );
		}

	});

	return controller;
} );
