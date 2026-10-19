require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const Admin = require('./models/Admin');
const Settings = require('./models/Settings');
const About = require('./models/About');
const PopupBanner = require('./models/PopupBanner');
const HeroSlide = require('./models/HeroSlide');
const OfferBanner = require('./models/OfferBanner');
const Service = require('./models/Service');
const Package = require('./models/Package');
const Feature = require('./models/Feature');
const Faq = require('./models/Faq');
const Review = require('./models/Review');
const Partner = require('./models/Partner');
const Area = require('./models/Area');
const FtpLink = require('./models/FtpLink');
const Channel = require('./models/Channel');
const GameServer = require('./models/GameServer');
const PaymentMethod = require('./models/PaymentMethod');
const Page = require('./models/Page');

const U = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const OFFERS_SEED = [
  { theme: 'eid', size: 'large', badge: 'EID SPECIAL', discount: '1 MONTH FREE', title: 'Eid Mubarak Offer', subtitle: 'Get 1 full month free on yearly connection + free installation!', buttonText: 'Grab Offer', link: '/contact', order: 0 },
  { theme: 'discount', size: 'large', badge: 'NEW CONNECTION', discount: '0৳ CHARGE', title: 'Free Setup Offer', subtitle: 'Zero connection charge on every new connection this month.', buttonText: 'Apply Now', link: '/contact', order: 1 },
  { theme: 'general', size: 'small', badge: 'REFER & EARN', discount: 'UP TO ৳300', title: 'Refer & Earn', subtitle: 'Refer a friend and earn bill discounts.', buttonText: 'Learn More', link: '/contact', order: 2 },
  { theme: 'puja', size: 'small', badge: 'PUJA OFFER', discount: '20% OFF', title: 'Sharadiya Offer', subtitle: 'Special discount on speed upgrades this Puja.', buttonText: 'Grab Offer', link: '/contact', order: 3 },
  { theme: 'boishakh', size: 'small', badge: 'BOISHAKH', discount: '15% OFF', title: 'Shubho Noboborsho', subtitle: 'Special new-year discount on new connections.', buttonText: 'Grab Offer', link: '/contact', order: 4 },
];

async function seedCollection(Model, data, label) {
  const count = await Model.countDocuments();
  if (count > 0) {
    console.log(`• ${label}: already has ${count} docs, skipping`);
    return;
  }
  await Model.insertMany(data);
  console.log(`✓ ${label}: seeded ${data.length}`);
}

async function seedSingleton(Model, data, label) {
  const existing = await Model.findOne({ key: 'main' });
  if (existing) {
    console.log(`• ${label}: already exists, skipping`);
    return;
  }
  await Model.create({ key: 'main', ...data });
  console.log(`✓ ${label}: seeded`);
}

async function run() {
  await connectDB();

  // --- Admin ---
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@maxtopnet.com').toLowerCase();
  const adminExists = await Admin.findOne({ email: adminEmail });
  if (!adminExists) {
    await Admin.create({
      name: 'Administrator',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'admin123',
    });
    console.log(`✓ Admin created: ${adminEmail}`);
  } else {
    console.log(`• Admin already exists: ${adminEmail}`);
  }

  // --- Settings ---
  await seedSingleton(Settings, {}, 'Settings');

  // --- About ---
  await seedSingleton(
    About,
    { image: U('1558494949-ef010cbdcc31', 1000) },
    'About'
  );

  // --- Popup ---
  await seedSingleton(
    PopupBanner,
    { image: U('1607082348824-0a96f2a4b9da', 600), enabled: true, delaySeconds: 2 },
    'Popup'
  );

  // --- Hero Slides ---
  await seedCollection(
    HeroSlide,
    [
      {
        badge: '🚀 Banaripara No.1 ISP',
        title: 'Ultra-Fast Internet For',
        highlight: 'Your Digital Life',
        description:
          'Experience blazing-fast fiber optic internet with 99.9% uptime. Stream, game, and work without interruption.',
        image: U('1544197150-b99a580bb7a8', 1200),
        primaryBtnText: 'Get Connection',
        primaryBtnLink: '/contact',
        secondaryBtnText: 'View Packages',
        secondaryBtnLink: '#packages',
        order: 0,
      },
      {
        badge: '📺 Premium Entertainment',
        title: 'Live TV + Internet',
        highlight: 'All In One Package',
        description:
          'Enjoy hundreds of HD channels along with high-speed internet. The complete entertainment solution for your family.',
        image: U('1593784991095-a205069470b6', 1200),
        primaryBtnText: 'Explore Live TV',
        primaryBtnLink: '/live-tv',
        secondaryBtnText: 'Contact Us',
        secondaryBtnLink: '/contact',
        order: 1,
      },
      {
        badge: '🎮 Lag-Free Gaming',
        title: 'Low Latency Routing For',
        highlight: 'Serious Gamers',
        description:
          'Dedicated game-friendly routing and BDIX connectivity for the lowest ping and the smoothest online gaming experience.',
        image: U('1542751371-adc38448a05e', 1200),
        primaryBtnText: 'Game Servers',
        primaryBtnLink: '/game-server',
        secondaryBtnText: 'Get Connection',
        secondaryBtnLink: '/contact',
        order: 2,
      },
    ],
    'Hero Slides'
  );

  // --- Offer Banners (festival) ---
  await seedCollection(
    OfferBanner,
    OFFERS_SEED,
    'Offer Banners'
  );

  // --- Services ---
  await seedCollection(
    Service,
    [
      { title: 'Home Internet', image: U('1600880292203-757bb62b4baf', 600), order: 0 },
      { title: 'Corporate Internet', image: U('1504384308090-c894fdcc538d', 600), order: 1 },
      {
        title: 'No. 1 ISP In Banaripara, Barisal',
        image: U('1558494949-ef010cbdcc31', 600),
        order: 2,
      },
      { title: 'Technology Shop', image: U('1531297484001-80022131f5a1', 600), order: 3 },
    ],
    'Services'
  );

  // --- Packages ---
  await seedCollection(
    Package,
    [
      { name: 'Starter Plan', speed: '10', price: '500', order: 0 },
      { name: 'Basic Plan', speed: '12', price: '600', order: 1 },
      { name: 'Popular Plan', speed: '15', price: '700', popular: true, order: 2 },
      { name: 'Standard Plan', speed: '20', price: '800', order: 3 },
      { name: 'Premium Plan', speed: '30', price: '1000', order: 4 },
      { name: 'Ultra Plan', speed: '50', price: '1500', order: 5 },
    ],
    'Packages'
  );

  // --- Features ---
  await seedCollection(
    Feature,
    [
      { icon: 'Headphones', title: '24/7 Help & Support', desc: 'Our friendly and helpful customer support team is always ready to assist you day or night.', order: 0 },
      { icon: 'Zap', title: 'Lag-Free Gaming', desc: 'Special game-friendly routing to ensure a seamless, lag-free online gaming experience.', order: 1 },
      { icon: 'Gamepad2', title: 'Super Stable Connection', desc: 'Enjoy smooth daily browsing with extremely low ping and no lag.', order: 2 },
      { icon: 'Wifi', title: 'Powerful Internet', desc: 'High-speed, reliable fiber internet built for your work, study, and family needs.', order: 3 },
      { icon: 'ShieldCheck', title: 'Safe & Secure Browsing', desc: 'Advanced network security to keep your personal data and family safe online.', order: 4 },
      { icon: 'Server', title: 'Largest FTP Server', desc: "Get unlimited access to the country's biggest library of movies, games, and software.", order: 5 },
    ],
    'Features'
  );

  // --- FAQs ---
  await seedCollection(
    Faq,
    [
      { question: 'Which areas are you covering right now?', answer: 'Currently, our network covers Banaripara and adjacent areas, expanding rapidly to serve you better.', order: 0 },
      { question: 'How can I contact MaxTopNet to raise any complaints?', answer: 'You can call our 24/7 hotline at 01873379982 or send an email to support@maxtopnet.com. We resolve most issues within hours.', order: 1 },
      { question: 'How can I pay my bill?', answer: 'We support seamless online payments through bKash, Nagad, Rocket, and conventional credit/debit cards via our payment gateway.', order: 2 },
      { question: 'How long is the installation time for a new connection?', answer: 'Once your application is confirmed, our technical team installs the connection within 24 to 48 hours.', order: 3 },
      { question: 'What internet speeds do you offer?', answer: 'We offer tailored plans ranging from 10 Mbps for light browsing to 50+ Mbps for heavy 4K streaming and gaming.', order: 4 },
    ],
    'FAQs'
  );

  // --- Reviews ---
  await seedCollection(
    Review,
    [
      { name: 'Mustafizur Rahman MugdhO', role: 'Full-Stack Developer', text: 'Internet speed is really good. They replaced a new ONU after complaining. Customer support is good. 5/5...', rating: 5, bg: '#6610f2', order: 0 },
      { name: 'Mahir er Khela', role: 'E-Commerce Specialist', text: 'Their service is very good and their customer care is excellent.', rating: 5, bg: '#1a202c', order: 1 },
      { name: 'Rakib Ahmed', role: 'HR Operations Specialist', text: 'Such a beautiful environment and lots of nice people and real ISP like never seen.', rating: 5, bg: '#10b981', order: 2 },
      { name: 'Md. Akramul Haque', role: 'Network Systems Analyst', text: 'MaxTopNet is one of the leading Nationwide ISP in Bangladesh. Providing best quality Bandwidth...', rating: 5, bg: '#047857', order: 3 },
    ],
    'Reviews'
  );

  // --- Partners ---
  await seedCollection(
    Partner,
    [
      { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', order: 0 },
      { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Facebook_Logo_%282019%29.svg', order: 1 },
      { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', order: 2 },
      { name: 'eBay', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg', order: 3 },
      { name: 'Akamai', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Akamai_logo.svg', order: 4 },
      { name: 'Cloudflare', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg', order: 5 },
    ],
    'Partners'
  );

  // --- Areas ---
  await seedCollection(
    Area,
    [
      { name: 'Banaripara Sadar', district: 'Barisal', status: 'available', order: 0 },
      { name: 'Chakhar', district: 'Barisal', status: 'available', order: 1 },
      { name: 'Udaykathi', district: 'Barisal', status: 'available', order: 2 },
      { name: 'Iluhar', district: 'Barisal', status: 'available', order: 3 },
      { name: 'Baisari', district: 'Barisal', status: 'coming-soon', order: 4 },
      { name: 'Swarupkathi', district: 'Pirojpur', status: 'coming-soon', order: 5 },
    ],
    'Areas'
  );

  // --- FTP Links ---
  await seedCollection(
    FtpLink,
    [
      { name: 'Movie Server', url: 'http://ftp.maxtopnet.com/movies', category: 'Movies', description: 'Latest HD & 4K movies', order: 0 },
      { name: 'TV Series', url: 'http://ftp.maxtopnet.com/series', category: 'Series', description: 'Popular web series & shows', order: 1 },
      { name: 'Games', url: 'http://ftp.maxtopnet.com/games', category: 'Games', description: 'PC & console games', order: 2 },
      { name: 'Software', url: 'http://ftp.maxtopnet.com/software', category: 'Software', description: 'Apps, tools & utilities', order: 3 },
      { name: 'Music', url: 'http://ftp.maxtopnet.com/music', category: 'Music', description: 'Songs & albums', order: 4 },
      { name: 'Live TV', url: 'http://ftp.maxtopnet.com/livetv', category: 'TV', description: 'Live television streaming', order: 5 },
    ],
    'FTP Links'
  );

  // --- Channels ---
  await seedCollection(
    Channel,
    [
      { name: 'Somoy TV', category: 'News', order: 0 },
      { name: 'Jamuna TV', category: 'News', order: 1 },
      { name: 'T Sports', category: 'Sports', order: 2 },
      { name: 'Gazi TV', category: 'Sports', order: 3 },
      { name: 'Maasranga', category: 'Entertainment', order: 4 },
      { name: 'Channel i', category: 'Entertainment', order: 5 },
      { name: 'Duronto TV', category: 'Kids', order: 6 },
      { name: 'NTV', category: 'Entertainment', order: 7 },
    ],
    'Channels'
  );

  // --- Game Servers ---
  await seedCollection(
    GameServer,
    [
      { name: 'Valorant SA', ping: '45ms', region: 'Singapore', order: 0 },
      { name: 'PUBG Mobile', ping: '38ms', region: 'Local BDIX', order: 1 },
      { name: 'Free Fire', ping: '30ms', region: 'Local BDIX', order: 2 },
      { name: 'Counter-Strike 2', ping: '55ms', region: 'Singapore', order: 3 },
      { name: 'Call of Duty Mobile', ping: '42ms', region: 'Singapore', order: 4 },
      { name: 'eFootball', ping: '35ms', region: 'Local BDIX', order: 5 },
    ],
    'Game Servers'
  );

  // --- Payment Methods ---
  await seedCollection(
    PaymentMethod,
    [
      { name: 'bKash', number: '01873379982', type: 'Merchant', instructions: 'Send money to the number and keep the TrxID.', order: 0 },
      { name: 'Nagad', number: '01873379982', type: 'Personal', instructions: 'Send money and note the transaction ID.', order: 1 },
      { name: 'Rocket', number: '01873379982', type: 'Personal', instructions: 'Use the send money option.', order: 2 },
      { name: 'Bank Transfer', number: 'A/C: 1234567890, City Bank', type: 'Bank', instructions: 'Transfer to our bank account and share the slip.', order: 3 },
    ],
    'Payment Methods'
  );

  // --- Pages ---
  const pages = [
    { slug: 'ftp-server', title: 'FTP Server', subtitle: "Access the country's largest media library at full LAN speed", intro: 'Browse thousands of movies, TV series, games, software and more — all at blazing local speed through our BDIX-connected FTP servers.' },
    { slug: 'live-tv', title: 'Live TV', subtitle: 'Hundreds of HD channels, right at home', intro: 'Enjoy crystal-clear live television with your MaxTopNet connection — news, sports, entertainment and kids channels all in one place.' },
    { slug: 'game-server', title: 'Game Servers', subtitle: 'Low-latency routing for serious gamers', intro: 'Game-optimized BDIX routing gives you the lowest possible ping on popular titles. No more lag, no more rubber-banding.' },
    { slug: 'area-coverage', title: 'Area Coverage', subtitle: 'Find out if we serve your area', intro: 'We are rapidly expanding across Barisal and beyond. Check the areas we currently cover and the ones coming soon.' },
    { slug: 'payment', title: 'Payment', subtitle: 'Pay your bill easily and securely', intro: 'Pay your monthly bill through bKash, Nagad, Rocket or bank transfer. Fast, simple and secure.' },
    { slug: 'about', title: 'About Us', subtitle: 'Connecting Banaripara to the world', intro: 'MaxTopNet is a leading internet service provider dedicated to delivering ultra-fast, reliable connectivity with world-class customer support.' },
    { slug: 'contact', title: 'Contact Us', subtitle: "We'd love to hear from you", intro: 'Have a question or want a new connection? Reach out to our team — we respond fast.' },
  ];
  for (const p of pages) {
    const exists = await Page.findOne({ slug: p.slug });
    if (!exists) await Page.create(p);
  }
  console.log('✓ Pages ensured');

  console.log('\n🎉 Seeding complete!');
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
