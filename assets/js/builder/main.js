var nfRadio = Backbone.Radio;

require( [ 'controllers/templateHelpers' ], function( TemplateHelpers ) {

	var NFLayouts = Marionette.Application.extend( {

		initialize: function( options ) {
			this.listenTo( nfRadio.channel( 'app' ), 'after:appStart', this.afterNFLoad );
		},

		onStart: function() {
			new TemplateHelpers();
		},

		afterNFLoad: function( app ) {
			// console.log( 'after NF load' );
		}
	} );

	var nfLayouts = new NFLayouts();
	nfLayouts.start();
} );