import React, { useState, useEffect } from 'react';
import { Clock, Heart, Eye, User, Gavel, Trophy, DollarSign } from 'lucide-react';

const AuctionApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bidAmount, setBidAmount] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock data สำหรับสินค้าประมูล
  const [auctionItems] = useState([
    {
      id: 1,
      title: 'Vintage Rolex Watch',
      description: 'นาฬิกา Rolex วินเทจ สภาพสวย พร้อมกล่องและใบรับประกัน',
      currentBid: 45000,
      startingBid: 25000,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      bidCount: 23,
      watchers: 156,
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      seller: 'Premium_Watches',
      condition: 'ใช้แล้ว - สภาพดีมาก'
    },
    {
      id: 2,
      title: 'MacBook Pro M3 2024',
      description: 'MacBook Pro 16" M3 Max 64GB RAM 2TB SSD ใหม่ในกล่อง',
      currentBid: 89000,
      startingBid: 70000,
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
      bidCount: 45,
      watchers: 234,
      category: 'electronics',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
      seller: 'TechDealer_Pro',
      condition: 'ใหม่'
    },
    {
      id: 3,
      title: 'จิตรกรรมไทยโบราณ',
      description: 'ภาพเขียนไทยโบราณ อายุกว่า 100 ปี มีใบรับรองความแท้',
      currentBid: 15500,
      startingBid: 8000,
      endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
      bidCount: 12,
      watchers: 78,
      category: 'art',
      image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop',
      seller: 'AntiqueThai',
      condition: 'วินเทจ'
    },
    {
      id: 4,
      title: 'รถยนต์ BMW X5 2022',
      description: 'BMW X5 xDrive40i ปี 2022 วิ่งเพียง 15,000 กม. ประวัติศูนย์',
      currentBid: 2850000,
      startingBid: 2500000,
      endTime: new Date(Date.now() + 72 * 60 * 60 * 1000),
      bidCount: 8,
      watchers: 45,
      category: 'vehicles',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      seller: 'LuxuryCars_Bangkok',
      condition: 'ใช้แล้ว - สภาพดีเยี่ยม'
    }
  ]);

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: '🔥' },
    { id: 'electronics', name: 'อิเล็กทรอนิกส์', icon: '📱' },
    { id: 'fashion', name: 'แฟชั่น', icon: '👔' },
    { id: 'art', name: 'งานศิลปะ', icon: '🎨' },
    { id: 'vehicles', name: 'ยานพาหนะ', icon: '🚗' }
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
    
    if (difference <= 0) return 'หมดเวลา';
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    if (days > 0) return `${days} วัน ${hours} ชม.`;
    if (hours > 0) return `${hours} ชม. ${minutes} นาที`;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // กรองสินค้าตามหมวดหมู่
  const filteredItems = selectedCategory === 'all' 
    ? auctionItems 
    : auctionItems.filter(item => item.category === selectedCategory);

  // จัดการการเสนอราคา
  const handleBid = (itemId) => {
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      alert('กรุณาใส่จำนวนเงินที่ถูกต้อง');
      return;
    }
    
    const item = auctionItems.find(i => i.id === itemId);
    if (parseFloat(bidAmount) <= item.currentBid) {
      alert(`ราคาต้องสูงกว่า ฿${item.currentBid.toLocaleString()} ขึ้นไป`);
      return;
    }
    
    alert(`เสนอราคา ฿${parseFloat(bidAmount).toLocaleString()} สำเร็จ!`);
    setBidAmount('');
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Gavel className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AuctionHub</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{currentTime.toLocaleString('th-TH')}</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-4">ประมูลออนไลน์ #1 ของไทย</h2>
            <p className="text-xl mb-6">ค้นหาสินค้าหายากและมีค่า ประมูลด้วยราคาที่ดีที่สุด</p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-sm opacity-90">รายการประมูล</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">45,678</div>
                <div className="text-sm opacity-90">สมาชิก</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">฿2.5M</div>
                <div className="text-sm opacity-90">มูลค่าการซื้อขาย</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">หมวดหมู่สินค้า</h3>
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
                <span>{category.name}</span>
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
                  alt={item.title}
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
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">ราคาปัจจุบัน</span>
                    <span className="text-lg font-bold text-green-600">
                      ฿{item.currentBid.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">ราคาเริ่มต้น: ฿{item.startingBid.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{item.bidCount} ครั้ง</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{item.watchers}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    เสนอราคา
                  </button>
                  
                  {selectedItem === item.id && (
                    <div className="border-t pt-3 space-y-2">
                      <input
                        type="number"
                        placeholder={`มากกว่า ฿${item.currentBid.toLocaleString()}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleBid(item.id)}
                          className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          ยืนยัน
                        </button>
                        <button 
                          onClick={() => setSelectedItem(null)}
                          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors text-sm"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>ผู้ขาย: {item.seller}</span>
                    <span>{item.condition}</span>
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
            <h3 className="font-semibold text-gray-900 mb-2">ประมูลที่เชื่อถือได้</h3>
            <p className="text-gray-600 text-sm">ระบบการันตีความปลอดภัยและการจ่ายเงินที่มั่นคง</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">ราคาดีที่สุด</h3>
            <p className="text-gray-600 text-sm">ได้สินค้าคุณภาพในราคาที่คุ้มค่าจากการประมูล</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Eye className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">โปร่งใส</h3>
            <p className="text-gray-600 text-sm">ติดตามการประมูลแบบเรียลไทม์และตรวจสอบได้</p>
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
                <span className="font-bold text-lg">AuctionHub</span>
              </div>
              <p className="text-gray-300 text-sm">
                แพลตฟอร์มประมูลออนไลน์ที่ใหญ่ที่สุดในประเทศไทย
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">เมนู</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">หน้าแรก</a></li>
                <li><a href="#" className="hover:text-white">รายการประมูล</a></li>
                <li><a href="#" className="hover:text-white">วิธีการใช้งาน</a></li>
                <li><a href="#" className="hover:text-white">ติดต่อเรา</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">หมวดหมู่</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">อิเล็กทรอนิกส์</a></li>
                <li><a href="#" className="hover:text-white">แฟชั่น</a></li>
                <li><a href="#" className="hover:text-white">งานศิลปะ</a></li>
                <li><a href="#" className="hover:text-white">ยานพาหนะ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">ช่วยเหลือ</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">คำถามที่พบบ่อย</a></li>
                <li><a href="#" className="hover:text-white">นীติกรรม</a></li>
                <li><a href="#" className="hover:text-white">ความเป็นส่วนตัว</a></li>
                <li><a href="#" className="hover:text-white">ข้อกำหนดการใช้งาน</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-300">
            © 2025 AuctionHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuctionApp;