const fs = require('fs');
let code = fs.readFileSync('generate-production-stages.cjs', 'utf-8');

// Find the generateDummyData text inside the template() string
const templateStart = code.indexOf('const template = (stage) =>');
const funcStart = code.indexOf('const generateDummyData', templateStart);
const exportMarker = '\nexport const ${stage.name}';
const funcEnd = code.indexOf(exportMarker, funcStart);

if (funcStart === -1 || funcEnd === -1) {
  console.error('Could not find generateDummyData block!');
  process.exit(1);
}

const dummyDataText = code.substring(funcStart, funcEnd).trim();
console.log('Found dummyDataText length:', dummyDataText.length);

// Now find the broken line in stage1Template and replace with the actual text
const brokenLine = "` + generateDummyData.toString() + `";
if (!code.includes(brokenLine)) {
  console.error('Could not find broken injection line!');
  console.log('Searching for alternatives...');
  // Try other variants
  const idx = code.indexOf('generateDummyData.toString()');
  if (idx !== -1) {
    console.log('Found at:', idx);
    console.log('Context:', code.substring(idx - 5, idx + 50));
  }
  process.exit(1);
}

const fixedCode = code.replace(brokenLine, '\n' + dummyDataText + '\n');
fs.writeFileSync('generate-production-stages.cjs', fixedCode);
console.log('Successfully patched generate-production-stages.cjs');
