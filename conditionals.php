<?php
/*
Plugin Name: Ninja Forms - Conditionals
Plugin URI: http://wpninjas.com.com
Description: Conditional form logic add-on for Ninja Forms.
Version: 1.0.4
Author: The WP Ninjas
Author URI: http://wpninjas.com
*/

define("NINJA_FORMS_CON_DIR", WP_PLUGIN_DIR."/ninja-forms-conditionals");
define("NINJA_FORMS_CON_URL", plugins_url()."/ninja-forms-conditionals");
define("NINJA_FORMS_CON_VERSION", "1.0.4");

// this is the URL our updater / license checker pings. This should be the URL of the site with EDD installed
define( 'NINJA_FORMS_CON_EDD_SL_STORE_URL', 'http://wpninjas.com' ); // IMPORTANT: change the name of this constant to something unique to prevent conflicts with other plugins using this system

// the name of your product. This is the title of your product in EDD and should match the download title in EDD exactly
define( 'NINJA_FORMS_CON_EDD_SL_ITEM_NAME', 'Conditional Logic' ); // IMPORTANT: change the name of this constant to something unique to prevent conflicts with other plugins using this system

//Require EDD autoupdate file
if( !class_exists( 'EDD_SL_Plugin_Updater' ) ) {
	// load our custom updater if it doesn't already exist
	require_once(NINJA_FORMS_CON_DIR."/includes/EDD_SL_Plugin_Updater.php");
}

$plugin_settings = get_option( 'ninja_forms_settings' );

// retrieve our license key from the DB
if( isset( $plugin_settings['conditionals_license'] ) ){
	$conditionals_license = $plugin_settings['conditionals_license'];
}else{
	$conditionals_license = '';
}

// setup the updater
$edd_updater = new EDD_SL_Plugin_Updater( NINJA_FORMS_CON_EDD_SL_STORE_URL, __FILE__, array(
		'version' 	=> NINJA_FORMS_CON_VERSION, 		// current version number
		'license' 	=> $conditionals_license, 	// license key (used get_option above to retrieve from DB)
		'item_name'     => NINJA_FORMS_CON_EDD_SL_ITEM_NAME, 	// name of this plugin
		'author' 	=> 'WP Ninjas'  // author of this plugin
	)
);

require_once(NINJA_FORMS_CON_DIR."/includes/admin/register-edit-field-section.php");
require_once(NINJA_FORMS_CON_DIR."/includes/admin/scripts.php");
// require_once(NINJA_FORMS_CON_DIR."/includes/admin/after-import.php");
// require_once(NINJA_FORMS_CON_DIR."/includes/admin/license-option.php");
// require_once(NINJA_FORMS_CON_DIR."/includes/admin/view-subs-header-filter.php");

// require_once(NINJA_FORMS_CON_DIR."/includes/display/display-conditionals.php");
// require_once(NINJA_FORMS_CON_DIR."/includes/display/scripts.php");
// require_once(NINJA_FORMS_CON_DIR."/includes/display/field-filter.php");
// require_once(NINJA_FORMS_CON_DIR."/includes/display/processing/req-fields.php");

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