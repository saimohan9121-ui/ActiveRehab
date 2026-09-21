const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const SERVICES_DIR = path.join(PUBLIC_DIR, 'Services Images');

async function optimizeImages() {
  console.log('--- 1. Optimizing Condition Images ---');
  const conditionFiles = [
    { src: 'back pain treatment in Kompally.png', dest: 'back-pain-treatment-in-kompally.webp', width: 600 },
    { src: 'neck pain treatment in Kondapur.png', dest: 'neck-pain-treatment-in-kondapur.webp', width: 600 },
    { src: 'sciatica treatment in Kondapur.png', dest: 'sciatica-treatment-in-kondapur.webp', width: 600 },
    { src: 'spondylitis treatment in Kompally.png', dest: 'spondylitis-treatment-in-kompally.webp', width: 600 },
    { src: 'cervical spondylosis treatment in Kompally.png', dest: 'cervical-spondylosis-treatment-in-kompally.webp', width: 600 },
    { src: 'posture correction treatment in Kondapur.png', dest: 'posture-correction-treatment-in-kondapur.webp', width: 600 },
  ];

  for (const item of conditionFiles) {
    const srcPath = path.join(SERVICES_DIR, item.src);
    const destPath = path.join(SERVICES_DIR, item.dest);
    if (fs.existsSync(srcPath)) {
      const srcStats = fs.statSync(srcPath);
      await sharp(srcPath)
        .resize({ width: item.width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toFile(destPath);
      const destStats = fs.statSync(destPath);
      console.log(`✓ ${item.src} (${(srcStats.size/1024).toFixed(1)} KB) -> ${item.dest} (${(destStats.size/1024).toFixed(1)} KB)`);
    }
  }

  console.log('\n--- 2. Optimizing Treatment Service Images ---');
  const serviceFiles = [
    { src: 'chiropractic-adjustments.png', dest: 'chiropractic-adjustments.webp', width: 800 },
    { src: 'rehab-therapy.png', dest: 'rehab-therapy.webp', width: 800 },
    { src: 'posture-correction.png', dest: 'posture-correction.webp', width: 800 },
    { src: 'chronic-pain.jpg', dest: 'chronic-pain.webp', width: 800 },
    { src: 'doctorphoto.jpg', dest: 'doctorphoto.webp', width: 800 },
  ];

  for (const item of serviceFiles) {
    const srcPath = path.join(IMAGES_DIR, item.src);
    const destPath = path.join(IMAGES_DIR, item.dest);
    if (fs.existsSync(srcPath)) {
      const srcStats = fs.statSync(srcPath);
      await sharp(srcPath)
        .resize({ width: item.width, withoutEnlargement: true })
        .webp({ quality: 84, effort: 6 })
        .toFile(destPath);
      const destStats = fs.statSync(destPath);
      console.log(`✓ ${item.src} (${(srcStats.size/1024).toFixed(1)} KB) -> ${item.dest} (${(destStats.size/1024).toFixed(1)} KB)`);
    }
  }

  console.log('\n--- 3. Optimizing Hero Poster ---');
  const heroPosterSrc = path.join(PUBLIC_DIR, 'hero side.jpg');
  const heroPosterDest = path.join(PUBLIC_DIR, 'hero-poster.webp');
  if (fs.existsSync(heroPosterSrc)) {
    const srcStats = fs.statSync(heroPosterSrc);
    await sharp(heroPosterSrc)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(heroPosterDest);
    const destStats = fs.statSync(heroPosterDest);
    console.log(`✓ hero side.jpg (${(srcStats.size/1024).toFixed(1)} KB) -> hero-poster.webp (${(destStats.size/1024).toFixed(1)} KB)`);
  }

  console.log('\n--- 4. Deleting Confirmed Unused Assets ---');
  const unusedFiles = [
    path.join(IMAGES_DIR, 'aging-pain.jpg'),
    path.join(IMAGES_DIR, 'back-pain.jpg'),
    path.join(IMAGES_DIR, 'cervical-spondylosis.jpg'),
    path.join(IMAGES_DIR, 'doctor.jpg'),
    path.join(IMAGES_DIR, 'headache.jpg'),
    path.join(IMAGES_DIR, 'joint-pain.jpg'),
    path.join(IMAGES_DIR, 'neck-pain-tension.jpg'),
    path.join(IMAGES_DIR, 'neck-pain.jpg'),
    path.join(IMAGES_DIR, 'nerve-pain.jpg'),
    path.join(IMAGES_DIR, 'post-surgical.jpg'),
    path.join(IMAGES_DIR, 'postural-disorders.jpg'),
    path.join(IMAGES_DIR, 'sciatica-pain.jpg'),
    path.join(IMAGES_DIR, 'spondylitis-spine.jpg'),
    path.join(IMAGES_DIR, 'herobg.mp4'),
    path.join(PUBLIC_DIR, 'Logo.png'),
  ];

  let totalDeletedBytes = 0;
  for (const filePath of unusedFiles) {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      totalDeletedBytes += stats.size;
      fs.unlinkSync(filePath);
      console.log(`Deleted unused: ${path.relative(ROOT, filePath)} (${(stats.size/1024).toFixed(1)} KB)`);
    }
  }
  console.log(`\nTotal unused media purged: ${(totalDeletedBytes / (1024 * 1024)).toFixed(2)} MB`);
}

optimizeImages().catch(console.error);
