const fs = require('fs');
let code = fs.readFileSync('src/modules/purchase/Lift.jsx', 'utf-8');
const startIdx = code.indexOf('{/* Summary Stats */}');
const endIdx = code.indexOf('<div className="border-b border-slate-200 mb-6">');
if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + code.substring(endIdx);
  fs.writeFileSync('src/modules/purchase/Lift.jsx', code);
  console.log('Removed summary stats from Lift.jsx');
} else {
  console.log('Could not find boundaries.');
}
