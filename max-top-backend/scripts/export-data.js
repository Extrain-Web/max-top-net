// Export all collections (except admins) to seed-data/*.json for production auto-import.
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/db');

const OUT = path.join(__dirname, '..', 'seed-data');

(async () => {
  await connectDB();
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const collections = await mongoose.connection.db.listCollections().toArray();
  const summary = [];
  for (const c of collections) {
    const name = c.name;
    if (name === 'admins' || name.startsWith('system.')) continue; // never export admin credentials
    const docs = await mongoose.connection.db.collection(name).find({}).toArray();
    fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify(docs, null, 2));
    summary.push(`${name}: ${docs.length}`);
  }
  console.log('Exported ->', OUT);
  console.log(summary.join('\n'));
  await mongoose.connection.close();
  process.exit(0);
})();
