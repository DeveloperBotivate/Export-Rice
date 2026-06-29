const fs = require('fs');

let code = fs.readFileSync('generate-purchase-stages.cjs', 'utf-8');

const targetStr = `if (!rawHistory || rawHistory.length === 0) {`;
const newStr = `if (!masterData || masterData.length === 0 || !rawHistory || rawHistory.length === 0) {`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, newStr);
  fs.writeFileSync('generate-purchase-stages.cjs', code);
  console.log('Successfully replaced if condition.');
} else {
  console.log('Could not find target string!');
}
