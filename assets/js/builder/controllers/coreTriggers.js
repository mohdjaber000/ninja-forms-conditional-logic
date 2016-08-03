/**
 * Returns an object with each trigger we'd like to use.
 * This covers all the core field types.
 *
 * Add-ons can copy this code structure in order to get custom "triggers" for conditions.
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			nfRadio.channel( 'conditions-checkbox' ).reply( 'get:triggers', this.getCheckboxTriggers );
			nfRadio.channel( 'conditions-list' ).reply( 'get:triggers', this.getListTriggers );
		},

		getCheckboxTriggers: function( defaultTriggers ) {
			return {
				is: {
					label: 'Is',
					value: 'equal'
				},

				isnot: {
					label: 'Is Not',
					value: 'notequal'
				}
			}
		},

		getListTriggers: function( defaultTriggers ) {
			var triggers = _.extend( defaultTriggers, {
				select_option: {
					label: 'Select Option',
					value: 'select_option'
				},

				deselect_option: {
					label: 'De-Select Option',
					value: 'deselect_option'
				},

				show_option: {
					label: 'Show Option',
					value: 'show_option'
				},

				hide_option: {
					label: 'Hide Option',
					value: 'hide_option'
				}
			} );

			var triggers = _.omit( defaultTriggers, 'change_value' );

			return triggers;
		},


	});

	return controller;
} );