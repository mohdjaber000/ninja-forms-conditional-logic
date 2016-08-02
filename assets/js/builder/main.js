var nfRadio = Backbone.Radio;

require( [ 'controllers/templateHelpers', 'controllers/returnChildView', 'models/conditionCollection', 'views/drawerHeader', 'controllers/newCondition', 'controllers/updateSettings', 'controllers/clickControls', 'controllers/undo', 'controllers/maybeModifyElse', 'controllers/coreFieldValues' ], function( TemplateHelpers, ReturnChildView, ConditionCollection, DrawerHeaderView, NewCondition, UpdateSettings, ClickControls, Undo, MaybeModifyElse, CoreFieldValues ) {

	var NFConditionalLogic = Marionette.Application.extend( {

		initialize: function( options ) {
			this.listenTo( nfRadio.channel( 'app' ), 'after:appStart', this.afterNFLoad );
		},

		onStart: function() {
			new TemplateHelpers();
			new ReturnChildView();
			new NewCondition();
			new UpdateSettings();
			new ClickControls();
			new Undo();
			new MaybeModifyElse();
			new CoreFieldValues();

			nfRadio.channel( 'conditional_logic' ).reply( 'get:drawerHeaderView', this.test, this );
		},

		afterNFLoad: function( app ) {
			/*
			 * Convert our form's "condition" setting into a collection.
			 */
			var conditions = nfRadio.channel( 'settings' ).request( 'get:setting', 'conditions' );

			if ( conditions && false === conditions instanceof Backbone.Collection ) {
				conditions = new ConditionCollection( conditions );
				nfRadio.channel( 'settings' ).request( 'update:setting', 'conditions', conditions, true );
			}
		},

		test: function() {
			return DrawerHeaderView;
		}
	} );

	var nfConditionalLogic = new NFConditionalLogic();
	nfConditionalLogic.start();
} );