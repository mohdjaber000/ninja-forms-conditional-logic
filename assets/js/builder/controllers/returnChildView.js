/**
 * Returns the childview we need to use for our conditional logic form settings.
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [ 'views/conditionCollection' ], function( ConditionCollection ) {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			nfRadio.channel( 'cl_condition' ).reply( 'get:settingChildView', this.getChildView );
		},

		getChildView: function( settingModel ) {
			return ConditionCollection;
		}

	});

	return controller;
} );
