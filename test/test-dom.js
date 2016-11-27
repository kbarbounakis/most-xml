var xml = require('./../lib/index'), util = require('util');

exports.loadFileAndEvaluate = function (test) {

    xml.load('./test/index.xml',
        /**
         * @param {Error} err
         * @param {XDocument} doc
         */
        function(err, doc) {
            if (err) { throw err; }
            /**
             * @type {ExprContext|xpath.ExprContext}
             */
            var expr = new xml.xpath.ExprContext(doc.documentElement);
            var nodes = expr.evaluate("Item[employeeNumber = 1076]");
    });

};


exports.loadXml = function (test) {

    /**
     * @type XDocument
     * */
    var doc = xml.loadXML('<test>Hello World!</test>');
    doc.documentElement.innerText('Hello User!');
    console.log(doc.documentElement.outerXML());
    test.done();

};



exports.loadFile = function (test) {

    xml.load('./test/test.xml', function(err, doc) {
        if (err) { throw err; }
        console.log("XML:");
        console.log(doc.outerXML());
        var expr = 'to/text()';
        var nodes = doc.documentElement.selectNodes(expr);
        console.log(util.format("Expression=%s", expr));
        console.log(util.format("Nodes=%s", nodes.length));
        for (var i = 0; i < nodes.length; i++) {
            console.log(nodes[i].outerXML());
        }
        test.done();
    });
};


exports.loadFileSync = function (test) {

    /**
     * @type XDocument
     * */
    var doc = xml.loadSync('./test/test.xml');
    console.log("XML:");
    console.log(doc.outerXML());
    var expr = 'to/text()';
    var nodes = doc.documentElement.selectNodes(expr);
    console.log(util.format("Expression=%s", expr));
    console.log(util.format("Nodes=%s", nodes.length));
    for (var i = 0; i < nodes.length; i++) {
        console.log(nodes[i].outerXML());
    }
    test.done();

};


exports.selectSingleNode = function (test) {

    /**
     * @type XDocument
     * */
    var doc = xml.loadSync('./test/test.xml');
    console.log("XML:");
    console.log(doc.outerXML());
    var expr = 'instance("default")/to';
    /**
     * @type ExprContext|*
     * */
    var fctx = new xml.createContext(doc.documentElement);
    fctx.resolveFunction(function (ctx, name, args) {
        switch (name) {
            case 'instance':
                return xml.evaluate('/instance[@id="' + args[0] + '"]', ctx).value;
                break;
            default:
                throw util.format("Method %s was not implemented", name);
        }
    });
    var node = xml.evaluate(expr, fctx);
    //var node = doc.documentElement.selectSingleNode(expr);
    console.log(util.format("Expression=%s", expr));
    console.log(util.format("Nodes=%s", node != null ? 1 : 0));
    test.done();

}

exports.createDocument = function (test) {

    /**
     * @type XDocument|*
     * */
    var doc = new xml.XDocument();
    var root = doc.createElement('root');
    root.innerText('<Hello> World!');
    doc.appendChild(root);
    console.log(doc.outerXML());
    test.done();

};


function MyClass() {
    this.propertyString = 'test';
    this.propertyNumber = 1000;
    this.propertyDate = new Date();
}


exports.serializeObject1 = function (test) {

    var obj = new MyClass();
    var node = xml.serialize(obj);
    if (node) {
        util.log('\nXml Serialization #1:');
        util.log(node.outerXML());
    }

    obj.propertyObject = { p1:1, p2:6.760 };
    node = xml.serialize(obj);
    if (node) {
        util.log('\nXml Serialization #2:');
        util.log(node.outerXML());
    }

    node = xml.serialize(new Date());
    if (node) {
        util.log('\nXml Serialization (Date):');
        util.log(node.outerXML());
    }

    test.done();

};

exports.serializeObject2 = function (test) {

    var obj = { property1:'test',property2:1000 };
    var node = xml.serialize(obj);
    if (node) {
        util.log('\nXml Serialization (Object):');
        util.log(node.outerXML());
    }
    test.done();

};


exports.serializeArray1 = function (test) {

    var obj = [{ property1:'Item #1',property2:1000 }, { property1:'Item #2',property2:2000 }];
    var node = xml.serialize(obj, { item: 'Item' });
    if (node) {
        util.log('\nXml Serialization (Array):');
        util.log(node.outerXML());
    }
    test.done();

};

