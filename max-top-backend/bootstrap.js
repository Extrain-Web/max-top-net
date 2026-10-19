// Production bootstrap: ensure an admin exists and import seed-data on first boot.
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const SEED_DIR = path.join(__dirname, 'seed-data');
const STRIP = ['_id', '__v', 'createdAt', 'updatedAt'];

async function ensureAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@maxtopnet.com').toLowerCase();
  const exists = await Admin.findOne({ email });
  if (!exists) {
    await Admin.create({ name: 'Administrator', email, password: process.env.ADMIN_PASSWORD || 'admin123' });
    console.log('✓ Admin created:', email);
  }
}

async function importSeedData() {
  if (!fs.existsSync(SEED_DIR)) return;
  const files = fs.readdirSync(SEED_DIR).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    const name = file.replace(/\.json$/, '');
    if (name === 'admins' || name === 'messages') continue;
    const col = mongoose.connection.db.collection(name);
    const count = await col.countDocuments();
    if (count > 0) continue; // already has data, don't overwrite
    let docs;
    try {
      docs = JSON.parse(fs.readFileSync(path.join(SEED_DIR, file), 'utf8'));
    } catch {
      continue;
    }
    if (!Array.isArray(docs) || !docs.length) continue;
    const cleaned = docs.map((d) => {
      const c = { ...d };
      for (const k of STRIP) delete c[k];
      return c;
    });
    await col.insertMany(cleaned);
    console.log(`✓ Imported ${name}: ${cleaned.length}`);
  }
}

async function bootstrap() {
  try {
    await ensureAdmin();
    await importSeedData();
  } catch (err) {
    console.error('Bootstrap error:', err.message);
  }
}

module.exports = bootstrap;
