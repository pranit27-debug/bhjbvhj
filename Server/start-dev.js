#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Rental App Server in development mode...\n');

// Check if .env file exists
const fs = require('fs');
const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.log('⚠️  No .env file found!');
  console.log('📝 Please copy env.example to .env and configure your environment variables.');
  console.log('💡 You can use: cp env.example .env\n');
  
  // Create a basic .env file from example
  try {
    const examplePath = path.join(__dirname, 'env.example');
    if (fs.existsSync(examplePath)) {
      fs.copyFileSync(examplePath, envPath);
      console.log('✅ Created .env file from env.example');
      console.log('🔧 Please edit .env with your actual values\n');
    }
  } catch (error) {
    console.log('❌ Failed to create .env file:', error.message);
  }
}

// Start the server with nodemon
const nodemon = spawn('npx', ['nodemon', 'app.js'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

nodemon.on('error', (error) => {
  console.error('❌ Failed to start nodemon:', error.message);
  console.log('💡 Make sure nodemon is installed: npm install -g nodemon');
  process.exit(1);
});

nodemon.on('exit', (code) => {
  if (code !== 0) {
    console.log(`\n⚠️  Server exited with code ${code}`);
  }
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  nodemon.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  nodemon.kill('SIGTERM');
});
