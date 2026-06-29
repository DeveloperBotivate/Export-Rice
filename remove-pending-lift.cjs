const fs = require('fs');

let code = fs.readFileSync('generate-purchase-stages.cjs', 'utf-8');

// We need to remove `['Pending Lift MT', 'remainingAfterLiftMT'], ` from the generator.
code = code.replace(/\['Pending Lift MT', 'remainingAfterLiftMT'\], /g, '');

fs.writeFileSync('generate-purchase-stages.cjs', code);
console.log('Removed Pending Lift MT column from downstream stages.');
