define( ['models/whenModel'], function( WhenModel ) {
	var collection = Backbone.Collection.extend( {
		model: WhenModel,

		initialize: function( models, options ) {
			
		}
	} );
	return collection;
} );