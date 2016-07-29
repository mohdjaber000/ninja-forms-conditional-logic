/**
 * Adds template helpers for the fields conditional logic setting type
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			this.listenTo( nfRadio.channel( 'conditions' ), 'init:model', this.addTemplateHelpers );
			this.listenTo( nfRadio.channel( 'conditions' ), 'init:thenModel', this.addTemplateHelpers );
			this.listenTo( nfRadio.channel( 'conditions' ), 'init:whenModel', this.addTemplateHelpers );
			this.listenTo( nfRadio.channel( 'conditions' ), 'init:elseModel', this.addTemplateHelpers );
			
		},

		addTemplateHelpers: function( model ) {
			model.set( 'renderFieldSelect', this.renderFieldSelect );
			model.set( 'renderComparatorSelect', this.renderComparatorSelect );
		},

		renderFieldSelect: function( currentValue ) {
			var fieldCollection = nfRadio.channel( 'fields' ).request( 'get:collection' );
			var calcCollection = nfRadio.channel( 'settings' ).request( 'get:setting', 'calculations' );
			/*
			 * Use a template to get our field select
			 */
			var template = _.template( jQuery( '#nf-tmpl-field-select' ).html() );
			return template( { calcCollection: calcCollection, fieldCollection: fieldCollection, currentValue: currentValue } );
		},

		renderComparatorSelect: function( comparator ) {
			/*
			 * Use a template to get our comparator select
			 */
			var template = _.template( jQuery( '#nf-tmpl-comparator-select' ).html() );
			return template( { comparator: comparator } );
		}
	});

	return controller;
} );
