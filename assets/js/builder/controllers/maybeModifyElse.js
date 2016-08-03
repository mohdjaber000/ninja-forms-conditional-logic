/**
 * Listen to changes of any "then" conditions.
 * 
 * If the value is 'show_field' or 'hide_field' and we have not yet added an "opposite," set an "opposite" action in the "else" section.
 * 
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [ 'views/conditionCollection' ], function( ConditionCollection ) {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			this.listenTo( nfRadio.channel( 'conditions' ), 'change:then', this.maybeAddElse );
		},

		maybeAddElse: function( e, thenModel ) {
			var opposite = false;
			/*
			 * TODO: Make this more dynamic.
			 * Currently, show and hide are hard-coded here.
			 */
			var trigger = jQuery( e.target ).val();
			if ( 'show_field' == trigger ) {
				opposite = 'hide_field';
			} else if ( 'hide_field' == trigger ) {
				opposite = 'show_field';
			}

			if ( opposite ) {
				var conditionModel = thenModel.collection.options.conditionModel
				if( 'undefined' == typeof conditionModel.get( 'else' ).findWhere( { 'key': thenModel.get( 'key' ), 'trigger': opposite } ) ) {
					conditionModel.get( 'else' ).add( { key: thenModel.get( 'key' ), trigger: opposite } );
				}
			}

		}
	});

	return controller;
} );
