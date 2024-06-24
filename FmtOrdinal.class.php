<?php
/* vim: set expandtab tabstop=4 shiftwidth=4: */
// +--------------------------------------------------------+
// | PHP version 5.x                                        |
// +--------------------------------------------------------+
// | Copyright : Song Hyo-Jin <shj at xenosi.de>            |
// +--------------------------------------------------------+
// | License : MIT                                          |
// +--------------------------------------------------------+
//
// $Id: FmtOrdinal.class.php, 2015. 4. 14. crucify Exp $

class FmtOrdinal
{
	private static $digits = array('', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극', '항하사', '아승기', '나유타', '불가사의', '무량대수', '겁', '업'),
		$num = array('', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'),
		$cardinal = array('', '십', '백', '천'),
		$ordinal = array(
		array('', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'),
		array('', '한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉'),
	),
		$largeordinal = array('', '열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔');

	private function __construct() {}

	public static function toCardinal($n, $pronunFirstOne = false) {
		$n .= '';
		$l = strlen($n);
		if($l > 80) return '무한';
		$r = [];
		$pronunDigits = true;
		for($i = 0; $i < $l - 1; $i ++) {
			$d = $l - $i - 1;
			if(($n[$i] > '1' || ($i > 0 && $d % 4 == 0) || ($pronunFirstOne && $i == 0)) && self::$num[$n[$i]]) {
				$r[] = self::$num[$n[$i]];
				$pronunDigits = true;
			}
			if($pronunDigits && $d % 4 == 0) {
				$r[] = self::$digits[$d / 4];
				$pronunDigits = false;
			}
			if($n[$i] != '0') {
				$r[] = self::$cardinal[$d % 4];
			}
		}
		$r[] = self::$num[$n[$l - 1]];
		return implode($r);
	}

	public static function toOrdinal($n, $type = 1, $unit = '') { /* 1: 한, 2: 첫 */
		$n .= '';
		$l = strlen($n);
		if($l > 80) return '무한';
		if($n == '1' && $type == 2 && $unit == '') return '처음';
		if($unit != '') {
			$u = hexdec(unpack('H*', iconv('UTF-8', 'UCS-2BE', iconv_substr($unit, 0, 1, 'UTF-8')))[1]) - 44032;
			$cho = floor($u / 588);
			$jong = $u % 588 % 28;
			$s = (($cho == 1 || $cho == 4 || $cho == 8 || $cho == 10 || $cho == 13) && $jong == 0) ? 0 : 1;
		} else {
			$s = 0;
			$type = 1;
		}
		$r = [];
		if($l > 2) {
			$r[] = self::toCardinal(substr($n, 0, -2).'00');
		}
		$n = substr('0'.$n, -2);

		$r[] = self::$largeordinal[$n[0]];
		$r[] = ($type == 2 && $n[1] == '1') ? '첫' : self::$ordinal[$s][$n[1]];
		$r[] = $unit;

		return implode($r);
	}
}
