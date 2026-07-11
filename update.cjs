const fs = require('fs');
const app = fs.readFileSync('src/App.jsx', 'utf-8').split('\n');
const replacement = fs.readFileSync('temp_business.jsx', 'utf-8');
const index = app.findIndex(line => line.includes('MODULE 2: PORTER FOR BUSINESS LITE TIER')) - 1;
if (index > -1) {
  const newApp = app.slice(0, index).join('\n') + '\n' + replacement;
  fs.writeFileSync('src/App.jsx', newApp);
  console.log('App.jsx updated successfully');
} else {
  console.log('Could not find anchor');
}
