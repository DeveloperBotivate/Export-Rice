const fs = require('fs');
let lines = fs.readFileSync('generate-production-stages.cjs', 'utf8').split('\n');
lines[801] = '`;';
lines[803] = 'const template = (stage) => `import React, { useState, useEffect } from \\\'react\\\';';
fs.writeFileSync('generate-production-stages.cjs', lines.join('\n'));
