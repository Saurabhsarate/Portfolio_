// Simple sitemap generator (run: node scripts/generate-sitemap.js)
const fs = require('fs');
const SITE = process.env.SITE_URL || 'https://your-domain.example';
const pages = ['/', '/#skills', '/#projects', '/#experience', '/#certs', '/#about', '/#contact'];

const urls = pages.map(p => `
  <url>
    <loc>${SITE}${p === '/' ? '' : p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.6'}</priority>
  </url>`).join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync('sitemap.xml', xml.trim());
console.log('sitemap.xml generated for', SITE);