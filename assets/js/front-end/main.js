var nfRadio = Backbone.Radio;

require( [ 'controllers/initCollection', 'controllers/showHide', 'controllers/addRemoveOptions', 'controllers/changeValue', 'controllers/selectDeselect' ], function( InitCollection, ShowHide, AddRemoveOptions, ChangeValue, SelectDeselect ) {

	var NFConditionalLogic = Marionette.Application.extend( {

		initialize: function( options ) {
			this.listenTo( nfRadio.channel( 'form' ), 'loaded', this.initCollection );
		},

		initCollection: function( formModel ) {
			new ShowHide();
			new AddRemoveOptions();
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