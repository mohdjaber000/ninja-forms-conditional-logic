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
		},

		getCheckboxComparators: function( defaultComparators ) {
			return {
				is: {
					label: nfcli18n.coreComparatorsIs,
					value: 'equal'
				},

				isnot: {
					label: nfcli18n.coreComparatorsIsNot,
					value: 'notequal'
				}
			}
		},

		getListComparators: function( defaultComparators ) {
			return {
				has: {
					label: nfcli18n.coreComparatorsHasSelected,
					value: 'contains'
				},

				hasnot: {
					label: nfcli18n.coreComparatorsDoesNotHaveSelected,
					value: 'notcontains'
				}
			}
		},


	});

	return controller;
} );
