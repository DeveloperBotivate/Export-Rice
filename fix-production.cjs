const fs = require('fs');
let code = fs.readFileSync('generate-production-stages.cjs', 'utf-8');

// 1. Bump all storage keys from v3 to v4
code = code.replace(/production_master_v3/g, 'production_master_v4');
code = code.replace(/prod_v3_/g, 'prod_v4_');

// 2. Fix the init guard to also check data integrity (productionOrderNo field)
const oldGuard = "if (!master || master.length === 0) {";
const newGuard = "if (!master || master.length === 0 || !master[0].productionOrderNo) {";
code = code.split(oldGuard).join(newGuard);

fs.writeFileSync('generate-production-stages.cjs', code);
console.log('Version bumped to v4 and integrity check added.');
console.log('Occurrences of production_master_v4:', (code.match(/production_master_v4/g) || []).length);
console.log('Occurrences of prod_v4_:', (code.match(/prod_v4_/g) || []).length);
console.log('Integrity checks:', (code.match(/productionOrderNo/g) || []).length);
