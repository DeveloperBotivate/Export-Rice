const fs = require('fs');
let genCode = fs.readFileSync('generate-purchase-stages.cjs', 'utf-8');
genCode = genCode.replace(/purchase_master_v4|purchase_master_v5/g, 'purchase_master_v6');

// Just remove the 'if (!masterData || masterData.length === 0 || !rawHistory || rawHistory.length === 0) {' block
const startIdx = genCode.indexOf('if (!masterData || masterData.length === 0 || !rawHistory || rawHistory.length === 0) {');
const endIdx = genCode.indexOf('return { pending: [], history: resolveItems(rawHistory) };');
if (startIdx !== -1 && endIdx !== -1) {
    genCode = genCode.substring(0, startIdx) + genCode.substring(endIdx);
}

fs.writeFileSync('generate-purchase-stages.cjs', genCode);

let liftCode = fs.readFileSync('src/modules/purchase/Lift.jsx', 'utf-8');
liftCode = liftCode.replace(/purchase_master_v4|purchase_master_v5/g, 'purchase_master_v6');
fs.writeFileSync('src/modules/purchase/Lift.jsx', liftCode);
console.log('Bumped to v6 and cleaned up old generator logic');
