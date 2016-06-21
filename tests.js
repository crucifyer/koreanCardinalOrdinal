/**
 * http://jonnyreeves.co.uk/2012/modular-javascript-unit-testing-with-qunit-and-requirejs/
 */

define(function (require) {

    // Import depdendencies (note you can use relative paths here)
    var fmtOrdinal = require('./fmt.ordinal.js');

    // Define the QUnit module and lifecycle.
    QUnit.module("test");

    QUnit.test('toOrdinal', function( assert ) {
        assert.equal(fmtOrdinal.toOrdinal('1', 1, '개'), '한개');
        assert.equal(fmtOrdinal.toOrdinal('11', 1, '개'), '열한개');
        assert.equal(fmtOrdinal.toOrdinal('111', 1, '개'), '백열한개');
        assert.equal(fmtOrdinal.toOrdinal('1111', 1, '개'), '천백열한개');
        assert.equal(fmtOrdinal.toOrdinal('11111', 1, '개'), '만천백열한개');
        assert.equal(fmtOrdinal.toOrdinal('111111', 1, '개'), '십일만천백열한개');
    });
});