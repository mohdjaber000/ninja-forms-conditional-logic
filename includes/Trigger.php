<?php

interface NF_ConditionalLogic_Trigger
{
    public function process( NF_Database_Models_Field &$field );
}