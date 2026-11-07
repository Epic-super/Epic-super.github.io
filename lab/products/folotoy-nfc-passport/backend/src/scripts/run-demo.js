const { spawn } = require('child_process');
const path = require('path');

async function runDemo() {
  console.log('==========================================');
  console.log('  FOLOTOY NFC Passport Demo');
  console.log('==========================================\n');

  const backendDir = path.join(__dirname, '../backend');
  
  const steps = [
    { cmd: 'npm', args: ['run', 'init-db'], desc: '初始化数据库' },
    { cmd: 'node', args: ['src/scripts/seed-demo-data.js'], desc: '生成演示数据' },
    { cmd: 'npm', args: ['test'], desc: '运行 API 测试' }
  ];

  for (const step of steps) {
    console.log(`▶ ${step.desc}...`);
    
    return new Promise((resolve, reject) => {
      const child = spawn(step.cmd, step.args, {
        cwd: backendDir,
        shell: true,
        stdio: 'inherit'
      });

      child.on('close', (code) => {
        if (code !== 0) {
          console.log(`✗ ${step.desc} 失败\n`);
          reject(new Error(`${step.desc} failed with exit code ${code}`));
        } else {
          console.log(`✓ ${step.desc} 完成\n`);
          resolve();
        }
      });
    });
  }

  console.log('==========================================');
  console.log('  Demo completed!');
  console.log('==========================================\n');
  console.log('Next steps:');
  console.log('  1. cd backend && npm start');
  console.log('  2. Visit http://localhost:3000/web');
  console.log('  3. Try the API endpoints in docs/api.md');
}

if (require.main === module) {
  runDemo().catch(err => {
    console.error('Demo failed:', err);
    process.exit(1);
  });
}

module.exports = { runDemo };
