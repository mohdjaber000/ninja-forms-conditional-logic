/**
 * Returns an object with each comparator we'd like to use.
 * This covers all the core field types.
 *
 * Add-ons can copy this code structure in order to get custom "comparators" for conditions.
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			nfRadio.channel( 'conditions-checkbox' ).reply( 'get:comparators', this.getCheckboxComparators );
			nfRadio.channel( 'conditions-list' ).reply( 'get:comparators', this.getListComparators );
			nfRadio.channel( 'conditions-date' ).reply( 'get:comparators', this.getDateComparators );
		},

		getCheckboxComparators: function( defaultComparators ) {
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

		getListComparators: function( defaultComparators ) {
			return {
				has: {
					label: 'Has Selected',
					value: 'contains'
				},

				hasnot: {
					label: 'Does Not Have Selected',
					value: 'notcontains'
				}
			}
		},

		getDateComparators: function( defaultComparators ) {
			return {
				before: {
					label: 'Before',
					value: 'date_before'
				},
				after: {
					label: 'After',
					value: 'date_after'
				},
				on: {
					label: 'On',
					value: 'date_on'
				}
			}
		},

	});

	return controller;
} );
