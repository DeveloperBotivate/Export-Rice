const fs = require('fs');

let code = fs.readFileSync('generate-purchase-stages.cjs', 'utf-8');

// The stages that come after Lift are: Weighment (9), MaterialReceipt (10), LaboratoryReport (11), AccountsVerification (12), FullKitting (13), PurchaseClosure (14).
// I will add the columns to all of them, to `pendingColumns` and `historyColumns`.

const stages = ['Weighment', 'Material Receipt', 'Laboratory Report', 'Accounts Verification', 'Full Kitting', 'Purchase Closure'];

stages.forEach(stageName => {
  // Find the block for this stage
  const stageIndex = code.indexOf(`title: '${stageName}'`);
  if (stageIndex === -1) return;

  const nextStageIndex = code.indexOf(`title: '`, stageIndex + 10);
  const blockEnd = nextStageIndex !== -1 ? nextStageIndex : code.length;

  let block = code.substring(stageIndex, blockEnd);

  // Add to pendingColumns
  if (block.includes("['Action', '']")) {
    block = block.replace("['Action', ''], ", "['Action', ''], ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT'], ");
  }

  // Add to historyColumns
  // Usually the first column in history is the stage's ID like ['Weigh Slip No', 'weighSlipNo']
  // Let's insert it right after the first array element in historyColumns
  const historyIndex = block.indexOf('historyColumns: [\n      [');
  if (historyIndex !== -1) {
    const firstBracketEnd = block.indexOf('],', historyIndex) + 2;
    const before = block.substring(0, firstBracketEnd);
    const after = block.substring(firstBracketEnd);
    block = before + " ['Lift No', 'liftNo'], ['Pending Lift MT', 'remainingAfterLiftMT']," + after;
  }

  code = code.substring(0, stageIndex) + block + code.substring(blockEnd);
});

// For pending tables, `Lift No` might show up as just the number.
// In Lift.jsx history, I formatted it nicely. Since the generator uses exactly what's in the data, it'll show the number.
fs.writeFileSync('generate-purchase-stages.cjs', code);
console.log('Columns added to generator properly.');
