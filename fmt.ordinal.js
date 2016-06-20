/* vim: set expandtab tabstop=4 shiftwidth=4: */
// +--------------------------------------------------------+
// | Copyright : Song Hyo-Jin <shj at xenosi.de>            |
// +--------------------------------------------------------+
// | Number to Ordinal Cardinal Korean Converter            |
// +--------------------------------------------------------+
// | License : MIT                                          |
// +--------------------------------------------------------+
//
// $Id: fmt.ordinal.js, 2015. 4. 14. crucify Exp $

define(function() {
	var digits = ['', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극', '항하사', '아승기', '나유타', '불가사의', '무량대수', '겁', '업'],
		num = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'],
		cardinal = ['', '십', '백', '천'],
		ordinal = [
			['', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'],
			['', '한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉'],
		],
		largeordinal = ['', '열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'],
		fmt = {
			toCardinal : function(n) {
				n += '';
				if(n.length > 80) return '무한';
				var r = [];
				for(var i = 0; i < n.length - 1; i ++) {
					var d = n.length - i - 1;
					if(n[i] > '1' || d % 4 == 0) r.push(num[n[i] * 1]);
					if(d % 4 == 0) r.push(digits[d / 4]);
					if(n[i] != '0') r.push(cardinal[d % 4]);
				}
				r.push(num[n[n.length - 1] * 1]);
				return r.join('');
			},
			$cardinal: function() {
				var t = $(this).text();
				this.title = t;
				$(this).text(
					fmt.toCardinal(t)
				);
			},
			toOrdinal : function(n, type, unit) {
				n += '';
				if(n.length > 80) return '무한';
				if(!type) type = 1;  /* 1: 한, 2: 첫 */
				if(!unit) unit = '';
				if(n == '1' && type == 2 && unit == '') return '처음';
				var s, r = [];
				if(unit != '') {
					var u = unit.charCodeAt(0) - 44032, cho = Math.floor(u / 588), jong = u % 588 % 28;
					s = ((cho == 1 || cho == 4 || cho == 8 || cho == 10 || cho == 13) && jong == 0) ? 0 : 1;
				} else {
					s = 0;
					type = 1;
				}
				if(n.length > 2) {
					r.push(fmt.toCardinal(n.substr(0, n.length - 2) + '00'));
				}
				n = '0' + n;
				n = n.substr(n.length - 2);
				r.push(largeordinal[n[0] * 1]);
				r.push(
					type == 2 && n[1] == '1' ? '첫' : ordinal[s][n[1] * 1]
				);
				r.push(unit);
				return r.join('');
			},
			$ordinal: function() {
				var t = $(this).text();
				this.title = t;
				$(this).text(
					fmt.toOrdinal(t, $(this).data('type'), $(this).data('unit'))
				);
			}
		};
	return fmt;
});