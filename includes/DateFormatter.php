<?php if ( ! defined( 'ABSPATH' ) ) exit;

final class NF_ConditionalLogic_DateFormatter
{
    public static function js_to_php( $format )
    {
        $lookup = array(
            /** Day */
            'dddd' => 'l',
            'ddd' => 'D',
            'd'    => 'w',
            'DD' => 'd',
            'D'    => 'j',
            /** Month */
            'MMMM' => 'F',
            'MMM' => 'M',
            'MM'   => 'm',
            'M'    => 'n',
            /** Year */
            'YYYY' => 'Y',
            'YY'   => 'y'
        );

        foreach( $lookup as $search => $replace ){
            $format = str_replace( $search, $replace, $format );
        }
        return $format;
    }
}
