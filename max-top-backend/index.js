const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const { crudRouter, singletonRouter } = require('./utils/crudFactory');

// Models
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
const ServiceItem = require('./models/ServiceItem');
const Page = require('./models/Page');

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const bootstrap = require('./bootstrap');
connectDB().then(() => bootstrap());

// --- Auth, upload, messages ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/messages', require('./routes/messages'));

// --- Singletons ---
app.use('/api/settings', singletonRouter(Settings));
app.use('/api/about', singletonRouter(About));
app.use('/api/popup', singletonRouter(PopupBanner));

// --- Collections ---
app.use('/api/hero', crudRouter(HeroSlide));
app.use('/api/offers', crudRouter(OfferBanner));
app.use('/api/services', crudRouter(Service));
app.use('/api/packages', crudRouter(Package));
app.use('/api/features', crudRouter(Feature));
app.use('/api/faqs', crudRouter(Faq));
app.use('/api/reviews', crudRouter(Review));
app.use('/api/partners', crudRouter(Partner));
app.use('/api/areas', crudRouter(Area));
app.use('/api/ftp', crudRouter(FtpLink));
app.use('/api/channels', crudRouter(Channel));
app.use('/api/game-servers', crudRouter(GameServer));
app.use('/api/payment-methods', crudRouter(PaymentMethod));
app.use('/api/service-items', crudRouter(ServiceItem));

// --- Pages (by slug) ---
const pageRouter = express.Router();
pageRouter.get('/:slug', async (req, res) => {
  try {
    let page = await Page.findOne({ slug: req.params.slug });
    if (!page) page = await Page.create({ slug: req.params.slug });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
pageRouter.put('/:slug', require('./middleware/auth').protect, async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, slug: req.params.slug },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(page);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.use('/api/pages', pageRouter);

// Health
app.get('/', (req, res) => res.send('Max Top Backend API is running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
