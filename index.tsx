
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Menu, X, Phone, Mail, MapPin, Clock, 
  ChevronRight, ZoomIn, ArrowLeft, Send,
  Star, CheckCircle2, Quote
} from 'lucide-react';

// --- Data Types ---
type Category = 'Carpet' | 'Vinyl' | 'Turf';
type CarpetLevel = 'Level 1' | 'Level 2' | 'Untamed Collection';

interface Product {
  id: string;
  name: string;
  category: Category;
  subCategory?: CarpetLevel;
  imageUrl: string;
  description?: string;
}

interface Review {
  name: string;
  text: string;
  rating: number;
}

// --- Constants & Data ---
const LOGO_URL = "https://i.postimg.cc/yYxVB9fZ/LOGOO.avif";
const HOME_BACK = "https://i.postimg.cc/XJ1zgZ9d/BACK.avif";
const ABOUT_IMAGE = "https://i.postimg.cc/cC5sq4wJ/ABOUT-US-IMAGE.avif";
const STORE_BUILDING = "https://i.postimg.cc/mkWnPx4p/BUILDING.jpg";

const REVIEWS: Review[] = [
  { name: "Elizabeth", rating: 5, text: "This is my second time working with the team! They fixed odd space planning perfectly. easy and seamless - the home turned out better than we could have imagined." },
  { name: "Laurie", rating: 5, text: "Expertise, beautiful design implementation and always being available to answer my questions was what kept this project on track with an end result that I think is stunning." },
  { name: "Beth", rating: 5, text: "I could not have been happier with my experience. The team was always responsive to any questions, responding in less than 24 hours." },
  { name: "Amy", rating: 5, text: "Is there a way to give more than 5 stars??? The discovery process was extremely detailed and they managed to completely capture my style!" },
  { name: "Morgan", rating: 5, text: "Our office now feels like it should have always been this way! Katelyn and Madison were amazing to work with and blended our styles beautifully." },
  { name: "Anita", rating: 5, text: "Hiring them was one of the wisest decisions we made because they created the perfect look and feel throughout. Blown away with how everything came together." },
  { name: "Veronica", rating: 5, text: "Professional in every detail from communication to timeliness. The design and installation process was very easy. Efficiency at each step." },
  { name: "Michael", rating: 5, text: "One of the best decisions we made. They helped us pick materials, finishes, fixtures, etc. and made the design process stress free and exciting." },
  { name: "Bethany", rating: 5, text: "Hired them for Petite Design services. She delivered LITERALLY THE PERFECT PLAN in 3 weeks for me to execute. Truly the office of my dreams." },
  { name: "Rachel", rating: 5, text: "A true joy and pleasure! Organized, professional, and upfront. We are so very thankful for them turning our new house into a home." },
  { name: "Karin", rating: 5, text: "Working with them was seamless. The amount of time we saved was priceless. I will definitely use them again and highly recommend!" },
  { name: "Kelsey", rating: 5, text: "Hiring them was the best decision. From paint colors to furniture selection, they helped create the most beautiful home we could ever dream of." },
  { name: "Mackenzie", rating: 5, text: "Great experience! They redesigned our kitchen, family room, living room, and dining room—and we couldn’t be happier with the result." },
  { name: "Stacey", rating: 5, text: "Outstanding company. Friendly, professional, and 100% on the ball. Even as an out of state client, the experience was perfect." },
  { name: "Craig", rating: 5, text: "Talented and made the process very easy—organized and efficient from beginning to end. I can’t recommend them enough!" },
  { name: "Brett", rating: 5, text: "Absolutely amazing! Worked with her for petite service and cannot say enough great things about the process!" },
  { name: "Aaron", rating: 5, text: "Collaborative from start to finish. I appreciated their professionalism and creative abilities. The kitchen looks incredible!" },
  { name: "Danny", rating: 5, text: "Extremely responsive, and always proactive in helping us stay ahead of things. We could not have completed our project without them." },
  { name: "Carrie", rating: 5, text: "Knocked it out of the park with the install of three rooms! Exceeded our expectations and worth every penny!" },
  { name: "Kaitlin", rating: 5, text: "Engagement and design process was extremely well communicated. Stayed right on track with all deadlines. Beautiful end result." },
  { name: "Andrea", rating: 5, text: "Took our uncut diamond and made her sparkle. Vision delivered with an extra layer of pizzazz! Cost savings were unbelievable too." },
  { name: "Lauren", rating: 5, text: "Captured my inspiration perfectly and both rooms flow together seamlessly. They are beyond perfect." }
];

const PRODUCTS: Product[] = [
  // Carpet Level 1
  { id: 'l1-berry-pink', name: 'Berry Pink', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/nMb1S365/Berry-Pink.jpg' },
  { id: 'l1-black', name: 'Black', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/h4zWwhkh/Black.jpg' },
  { id: 'l1-brown', name: 'Brown', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/XXSg1sTm/Brown.jpg' },
  { id: 'l1-burgundy', name: 'Burgundy', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/0y948NB6/Burgundy.jpg' },
  { id: 'l1-gray', name: 'Gray', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/dtPXx6Rn/Gray.jpg' },
  { id: 'l1-green', name: 'Green', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/jC0h3MG1/Green.jpg' },
  { id: 'l1-ivory', name: 'Ivory', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/bwLBdhXf/Ivory.png' },
  { id: 'l1-navy-blue', name: 'Navy Blue', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/7PTd9dzm/Navy-Blue.jpg' },
  { id: 'l1-purple', name: 'Purple', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/Z0tLsw1G/Purple.jpg' },
  { id: 'l1-red', name: 'Red', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/XNGShXRZ/Red.jpg' },
  { id: 'l1-royal-blue', name: 'Royal Blue', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/3r456Wsx/Royal-Blue.jpg' },
  { id: 'l1-silver', name: 'Silver', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/bY2WgWnL/Silver.jpg' },
  { id: 'l1-white', name: 'White', category: 'Carpet', subCategory: 'Level 1', imageUrl: 'https://i.postimg.cc/mZzfqhvk/White.jpg' },

  // Carpet Level 2
  { id: 'l2-aqua-breeze', name: 'Aqua Breeze', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/JzPR8vPj/Aqua-Breeze.jpg' },
  { id: 'l2-ballerina', name: 'Ballerina', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/4xBXGqBn/Ballerina.jpg' },
  { id: 'l2-carrot-kick', name: 'Carrot Kick', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/L8NmSwNg/Carrot-Kick.jpg' },
  { id: 'l2-cherry-apple', name: 'Cherry Apple', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/nh0nxg0C/Cherry-Apple.jpg' },
  { id: 'l2-clover', name: 'Clover', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/3xn3hVng/Clover.jpg' },
  { id: 'l2-coal', name: 'Coal', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/jSZRTmZQ/Coal.jpg' },
  { id: 'l2-dusty-violet', name: 'Dusty Violet', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/bw3qPW3G/Dusty-Violet.jpg' },
  { id: 'l2-electric-lime', name: 'Electric Lime', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/5tyb2gRY/Electric-Lime.jpg' },
  { id: 'l2-purple-rain', name: 'Purple Rain', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/MpdzwNdY/Purple-Rain.jpg' },
  { id: 'l2-skyline-blue', name: 'Skyline Blue', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/wj09zZ0m/Skyline-Blue.jpg' },
  { id: 'l2-sunny-side', name: 'Sunny Side', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/htpKn6p8/Sunny-Side.jpg' },
  { id: 'l2-sweet-sassy', name: 'Sweet & Sassy', category: 'Carpet', subCategory: 'Level 2', imageUrl: 'https://i.postimg.cc/0yc9vFcz/Sweet-Sassy.jpg' },

  // Untamed Collection
  { id: 'untamed-flame-spots', name: 'Flame Spots', category: 'Carpet', subCategory: 'Untamed Collection', imageUrl: 'https://i.postimg.cc/vmYDL5SL/FLAME-SPOTS.avif' },
  { id: 'untamed-jungle-jade', name: 'Jungle Jade', category: 'Carpet', subCategory: 'Untamed Collection', imageUrl: 'https://i.postimg.cc/5t4jq8ks/JUNGLE-JADE.avif' },
  { id: 'untamed-savanna-gold', name: 'Savanna Gold', category: 'Carpet', subCategory: 'Untamed Collection', imageUrl: 'https://i.postimg.cc/bvydH1F3/SAVANNA-GOLD.avif' },
  { id: 'untamed-wild-rose', name: 'Wild Rose', category: 'Carpet', subCategory: 'Untamed Collection', imageUrl: 'https://i.postimg.cc/43fnbpFz/WILD-ROSE.avif' },

  // Vinyl
  { id: 'vinyl-charcoal-wood', name: 'Charcoal Wood', category: 'Vinyl', imageUrl: 'https://i.postimg.cc/Xqgyb3qZ/Charcoal-Wood.jpg' },
  { id: 'vinyl-chestnut', name: 'Chestnut', category: 'Vinyl', imageUrl: 'https://i.postimg.cc/Rh0vWzGF/Chestnut.jpg' },
  { id: 'vinyl-cocoa-wood', name: 'Cocoa Wood', category: 'Vinyl', imageUrl: 'https://i.postimg.cc/HLJ57fZ0/Cocoa-Wood.avif' },
  { id: 'vinyl-oatwood', name: 'Oatwood', category: 'Vinyl', imageUrl: 'https://i.postimg.cc/PJH89NXh/Oatwood.jpg' },
  { id: 'vinyl-silver-stone', name: 'Silver Stone', category: 'Vinyl', imageUrl: 'https://i.postimg.cc/SR4z3jSS/Silver-Stone.jpg' },
  { id: 'vinyl-cinder-brown', name: 'Cinder Brown', category: 'Vinyl', imageUrl: 'https://i.postimg.cc/T2kRZpYY/Cinder-Brown.jpg' },

  // Turf
  { id: 'turf-astro', name: 'Astro Turf', category: 'Turf', imageUrl: 'https://i.postimg.cc/QdDh756N/Astro-Turf.avif' },
  { id: 'turf-verdant', name: 'Verdant Turf', category: 'Turf', imageUrl: 'https://i.postimg.cc/wjzgNJWd/Verdant-Turf.avif' },
];

const GALLERY_INSPIRATION = [
  'https://i.postimg.cc/W4LVVZZs/1.avif',
  'https://i.postimg.cc/TPV63Pjx/2.jpg',
  'https://i.postimg.cc/25QDS5dr/3.jpg',
  'https://i.postimg.cc/SKF4499q/4.jpg'
];

const SUPER_BOWL_GALLERY = [
  'https://i.postimg.cc/RFqq6fgy/1.jpg',
  'https://i.postimg.cc/rmzz0Wf0/2.jpg',
  'https://i.postimg.cc/250VST7Z/3.jpg',
  'https://i.postimg.cc/s2TvgK4r/4.jpg',
  'https://i.postimg.cc/MG9vptbg/5.webp',
  'https://i.postimg.cc/ZqbWmX3X/6.jpg',
  'https://i.postimg.cc/BncjdJ8p/7.jpg',
  'https://i.postimg.cc/s2jMzbSq/8.jpg',
  'https://i.postimg.cc/vmY4yC9S/9.jpg'
];

const STORE_IMAGES = [
  'https://i.postimg.cc/VNpDp90X/OUR-STORE-1.png',
  'https://i.postimg.cc/rp3Q3GRW/OUR-STORE-2.png',
  'https://i.postimg.cc/MGNdN0fm/OUR-STORE-3.png'
];

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Our Services', id: 'services' },
    { name: 'Contact Us', id: 'contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <img src={LOGO_URL} alt="Amigos Floors" className="h-14 w-auto rounded shadow-sm" />
            <span className="ml-3 font-black text-xl tracking-tighter text-maroon-700 hidden sm:block">AMIGOS FLOORS</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => { setCurrentPage(link.id); setIsOpen(false); }}
                className={`text-[10px] font-black tracking-widest uppercase transition-all hover:text-maroon-600 ${
                  currentPage.startsWith(link.id) ? 'text-maroon-700 border-b-2 border-maroon-700 pb-1' : 'text-gray-600'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-4">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => { setCurrentPage(link.id); setIsOpen(false); }}
                className={`block w-full text-left px-4 py-4 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors ${
                  currentPage.startsWith(link.id) ? 'bg-maroon-50 text-maroon-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: string) => void }) => (
  <footer className="bg-gray-950 text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1">
        <img src={LOGO_URL} alt="Amigos Floors" className="h-16 w-auto mb-6 rounded bg-white p-1" />
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
          Professional flooring solutions in Dallas, TX. Bringing excellence to commercial and residential spaces since 1999.
        </p>
      </div>
      <div>
        <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-maroon-400">Navigation</h4>
        <ul className="space-y-4 text-gray-400 text-sm font-medium">
          <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Home</button></li>
          <li><button onClick={() => setCurrentPage('products')} className="hover:text-white transition-colors">Products</button></li>
          <li><button onClick={() => setCurrentPage('reviews')} className="hover:text-white transition-colors">Reviews</button></li>
          <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors">Our Services</button></li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-maroon-400">Contact</h4>
        <ul className="space-y-4 text-gray-400 text-sm font-medium">
          <li className="flex items-center gap-3"><Phone size={18} className="text-maroon-500" /> (972) 484-0440</li>
          <li className="flex items-center gap-3 leading-relaxed"><MapPin size={18} className="text-maroon-500 flex-shrink-0" /> 10920 Dennis Rd.<br/>Dallas TX 75229</li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-maroon-400">Availability</h4>
        <ul className="space-y-3 text-gray-400 text-sm font-medium">
          <li className="flex justify-between border-b border-gray-800 pb-2"><span>Mon - Fri:</span> <span className="text-white">7am - 6pm</span></li>
          <li className="flex justify-between border-b border-gray-800 pb-2"><span>Saturday:</span> <span className="text-white">8am - 3pm</span></li>
          <li className="flex justify-between pb-2 text-maroon-300 font-bold uppercase"><span>Sunday:</span> <span>CLOSED</span></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-gray-900 text-center">
      <p className="text-xs text-gray-500 tracking-widest uppercase font-semibold">
        &copy; {new Date().getFullYear()} Amigos Floors. Site Crafted with Excellence.
      </p>
    </div>
  </footer>
);

const Home = ({ setCurrentPage }: { setCurrentPage: (p: string) => void }) => (
  <div className="flex flex-col">
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={HOME_BACK} alt="Flooring Background" className="w-full h-full object-cover scale-105" />
        {/* Layered overlay for better readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/70" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <span className="inline-block px-4 py-1.5 bg-maroon-700 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-2xl">
          Established 1999
        </span>
        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tighter uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
          LET US BRING YOUR<br/><span className="text-maroon-500 italic">VISION</span> TO LIFE
        </h1>
        <p className="text-lg md:text-2xl text-white mb-12 max-w-2xl mx-auto font-black leading-relaxed drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          Premier flooring installation and high-quality materials for Dallas's most ambitious projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button 
            onClick={() => setCurrentPage('contact')}
            className="w-full sm:w-auto bg-maroon-700 hover:bg-maroon-800 text-white px-10 py-5 rounded-2xl text-base font-black uppercase tracking-widest transition-all transform hover:scale-105 shadow-2xl active:scale-95"
          >
            Get Free Estimate
          </button>
          <button 
            onClick={() => setCurrentPage('products')}
            className="w-full sm:w-auto bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border-2 border-white/40 px-10 py-5 rounded-2xl text-base font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl"
          >
            Browse Collections
          </button>
        </div>
      </div>
    </section>

    {/* Quick Feature Grid */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-maroon-100 rounded-3xl -rotate-2"></div>
            <img src={ABOUT_IMAGE} alt="Quality Workmanship" className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover" />
            <div className="absolute -bottom-10 -right-10 bg-maroon-700 text-white p-10 rounded-3xl shadow-2xl hidden md:block">
              <span className="block text-5xl font-black mb-1">25+</span>
              <span className="text-xs font-black uppercase tracking-widest opacity-80">Years of Mastery</span>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight uppercase">
              Craftsmanship <br/>Built on <span className="text-maroon-700">Trust</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 font-medium">
              Transforming your space requires more than just materials—it requires a partner dedicated to your vision. Since 1999, we've delivered impeccable flooring solutions with a commitment to budget and deadlines.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Commercial', desc: 'Scaleable events & office solutions.' },
                { title: 'Residential', desc: 'Luxury home upgrades & comfort.' },
                { title: 'Expert Team', desc: 'Master installers with years of skill.' },
                { title: 'Guaranteed', desc: 'Quality that stands the test of time.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0"><CheckCircle2 className="text-maroon-700" size={24} /></div>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase tracking-tighter">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const Products = ({ setCurrentPage }: { setCurrentPage: (p: string) => void }) => {
  const [sectionLimits, setSectionLimits] = useState<Record<string, number>>({
    'l1': 4,
    'l2': 4,
    'untamed': 4,
    'vinyl': 4,
    'turf': 4
  });

  const toggleLimit = (key: string) => {
    setSectionLimits(prev => ({ ...prev, [key]: prev[key] === 4 ? 999 : 4 }));
  };

  const categorized = useMemo(() => {
    return {
      l1: PRODUCTS.filter(p => p.subCategory === 'Level 1'),
      l2: PRODUCTS.filter(p => p.subCategory === 'Level 2'),
      untamed: PRODUCTS.filter(p => p.subCategory === 'Untamed Collection'),
      vinyl: PRODUCTS.filter(p => p.category === 'Vinyl'),
      turf: PRODUCTS.filter(p => p.category === 'Turf'),
    };
  }, []);

  const Section = ({ title, items, limitKey }: { title: string, items: Product[], limitKey: string }) => {
    if (items.length === 0) return null;
    const currentLimit = sectionLimits[limitKey];
    const isExpanded = currentLimit > 4;
    const displayItems = items.slice(0, currentLimit);

    return (
      <div className="mb-24">
        <div className="flex justify-between items-end mb-8 border-b-4 border-maroon-700 pb-4">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">{title}</h2>
          {items.length > 4 && (
            <button 
              onClick={() => toggleLimit(limitKey)}
              className="px-6 py-2 bg-maroon-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-maroon-800 transition-all shadow-md"
            >
              {isExpanded ? 'View Less' : `View All ${items.length}`}
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {displayItems.map((p) => (
            <div 
              key={p.id}
              onClick={() => setCurrentPage(`product-detail-${p.id}`)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-4 shadow-md group-hover:shadow-2xl transition-all">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-maroon-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                  <ZoomIn size={28} className="text-white" />
                </div>
              </div>
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-tighter truncate">{p.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-20">
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Collections</h1>
        <p className="text-xl text-gray-500 font-medium">Explore our premium selection categorized for your convenience.</p>
      </header>

      <Section title="Event Carpet - Level 1" items={categorized.l1} limitKey="l1" />
      <Section title="Event Carpet - Level 2" items={categorized.l2} limitKey="l2" />
      <Section title="Untamed Collection" items={categorized.untamed} limitKey="untamed" />
      <Section title="Luxury Vinyl" items={categorized.vinyl} limitKey="vinyl" />
      <Section title="Premium Turf" items={categorized.turf} limitKey="turf" />

      <div className="mt-24 p-12 bg-maroon-50 rounded-[2.5rem] border-2 border-maroon-100">
        <h4 className="text-xl font-black text-maroon-900 uppercase mb-3">Availability Note</h4>
        <p className="text-maroon-800/70 leading-relaxed text-sm font-medium">
          Level 2 and Untamed Collection carpets are special-order items. Typical lead time is approximately 10 business days. For urgent projects, please contact us—we often have expedited options or similar in-stock alternatives available.
        </p>
      </div>
    </div>
  );
};

const ProductDetail = ({ id, setCurrentPage }: { id: string, setCurrentPage: (p: string) => void }) => {
  const product = PRODUCTS.find(p => p.id === id);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) return <div className="pt-32 text-center font-black">PRODUCT NOT FOUND</div>;

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <button 
        onClick={() => window.history.back()} 
        className="mb-12 inline-flex items-center gap-2 text-maroon-700 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all"
      >
        <ArrowLeft size={18} /> Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div 
          className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 bg-gray-50 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className={`w-full transition-transform duration-700 ease-out ${isZoomed ? 'scale-150' : 'scale-100'}`} 
          />
          {!isZoomed && (
            <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
                <ZoomIn size={18} className="text-maroon-700" />
                <span className="text-xs font-black uppercase tracking-widest text-maroon-900">Click to Inspect</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="inline-block px-3 py-1 bg-maroon-50 text-maroon-700 text-[10px] font-black uppercase tracking-widest rounded-lg mb-6 self-start">
            {product.subCategory || product.category}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9] uppercase">
            {product.name}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-12 font-medium italic">
            "Experience superior quality and texture with our {product.name} {product.category.toLowerCase()} collection. A standard-setter for Dallas projects."
          </p>
          
          <button 
            onClick={() => setCurrentPage('contact')}
            className="w-full bg-maroon-700 text-white py-6 rounded-[2rem] font-black text-base uppercase tracking-[0.2em] hover:bg-maroon-800 transition-all shadow-2xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
          >
            Request Pricing & Quote <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ReviewsPage = () => (
  <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
      <div className="lg:col-span-1">
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter uppercase">TRUSTED BY DALLAS</h1>
        <div className="p-8 bg-gray-50 rounded-3xl border-2 border-gray-100 shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
            </div>
            <span className="text-3xl font-black">4.9/5</span>
          </div>
          <p className="font-bold text-gray-600">Based on 118 verified Google reviews.</p>
          <div className="mt-8 flex flex-col gap-3">
            {['Expertise', 'Quality', 'Professionalism', 'Communication'].map(feat => (
              <div key={feat} className="flex justify-between items-center bg-white px-4 py-2 rounded-xl">
                <span className="text-xs font-black uppercase tracking-widest">{feat}</span>
                <CheckCircle2 size={16} className="text-green-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 columns-1 md:columns-2 gap-8 space-y-8">
        {REVIEWS.map((rev, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border-2 border-gray-50 shadow-sm break-inside-avoid relative hover:shadow-xl transition-all group">
            <Quote className="absolute top-4 right-4 text-maroon-50 opacity-10 group-hover:opacity-20 transition-opacity" size={48} />
            <div className="flex text-yellow-500 mb-4">
              {[...Array(rev.rating)].map((_, j) => <Star key={j} fill="currentColor" size={12} />)}
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 font-medium italic">"{rev.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-maroon-700 rounded-full flex items-center justify-center text-white font-black text-xs">
                {rev.name.charAt(0)}
              </div>
              <span className="font-black text-sm uppercase tracking-tighter text-gray-900">{rev.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Gallery = ({ setCurrentPage, subPage }: { setCurrentPage: (p: string) => void, subPage?: string }) => {
  const images = subPage === 'events' ? SUPER_BOWL_GALLERY : subPage === 'store' ? STORE_IMAGES : GALLERY_INSPIRATION;
  
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 uppercase tracking-tighter">GALLERY</h1>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { id: 'gallery', label: 'Inspiration' },
            { id: 'gallery-store', label: 'Our Showroom' },
            { id: 'gallery-events', label: 'Major Events' }
          ].map((btn) => (
            <button 
              key={btn.id}
              onClick={() => setCurrentPage(btn.id)} 
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${
                (subPage === btn.id.replace('gallery-', '') || (btn.id === 'gallery' && !subPage))
                  ? 'bg-maroon-700 text-white border-maroon-700' 
                  : 'bg-white text-gray-400 border-gray-100 hover:border-maroon-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {images.map((url, i) => (
          <div key={i} className="group relative rounded-3xl overflow-hidden shadow-lg bg-gray-50 break-inside-avoid">
            <img src={url} alt={`Gallery ${i}`} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
            <div className="absolute inset-0 bg-maroon-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="text-white" size={40} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Services = () => (
  <div className="pt-32 pb-24 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
        <div>
          <span className="text-maroon-700 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Unmatched Expertise</span>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-10 tracking-tighter leading-[0.9] uppercase">TRANSFORMING<br/>YOUR SPACE</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            At Amigos Floors, we are dedicated to transforming spaces through high-quality flooring installations. Our mission is to deliver exceptional service and craftsmanship to our clients. 
          </p>
          <p className="text-gray-500 leading-relaxed mb-10 font-medium italic border-l-4 border-maroon-700 pl-8">
            "Founded in 1999, we've believed in building lasting relationships with our clients and ensuring their visions come to life. We ensure every project is completed on time and within budget."
          </p>
        </div>
        <img src={ABOUT_IMAGE} alt="About Us" className="rounded-[3rem] shadow-2xl w-full h-[600px] object-cover" />
      </div>

      <div className="bg-maroon-700 rounded-[4rem] p-12 md:p-24 text-white">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tighter uppercase">Comprehensive Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { title: 'Commercial Mastery', desc: 'From stadiums to corporate headquarters, we scale our precision to meet any commercial footprint.' },
            { title: 'Residential Elegance', desc: 'Home renovations designed for life. Durability meets luxury in every square inch of your sanctuary.' },
            { title: 'Project Consulting', desc: 'Technical guidance on moisture barriers, subfloor prep, and high-traffic material performance.' }
          ].map((s, i) => (
            <div key={i} className="group">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-maroon-700 transition-all duration-500">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-black mb-6 uppercase tracking-tight">{s.title}</h4>
              <p className="text-maroon-100 text-base leading-relaxed font-medium opacity-80">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-32 pb-24 px-6 bg-maroon-700 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">
        <div className="text-white">
          <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9] uppercase">STAY IN<br/><span className="text-maroon-200">TOUCH.</span></h1>
          <p className="text-xl text-maroon-100 mb-16 max-w-md font-medium">Ready for your free estimate? Our experts are standing by to start your transformation.</p>
          
          <div className="space-y-10">
            {[
              { icon: <Mail size={24} />, label: 'Email', value: 'amigosfloors@hotmail.com' },
              { icon: <Phone size={24} />, label: 'Phone', value: '(972) 484-0440' },
              { icon: <MapPin size={24} />, label: 'HQ', value: '10920 Dennis Rd. Dallas TX 75229' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="p-4 bg-white/10 rounded-2xl group-hover:bg-white group-hover:text-maroon-700 transition-all"><div>{item.icon}</div></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-maroon-300 mb-1">{item.label}</p>
                  <p className="text-lg font-bold group-hover:text-white transition-colors">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl">
          {submitted ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 border-4 border-green-100">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tight text-gray-900">Success!</h2>
              <p className="text-gray-500 text-lg mb-10">Our estimating team will reach out within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-maroon-700 font-black uppercase tracking-widest text-xs border-b-2 border-maroon-700 pb-1">Send Another Request</button>
            </div>
          ) : (
            <>
              <h3 className="text-3xl font-black text-gray-900 mb-10 uppercase tracking-tight">Request Estimate</h3>
              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute top-3 left-4">First Name *</label>
                    <input type="text" placeholder="Emily" required className="w-full pl-4 pr-4 pt-8 pb-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-maroon-100 focus:outline-none focus:bg-white transition-all font-bold" />
                  </div>
                  <div className="relative">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute top-3 left-4">Last Name</label>
                    <input type="text" placeholder="Smith" className="w-full pl-4 pr-4 pt-8 pb-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-maroon-100 focus:outline-none focus:bg-white transition-all font-bold" />
                  </div>
                </div>
                <div className="relative">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 absolute top-3 left-4">Email Address *</label>
                  <input type="email" placeholder="name@example.com" required className="w-full pl-4 pr-4 pt-8 pb-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-maroon-100 focus:outline-none focus:bg-white transition-all font-bold" />
                </div>
                <button type="submit" className="w-full bg-maroon-700 text-white py-6 rounded-[2rem] font-black text-base uppercase tracking-[0.2em] hover:bg-maroon-800 transition-all shadow-2xl flex items-center justify-center gap-3">
                  Submit Request <Send size={20} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// --- App Root ---

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link');
    link.rel = 'icon';
    link.href = LOGO_URL;
    document.head.appendChild(link);
  }, [currentPage]);

  const renderPage = () => {
    if (currentPage === 'home') return <Home setCurrentPage={setCurrentPage} />;
    if (currentPage === 'products') return <Products setCurrentPage={setCurrentPage} />;
    if (currentPage === 'gallery') return <Gallery setCurrentPage={setCurrentPage} />;
    if (currentPage === 'gallery-store') return <Gallery setCurrentPage={setCurrentPage} subPage="store" />;
    if (currentPage === 'gallery-events') return <Gallery setCurrentPage={setCurrentPage} subPage="events" />;
    if (currentPage === 'reviews') return <ReviewsPage />;
    if (currentPage === 'services') return <Services />;
    if (currentPage === 'contact') return <Contact />;
    
    if (currentPage.startsWith('product-detail-')) {
      const id = currentPage.replace('product-detail-', '');
      return <ProductDetail id={id} setCurrentPage={setCurrentPage} />;
    }

    return <Home setCurrentPage={setCurrentPage} />;
  };

  return (
    <div className="min-h-screen bg-white selection:bg-maroon-200 selection:text-maroon-900 antialiased">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="min-h-screen">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
