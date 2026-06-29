const fs = require('fs');

let code = fs.readFileSync('generate-purchase-stages.cjs', 'utf-8');

// Remove ['Pending Lift MT', 'remainingAfterLiftMT'], from pendingColumns and historyColumns
code = code.replace(/\['Pending Lift MT', 'remainingAfterLiftMT'\], /g, '');

fs.writeFileSync('generate-purchase-stages.cjs', code);
console.log('Removed Pending Lift MT column from generator.');
