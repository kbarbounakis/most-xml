/**
 * Created by kbarbounakis on 2/7/2014.
 */
var xml = require('./../lib/index'),
    util = require('util'),
    path = require('path');


exports.testSerializeCustomArray = function(test) {
    xml.load(path.join(process.cwd(),'/test/test-custom-array.xml' ) , function(err, doc) {
        if (err) { throw err; }
        var result = xml.deserialize(doc.documentElement);
        console.log('\r');
        util.log(JSON.stringify(result));
        test.done();
    });
}

exports.testSerialize = function(test) {
    xml.load(path.join(process.cwd(),'/test/test.xml' ) , function(err, doc) {
        if (err) { throw err; }
        var result = xml.deserialize(doc.documentElement);
        console.log('\r');
        util.log(JSON.stringify(result));
        test.done();
    });
}

exports.testSerializeArray = function(test) {
    xml.load(path.join(process.cwd(),'/test/test-array.xml' ) , function(err, doc) {
        if (err) { throw err; }
        var result = xml.deserialize(doc.documentElement);
        console.log('\r');
        util.log(JSON.stringify(result));
        test.done();
    });
}
