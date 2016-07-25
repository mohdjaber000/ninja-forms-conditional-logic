define( [], function() {
	var model = Backbone.Model.extend( {
		initialize: function( models, options ) {
			// Get our field model
			var fieldModel = nfRadio.channel( 'form-' + options.condition.collection.formModel.get( 'id' ) ).request( 'get:fieldByKey', this.get( 'key' ) );
			// When we change the value of our field, update our compare status.
			fieldModel.on( 'change:value', this.updateCompare, this );
			// When we keyup in our field, maybe update our compare status.
			this.listenTo( nfRadio.channel( 'field-' + fieldModel.get( 'id' ) ), 'keyup:field', this.maybeUpdateCompare );
			// Update our compare status.
			this.updateCompare( fieldModel );

			/*
			 * TODO: This should be moved to the show_field/hide_field file because it is specific to showing and hiding.
			 * Create a radio message here so that the specific JS file can hook into whenModel init.
			 */
			fieldModel.on( 'change:visible', this.updateCompare, this );
		},

		maybeUpdateCompare: function( el, fieldModel, keyCode ) {
			var fieldValue = jQuery( el ).val();
			this.updateCompare( fieldModel, null, fieldValue );
		},

		updateCompare: function( fieldModel, val, fieldValue ) {
			if ( _.isEmpty( fieldValue ) ) {
				fieldValue = fieldModel.get( 'value' );
			}
			// Check to see if the value of the field model value COMPARATOR the value of our when condition is true.
			var status = this.compareValues[ this.get( 'comparator' ) ]( fieldValue, this.get( 'value' ) );
			this.set( 'status', status );
			
			/*
			 * TODO: This should be moved to the show_field/hide_field file because it is specific to showing and hiding.
			 */
			if ( ! fieldModel.get( 'visible' ) ) {
				this.set( 'status', false );
			}			
		},

		compareValues: {
			'equal': function( a, b ) {
				return a == b;
			},
			'notequal': function( a, b ) {
				return a != b;
			},
			'contains': function( a, b ) {
				/*
				 * If our b value has quotes in it, we want to find that exact word or phrase.
				 */
				if ( b.indexOf( '"' ) >= 0 ) {
					b = b.replace( /['"]+/g, '' );
					return new RegExp("\\b" + b + "\\b").test( a );
				}
				return a.toLowerCase().indexOf( b.toLowerCase() ) >= 0; 
			},
			'greater': function( a, b ) {
				return parseFloat( a ) > parseFloat( b );
			},
			'less': function( a, b ) {
				return parseFloat( a ) < parseFloat( b );
			}
		} 
	} );
	
	return model;
} );