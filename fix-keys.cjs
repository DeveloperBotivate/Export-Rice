const fs = require('fs');

let code = fs.readFileSync('generate-purchase-stages.cjs', 'utf-8');

// We need to fix the storageKey and readFrom fields for all stages.
// Because previously they were all accidentally set to the same string!

const stages = [
  'Purchase Requirement',
  'Source Selection & Indent',
  'Purchase Approval',
  'PO / DO Entry',
  'Arrange Logistics',
  'Source Entry',
  'Advance Payment',
  'Lift',
  'Weighment',
  'Material Receipt',
  'Laboratory Report',
  'Accounts Verification',
  'Full Kitting',
  'Purchase Closure'
];

stages.forEach((stageName, index) => {
  const stageNum = index + 1;
  const storageKey = `purchase_${stageNum}_history`;
  const readFrom = stageNum === 1 ? 'null' : `'purchase_${stageNum - 1}_history'`;

  // Find the block for this stage
  const stageIndex = code.indexOf(`title: '${stageName}'`);
  if (stageIndex === -1) {
    console.log("Could not find stage:", stageName);
    return;
  }

  const nextStageIndex = code.indexOf(`title: '`, stageIndex + 10);
  const blockEnd = nextStageIndex !== -1 ? nextStageIndex : code.length;

  let block = code.substring(stageIndex, blockEnd);

  // Replace storageKey: '...' and readFrom: '...'
  block = block.replace(/storageKey: '[^']+'/, `storageKey: '${storageKey}'`);
  block = block.replace(/readFrom: (?:'[^']+'|null)/, `readFrom: ${readFrom}`);

  code = code.substring(0, stageIndex) + block + code.substring(blockEnd);
});

// Also fix the initial `rawHistory` check in Stage 1
// It currently says `let rawHistory = JSON.parse(localStorage.getItem('purchase_3_1_history'));`
// It should be `purchase_1_history`
code = code.replace(
  /let rawHistory = JSON\.parse\(localStorage\.getItem\('purchase_3_1_history'\)\);/,
  "let rawHistory = JSON.parse(localStorage.getItem('purchase_1_history'));"
);

fs.writeFileSync('generate-purchase-stages.cjs', code);
console.log('Fixed storage keys in generator!');
