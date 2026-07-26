/* ===========================================================
   E-Cycle — Demo Data
   All data below is fictional and used only for a frontend
   college-project demonstration. No backend, no real users.
   `icon` fields reference keys in the ICONS map in main.js —
   rendered as inline SVG, so the site needs no external images.
=========================================================== */

const CATEGORIES = [
  { name: "Phones", icon: "phone", count: 5 },
  { name: "Laptops", icon: "laptop", count: 4 },
  { name: "Monitors", icon: "monitor", count: 2 },
  { name: "Keyboards", icon: "keyboard", count: 1 },
  { name: "Printers", icon: "printer", count: 1 },
  { name: "TVs", icon: "tv", count: 2 },
  { name: "Batteries", icon: "battery", count: 1 },
  { name: "Cameras", icon: "camera", count: 2 },
  { name: "Vintage Electronics", icon: "radio", count: 3 },
  { name: "Scrap Items", icon: "recycle", count: 2 },
];

/* condition: Working | Broken | Vintage | Scrap
   sellerType: Individual | Scrap Dealer | Collector
   tag mirrors filter pills: Free / Scrap / Vintage / Working / Broken
   icon: phone | laptop | monitor | keyboard | printer | tv | battery | camera | radio | recycle */
const PRODUCTS = [
  { id: 1, name: "iPhone 11, 64GB", category: "Phones", icon: "phone", condition: "Working", tag: "Working", price: 11500, seller: "Aditi Menon", sellerType: "Individual", location: "Kochi, Kerala", age: "5 years old", interest: 34, desc: "Battery health 84%. Minor scratches on back glass, screen flawless. Includes charger and case." },
  { id: 2, name: "Samsung Galaxy A50", category: "Phones", icon: "phone", condition: "Broken", tag: "Broken", price: 1800, seller: "Nikhil Rao", sellerType: "Individual", location: "Bengaluru, KA", age: "6 years old", interest: 12, desc: "Cracked display, otherwise functional. Great for parts or budget screen repair." },
  { id: 3, name: "Nokia 3310 (Classic)", category: "Vintage Electronics", icon: "phone", condition: "Vintage", tag: "Vintage", price: 3200, seller: "Vintage Circuit Co.", sellerType: "Collector", location: "Kolkata, WB", age: "24 years old", interest: 61, desc: "The legendary indestructible phone. Fully functional, original charger included." },
  { id: 4, name: "Old Keypad Phone (Unbranded)", category: "Phones", icon: "phone", condition: "Scrap", tag: "Free", price: 0, seller: "Sunita Warrier", sellerType: "Individual", location: "Kollam, Kerala", age: "10+ years old", interest: 8, desc: "Doesn't power on. Free to anyone who wants to salvage parts or metals." },
  { id: 5, name: "OnePlus 6T", category: "Phones", icon: "phone", condition: "Working", tag: "Working", price: 7200, seller: "Farhan Sheikh", sellerType: "Individual", location: "Hyderabad, TS", age: "7 years old", interest: 19, desc: "Used daily driver until recently. New battery installed last year." },
  { id: 6, name: "MacBook Air 2015 13\"", category: "Laptops", icon: "laptop", condition: "Working", tag: "Working", price: 24500, seller: "Aditi Menon", sellerType: "Individual", location: "Kochi, Kerala", age: "10 years old", interest: 48, desc: "Still runs smooth for browsing and docs. 128GB SSD, 8GB RAM, new battery." },
  { id: 7, name: "Dell Inspiron 15 (Non-working)", category: "Laptops", icon: "laptop", condition: "Broken", tag: "Broken", price: 2500, seller: "GreenLoop Scrap Traders", sellerType: "Scrap Dealer", location: "Chennai, TN", age: "8 years old", interest: 6, desc: "Motherboard dead. Screen, keyboard, and RAM in working condition — good for parts." },
  { id: 8, name: "HP Pavilion Gaming Laptop", category: "Laptops", icon: "laptop", condition: "Working", tag: "Working", price: 32000, seller: "Rohit Bhandari", sellerType: "Individual", location: "Pune, MH", age: "4 years old", interest: 52, desc: "GTX 1650, i5 10th gen, 512GB SSD. Selling to upgrade — comes with original box." },
  { id: 9, name: "IBM ThinkPad 600 (1999)", category: "Vintage Electronics", icon: "laptop", condition: "Vintage", tag: "Vintage", price: 9800, seller: "Retro Tech Collectors Guild", sellerType: "Collector", location: "Mumbai, MH", age: "26 years old", interest: 73, desc: "Museum-grade condition. Boots to Windows 98. A rare find for collectors." },
  { id: 10, name: "Dell 24\" Monitor E2420H", category: "Monitors", icon: "monitor", condition: "Working", tag: "Working", price: 5200, seller: "Farhan Sheikh", sellerType: "Individual", location: "Hyderabad, TS", age: "5 years old", interest: 21, desc: "Full HD, no dead pixels. Selling as part of a desk setup clearout." },
  { id: 11, name: "CRT Monitor 15\" (Scrap)", category: "Monitors", icon: "monitor", condition: "Scrap", tag: "Scrap", price: 400, seller: "GreenLoop Scrap Traders", sellerType: "Scrap Dealer", location: "Chennai, TN", age: "18 years old", interest: 15, desc: "Bulk scrap lot — copper and glass recovery. Priced per unit for dealers." },
  { id: 12, name: "Mechanical Keyboard (Red Switches)", category: "Keyboards", icon: "keyboard", condition: "Working", tag: "Working", price: 1900, seller: "Rohit Bhandari", sellerType: "Individual", location: "Pune, MH", age: "3 years old", interest: 27, desc: "RGB backlit, a few keycaps show wear. Great typing feel, tested daily." },
  { id: 13, name: "HP LaserJet Printer (Working)", category: "Printers", icon: "printer", condition: "Working", tag: "Working", price: 3800, seller: "Sunita Warrier", sellerType: "Individual", location: "Kollam, Kerala", age: "6 years old", interest: 14, desc: "Prints crisp black-and-white pages. Toner at roughly 40%." },
  { id: 14, name: "32\" LED TV (Panel Cracked)", category: "TVs", icon: "tv", condition: "Broken", tag: "Broken", price: 1200, seller: "GreenLoop Scrap Traders", sellerType: "Scrap Dealer", location: "Chennai, TN", age: "7 years old", interest: 9, desc: "Panel damaged but board, speakers, and power supply intact — parts value." },
  { id: 15, name: "Sony Trinitron CRT TV (1994)", category: "Vintage Electronics", icon: "tv", condition: "Vintage", tag: "Vintage", price: 6500, seller: "Vintage Circuit Co.", sellerType: "Collector", location: "Kolkata, WB", age: "31 years old", interest: 44, desc: "Iconic design, still powers on with a sharp picture. A statement collector's piece." },
  { id: 16, name: "Laptop Battery Pack (Used)", category: "Batteries", icon: "battery", condition: "Working", tag: "Working", price: 900, seller: "Nikhil Rao", sellerType: "Individual", location: "Bengaluru, KA", age: "2 years old", interest: 11, desc: "Holds charge well, compatible with most Dell 15-series laptops." },
  { id: 17, name: "Canon DSLR EOS 1300D", category: "Cameras", icon: "camera", condition: "Working", tag: "Working", price: 15500, seller: "Farhan Sheikh", sellerType: "Individual", location: "Hyderabad, TS", age: "6 years old", interest: 58, desc: "Kit lens included, shutter count low. Perfect for a student photographer." },
  { id: 18, name: "1998 Film Camera (Analog)", category: "Cameras", icon: "camera", condition: "Vintage", tag: "Vintage", price: 4200, seller: "Retro Tech Collectors Guild", sellerType: "Collector", location: "Mumbai, MH", age: "27 years old", interest: 39, desc: "Fully mechanical, no battery needed. Light seals recently replaced." },
  { id: 19, name: "Assorted PCB & Wire Scrap (5kg)", category: "Scrap Items", icon: "recycle", condition: "Scrap", tag: "Scrap", price: 650, seller: "Kerala Metal Recyclers", sellerType: "Scrap Dealer", location: "Kollam, Kerala", age: "Mixed", interest: 17, desc: "Circuit boards, copper wire, and connectors — priced per kg for bulk buyers." },
  { id: 20, name: "Mixed Chargers & Cables Box", category: "Scrap Items", icon: "recycle", condition: "Scrap", tag: "Free", price: 0, seller: "Sunita Warrier", sellerType: "Individual", location: "Kollam, Kerala", age: "Mixed", interest: 22, desc: "A drawer's worth of old chargers and cables. Free — just come pick it up." },
];

const SELLERS = [
  { name: "Aditi Menon", location: "Kochi, Kerala", listed: 6 },
  { name: "Nikhil Rao", location: "Bengaluru, KA", listed: 4 },
  { name: "Sunita Warrier", location: "Kollam, Kerala", listed: 9 },
  { name: "Farhan Sheikh", location: "Hyderabad, TS", listed: 7 },
  { name: "Rohit Bhandari", location: "Pune, MH", listed: 3 },
  { name: "Meera Iyer", location: "Chennai, TN", listed: 5 },
  { name: "Devika Nair", location: "Thrissur, Kerala", listed: 2 },
  { name: "Arjun Kapoor", location: "Delhi, DL", listed: 8 },
];

const SCRAP_DEALERS = [
  { name: "GreenLoop Scrap Traders", location: "Chennai, TN", volume: "2,400 kg/month" },
  { name: "Kerala Metal Recyclers", location: "Kollam, Kerala", volume: "1,800 kg/month" },
  { name: "Bharat E-Waste Solutions", location: "Ahmedabad, GJ", volume: "3,100 kg/month" },
  { name: "Southern Circuit Recovery", location: "Coimbatore, TN", volume: "1,250 kg/month" },
  { name: "Urban Scrap Junction", location: "Mumbai, MH", volume: "2,900 kg/month" },
];

const COLLECTORS = [
  { name: "Retro Tech Collectors Guild", location: "Mumbai, MH", focus: "Vintage computers" },
  { name: "Vintage Circuit Co.", location: "Kolkata, WB", focus: "Classic TVs & radios" },
  { name: "Analog Archive", location: "Delhi, DL", focus: "Film cameras" },
  { name: "The Pixel Museum", location: "Bengaluru, KA", focus: "Early gaming consoles" },
  { name: "Old Line Electronics", location: "Goa", focus: "Telephones & pagers" },
];

/* avatar keys reference the same ICONS map — user (individual), recycle (scrap dealer), box (collector) */
const TESTIMONIALS = [
  { name: "Aditi Menon", role: "Seller · Kochi", quote: "Listed my old MacBook on a Tuesday, had three offers by Thursday. Way easier than the usual resale groups.", avatar: "user" },
  { name: "GreenLoop Scrap Traders", role: "Scrap Dealer · Chennai", quote: "We source almost a third of our monthly volume through E-Cycle listings now. Filtering by 'Scrap' saves us hours.", avatar: "recycle" },
  { name: "Retro Tech Collectors Guild", role: "Collector · Mumbai", quote: "Found a working IBM ThinkPad 600 in near-mint condition. Listings like that just don't show up on regular marketplaces.", avatar: "box" },
  { name: "Sunita Warrier", role: "Seller · Kollam", quote: "I gave away a box of old chargers for free and someone picked it up the same evening. Felt good clearing clutter responsibly.", avatar: "user" },
  { name: "Farhan Sheikh", role: "Seller · Hyderabad", quote: "The condition tags (Working / Broken / Vintage) make it so much faster to browse — no more guessing from vague titles.", avatar: "user" },
  { name: "Kerala Metal Recyclers", role: "Scrap Dealer · Kollam", quote: "Being local to Kollam, we pick up bulk scrap lots directly. E-Cycle basically built us a supply chain.", avatar: "recycle" },
  { name: "Vintage Circuit Co.", role: "Collector · Kolkata", quote: "The vintage category is a goldmine. Picked up a Sony Trinitron in working condition for a fraction of auction prices.", avatar: "box" },
  { name: "Meera Iyer", role: "Seller · Chennai", quote: "Sold a broken laptop I thought was worthless. Turns out scrap dealers wanted it for parts. Nothing goes to waste here.", avatar: "user" },
];

const FAQS = [
  { q: "How does pricing work?", a: "Sellers set their own price when listing an item — you can price it normally, mark it down for a quick sale, or list it for free. Scrap items are often priced per kilogram for bulk buyers." },
  { q: "Can I sell broken electronics?", a: "Yes. Broken or non-working devices are welcome — mark the condition as 'Broken' or 'Scrap' so scrap dealers and repair hobbyists know exactly what they're buying, usually for parts or material recovery." },
  { q: "Who can buy items?", a: "Anyone on the platform: individual buyers looking for affordable working devices, scrap dealers sourcing bulk material, and collectors hunting for rare vintage electronics." },
  { q: "Is pickup available?", a: "Pickup availability is set by each seller on their listing. Many local sellers offer pickup for free items and bulk scrap lots to make handoff easier for both sides." },
  { q: "What kind of items are accepted?", a: "Phones, laptops, monitors, keyboards, printers, TVs, batteries, cameras, vintage electronics, and general scrap items are all accepted — working, broken, or vintage condition." },
  { q: "Is this a real, live marketplace?", a: "No — E-Cycle is a frontend-only demo built for a college project. All listings, users, and transactions on this site are fictional and nothing is actually bought, sold, or submitted." },
];

const BAR_CHART_DATA = [
  { label: "Feb", value: 4 },
  { label: "Mar", value: 7 },
  { label: "Apr", value: 5 },
  { label: "May", value: 9 },
  { label: "Jun", value: 11 },
  { label: "Jul", value: 9 },
];
