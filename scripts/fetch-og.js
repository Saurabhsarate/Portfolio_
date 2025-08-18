/**
 * Fetch GitHub Open Graph images to local assets.
 * Usage: node scripts/fetch-og.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const repos = [
  'Saurabhsarate/Project-Myntra-Clone',
  'Saurabhsarate/Project-Super-Mario',
  'Saurabhsarate/InsureMe-Insurance-Dashboard',
  'Saurabhsarate/Project-Netflix-Clone',
  'Saurabhsarate/Project-StudentDashborad',
  'Saurabhsarate/Student-Portal-App-',
  'Saurabhsarate/Electricity-billing-system',
  'Saurabhsarate/ShelfMaster-Pro',
  'Saurabhsarate/Darknet-traffic-detection-usind-FST-',
  'Saurabhsarate/web-application-on-food-ordering-system'
];

const outDir = path.join(__dirname, '..', 'assets', 'images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function fetch(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('Status ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

(async () => {
  for (const repo of repos) {
    const og = `https://opengraph.githubassets.com/1/${repo}`;
    const name = repo.split('/')[1]
      .replace(/[^a-z0-9]+/gi, '-')
      .toLowerCase();
    const dest = path.join(outDir, `project-${name}.png`);
    try {
      await fetch(og, dest);
      console.log('Saved:', dest);
    } catch (e) {
      console.warn('OG not available for', repo, '— kept placeholder');
    }
  }
})();