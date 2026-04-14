const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public', 'img', 'qr');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const codes = [
  // Main site QR
  { name: 'site', url: 'https://matematikpusulasi.vercel.app' },
  // Dahiler Wikipedia QRs (Turkish Wikipedia)
  { name: 'cahit_arf', url: 'https://tr.wikipedia.org/wiki/Cahit_Arf' },
  { name: 'harezmi', url: 'https://tr.wikipedia.org/wiki/Harezm%C3%AE' },
  { name: 'hypatia', url: 'https://tr.wikipedia.org/wiki/Hypatia' },
  { name: 'emmy_noether', url: 'https://tr.wikipedia.org/wiki/Emmy_Noether' },
  { name: 'newton', url: 'https://tr.wikipedia.org/wiki/Isaac_Newton' },
  { name: 'turing', url: 'https://tr.wikipedia.org/wiki/Alan_Turing' },
  { name: 'ramanujan', url: 'https://tr.wikipedia.org/wiki/Srinivasa_Ramanujan' },
];

async function generate() {
  for (const { name, url } of codes) {
    const filePath = path.join(outDir, `${name}.png`);
    await QRCode.toFile(filePath, url, {
      width: 200,
      margin: 1,
      color: { dark: '#1a1a1a', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    });
    console.log(`✅ ${name}.png → ${url}`);
  }
  console.log(`\nDone! ${codes.length} QR codes generated in ${outDir}`);
}

generate().catch(console.error);
