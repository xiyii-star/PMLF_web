const fs = require('fs');
const path = require('path');

// 创建 dist 目录
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 复制所有 HTML 文件
const testDir = path.join(__dirname, 'test');
const htmlFiles = fs.readdirSync(testDir).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  const src = path.join(testDir, file);
  let destFile = file;

  // 将 home.html 重命名为 index.html 作为首页
  if (file === 'home.html') {
    destFile = 'index.html';
  }
  // 将原来的 index.html 重命名为 main.html
  else if (file === 'index.html') {
    destFile = 'main.html';
  }

  const dest = path.join(distDir, destFile);
  fs.copyFileSync(src, dest);
  console.log(`✓ Copied ${file} → ${destFile}`);
});

console.log(`\n✓ Build complete! ${htmlFiles.length} HTML files copied to dist/`);
