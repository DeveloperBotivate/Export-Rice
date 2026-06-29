const fs = require('fs');
let code = fs.readFileSync('generate-purchase-stages.cjs', 'utf-8');

// The issue is that on the first run, masterData is [] when resolving history items.
// We need to set `masterData = dummyDataArray;` after saving it to localStorage.

// Also, the guard uses 'purchase_v2_', let's fix it to 'purchase_master_v3' (and use v3 across the board)

code = code.replace(/purchase_master_v2/g, 'purchase_master_v3');
code = code.replace(/purchase_v2_/g, 'purchase_3_1_history');

// Now inject the `masterData = dummyDataArray;`
const searchTarget = "localStorage.setItem('purchase_master_v3', JSON.stringify(dummyDataArray));";
if (code.includes(searchTarget)) {
  code = code.replace(searchTarget, searchTarget + "\n      masterData = dummyDataArray;");
} else {
  console.log("Could not find searchTarget!");
}

fs.writeFileSync('generate-purchase-stages.cjs', code);
console.log('Generator patched for masterData initial load bug.');
