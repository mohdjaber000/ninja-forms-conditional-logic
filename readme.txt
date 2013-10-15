=== Ninja Forms - Conditionals Extension ===
Contributors: kstover, jameslaws
Donate link: http://ninjaforms.com
Tags: form, forms
Requires at least: 3.3
Tested up to: 3.5
Stable tag: 1.0.10

License: GPLv2 or later

== Description ==
The Ninja Forms Conditionals Extension allows you to create "smart" forms that can change dynamically based upon user input. Options can be added to dropdown lists based upon other input, or fields can be hidden or shown.

== Screenshots ==

To see up to date screenshots, visit [NinjaForms.com](http://ninjaforms.com).

== Installation ==

This section describes how to install the plugin and get it working.

1. Upload the `ninja-forms` directory to your `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Visit the 'Forms' menu item in your admin sidebar
4. When you create a form, you can now add conditionals on the field edit page.

== Use ==

For help and video tutorials, please visit our website: [Ninja Forms Documentation](http://ninjaforms.com/documentation/intro/)

== Changelog ==

= 1.0.10 =

*Bugs:*

* Fixed a bug that prevented calculations from working properly when a field that the calculation was based upon was hidden with conditional logic.

= 1.0.9 =

*Changes:*

* Added a "visible" data attribute.
* Moved functions from Ninja Forms core to this extension.

*Bugs:*

* Fixed several bugs related to using calculation fields and conditionals.

= 1.0.8 =

*Changes:*

* Changed the license and auto-update system to the one available in Ninja Forms 2.2.47.

= 1.0.7 =

*Changes:*

* Changed references to wpninjas.com to ninjaforms.com.

= 1.0.6 =

*Bugs:*

* Fixed a bug that prevented conditionals from working properly in some installs.

= 1.0.5 =

* Fixed a bug that caused Conditionals to break calculation fields if they were hidden.

= 1.0.4 =

*Changes:*

* Updates for compatibility with WordPress 3.6

= 1.0.3 =

*Bugs:*

* Fixed a bug that prevented conditionals from working properly with calculation fields.

= 1.0.2 =

*Bugs:*

* Fixed a bug that caused conditionals with multiple criteria to fail when connected with the "All" parameter.

= 1.0.1 =

*Changes:*

* The Conditionals Extension can now be used with the Multi-Part Extension to show or hide entire pages.

= 1.0 =

*Bugs:*

* Fixed a bug that was causing dropdown list fields to work improperly with Conditional Logic.

= 0.9 =

*Bugs:*

* Fixed a bug that prevented conditionals from working properly with multi-checkbox lists and multi-radio button lists.

= 0.8 =

*Changes:*

* Changed the display JS slightly to be more efficient.

= 0.7 =

*Bugs:*

* Conditional fields should now behave as expected when editing user submissions.

= 0.6 =

*Bugs:*

* Fixed a bug that prevented conditionals from working properly with checkbox and radio list types.

= 0.5 =

*Changes:*

* Moved a JS function from ninja-forms-conditionals-admin.js to the ninja-forms-admin.js.

= 0.4 =
* Fixed a bug that prevented multiple forms with conditionals from being placed on the same page.

= 0.3 =
* Various bug fixes including:
* Adding multiple forms with conditions to a single page will now work normally.

= 0.2 =
* Various bug fixes.
* Changed the way that javascript and css files are loaded in extensions.