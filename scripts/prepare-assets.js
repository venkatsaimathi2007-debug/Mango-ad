const fs = require('fs');
const path = require('path');

const extractedDir = path.join(__dirname, '..', 'extracted_mango');
const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');

const flavors = ['mango', 'chocolate', 'pomegranate'];

// Ensure directories exist
flavors.forEach(flavor => {
  const dir = path.join(imagesDir, flavor);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Check if extracted_mango exists
if (fs.existsSync(extractedDir)) {
  const files = fs.readdirSync(extractedDir)
    .filter(f => f.endsWith('.jpg'))
    .sort();

  console.log(`Found ${files.length} frames in extracted_mango.`);

  const totalTargetFrames = 120;
  const mangoDir = path.join(imagesDir, 'mango');

  // Populate mango frames (1.webp and 1.jpg)
  for (let i = 1; i <= totalTargetFrames; i++) {
    // Map i from 1..120 to 0..(files.length - 1)
    const srcIndex = Math.min(
      files.length - 1,
      Math.round(((i - 1) / (totalTargetFrames - 1)) * (files.length - 1))
    );
    const srcFile = path.join(extractedDir, files[srcIndex]);
    const destWebp = path.join(mangoDir, `${i}.webp`);
    const destJpg = path.join(mangoDir, `${i}.jpg`);

    const data = fs.readFileSync(srcFile);
    fs.writeFileSync(destWebp, data);
    fs.writeFileSync(destJpg, data);
  }
  console.log(`Successfully generated 120 mango frames in ${mangoDir}`);

  // Also prepare chocolate and pomegranate fallback frames so switching flavors is 100% error-free
  // until user drops their specific sequences
  ['chocolate', 'pomegranate'].forEach(flavor => {
    const fDir = path.join(imagesDir, flavor);
    for (let i = 1; i <= totalTargetFrames; i++) {
      const srcIndex = Math.min(
        files.length - 1,
        Math.round(((i - 1) / (totalTargetFrames - 1)) * (files.length - 1))
      );
      const srcFile = path.join(extractedDir, files[srcIndex]);
      const destWebp = path.join(fDir, `${i}.webp`);
      const destJpg = path.join(fDir, `${i}.jpg`);

      // If user hasn't provided custom frames yet, populate fallback frames
      if (!fs.existsSync(destWebp)) {
        fs.copyFileSync(srcFile, destWebp);
      }
      if (!fs.existsSync(destJpg)) {
        fs.copyFileSync(srcFile, destJpg);
      }
    }
    console.log(`Prepared fallback frames for ${flavor}`);
  });
} else {
  console.log('extracted_mango directory not found.');
}
