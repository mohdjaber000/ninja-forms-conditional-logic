/**
 * Listens for clicks on our different condition controls
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:deleteCondition', this.deleteCondition );
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:collapseCondition', this.collapseCondition );
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:deleteAnd', this.deleteAnd );
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:deleteThen', this.deleteAnd );
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:addAnd', this.addAnd );
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:addThen', this.addThen );
		},

		deleteCondition: function( e, conditionModel ) {
			conditionModel.collection.remove( conditionModel );

			// Set our 'clean' status to false so that we get a notice to publish changes
			nfRadio.channel( 'app' ).request( 'update:setting', 'clean', false );
			nfRadio.channel( 'app' ).request( 'update:db' );
		},

		collapseCondition: function( e, conditionModel ) {
			conditionModel.set( 'collapsed', ! conditionModel.get( 'collapsed' ) );

			// Set our 'clean' status to false so that we get a notice to publish changes
			nfRadio.channel( 'app' ).request( 'update:setting', 'clean', false );
			nfRadio.channel( 'app' ).request( 'update:db' );
		},

		deleteAnd: function( e, andModel ) {
			andModel.collection.remove( andModel );

			// Set our 'clean' status to false so that we get a notice to publish changes
			nfRadio.channel( 'app' ).request( 'update:setting', 'clean', false );
			nfRadio.channel( 'app' ).request( 'update:db' );
		},

		deleteThen: function( e, thenModel ) {
			thenModel.collection.remove( thenModel );

			// Set our 'clean' status to false so that we get a notice to publish changes
			nfRadio.channel( 'app' ).request( 'update:setting', 'clean', false );
			nfRadio.channel( 'app' ).request( 'update:db' );
		},

		addAnd: function( e, conditionModel ) {
			conditionModel.get( 'when' ).add( {} );

			// Set our 'clean' status to false so that we get a notice to publish changes
			nfRadio.channel( 'app' ).request( 'update:setting', 'clean', false );
			nfRadio.channel( 'app' ).request( 'update:db' );
		},

		addThen: function( e, conditionModel ) {
			conditionModel.get( 'then' ).add( {} );

			// Set our 'clean' status to false so that we get a notice to publish changes
			nfRadio.channel( 'app' ).request( 'update:setting', 'clean', false );
			nfRadio.channel( 'app' ).request( 'update:db' );
		}

	});

	return controller;
} );
