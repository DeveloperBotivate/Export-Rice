const fs = require('fs');
let code = fs.readFileSync('generate-purchase-stages.cjs', 'utf-8');

const targetObjEnd = `supervisor: 'Amit',`;
const injectProps = `supervisor: 'Amit', liftNo: 1, liftQtyMT: 300 + i*10, remainingAfterLiftMT: 0, status: 'Fully Lifted',`;

code = code.replace(targetObjEnd, injectProps);

fs.writeFileSync('generate-purchase-stages.cjs', code);
console.log('Injected liftNo, liftQtyMT, remainingAfterLiftMT into dummy objects');
