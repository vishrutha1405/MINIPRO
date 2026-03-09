// backend/fix-dependencies.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing dependencies...');

try {
  // Create uploads directory
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
    console.log('✅ Created uploads directory');
  }

  // Update package.json to remove cloudinary version conflict
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  
  // Make sure we have the right dependencies
  packageJson.dependencies = {
    ...packageJson.dependencies,
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "multer": "^1.4.5-lts.1",
    "express-validator": "^7.0.1"
  };
  
  // Remove problematic packages if they exist
  delete packageJson.dependencies.cloudinary;
  delete packageJson.dependencies['multer-storage-cloudinary'];
  
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  console.log('✅ Updated package.json');

  // Reinstall dependencies
  console.log('📦 Reinstalling dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('\n🎉 All fixed! Run: npm run dev');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}