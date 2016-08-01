/**
 * Item view for our condition then
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function( ) {
	var view = Marionette.ItemView.extend({
		template: "#nf-tmpl-then-item",

		events: {
			'change .setting': 'changeSetting',
			'click .nf-remove-then': 'clickRemove'
		},

		changeSetting: function( e ) {
			nfRadio.channel( 'conditions' ).trigger( 'change:setting', e, this.model )
		},

		clickRemove: function( e ) {
			nfRadio.channel( 'conditions' ).trigger( 'click:removeThen', e, this.model );
		}
	});

	return view;
} );