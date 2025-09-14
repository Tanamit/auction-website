import React, { useState, useEffect } from 'react';
import { Clock, Heart, Eye, User, Gavel, Trophy, DollarSign, Globe } from 'lucide-react';

const AuctionApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bidAmount, setBidAmount] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [language, setLanguage] = useState('en'); // Default เป็นอังกฤษ

  // Translations
  const translations = {
    en: {
      siteTitle: 'AuctionHub',
      login: 'Login',
      heroTitle: 'Thailand\'s #1 Online Auction',
      heroDesc: 'Find rare and valuable items, bid at the best prices',
      statsAuctions: 'Active Auctions',
      statsMembers: 'Members',
      statsValue: 'Trading Value',
      categoriesTitle: 'Product Categories',
      categories: {
        all: 'All',
        electronics: 'Electronics',
        fashion: 'Fashion',
        art: 'Art',
        vehicles: 'Vehicles'
      },
      currentPrice: 'Current Price',
      startingPrice: 'Starting Price',
      bids: 'bids',
      watchers: 'watchers',
      placeBid: 'Place Bid',
      moreThan: 'More than',
      confirm: 'Confirm',
      cancel: 'Cancel',
      seller: 'Seller',
      condition: {
        used: 'Used - Excellent',
        new: 'New',
        vintage: 'Vintage',
        veryGood: 'Used - Very Good'
      },
      features: {
        trustworthy: 'Trustworthy Auctions',
        trustworthyDesc: 'Guaranteed security system and stable payment',
        bestPrice: 'Best Prices',
        bestPriceDesc: 'Get quality products at great value through auctions',
        transparent: 'Transparent',
        transparentDesc: 'Real-time auction tracking and verification'
      },
      footer: {
        description: 'Thailand\'s largest online auction platform',
        menu: 'Menu',
        home: 'Home',
        auctions: 'Auctions',
        howTo: 'How to Use',
        contact: 'Contact Us',
        help: 'Help',
        faq: 'FAQ',
        policy: 'Policy',
        privacy: 'Privacy',
        terms: 'Terms of Service'
      },
      alerts: {
        invalidAmount: 'Please enter a valid amount',
        bidTooLow: 'Bid must be higher than ฿{amount}',
        bidSuccess: 'Bid of ฿{amount} placed successfully!'
      }
    },
    th: {
      siteTitle: 'AuctionHub',
      login: 'เข้าสู่ระบบ',
      heroTitle: 'ประมูลออนไลน์ #1 ของไทย',
      heroDesc: 'ค้นหาสินค้าหายากและมีค่า ประมูลด้วยราคาที่ดีที่สุด',
      statsAuctions: 'รายการประมูล',
      statsMembers: 'สมาชิก',
      statsValue: 'มูลค่าการซื้อขาย',
      categoriesTitle: 'หมวดหมู่สินค้า',
      categories: {
        all: 'ทั้งหมด',
        electronics: 'อิเล็กทรอนิกส์',
        fashion: 'แฟชั่น',
        art: 'งานศิลปะ',
        vehicles: 'ยานพาหนะ'
      },
      currentPrice: 'ราคาปัจจุบัน',
      startingPrice: 'ราคาเริ่มต้น',
      bids: 'ครั้ง',
      watchers: 'ผู้ติดตาม',
      placeBid: 'เสนอราคา',
      moreThan: 'มากกว่า',
      confirm: 'ยืนยัน',
      cancel: 'ยกเลิก',
      seller: 'ผู้ขาย',
      condition: {
        used: 'ใช้แล้ว - สภาพดีมาก',
        new: 'ใหม่',
        vintage: 'วินเทจ',
        veryGood: 'ใช้แล้ว - สภาพดีเยี่ยม'
      },
      features: {
        trustworthy: 'ประมูลที่เชื่อถือได้',
        trustworthyDesc: 'ระบบการันตีความปลอดภัยและการจ่ายเงินที่มั่นคง',
        bestPrice: 'ราคาดีที่สุด',
        bestPriceDesc: 'ได้สินค้าคุณภาพในราคาที่คุ้มค่าจากการประมูล',
        transparent: 'โปร่งใส',
        transparentDesc: 'ติดตามการประมูลแบบเรียลไทม์และตรวจสอบได้'
      },
      footer: {
        description: 'แพลตฟอร์มประมูลออนไลน์ที่ใหญ่ที่สุดในประเทศไทย',
        menu: 'เมนู',
        home: 'หน้าแรก',
        auctions: 'รายการประมูล',
        howTo: 'วิธีการใช้งาน',
        contact: 'ติดต่อเรา',
        help: 'ช่วยเหลือ',
        faq: 'คำถามที่พบบ่อย',
        policy: 'นีติกรรม',
        privacy: 'ความเป็นส่วนตัว',
        terms: 'ข้อกำหนดการใช้งาน'
      },
      alerts: {
        invalidAmount: 'กรุณาใส่จำนวนเงินที่ถูกต้อง',
        bidTooLow: 'ราคาต้องสูงกว่า ฿{amount} ขึ้นไป',
        bidSuccess: 'เสนอราคา ฿{amount} สำเร็จ!'
      }
    }
  };

  // Get current translation
  const t = translations[language];

  // Mock data สำหรับสินค้าประมูล
  const [auctionItems] = useState([
    {
      id: 1,
      title: {
        en: 'Vintage Rolex Watch',
        th: 'นาฬิกา Rolex วินเทจ'
      },
      description: {
        en: 'Vintage Rolex watch in beautiful condition with box and warranty',
        th: 'นาฬิกา Rolex วินเทจ สภาพสวย พร้อมกล่องและใบรับประกัน'
      },
      currentBid: 45000,
      startingBid: 25000,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      bidCount: 23,
      watchers: 156,
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      seller: 'Premium_Watches',
      condition: 'used'
    },
    {
      id: 2,
      title: {
        en: 'MacBook Pro M3 2024',
        th: 'MacBook Pro M3 2024'
      },
      description: {
        en: 'MacBook Pro 16" M3 Max 64GB RAM 2TB SSD brand new in box',
        th: 'MacBook Pro 16" M3 Max 64GB RAM 2TB SSD ใหม่ในกล่อง'
      },
      currentBid: 89000,
      startingBid: 70000,
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
      bidCount: 45,
      watchers: 234,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
      seller: 'TechDealer_Pro',
      condition: 'new'
    },
    {
      id: 3,
      title: {
        en: 'Thai Ancient Painting',
        th: 'จิตรกรรมไทยโบราณ'
      },
      description: {
        en: 'Ancient Thai painting over 100 years old with certificate of authenticity',
        th: 'ภาพเขียนไทยโบราณ อายุกว่า 100 ปี มีใบรับรองความแท้'
      },
      currentBid: 15500,
      startingBid: 8000,
      endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
      bidCount: 12,
      watchers: 78,
      category: 'art',
      image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop',
      seller: 'AntiqueThai',
      condition: 'vintage'
    },
    {
      id: 4,
      title: {
        en: 'BMW X5 2022',
        th: 'รถยนต์ BMW X5 2022'
      },
      description: {
        en: 'BMW X5 xDrive40i 2022 with only 15,000 km, dealer maintained',
        th: 'BMW X5 xDrive40i ปี 2022 วิ่งเพียง 15,000 กม. ประวัติศูนย์'
      },
      currentBid: 2850000,
      startingBid: 2500000,
      endTime: new Date(Date.now() + 72 * 60 * 60 * 1000),
      bidCount: 8,
      watchers: 45,
      category: 'vehicles',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      seller: 'LuxuryCars_Bangkok',
      condition: 'veryGood'
    }
  ]);

  const categories = [
    { id: 'all', icon: '🔥' },
    { id: 'electronics', icon: '📱' },
    { id: 'fashion', icon: '👔' },
    { id: 'art', icon: '🎨' },
    { id: 'vehicles', icon: '🚗' }
  ];

  // อัพเดทเวลาทุกๆ วินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // คำนวณเวลาที่เหลือ
  const getTimeRemaining = (endTime) => {
    const now = new Date();
    const difference = endTime.getTime() - now.getTime();
    
    if (difference <= 0) return language === 'th' ? 'หมดเวลา' : 'Ended';
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    if (language === 'th') {
      if (days > 0) return `${days} วัน ${hours} ชม.`;
      if (hours > 0) return `${hours} ชม. ${minutes} นาที`;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
      if (days > 0) return `${days}d ${hours}h`;
      if (hours > 0) return `${hours}h ${minutes}m`;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  // กรองสินค้าตามหมวดหมู่
  const filteredItems = selectedCategory === 'all' 
    ? auctionItems 
    : auctionItems.filter(item => item.category === selectedCategory);

  // จัดการการเสนอราคา
  const handleBid = (itemId) => {
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      alert(t.alerts.invalidAmount);
      return;
    }
    
    const item = auctionItems.find(i => i.id === itemId);
    if (parseFloat(bidAmount) <= item.currentBid) {
      alert(t.alerts.bidTooLow.replace('{amount}', item.currentBid.toLocaleString()));
      return;
    }
    
    alert(t.alerts.bidSuccess.replace('{amount}', parseFloat(bidAmount).toLocaleString()));
    setBidAmount('');
    setSelectedItem(null);
  };

  // เปลี่ยนภาษา
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Gavel className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">{t.siteTitle}</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{currentTime.toLocaleString(language === 'th' ? 'th-TH' : 'en-US')}</span>
              </div>
              
              {/* Language Toggle Button */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="font-medium">{language === 'en' ? 'ไทย' : 'EN'}</span>
              </button>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                {t.login}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-4">{t.heroTitle}</h2>
            <p className="text-xl mb-6">{t.heroDesc}</p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-sm opacity-90">{t.statsAuctions}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">45,678</div>
                <div className="text-sm opacity-90">{t.statsMembers}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">฿2.5M</div>
                <div className="text-sm opacity-90">{t.statsValue}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">{t.categoriesTitle}</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                <span>{category.icon}</span>
                <span>{t.categories[category.id]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Auction Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title[language]}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {getTimeRemaining(item.endTime)}
                </div>
                <button className="absolute top-2 left-2 bg-white bg-opacity-90 p-1 rounded-full hover:bg-opacity-100 transition-all">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title[language]}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description[language]}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{t.currentPrice}</span>
                    <span className="text-lg font-bold text-green-600">
                      ฿{item.currentBid.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{t.startingPrice}: ฿{item.startingBid.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{item.bidCount} {t.bids}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{item.watchers} {t.watchers}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {t.placeBid}
                  </button>
                  
                  {selectedItem === item.id && (
                    <div className="border-t pt-3 space-y-2">
                      <input
                        type="number"
                        placeholder={`${t.moreThan} ฿${item.currentBid.toLocaleString()}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleBid(item.id)}
                          className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          {t.confirm}
                        </button>
                        <button 
                          onClick={() => setSelectedItem(null)}
                          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors text-sm"
                        >
                          {t.cancel}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>{t.seller}: {item.seller}</span>
                    <span>{t.condition[item.condition]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">{t.features.trustworthy}</h3>
            <p className="text-gray-600 text-sm">{t.features.trustworthyDesc}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">{t.features.bestPrice}</h3>
            <p className="text-gray-600 text-sm">{t.features.bestPriceDesc}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Eye className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">{t.features.transparent}</h3>
            <p className="text-gray-600 text-sm">{t.features.transparentDesc}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gavel className="h-6 w-6" />
                <span className="font-bold text-lg">{t.siteTitle}</span>
              </div>
              <p className="text-gray-300 text-sm">
                {t.footer.description}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t.footer.menu}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">{t.footer.home}</a></li>
                <li><a href="#" className="hover:text-white">{t.footer.auctions}</a></li>
                <li><a href="#" className="hover:text-white">{t.footer.howTo}</a></li>
                <li><a href="#" className="hover:text-white">{t.footer.contact}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t.categoriesTitle}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">{t.categories.electronics}</a></li>
                <li><a href="#" className="hover:text-white">{t.categories.fashion}</a></li>
                <li><a href="#" className="hover:text-white">{t.categories.art}</a></li>
                <li><a href="#" className="hover:text-white">{t.categories.vehicles}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{t.footer.help}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">{t.footer.faq}</a></li>
                <li><a href="#" className="hover:text-white">{t.footer.policy}</a></li>
                <li><a href="#" className="hover:text-white">{t.footer.privacy}</a></li>
                <li><a href="#" className="hover:text-white">{t.footer.terms}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-300">
            © 2025 {t.siteTitle}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuctionApp;