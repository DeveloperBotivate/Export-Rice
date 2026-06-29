const fs = require('fs');

let code = fs.readFileSync('generate-purchase-stages.cjs', 'utf-8');

const targetStr = `localStorage.setItem(\`purchase_\${i}_history\`, JSON.stringify(ids));`;
const replacementStr = `localStorage.setItem(\`purchase_\${i}_history\`, JSON.stringify(ids));
        
        // If this is stage 8 (Lift) or higher, it means the lift is completed. 
        // We must set the lift_data_ local storage so Lift.jsx knows these items are fully lifted.
        if (i >= 8) {
          ids.forEach(id => {
            const item = dummyDataArray.find(d => d.id === id);
            if (item) {
              const totalQty = parseFloat(item.qtyMT) || 0;
              localStorage.setItem(\`lift_data_\${id}\`, JSON.stringify({
                totalLifted: totalQty,
                liftCount: 1
              }));
            }
          });
        }`;

code = code.replace(targetStr, replacementStr);
fs.writeFileSync('generate-purchase-stages.cjs', code);
console.log('Injected lift_data_ seeding logic into generator.');
