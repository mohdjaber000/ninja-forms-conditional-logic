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
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:deleteWhen', this.deleteItem );
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:deleteThen', this.deleteItem );
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:deleteElse', this.deleteItem );
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:addWhen', this.addWhen );
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:addThen', this.addThen );
			this.listenTo( nfRadio.channel( 'conditions' ), 'click:addElse', this.addElse );
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

		deleteItem: function( e, itemModel ) {
			itemModel.collection.remove( itemModel );

			// Set our 'clean' status to false so that we get a notice to publish changes
			nfRadio.channel( 'app' ).request( 'update:setting', 'clean', false );
			nfRadio.channel( 'app' ).request( 'update:db' );
		},

		addWhen: function( e, conditionModel ) {
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
		},

		addElse: function( e, conditionModel ) {
			conditionModel.get( 'else' ).add( {} );

			// Set our 'clean' status to false so that we get a notice to publish changes
			nfRadio.channel( 'app' ).request( 'update:setting', 'clean', false );
			nfRadio.channel( 'app' ).request( 'update:db' );
		}

	});

	return controller;
} );
