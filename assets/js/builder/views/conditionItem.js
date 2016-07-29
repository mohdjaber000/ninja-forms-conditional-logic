/**
 * Layout view for our conditions
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [ 'views/andCollection', 'views/thenCollection' ], function( AndCollectionView, ThenCollectionView ) {
	var view = Marionette.LayoutView.extend({
		template: "#nf-tmpl-condition",
		regions: {
			'and': '.nf-and-region',
			'then': '.nf-then-region'
		},

		initialize: function() {
			/*
			 * When we change the "collapsed" attribute of our model, re-render.
			 */
			this.listenTo( this.model, 'change:collapsed', this.render );

			/*
			 * When our drawer closes, send out a radio message on our setting type channel.
			 */
			this.listenTo( nfRadio.channel( 'drawer' ), 'closed', this.drawerClosed );
		},

		onRender: function() {
			var whenDiv = jQuery( this.el ).find( '.nf-when' );
			this.and.show( new AndCollectionView( { collection: this.model.get( 'when' ), whenDiv: whenDiv, conditionModel: this.model } ) );
			if ( ! this.model.get( 'collapsed' ) ) {
				this.then.show( new ThenCollectionView( { collection: this.model.get( 'then' ) } ) );
			}
		},

		events: {
			'click .nf-delete-condition': 'clickDelete',
			'click .nf-collapse-condition': 'clickCollapse',
			'click .nf-add-and': 'clickAddAnd',
			'click .nf-add-then': 'clickAddThen'
		},

		clickDelete: function( e ) {
			nfRadio.channel( 'conditions' ).trigger( 'click:deleteCondition', e, this.model );
		},

		clickCollapse: function( e ) {
			nfRadio.channel( 'conditions' ).trigger( 'click:collapseCondition', e, this.model );
		},

		clickAddAnd: function( e ) {
			nfRadio.channel( 'conditions' ).trigger( 'click:addAnd', e, this.model );
		},

		clickAddThen: function( e ) {
			nfRadio.channel( 'conditions' ).trigger( 'click:addThen', e, this.model );
		}
	});

	return view;
} );