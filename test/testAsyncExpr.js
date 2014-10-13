var xml = require('./../lib/index'),
    util = require('util'),
    path = require('path');

function AsyncFunctions() {
    //
}

AsyncFunctions.prototype.instance = function(ctx, args, callback) {
    try {
        var name = args.length > 0 ? args[0] : null;
        var ns = [ {prefix: "tns", uri: "http://www.w3.org/2002/xforms"} ];
        var strPath = name ? 'tns:instance[@id="' + name.value + '"]' : 'tns:instance';
        if (typeof callback === 'undefined')
            return ctx.evaluate(strPath, ns);
        else
            ctx.evaluate(strPath, ns, callback);
    }
    catch (e) {
        throw e;
    }
};

exports.testAsyncExpr = function(test) {
    xml.load(path.join(process.cwd(),'/test/example1.xml' ) , function(err, doc) {
        if (err) { throw err; }
        //create context
        var ctx = xml.createContext(doc.documentElement);
        ctx.setFunctionContext('',new AsyncFunctions());
        var ns = [ {prefix: "tns", uri: "http://www.w3.org/2002/xforms"} ];
        //var nodes = ctx.evaluate("instance('default')/Array/Item", ns);
        ctx.evaluate("instance('default')/Array/Item", ns, function(err, result) {
            test.done();
        });
    });
}