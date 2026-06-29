/**
 * Safe procurement modal upgrader v2
 * Strategy: Only wraps the Modal's inner content div with a premium header banner.
 * Does NOT touch any field markup — avoids all JSX corruption.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'modules', 'procurement');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'Procurement.jsx');

// Map file → modal title
const titles = {
  'ProcurementPlanning.jsx': 'Procurement Planning',
  'ProcurementList.jsx': 'Create Procurement Order',
  'ProcurementApproval.jsx': 'Procurement Approval',
  'MandiSelection.jsx': 'Mandi Selection',
  'MarketPrice.jsx': 'Market Price Entry',
  'GovernmentMSP.jsx': 'Government MSP Entry',
  'LabQuality.jsx': 'Lab Quality Test',
  'FinalApproval.jsx': 'Final Approval',
  'TransportationCost.jsx': 'Transportation Cost',
  'PurchaseRequirement.jsx': 'Purchase Requirement',
};

let updated = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const modalTitle = titles[file] || 'Procurement Details';

  // ── 1. Add size="5xl" to Modal (if not already present) ─────────────────────
  if (!content.includes('size="5xl"')) {
    content = content.replace(
      /<Modal/g,
      '<Modal size="5xl"'
    );
  }

  // ── 2. Wrap the old plain inner div with premium header ──────────────────────
  // Old pattern: <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
  // New pattern: premium header + inner wrapper

  const oldInner = '<div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">';
  const premiumWrapper = `<div className="max-h-[85vh] overflow-y-auto">
          {/* Premium Header */}
          <div className="bg-gradient-to-r from-indigo-800 to-indigo-700 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-indigo-200 text-xs font-medium uppercase tracking-widest">Procurement Module</p>
              <h3 className="text-white text-lg font-bold mt-0.5">${modalTitle}</h3>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              <span className="text-white text-xs font-medium">Open</span>
            </div>
          </div>
          <div className="p-6 space-y-4 overflow-y-auto">`;

  if (content.includes(oldInner)) {
    content = content.replace(oldInner, premiumWrapper);
    // Close the extra wrapper div before </Modal>
    // Find last </div></Modal> and add an extra </div> before </Modal>
    content = content.replace(
      /(<\/div>\s*\n\s*<\/Modal>)/,
      '          </div>\n        </div>\n      </Modal>'
    );
  }

  // ── 3. Upgrade footer buttons ────────────────────────────────────────────────
  content = content.replace(
    'className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6"',
    'className="flex justify-end gap-3 pt-5 border-t border-slate-100 mt-4"'
  );

  // Upgrade Save button style
  content = content.replace(
    /(<Button onClick=\{handleSave\}>)/g,
    '<Button onClick={handleSave} className="px-6 bg-gradient-to-r from-indigo-700 to-indigo-600 shadow-md text-white">'
  );

  // Upgrade Cancel button style
  content = content.replace(
    /className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"/g,
    'variant="outline" className="px-6"'
  );

  // ── 4. Upgrade field grid density ───────────────────────────────────────────
  content = content.replace(/className="grid grid-cols-2 gap-4"/g, 'className="grid grid-cols-2 md:grid-cols-3 gap-4"');
  content = content.replace(/className="grid grid-cols-3 gap-4"/g, 'className="grid grid-cols-2 md:grid-cols-3 gap-4"');

  // ── 5. Upgrade field label style  ────────────────────────────────────────────
  content = content.replace(/<Label>/g, '<Label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">');

  // ── 6. Style read-only inputs ────────────────────────────────────────────────
  content = content.replace(/readOnly className="bg-slate-50"/g, 'readOnly className="bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm"');
  content = content.replace(/readOnly className="bg-slate-100"/g, 'readOnly className="bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm"');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Upgraded: ${file}`);
  updated++;
});

console.log(`\nDone! ${updated} procurement files upgraded.`);
