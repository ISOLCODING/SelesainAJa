const fs = require('fs');
const path = require('path');

const srcApp = path.join(__dirname, 'src', 'app');

// 1. Create Route Groups
const frontendDir = path.join(srcApp, '(frontend)');
const dashboardGroupDir = path.join(srcApp, '(dashboard)');
const authGroupDir = path.join(srcApp, '(auth)');

if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir);
if (!fs.existsSync(dashboardGroupDir)) fs.mkdirSync(dashboardGroupDir);
if (!fs.existsSync(authGroupDir)) fs.mkdirSync(authGroupDir);

// 2. Define what goes where
const frontendFolders = [
  'about', 'blog', 'careers', 'contact', 'faq', 'how-it-works', 'privacy', 'services', 'terms', 'testimonials'
];

const dashboardGroupFolders = [
  'admin', 'writer', 'dashboard' // The customer dashboard goes here too
];

const authFolders = [
  'login', 'register'
];

// Helper to move
function moveFolder(folderName, destDir) {
  const srcPath = path.join(srcApp, folderName);
  const destPath = path.join(destDir, folderName);
  
  if (fs.existsSync(srcPath)) {
    fs.renameSync(srcPath, destPath);
    console.log(`Moved ${folderName} to ${path.basename(destDir)}`);
  }
}

// 3. Move folders
frontendFolders.forEach(folder => moveFolder(folder, frontendDir));
dashboardGroupFolders.forEach(folder => moveFolder(folder, dashboardGroupDir));
authFolders.forEach(folder => moveFolder(folder, authGroupDir));

console.log("Folder structure layout reorganized!");
