const fs = require('fs');
const path = require('path');

// Entity types from data/marketing.js (copied here for simplicity since we're outside Babel scope)
const ENTITY_TYPES = [
  "sole-prop",
  "partnership",
  "llp",
  "opc",
  "pvt-ltd",
  "public-ltd",
];

const DOMAIN = 'https://www.rightteam.in'; // Replace with actual domain

const generateSitemap = () => {
  const urls = [
    { loc: `${DOMAIN}/`, priority: '1.0' },
    { loc: `${DOMAIN}/about`, priority: '0.8' },
    { loc: `${DOMAIN}/quote`, priority: '0.8' },
    { loc: `${DOMAIN}/reviews`, priority: '0.8' },
    { loc: `${DOMAIN}/contact`, priority: '0.8' },
    { loc: `${DOMAIN}/compliance-calendar`, priority: '0.9' },
  ];

  // Add entity compliance pages
  ENTITY_TYPES.forEach((entity) => {
    urls.push({
      loc: `${DOMAIN}/compliance-calendar/${entity}`,
      priority: '0.8'
    });
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

  const buildPath = path.join(__dirname, '../build');
  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
  }
  
  fs.writeFileSync(path.join(buildPath, 'sitemap.xml'), sitemapXml);
  console.log('✅ sitemap.xml generated in build directory');
};

generateSitemap();
