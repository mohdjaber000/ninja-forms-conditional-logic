<?php

class NF_ConditionalLogic_Comparators_DateEquals implements NF_ConditionalLogic_Comparator
{
    public function compare( $comparison, $value, $field )
    {
        $format = NF_ConditionalLogic_DateFormatter::js_to_php( $field->get_setting( 'date_format' ) );
        $compareDate = DateTime::createFromFormat( $format, $comparison );
        $valueDate = DateTime::createFromFormat( $format, $value );
        return $compareDate->getTimestamp() == $valueDate->getTimestamp();
    }
}
