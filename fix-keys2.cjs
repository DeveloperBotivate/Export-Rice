const fs = require('fs');
let code = fs.readFileSync('generate-purchase-stages.cjs', 'utf-8');

const stageIndex = code.indexOf("title: 'Create PO / Government DO'");
const nextStageIndex = code.indexOf("title: '", stageIndex + 10);
const blockEnd = nextStageIndex !== -1 ? nextStageIndex : code.length;

let block = code.substring(stageIndex, blockEnd);

block = block.replace(/storageKey: '[^']+'/, "storageKey: 'purchase_4_history'");
block = block.replace(/readFrom: (?:'[^']+'|null)/, "readFrom: 'purchase_3_history'");

code = code.substring(0, stageIndex) + block + code.substring(blockEnd);
fs.writeFileSync('generate-purchase-stages.cjs', code);
console.log('Fixed PO / DO Entry key');
