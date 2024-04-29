/* eslint-disable */

const fs = require('fs-extra');

// Whitelist of dependencies to include in node_modules
const copyModulesForLambda = ['aws-sdk', 'mongoose'];

// Read package.json file
const packageJson = require('./package.json');

// Filter dependencies based on copyModulesForLambda
const dependenciesToInclude = {};
for (const dep of copyModulesForLambda) {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
        dependenciesToInclude[dep] = packageJson.dependencies[dep];
    }
}

// Copy whitelisted dependencies to node_modules directory
fs.ensureDirSync('node_modules');
for (const [dep, version] of Object.entries(dependenciesToInclude)) {
    fs.copySync(`node_modules/${dep}`, `build/node_modules/${dep}`);
}

console.log('Whitelisted dependencies copied to node_modules directory.');
