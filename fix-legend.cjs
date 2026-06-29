// Script to remove color legend from pop-up modal forms across all dispatch JSX files
const fs = require('fs');
const path = require('path');

const dispatchDir = path.join(__dirname, 'src/modules/dispatch');
const files = fs.readdirSync(dispatchDir).filter(f => f.endsWith('.jsx'));

const LEGEND_BLOCK = `          {/* Color Legend */}
          <div className="flex gap-4 mb-6 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-100 border border-blue-300 inline-block"></span> 🔵 Blue = Domestic only</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block"></span> 🟢 Green = Export only</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-100 border border-slate-300 inline-block"></span> ⚫ Grey = Common to both</span>
          </div>`;

let totalFixed = 0;

files.forEach(file => {
  const filePath = path.join(dispatchDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('Color Legend')) {
    const newContent = content.replace(LEGEND_BLOCK + '\n', '').replace(LEGEND_BLOCK, '');
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`✅ Removed legend from: ${file}`);
      totalFixed++;
    } else {
      // Try a more flexible match
      const flexContent = content.replace(/\s*\{\/\* Color Legend \*\/\}\s*<div className="flex gap-4 mb-6[^<]*<\/div>/g, '');
      if (flexContent !== content) {
        fs.writeFileSync(filePath, flexContent, 'utf-8');
        console.log(`✅ Flex-removed legend from: ${file}`);
        totalFixed++;
      } else {
        console.log(`⚠️ Could not auto-remove from: ${file} - manual check needed`);
      }
    }
  }
});

console.log(`\nDone! Fixed ${totalFixed} files.`);
