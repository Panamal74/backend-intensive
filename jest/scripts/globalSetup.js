/* Global setup modle.
 **
 ** This module exports an async function that is triggered
 ** once before all test suites.
 **
 */

const chalk = require('chalk');
const path = require('path');

// Load dotenv
require('dotenv').config({ path: path.resolve('.env.test') });

module.exports = async function() {
    console.log(chalk.green('λ'));

    global.t = 'hello';
};
