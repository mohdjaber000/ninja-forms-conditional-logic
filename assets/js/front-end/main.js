var nfRadio = Backbone.Radio;

require( [ 'controllers/initCollection', 'controllers/showHide', 'controllers/showHideOption', 'controllers/changeValue', 'controllers/selectDeselect' ], function( InitCollection, ShowHide, ShowHideOption, ChangeValue, SelectDeselect ) {

	var NFConditionalLogic = Marionette.Application.extend( {

		initialize: function( options ) {
			this.listenTo( nfRadio.channel( 'form' ), 'after:loaded', this.loadControllers );
		},

		loadControllers: function( formModel ) {
			new ShowHide();
			new ShowHideOption();
			new ChangeValue();
			new SelectDeselect();
			new InitCollection( formModel );
		},

		onStart: function() {
			
		}
	} );

	var nfConditionalLogic = new NFConditionalLogic();
	nfConditionalLogic.start();
} );