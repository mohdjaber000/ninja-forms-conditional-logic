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
			model.set( 'renderKeySelect', this.renderKeySelect );
			model.set( 'renderComparators', this.renderComparators );
			model.set( 'renderTriggers', this.renderTriggers );
			model.set( 'renderWhenValue', this.renderWhenValue );
			model.set( 'renderItemValue', this.renderItemValue );
		},

		renderKeySelect: function( currentValue, modelType ) {
			var fieldCollection = nfRadio.channel( 'fields' ).request( 'get:collection' );
			var calcCollection = nfRadio.channel( 'settings' ).request( 'get:setting', 'calculations' );
			var currentDomain = nfRadio.channel( 'app' ).request( 'get:currentDomain' );
			/*
			 * Use a template to get our field select
			 */
			var template = _.template( jQuery( '#nf-tmpl-cl-key-select' ).html() );
			return template( { modelType: modelType, calcCollection: calcCollection, fieldCollection: fieldCollection, currentValue: currentValue, currentDomain: currentDomain } );
		},

		renderComparators: function( type, key, currentComparator ) {
			var defaultComparators = {
				equal: {
					label: 'Equals',
					value: 'equal'
				},

				notequal: {
					label: 'Does Not Equal',
					value: 'notequal'
				},

				contains: {
					label: 'Contains',
					value: 'contains'
				},

				notcontains: {
					label: 'Does Not Contain',
					value: 'notcontains'
				},

				greater: {
					label: 'Greater Than',
					value: 'greater'
				},

				less: {
					label: 'Less Than',
					value: 'less'
				}
			};

			if ( key ) {
				/*
				 * This could be a field or a calculation key. If it's a calc key, get the calc model.
				 */
				if ( 'calc' == type ) {
					var comparators = _.omit( defaultComparators, 'contains', 'notcontains' );
					_.extend( comparators, {
						lessequal: {
							label: 'Less Than or Equal',
							value: 'lessequal'
						},

						greaterequal: {
							label: 'Greater Than or Equal',
							value: 'greaterequal'
						}
					} );
				} else {
					/*
					 * Send out a radio request for an html value on a channel based upon the field type.
					 *
					 * Get our field by key
					 * Get our field type model
					 *
					 * Send out a message on the type channel
					 * If we don't get a response, send a message out on the parent type channel
					 */
					var fieldModel = nfRadio.channel( 'fields' ).request( 'get:field', key );

					if( fieldModel ) {
						var comparators = nfRadio.channel('conditions-' + fieldModel.get('type')).request('get:comparators', defaultComparators);
						if (!comparators) {
							var typeModel = nfRadio.channel('fields').request('get:type', fieldModel.get('type'));
							comparators = nfRadio.channel('conditions-' + typeModel.get('parentType')).request('get:comparators', defaultComparators) || defaultComparators;
						}
					} else {
						var comparators = defaultComparators;
					}
				}
			} else {
				var comparators = defaultComparators;
			}

			/*
			 * Use a template to get our comparator select
			 */
			var template = _.template( jQuery( '#nf-tmpl-cl-comparators' ).html() );
			return template( { comparators: comparators, currentComparator: currentComparator } );
		},

		renderTriggers: function( key, currentTrigger, value ) {
			var defaultTriggers = {
				show_field: {
					label: 'Show Field',
					value: 'show_field'
				},

				hide_field: {
					label: 'Hide Field',
					value: 'hide_field'
				},

				change_value: {
					label: 'Change Value',
					value: 'change_value'
				}
			};

			if ( key ) {
				/*
				 * Send out a radio request for an html value on a channel based upon the field type.
				 *
				 * Get our field by key
				 * Get our field type model
				 *
				 * Send out a message on the type channel
				 * If we don't get a response, send a message out on the parent type channel
				 */
				var fieldModel = nfRadio.channel( 'fields' ).request( 'get:field', key );
				var typeModel = nfRadio.channel( 'fields' ).request( 'get:type', fieldModel.get( 'type' ) );
				
				var triggers = nfRadio.channel( 'conditions-' + fieldModel.get( 'type' ) ).request( 'get:triggers', defaultTriggers );
				if ( ! triggers ) {
					triggers = nfRadio.channel( 'conditions-' + typeModel.get( 'parentType' ) ).request( 'get:triggers', defaultTriggers ) || defaultTriggers;
				}
			} else {
				var triggers = defaultTriggers;
			}


			/*
			 * Use a template to get our comparator select
			 */
			var template = _.template( jQuery( '#nf-tmpl-cl-triggers' ).html() );
			return template( { triggers: triggers, currentTrigger: currentTrigger } );
		},

		renderWhenValue: function( type, key, comparator, value ) {
			/*
			 * Use a template to get our value
			 */
			var template = _.template( jQuery( '#nf-tmpl-cl-value-default' ).html() );
			var defaultHTML = template( { value: value } );

			/*
			 * If we have a key and it's not a calc, get our field type based HTML.
			 */
			if ( key && 'calc' != type ) {
				/*
				 * Send out a radio request for an html value on a channel based upon the field type.
				 *
				 * Get our field by key
				 * Get our field type model
				 *
				 * Send out a message on the type channel
				 * If we don't get a response, send a message out on the parent type channel
				 */
				var fieldModel = nfRadio.channel( 'fields' ).request( 'get:field', key );

				if( fieldModel ) {
					var html = nfRadio.channel('conditions-' + fieldModel.get('type')).request('get:valueInput', key, comparator, value);
					if (!html) {
						var typeModel = nfRadio.channel('fields').request('get:type', fieldModel.get('type'));
						html = nfRadio.channel('conditions-' + typeModel.get('parentType')).request('get:valueInput', key, comparator, value) || defaultHTML;
					}
				} else {
					html = defaultHTML;
				}
			} else {
				var html = defaultHTML;
			}
			
			return html;
		},

		renderItemValue: function( key, trigger, value ) {
			/*
			 * Use a template to get our value
			 *
			 * TODO: This should be much more dynamic.
			 * At the moment, we manually check to see if we are doing a "change_value" or similar trigger.
			 */
			if ( trigger != 'change_value'
				&& trigger != 'select_option'
				&& trigger != 'deselect_option'
				&& trigger != 'show_option'
				&& trigger != 'hide_option' 
			) {
				return '';
			}

			var template = _.template( jQuery( '#nf-tmpl-cl-value-default' ).html() );
			var defaultHTML = template( { value: value } );

			if ( key ) {
				/*
				 * Send out a radio request for an html value on a channel based upon the field type.
				 *
				 * Get our field by key
				 * Get our field type model
				 *
				 * Send out a message on the type channel
				 * If we don't get a response, send a message out on the parent type channel
				 */
				var fieldModel = nfRadio.channel( 'fields' ).request( 'get:field', key );
				var typeModel = nfRadio.channel( 'fields' ).request( 'get:type', fieldModel.get( 'type' ) );
				
				var html = nfRadio.channel( 'conditions-' + fieldModel.get( 'type' ) ).request( 'get:valueInput', key, trigger, value );
				if ( ! html ) {
					html = nfRadio.channel( 'conditions-' + typeModel.get( 'parentType' ) ).request( 'get:valueInput', key, trigger, value ) || defaultHTML;
				}
			} else {
				var html = defaultHTML;
			}

			return html;
		}
	});

	return controller;
} );
