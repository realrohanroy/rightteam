const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const buildPath = path.join(__dirname, '../build');
if (!fs.existsSync(buildPath)) {
  console.error("Build path doesn't exist. Run craco build first.");
  process.exit(1);
}

const ENTITY_TYPES = [
  "sole-prop",
  "partnership",
  "llp",
  "opc",
  "pvt-ltd",
  "public-ltd",
];

const routes = [
  '/compliance-calendar',
  ...ENTITY_TYPES.map(e => `/compliance-calendar/${e}`)
];

const http = require('http');

const PORT = 5000;

const server = http.createServer((req, res) => {
  // Simple static file server
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(buildPath, reqPath === '/' ? 'index.html' : reqPath);
  
  // SPA fallback to index.html
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(buildPath, 'index.html');
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js': contentType = 'text/javascript'; break;
    case '.css': contentType = 'text/css'; break;
    case '.json': contentType = 'application/json'; break;
    case '.svg': contentType = 'image/svg+xml'; break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, async () => {
  console.log(`Starting pre-render server on port ${PORT}...`);
  
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const route of routes) {
      const page = await browser.newPage();
      
      console.log(`Pre-rendering ${route}...`);
      
      // Navigate to the page and wait for the network to be idle
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' });
      
      // Optionally wait for a specific element to ensure React has hydrated
      // await page.waitForSelector('.App', { timeout: 5000 });
      
      // Get the serialized HTML
      const html = await page.content();
      
      // Create directories if they don't exist
      const routePath = path.join(buildPath, route);
      if (!fs.existsSync(routePath)) {
        fs.mkdirSync(routePath, { recursive: true });
      }
      
      // Save the file
      fs.writeFileSync(path.join(routePath, 'index.html'), html);
      console.log(`✅ Saved ${route}/index.html`);
      
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error('Error during pre-rendering:', err);
  } finally {
    server.close();
    console.log('Pre-rendering complete.');
  }
});
