/**
 * Item view for our condition and
 *
 * @package Ninja Forms Conditional Logic
 * @copyright (c) 2016 WP Ninjas
 * @since 3.0
 */
define( [], function( ) {
	var view = Marionette.ItemView.extend({
		template: "#nf-tmpl-and-item",

		onRender: function() {
			// console.log( this.model );
		},
		
		events: {
			'change .setting': 'changeSetting',
			'click .nf-delete-and': 'clickDelete'
		},

		changeSetting: function( e ) {
			nfRadio.channel( 'conditions' ).trigger( 'change:setting', e, this.model )
		},

		clickDelete: function( e ) {
			nfRadio.channel( 'conditions' ).trigger( 'click:deleteAnd', e, this.model );
		}
	});

	return view;
} );