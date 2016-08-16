<?php

class NF_ConditionalLogic_Comparators_DateOn implements NF_ConditionalLogic_Comparator
{
    public function compare( $comparison, $value )
    {
        return ( $comparison->format( 'm/d/Y' ) == $value->format( 'm/d/Y' ) );
    }
}