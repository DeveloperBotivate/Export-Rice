const fs = require('fs');
const path = require('path');

function cleanFilename(name) {
    return name.trim();
}

function createComponent(moduleDir, stageName, filename, data, type = 'wrapper') {
    const filepath = path.join(moduleDir, filename);
    const componentName = filename.replace('.jsx', '').replace(/[^\w]/g, '_');
    
    const formFields = data.formFields || [];
    let formHtml = '';
    for (const field of formFields) {
        formHtml += `
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">${field}</label>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="Enter ${field}" />
        </div>`;
    }
    
    const pendingCols = data.pendingCols || [];
    const historyCols = data.historyCols || [];
    let content = '';

    if (type === 'wrapper_only') {
        content = `import React, { useState, useEffect } from 'react';

export default function ${componentName}() {
  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('${data.historyKey || 'history'}');
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">${stageName}</h2>
        <form className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${formHtml}
          </div>
          <button type="button" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">Submit</button>
        </form>
        <h3 className="text-xl font-semibold mb-4">Saved Records</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">No records found</td></tr>
              ) : records.map((r, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">{r.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{r.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{r.createdBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
`;
    } else if (type === 'pending') {
        const colsHtml = pendingCols.map(c => `<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${c}</th>`).join('');
        content = `import React from 'react';

export default function ${componentName}({ onAction }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4 text-orange-600">Pending Actions</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              ${colsHtml}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td colSpan="${pendingCols.length}" className="px-6 py-4 text-center">
                <button onClick={onAction} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Action (Form)</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;
    } else if (type === 'history') {
        const colsHtml = historyCols.map(c => `<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${c}</th>`).join('');
        content = `import React from 'react';

export default function ${componentName}() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-green-600">History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              ${colsHtml}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td colSpan="${historyCols.length}" className="px-6 py-4 text-center text-gray-500">No history found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;
    } else if (type === 'form') {
        content = `import React from 'react';

export default function ${componentName}({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">${stageName} Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${formHtml}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
            <button type="button" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
`;
    } else if (type === 'wrapper') {
        const stageBase = filename.replace('.jsx', '');
        const baseSafe = stageBase.replace(/[^\w]/g, '_');
        content = `import React, { useState } from 'react';
import ${baseSafe}_Pending from './${stageBase}_Pending';
import ${baseSafe}_History from './${stageBase}_History';
import ${baseSafe}_Form from './${stageBase}_Form';

export default function ${componentName}() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">${stageName}</h2>
        <${baseSafe}_Pending onAction={() => setIsFormOpen(true)} />
        <${baseSafe}_History />
        <${baseSafe}_Form isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      </div>
    </div>
  );
}
`;
    }

    fs.writeFileSync(filepath, content, 'utf8');
}

function parsePrompt(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const modules = content.split(/## MODULE:\s*/).slice(1);
    
    let appImports = [];
    let appRoutes = [];
    let sidebarLinks = [];
    
    const baseDir = path.join(__dirname, '..', 'src', 'modules');
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
    }
    
    for (const mod of modules) {
        const modLines = mod.trim().split('\\n');
        const moduleName = modLines[0].trim();
        const moduleFolder = moduleName.replace(/\\s+/g, '_');
        
        const stages = mod.split(/---\s*Stage\s*/).slice(1);
        
        for (const stage of stages) {
            const stageLines = stage.trim().split('\\n');
            const stageHeader = stageLines[0].split('---')[0].trim();
            const stageFolder = stageHeader.replace(/[\\s:]+/g, '_');
            
            const stageDir = path.join(baseDir, moduleFolder, stageFolder);
            if (!fs.existsSync(stageDir)) {
                fs.mkdirSync(stageDir, { recursive: true });
            }
            
            let filesToCreate = [];
            let formFields = [];
            let pendingCols = [];
            let historyCols = [];
            let historyKey = "";
            
            let currentBlock = null;
            
            for (const line of stageLines) {
                const lineStr = line.trim();
                if (lineStr.startsWith('File:')) {
                    filesToCreate.push(lineStr.replace('File:', '').trim());
                } else if (lineStr.startsWith('Files:')) {
                    currentBlock = 'files';
                } else if (lineStr.startsWith('FORM FIELDS')) {
                    currentBlock = 'form';
                } else if (lineStr.startsWith('PENDING TABLE COLUMNS')) {
                    currentBlock = 'pending';
                } else if (lineStr.startsWith('HISTORY TABLE COLUMNS')) {
                    currentBlock = 'history';
                } else if (lineStr.includes('save to localStorage key:')) {
                    const match = lineStr.match(/"([^"]+)"/);
                    if (match) historyKey = match[1];
                } else if (currentBlock === 'files' && lineStr.endsWith('.jsx')) {
                    filesToCreate.push(lineStr);
                } else if (currentBlock === 'form' && lineStr.startsWith('-')) {
                    formFields.push(lineStr.substring(1).trim());
                } else if (currentBlock === 'pending' && lineStr.startsWith('-')) {
                    pendingCols.push(lineStr.substring(1).trim());
                } else if (currentBlock === 'history' && lineStr.startsWith('-')) {
                    historyCols.push(lineStr.substring(1).trim());
                }
            }
            
            const data = {
                formFields, pendingCols, historyCols, historyKey
            };
            
            let wrapperFile = null;
            if (filesToCreate.length === 1) {
                wrapperFile = filesToCreate[0];
                createComponent(stageDir, stageHeader, wrapperFile, data, 'wrapper_only');
            } else if (filesToCreate.length === 3) {
                for (const f of filesToCreate) {
                    if (f.includes('Pending')) createComponent(stageDir, stageHeader, f, data, 'pending');
                    else if (f.includes('History')) createComponent(stageDir, stageHeader, f, data, 'history');
                    else if (f.includes('Form')) createComponent(stageDir, stageHeader, f, data, 'form');
                }
                const baseName = filesToCreate[0].replace('_Pending.jsx', '');
                wrapperFile = baseName + '.jsx';
                createComponent(stageDir, stageHeader, wrapperFile, data, 'wrapper');
            }
            
            if (wrapperFile) {
                const importPath = "./modules/" + moduleFolder + "/" + stageFolder + "/" + wrapperFile.replace('.jsx', '');
                const compName = wrapperFile.replace('.jsx', '').replace(/[^\w]/g, '_');
                appImports.push("import " + compName + " from '" + importPath + "';");
                appRoutes.push("<Route path=\"/" + moduleFolder.toLowerCase() + "/" + stageFolder.toLowerCase() + "\" element={<" + compName + " />} />");
                sidebarLinks.push({
                    module: moduleName,
                    label: stageHeader,
                    path: "/" + moduleFolder.toLowerCase() + "/" + stageFolder.toLowerCase()
                });
            }
        }
    }
    
    console.log("Generation complete! Total routes:", appRoutes.length);
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'sidebar_links.json'), JSON.stringify(sidebarLinks, null, 2), 'utf8');
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'app_routes.txt'), appImports.join('\\n') + '\\n\\n' + appRoutes.join('\\n'), 'utf8');
}

parsePrompt(path.join(__dirname, '..', 'prompt.txt'));
