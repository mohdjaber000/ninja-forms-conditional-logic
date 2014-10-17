<?php
/**
 * Class for conditional trigger types. 
 * This is the parent class. it should be extended by specific trigger types
 *
 * @package     Ninja Forms - Conditional Logic
 * @subpackage  Classes/Triggers
 * @copyright   Copyright (c) 2014, WPNINJAS
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       1.2.8
*/

abstract class NF_CL_Trigger_Base {

	/**
	 * @var name - Store our trigger nicename.
	 */
	var $name = '';

	/**
	 * @var slug - Store our trigger slug.
	 */
	var $slug = '';

	/**
	 * @var comparison_operators - Store our comparison operators
	 */
	var $comparison_operators = array();

	/**
	 * Get things rolling
	 */
	function __construct() {
		$this->comparison_operators = array( 
			'==' 			=> __( 'Equal To', 'ninja-forms-conditionals' ),
			'!=' 			=> __( 'Not Equal To', 'ninja-forms-conditionals' ),
			'<' 			=> __( 'Less Than', 'ninja-forms-conditionals' ),
			'>'				=> __( 'Greater Than', 'ninja-forms-conditionals' ),
			'contains'		=> __( 'Contains', 'ninja-forms-conditionals' ),
			'notcontains'	=> __( 'Does Not Contain', 'ninja-forms-conditionals' ),
			'before'		=> __( 'Before', 'ninja-forms-conditionals' ),
			'after'			=> __( 'After', 'ninja-forms-conditionals' ),
		);
	}

	/**
	 * Process our conditional trigger
	 * 
	 * @since 1.2.8
	 * @return bool
	 */
	function compare() {
		// This space left intentionally blank.
	}


}