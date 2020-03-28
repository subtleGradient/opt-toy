const withTM = require("next-transpile-modules")(["@opdex/toy"]); // pass the modules you would like to see transpiled

module.exports = withTM();
