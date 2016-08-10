<?php

final class NF_ConditionalLogic_Conversion
{
	public $known_keys = array();
	
	public $fields = array();
	public $conditions = array();

	public $current_id = 0;
	public $current_field;

    public function __construct()
    {
        add_filter( 'ninja_forms_after_upgrade_settings', array( $this, 'upgrade_field_settings' ) );
    }

    function upgrade_field_settings( $form_data )
    {
    	/*
	     * Create a copy of our fields array that we can destroy with impunity.
	     */
	    $fields = $form_data[ 'fields' ];
	    $this->fields = $form_data[ 'fields' ];

	    $all_fields = $this->extract_conditions( $fields, array() );

	    $form_data[ 'fields' ] = $all_fields;
	    $form_data[ 'settings' ][ 'conditions' ] = $this->conditions;

	    // echo "<pre>";
	    // print_r( $this->conditions );
	    // echo "</pre>";
	    // die();

	    return $form_data;
    }

    /**
	 * Rather than loop through our array, we'll use a recursive function to update everything.
	 * @since  3.0
	 * @param  array  $fields     fields array that gets modified as we recurse.
	 * @param  array  $conditions array of conditions.
	 * @param  array  $all_fields array of fields.
	 * @return array
	 */
	function extract_conditions( $fields, $conditions, $all_fields )
	{
	    /*
	     * Pop the first field off of our array and check to see if it has any conditions.
	     */
	    $this->current_field = array_shift( $fields );

	    if ( isset ( $this->current_field[ 'conditional' ] ) && ! empty( $this->current_field[ 'conditional' ] ) ) {
	        /*
	         * If we have conditions, add them to the new condition array we are building.
	         */
	        array_walk( $this->current_field[ 'conditional' ], array( $this, 'walk_conditions' ) );
	    }

	    /*
	     * Remove the conditional settings from this field.
	     */
	    unset( $field[ 'conditional' ] );

	    /*
	     * Add our field to our all fields var.
	     */
	    $all_fields[] = $this->current_field;
	    $this->current_field = array();

	    /*
	     * If there aren't any more fields, we are at the end of our array.
	     * return our conditions and all fields vars.
	     */
	    if ( 0 == count( $fields ) ) {
	        return $all_fields;
	    }

	    /*
	     * Recurse.
	     */
	    return $this->extract_conditions( $fields, $conditions, $all_fields );
	}

	/**
	 * Step through each field condition and update our $this->conditions with each.
	 * 
	 * @since  3.0
	 * @param  array  	$field_condition  	2.9.x Field Condition
	 * @param  int  	$index              array index
	 * @return void
	 */
	function walk_conditions( $field_condition )
	{
		/*
		 * Convert criteria to the 'when' statement of our condition.
		 */
		$when = $this->extract_when( $field_condition[ 'cr' ], array(), $field_condition[ 'connector' ] );
		/*
		 * Get our then and possibly else statements.
		 */
		$tmp = $this->extract_then_else( $field_condition );
		$then = $tmp[ 'then' ];
		$else = $tmp[ 'else' ];

		/*
		 * Check to see if this when statement exists already.
		 */
		$condition_index = $this->find_when( $when, $this->conditions );

		/*
		 * If it does, add this field's then/else.
		 *
		 * If it doesn't, add a new condition using this field's when/then/else.
		 */
		if ( false !== $condition_index ) {
			$this->conditions[ $condition_index ][ 'then' ][] = $then;
			if ( ! empty ( $else ) ) {
				$this->conditions[ $condition_index ][ 'else' ][] = $else;
			}
		} else {
			$this->conditions[] = array(
				'when' 			=> $when,
				'then' 			=> array( $then	),
				'else'			=> array( $else ),
			);
		}
		
	}

	/**
	 * Returns a 3.0 formatted array from 2.9.x criteria.
	 * 
	 * @since  3.0
	 * @param  array  	$cr_array  	2.9.x Criteria Array
	 * @param  array  	$when      	Used to create a mult-dimensional when array
	 * @param  string  	$connector 	2.9.x connector var
	 * @return array
	 */
	function extract_when( $cr_array, $when, $connector )
	{
		$cr = array_shift( $cr_array );
		/*
		 * Replace our field target with the appropriate key
		 */
		$cr[ 'field' ] = $this->get_key( $cr[ 'field' ] );
		
		$when[] = array(
			'connector'		=> strtoupper( $connector ),
			'key'			=> $cr[ 'field' ],
			'comparator'	=> $this->convert_comparator( $cr[ 'operator' ] ),
			'value'			=> $this->convert_value( $cr[ 'value' ] ),
		);
	
		if ( 0 == count( $cr_array ) ) {
			/*
			 * Return our when array
			 */
			return $when;
		}

		/*
		 * Recurse
		 */
		return $this->extract_when( $cr_array, $when, $connector );
	}

	/**
	 * Return 3.0 formatted then/else arrays.
	 * 
	 * @since  3.0
	 * @param  array  	$condition 		2.9.x formatted condition array
	 * @return array             		3.0 formatted then/else
	 */
	function extract_then_else( $condition )
	{
		/*
		 * We have new names for some of our actions.
		 */
		switch( $condition[ 'action' ] ) {
			case 'show':
				$trigger = 'show_field';
				$else_trigger = 'hide_field';
				break;
			case 'hide':
				$trigger = 'hide_field';
				$else_trigger = 'show_field';
				break;
			case 'add_value':
				$trigger = $this->convert_trigger( $condition );
				$else_trigger = 'hide_option';
				break;
			case 'remove_value':
				$trigger = $this->convert_trigger( $Condition );
				$else_trigger = 'show_option';
			default:
				$trigger = $condition[ 'action' ];
				$else_trigger = false;
				break;
		}

		$value = $this->convert_value( $condition[ 'value' ] );

		$then = array( 'key' => $this->current_field[ 'key' ], 'trigger' => $trigger, 'value' => $value );

		if ( $else_trigger ) {
			$else = array( 'key' => $this->current_field[ 'key' ], 'trigger' => $else_trigger, 'value' => $value );
		} else {
			$else = array();
		}

		return array( 'then' => $then, 'else' => $else );
	
	}

	/**
	 * Search $conditions array for $when
	 * 
	 * @since  3.0
	 * @param  array  		$when       	Needle
	 * @param  array  		$conditions 	Haystack
	 * @return int/bool              		Index or Boolean
	 */
	function find_when( $when, $conditions )
	{
		foreach( $conditions as $index => $condition ) {
			if ( $condition[ 'when' ] == $when ) {
				return $index;
			}
		}
		
		return false;
	}

	/**
	 * Get our 3.0 field key from our 2.9.x field ID
	 * 
	 * @since  3.0
	 * @param  int  	$id 	2.9.x field ID
	 * @return string
	 */
	function get_key( $id )
	{
		return ( isset( $this->known_keys[ $id ] ) ) ? $this->known_keys[ $id ] : $this->find_key( $id );
	}

	/**
	 * Search for a field key by ID
	 * 
	 * @since  3.0
	 * @param  int  	$id 	2.9.x field ID
	 * @return string
	 */
	function find_key( $id )
	{
		$this->current_id = $id;
		$field = array_shift( array_filter( $this->fields, array( $this, 'filter_by_id' ) ) );
		$this->current_id = 0;
		$this->known_keys[ $id ] = $field[ 'key' ];
		return isset( $field[ 'key' ] ) ? $field[ 'key' ] : false;
	}

	/**
	 * Filter function used by the array_filter call inside find_key
	 * 
	 * @since  3.0
	 * @param  array  	$val 	field array
	 * @return bool
	 */
	function filter_by_id( $val )
	{
		return $val[ 'id' ] == $this->current_id;
	}

	/**
	 * Convert 2.9.x comparators to 3.0 format.
	 * 
	 * @since  3.0
	 * @param  string  	$comparator 		2.9.x format comparator
	 * @return string
	 */
	function convert_comparator( $comparator )
	{
		switch ( $comparator ) {
			case '==':
				return 'equal';
			case '!=':
				return 'notequal';
			default:
				return $comparator;
		}
	}

	/**
	 * Some of our values, like checkboxes, should be 1 or 0 instead of checked or unchecked.
	 * 
	 * @since  3.0
	 * @param  mixed  	$value
	 * @return mixed
	 */
	function convert_value( $value )
	{
		switch( $value ) {
			case 'checked':
				$value = 1;
				break;
			case 'unchecked':
				$value = 0;
				break;
		}

		return $value;
	}

	/**
	 * Some actions, like "change_value" for list fields need to be converted to new triggers.
	 * @since  3.0
	 * @param  string  $action 2.9.x action
	 * @return string          3.0 trigger
	 */
	function convert_trigger( &$condition ) {
		if (
			'listselect' 	!= $this->current_field[ 'type' ] &&
			'listradio'  	!= $this->current_field[ 'type' ] &&
			'listcheckbox'	!= $this->current_field[ 'type' ]
		) {
			return $condition[ 'action' ];
		}

		switch( $condition[ 'action' ] ) {
			case 'change_value':
				return 'select_option';
			case 'add_value':
				$this->current_field[ 'options' ][] = array(
					'label' 	=> $condition[ 'value' ][ 'label' ],
					'value'		=> $condition[ 'value' ][ 'label' ],
					'calc'		=> $condition[ 'value' ][ 'calc' ],
					'selected'	=> $condition[ 'value' ][ 'selected' ]
				);
				$condition[ 'value' ] = $condition[ 'value' ][ 'label' ];
				return 'show_option';
			case 'remove_value':
				return 'hide_option';
		}
	}
}

new NF_ConditionalLogic_Conversion();