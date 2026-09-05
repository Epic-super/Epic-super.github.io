const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const backendDir = path.join(__dirname, 'backend');
const packageJsonPath = path.join(backendDir, 'package.json');

console.log('==========================================');
console.log('  FOLOTOY NFC Passport System Setup');
console.log('==========================================\n');

try {
  console.log('1. Checking Node.js...');
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`   ✓ Node.js version: ${nodeVersion}\n`);

  console.log('2. Checking npm...');
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`   ✓ npm version: ${npmVersion}\n`);

  if (!fs.existsSync(packageJsonPath)) {
    console.log('3. package.json not found. Please ensure you are in the correct directory.');
    process.exit(1);
  }

  console.log('3. Installing dependencies...');
  execSync('npm install', { cwd: backendDir, stdio: 'inherit' });
  console.log('   ✓ Dependencies installed\n');

  console.log('4. Initializing database...');
  try {
    execSync('npm run init-db', { cwd: backendDir, stdio: 'inherit' });
    console.log('   ✓ Database initialized\n');
  } catch (error) {
    console.log('   ⚠ Database initialization failed or already exists\n');
  }

  console.log('==========================================');
  console.log('  Setup Complete!');
  console.log('==========================================\n');
  console.log('Next steps:');
  console.log('  1. Copy .env.example to .env and configure');
  console.log('  2. Run: npm start');
  console.log('  3. Visit: http://localhost:3000/web');
  console.log('  4. Read docs/api.md for API documentation');
  console.log('\nOr use Docker:');
  console.log('  1. Run: ./deploy.sh your-api-key-here');
  console.log('  2. Visit: http://localhost/web');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  process.exit(1);
}
