/**
 * Adds a new condition when the add new button is clicked.
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [ 'models/whenCollection', 'models/whenModel' ], function( WhenCollection, WhenModel ) {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:addNew', this.addNew );
		},

		addNew: function( e ) {
			var conditionCollection = nfRadio.channel( 'settings' ).request( 'get:setting', 'conditions' );
			conditionCollection.add( { when: [ {} ], then: [ {} ] } );

			// Set our 'clean' status to false so that we get a notice to publish changes
			nfRadio.channel( 'app' ).request( 'update:setting', 'clean', false );
			nfRadio.channel( 'app' ).request( 'update:db' );
		}

	});

	return controller;
} );
