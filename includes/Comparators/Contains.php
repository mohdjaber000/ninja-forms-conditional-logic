<?php

class NF_ConditionalLogic_Comparators_Contains implements NF_ConditionalLogic_Comparator
{
    public function compare( $comparison, $value )
    {
        return ( false !== strpos( $comparison, $value ) );
    }
}