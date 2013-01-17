function assert(value) {
	if (!value) {
		error('Got "' + value + '",\nExpected:  a truthy value');
	}
}

assert.is = function(lhs, rhs) {
	if (lhs !== rhs) {
		error('Got "' + lhs + '",\nExpected:  "' + rhs + '"');
	}
};

assert.eq = function(lhs, rhs) {
	lhsS = JSON.stringify(lhs);
	rhsS = JSON.stringify(rhs);
	if (lhsS !== rhsS) {
		error('Got "' + lhsS + '",\nExpected:  "' + rhsS + '"');
	}
};

function error(msg) {
	console.log("\nError: " + msg);
	Error.prepareStackTrace = function(e, stackTrace) {
		return stackTrace;
	};
	var err = new Error();

	var callSite = err.stack[2];
	var filename = callSite.getFileName();
	var file = require('fs').readFileSync(filename, 'utf8');
	var relative = require('path').relative(process.cwd(), filename);
	var line = callSite.getLineNumber();
	var column = callSite.getColumnNumber();

	console.log("\nFile: " + relative);
	console.log("Line: " + line);
	console.log("\n" + file.split('\n')[line-1].replace(/\t/g, ' '));
	console.log(Array(column).join(' ') + "^");
	err.stack.splice(0, 2);
	console.log("\n" + err.stack.join('\n'));
	process.exit(1);
}

module.exports = assert;

assert('string');
assert.is(1 + 2, 3);
