<?php
/*
Plugin Name: Ninja Forms - Conditionals
Plugin URI: http://ninjaforms.com
Description: Conditional form logic add-on for Ninja Forms.
Version: 1.2.1
Author: The WP Ninjas
Author URI: http://ninjaforms.com
Text Domain: ninja-forms-conditionals
Domain Path: /languages/
*/

define("NINJA_FORMS_CON_DIR", WP_PLUGIN_DIR."/".basename( dirname( __FILE__ ) ) );
define("NINJA_FORMS_CON_URL", plugins_url()."/".basename( dirname( __FILE__ ) ) );
define("NINJA_FORMS_CON_VERSION", "1.2.1");

function ninja_forms_conditionals_setup_license() {
  if ( class_exists( 'NF_Extension_Updater' ) ) {
    $NF_Extension_Updater = new NF_Extension_Updater( 'Conditional Logic', NINJA_FORMS_CON_VERSION, 'WP Ninjas', __FILE__, 'conditionals' );
  }
}

add_action( 'admin_init', 'ninja_forms_conditionals_setup_license' );

/**
 * Load translations for add-on.
 * First, look in WP_LANG_DIR subfolder, then fallback to add-on plugin folder.
 */
function ninja_forms_conditionals_load_translations() {

	/** Set our unique textdomain string */
	$textdomain = 'ninja-forms-conditionals';

	/** The 'plugin_locale' filter is also used by default in load_plugin_textdomain() */
	$locale = apply_filters( 'plugin_locale', get_locale(), $textdomain );

	/** Set filter for WordPress languages directory */
	$wp_lang_dir = apply_filters(
		'ninja_forms_conditionals_wp_lang_dir',
		trailingslashit( WP_LANG_DIR ) . 'ninja-forms-conditionals/' . $textdomain . '-' . $locale . '.mo'
	);

	/** Translations: First, look in WordPress' "languages" folder = custom & update-secure! */
	load_textdomain( $textdomain, $wp_lang_dir );

	/** Translations: Secondly, look in plugin's "lang" folder = default */
	$plugin_dir = trailingslashit( basename( dirname( __FILE__ ) ) );
	$lang_dir = apply_filters( 'ninja_forms_conditionals_lang_dir', $plugin_dir . 'languages/' );
	load_plugin_textdomain( $textdomain, FALSE, $lang_dir );

}
add_action( 'plugins_loaded', 'ninja_forms_conditionals_load_translations' );

require_once(NINJA_FORMS_CON_DIR."/includes/admin/ajax.php");
require_once(NINJA_FORMS_CON_DIR."/includes/admin/register-edit-field-section.php");
require_once(NINJA_FORMS_CON_DIR."/includes/admin/scripts.php"); 
require_once(NINJA_FORMS_CON_DIR."/includes/admin/after-import.php");
require_once(NINJA_FORMS_CON_DIR."/includes/admin/view-subs-header-filter.php");

require_once(NINJA_FORMS_CON_DIR."/includes/display/display-conditionals.php");
require_once(NINJA_FORMS_CON_DIR."/includes/display/scripts.php");
require_once(NINJA_FORMS_CON_DIR."/includes/display/field-filter.php");
require_once(NINJA_FORMS_CON_DIR."/includes/display/field-class-filter.php");
require_once(NINJA_FORMS_CON_DIR."/includes/display/processing/req-fields.php");

function ninja_forms_conditional_compare($param1, $param2, $operator){
	switch($operator){
		case "==":
			return $param1 == $param2;
		case "!=":
			//return true;
			return $param1 != $param2;
		case "<":
			return $param1 < $param2;
		case ">":
			return $param1 > $param2;
	}
}