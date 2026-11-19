// Worldwide destination library – extends MP_DESTINATIONS from data.js.
// Place format: [name, category, lat, lng, suggested hours]
(() => {
const D = window.MP_DESTINATIONS;
const add = (name, region, country, currency, center, places) => { D[name] = { region, country, currency, center, places }; };

// Regions for the originals in data.js
Object.assign(D['Kuala Lumpur'], { region: 'Malaysia' });
Object.assign(D['Penang'], { region: 'Malaysia' });
Object.assign(D['Langkawi'], { region: 'Malaysia' });
['Singapore', 'Bangkok', 'Bali', 'Tokyo', 'Seoul'].forEach(n => D[n].region = 'Asia');
D['Paris'].region = 'Europe';

// ===================== MALAYSIA =====================
add('Malacca', 'Malaysia', 'Malaysia', 'MYR', [2.1960, 102.2480], [
  ['Jonker Street Night Market', 'shopping', 2.1953, 102.2466, 1.5], ['A Famosa', 'sights', 2.1916, 102.2508, 0.5],
  ["St. Paul's Hill", 'culture', 2.1930, 102.2497, 1], ['Christ Church & Red Square', 'culture', 2.1944, 102.2489, 0.5],
  ['Melaka River Cruise', 'fun', 2.1980, 102.2470, 1], ['Cheng Hoon Teng Temple', 'culture', 2.1967, 102.2463, 0.5],
  ['Baba & Nyonya Heritage Museum', 'culture', 2.1958, 102.2459, 1], ['Chicken Rice Balls', 'food', 2.1955, 102.2470, 1],
  ['Melaka Straits Mosque', 'culture', 2.1877, 102.2420, 1]]);
add('Kota Kinabalu', 'Malaysia', 'Malaysia', 'MYR', [5.9804, 116.0735], [
  ['Kinabalu Park', 'nature', 6.0050, 116.5420, 4], ['Tunku Abdul Rahman Marine Park', 'nature', 6.0120, 116.0050, 4],
  ['Filipino Market & Night Market', 'food', 5.9830, 116.0720, 1.5], ['Signal Hill Observatory', 'sights', 5.9800, 116.0770, 0.5],
  ['Kota Kinabalu City Mosque', 'culture', 6.0010, 116.1060, 0.5], ['Gaya Street Sunday Market', 'shopping', 5.9840, 116.0780, 1.5],
  ['Mari Mari Cultural Village', 'culture', 6.0167, 116.1828, 3], ['Tanjung Aru Beach', 'nature', 5.9450, 116.0480, 2]]);
add('Kuching', 'Malaysia', 'Malaysia', 'MYR', [1.5535, 110.3593], [
  ['Kuching Waterfront', 'sights', 1.5590, 110.3460, 1], ['Sarawak Cultural Village', 'culture', 1.7490, 110.3170, 3],
  ['Semenggoh Orangutan Centre', 'nature', 1.4010, 110.3140, 2], ['Bako National Park', 'nature', 1.7170, 110.4670, 5],
  ['Main Bazaar', 'shopping', 1.5585, 110.3470, 1], ['Fort Margherita', 'culture', 1.5620, 110.3500, 1],
  ['Top Spot Food Court', 'food', 1.5570, 110.3500, 1]]);
add('Cameron Highlands', 'Malaysia', 'Malaysia', 'MYR', [4.4710, 101.3770], [
  ['BOH Tea Plantation', 'nature', 4.5180, 101.4140, 2], ['Mossy Forest', 'nature', 4.5250, 101.3880, 2],
  ['Kea Farm Market', 'shopping', 4.5160, 101.3880, 1], ['Strawberry Farm', 'fun', 4.4970, 101.3880, 1],
  ['Tanah Rata Town', 'food', 4.4720, 101.3790, 1.5], ['Time Tunnel Museum', 'culture', 4.4990, 101.3860, 1]]);
add('Ipoh', 'Malaysia', 'Malaysia', 'MYR', [4.5975, 101.0901], [
  ['Concubine Lane', 'culture', 4.5960, 101.0790, 1], ['Kek Lok Tong Cave Temple', 'culture', 4.5550, 101.1170, 1],
  ['Sam Poh Tong Temple', 'culture', 4.5637, 101.1120, 1], ['Ipoh Railway Station', 'sights', 4.5960, 101.0740, 0.5],
  ['Old Town White Coffee', 'food', 4.5975, 101.0800, 1], ['Lost World of Tambun', 'fun', 4.6230, 101.1580, 4],
  ['Lou Wong Bean Sprout Chicken', 'food', 4.5890, 101.0830, 1], ['Gunung Lang Recreational Park', 'nature', 4.6400, 101.0900, 1.5]]);

// ===================== ASIA =====================
add('Chiang Mai', 'Asia', 'Thailand', 'THB', [18.7883, 98.9853], [
  ['Wat Phra That Doi Suthep', 'culture', 18.8048, 98.9216, 2], ['Wat Chedi Luang', 'culture', 18.7870, 98.9867, 1],
  ['Wat Phra Singh', 'culture', 18.7886, 98.9817, 1], ['Sunday Walking Street', 'shopping', 18.7877, 98.9932, 2],
  ['Nimman Road', 'shopping', 18.7990, 98.9680, 2], ['Elephant Nature Park', 'nature', 19.2140, 98.8590, 6],
  ['Warorot Market', 'food', 18.7900, 99.0000, 1.5]]);
add('Phuket', 'Asia', 'Thailand', 'THB', [7.8804, 98.3923], [
  ['Patong Beach', 'nature', 7.8960, 98.2960, 2], ['Big Buddha', 'sights', 7.8278, 98.3128, 1],
  ['Old Phuket Town', 'culture', 7.8840, 98.3880, 2], ['Phi Phi Islands Day Trip', 'fun', 7.7407, 98.7784, 8],
  ['Promthep Cape Sunset', 'sights', 7.7620, 98.3050, 1], ['Wat Chalong', 'culture', 7.8460, 98.3370, 1],
  ['Karon Viewpoint', 'sights', 7.7960, 98.3010, 0.5], ['Bangla Road', 'fun', 7.8930, 98.2980, 2]]);
add('Jakarta', 'Asia', 'Indonesia', 'IDR', [-6.2088, 106.8456], [
  ['National Monument (Monas)', 'sights', -6.1754, 106.8272, 1.5], ['Istiqlal Mosque', 'culture', -6.1702, 106.8310, 1],
  ['Kota Tua', 'culture', -6.1352, 106.8133, 2], ['Taman Mini Indonesia Indah', 'culture', -6.3024, 106.8952, 3],
  ['Grand Indonesia', 'shopping', -6.1950, 106.8210, 2], ['Ancol Dreamland', 'fun', -6.1220, 106.8330, 3]]);
add('Yogyakarta', 'Asia', 'Indonesia', 'IDR', [-7.7956, 110.3695], [
  ['Borobudur Temple', 'culture', -7.6079, 110.2038, 3], ['Prambanan Temple', 'culture', -7.7520, 110.4915, 2],
  ['Kraton Palace', 'culture', -7.8053, 110.3642, 1.5], ['Malioboro Street', 'shopping', -7.7926, 110.3658, 2],
  ['Taman Sari Water Castle', 'culture', -7.8100, 110.3593, 1], ['Merapi Lava Tour', 'nature', -7.5900, 110.4400, 3]]);
add('Hanoi', 'Asia', 'Vietnam', 'VND', [21.0285, 105.8542], [
  ['Hoan Kiem Lake', 'sights', 21.0288, 105.8525, 1], ['Old Quarter', 'shopping', 21.0340, 105.8500, 2],
  ['Temple of Literature', 'culture', 21.0293, 105.8355, 1], ['Ho Chi Minh Mausoleum', 'sights', 21.0368, 105.8346, 1],
  ['Train Street', 'fun', 21.0283, 105.8443, 0.5], ['Street Food Tour', 'food', 21.0330, 105.8510, 2],
  ['Water Puppet Theatre', 'culture', 21.0318, 105.8533, 1], ['Ha Long Bay Cruise', 'nature', 20.9101, 107.1839, 8]]);
add('Ho Chi Minh City', 'Asia', 'Vietnam', 'VND', [10.7769, 106.7009], [
  ['Ben Thanh Market', 'shopping', 10.7725, 106.6980, 1.5], ['War Remnants Museum', 'culture', 10.7795, 106.6921, 1.5],
  ['Independence Palace', 'sights', 10.7770, 106.6953, 1], ['Saigon Notre-Dame Cathedral', 'culture', 10.7798, 106.6990, 0.5],
  ['Saigon Central Post Office', 'sights', 10.7799, 106.7000, 0.5], ['Bui Vien Walking Street', 'fun', 10.7670, 106.6930, 2],
  ['Cu Chi Tunnels', 'culture', 11.1440, 106.4630, 4], ['Landmark 81 SkyView', 'sights', 10.7950, 106.7218, 1]]);
add('Da Nang & Hoi An', 'Asia', 'Vietnam', 'VND', [15.9700, 108.2600], [
  ['My Khe Beach', 'nature', 16.0544, 108.2470, 2], ['Dragon Bridge', 'sights', 16.0610, 108.2270, 0.5],
  ['Marble Mountains', 'nature', 16.0030, 108.2630, 2], ['Ba Na Hills & Golden Bridge', 'fun', 15.9950, 107.9960, 5],
  ['Hoi An Ancient Town', 'culture', 15.8770, 108.3290, 3], ['Japanese Covered Bridge', 'culture', 15.8771, 108.3260, 0.5],
  ['An Bang Beach', 'nature', 15.9150, 108.3400, 2], ['Hoi An Night Market', 'food', 15.8760, 108.3290, 1.5]]);
add('Siem Reap', 'Asia', 'Cambodia', 'USD', [13.3633, 103.8564], [
  ['Angkor Wat Sunrise', 'culture', 13.4125, 103.8670, 3], ['Bayon Temple', 'culture', 13.4412, 103.8590, 1.5],
  ['Ta Prohm', 'culture', 13.4350, 103.8890, 1.5], ['Pub Street', 'food', 13.3540, 103.8550, 2],
  ['Angkor National Museum', 'culture', 13.3670, 103.8600, 1.5], ['Tonle Sap Floating Village', 'nature', 13.2500, 103.8300, 3]]);
add('Manila', 'Asia', 'Philippines', 'PHP', [14.5995, 120.9842], [
  ['Intramuros', 'culture', 14.5896, 120.9747, 2], ['Fort Santiago', 'culture', 14.5946, 120.9701, 1],
  ['Rizal Park', 'nature', 14.5831, 120.9794, 1], ['San Agustin Church', 'culture', 14.5888, 120.9752, 0.5],
  ['Binondo Food Walk', 'food', 14.6000, 120.9740, 2], ['Manila Bay Sunset', 'sights', 14.5650, 120.9830, 1],
  ['SM Mall of Asia', 'shopping', 14.5352, 120.9822, 2], ['BGC High Street', 'shopping', 14.5508, 121.0510, 2]]);
add('Kyoto', 'Asia', 'Japan', 'JPY', [35.0116, 135.7681], [
  ['Fushimi Inari Taisha', 'culture', 34.9671, 135.7727, 2], ['Kiyomizu-dera', 'culture', 34.9949, 135.7850, 1.5],
  ['Gion & Hanamikoji', 'culture', 35.0037, 135.7750, 1.5], ['Arashiyama Bamboo Grove', 'nature', 35.0170, 135.6710, 1.5],
  ['Kinkaku-ji (Golden Pavilion)', 'culture', 35.0394, 135.7292, 1], ['Nishiki Market', 'food', 35.0050, 135.7650, 1.5],
  ["Philosopher's Path & Ginkaku-ji", 'nature', 35.0270, 135.7982, 2], ['Nijo Castle', 'sights', 35.0142, 135.7481, 1.5]]);
add('Osaka', 'Asia', 'Japan', 'JPY', [34.6937, 135.5023], [
  ['Osaka Castle', 'sights', 34.6873, 135.5262, 2], ['Dotonbori', 'food', 34.6687, 135.5013, 2],
  ['Kuromon Market', 'food', 34.6654, 135.5066, 1], ['Universal Studios Japan', 'fun', 34.6654, 135.4323, 8],
  ['Shinsekai & Tsutenkaku', 'sights', 34.6525, 135.5063, 1.5], ['Umeda Sky Building', 'sights', 34.7053, 135.4906, 1],
  ['Shinsaibashi', 'shopping', 34.6750, 135.5010, 2], ['Osaka Aquarium Kaiyukan', 'fun', 34.6545, 135.4290, 2]]);
add('Busan', 'Asia', 'South Korea', 'KRW', [35.1796, 129.0756], [
  ['Haeundae Beach', 'nature', 35.1587, 129.1604, 2], ['Gamcheon Culture Village', 'culture', 35.0975, 129.0106, 1.5],
  ['Haedong Yonggungsa Temple', 'culture', 35.1884, 129.2233, 1.5], ['Jagalchi Fish Market', 'food', 35.0966, 129.0306, 1],
  ['BIFF Square & Gukje Market', 'shopping', 35.0986, 129.0281, 1.5], ['Gwangalli Beach', 'nature', 35.1532, 129.1186, 1.5],
  ['Huinnyeoul Culture Village', 'culture', 35.0782, 129.0447, 1]]);
add('Jeju Island', 'Asia', 'South Korea', 'KRW', [33.4996, 126.5312], [
  ['Seongsan Ilchulbong', 'nature', 33.4581, 126.9426, 2], ['Hallasan National Park', 'nature', 33.3617, 126.5292, 6],
  ['Manjanggul Lava Tube', 'nature', 33.5283, 126.7716, 1], ['Udo Island', 'nature', 33.5060, 126.9530, 4],
  ['Hyeopjae Beach', 'nature', 33.3940, 126.2390, 2], ['Dongmun Market', 'food', 33.5120, 126.5260, 1],
  ['Cheonjiyeon Falls', 'nature', 33.2445, 126.5594, 1], ["O'sulloc Tea Museum", 'food', 33.3058, 126.2895, 1]]);
add('Hong Kong', 'Asia', 'Hong Kong', 'HKD', [22.3193, 114.1694], [
  ['Victoria Peak', 'sights', 22.2759, 114.1455, 2], ['Star Ferry', 'fun', 22.2936, 114.1686, 0.5],
  ['Tsim Sha Tsui Promenade', 'sights', 22.2930, 114.1720, 1], ['Temple Street Night Market', 'shopping', 22.3060, 114.1700, 1.5],
  ['Big Buddha & Ngong Ping 360', 'culture', 22.2540, 113.9050, 4], ["Mong Kok Ladies' Market", 'shopping', 22.3190, 114.1710, 1.5],
  ['Man Mo Temple', 'culture', 22.2840, 114.1500, 0.5], ['Hong Kong Disneyland', 'fun', 22.3130, 114.0410, 8],
  ['Dim Sum Breakfast', 'food', 22.3300, 114.1620, 1]]);
add('Taipei', 'Asia', 'Taiwan', 'TWD', [25.0330, 121.5654], [
  ['Taipei 101', 'sights', 25.0340, 121.5645, 1.5], ['National Palace Museum', 'culture', 25.1024, 121.5485, 2.5],
  ['Chiang Kai-shek Memorial Hall', 'sights', 25.0346, 121.5218, 1], ['Longshan Temple', 'culture', 25.0372, 121.4999, 1],
  ['Shilin Night Market', 'food', 25.0880, 121.5240, 2], ['Raohe Night Market', 'food', 25.0510, 121.5770, 1.5],
  ['Ximending', 'shopping', 25.0421, 121.5081, 2], ['Elephant Mountain', 'nature', 25.0273, 121.5762, 1.5],
  ['Jiufen Old Street', 'culture', 25.1097, 121.8452, 3]]);
add('Shanghai', 'Asia', 'China', 'CNY', [31.2304, 121.4737], [
  ['The Bund', 'sights', 31.2400, 121.4900, 1.5], ['Yu Garden', 'culture', 31.2272, 121.4921, 1.5],
  ['Shanghai Tower', 'sights', 31.2335, 121.5055, 1], ['Nanjing Road', 'shopping', 31.2350, 121.4750, 2],
  ['Tianzifang', 'shopping', 31.2107, 121.4692, 1.5], ['Xintiandi', 'food', 31.2195, 121.4750, 1.5],
  ['Shanghai Museum', 'culture', 31.2283, 121.4755, 2], ['Former French Concession', 'culture', 31.2100, 121.4500, 2]]);
add('Beijing', 'Asia', 'China', 'CNY', [39.9042, 116.4074], [
  ['Forbidden City', 'culture', 39.9163, 116.3972, 3], ['Tiananmen Square', 'sights', 39.9055, 116.3976, 1],
  ['Great Wall at Mutianyu', 'sights', 40.4319, 116.5704, 5], ['Temple of Heaven', 'culture', 39.8822, 116.4066, 1.5],
  ['Summer Palace', 'culture', 39.9999, 116.2755, 3], ['Hutong Rickshaw Tour', 'culture', 39.9400, 116.3900, 1.5],
  ['Wangfujing Snack Street', 'food', 39.9110, 116.4100, 1.5], ['Jingshan Park', 'nature', 39.9250, 116.3960, 1]]);
add('Delhi & Agra', 'Asia', 'India', 'INR', [28.6139, 77.2090], [
  ['Red Fort', 'sights', 28.6562, 77.2410, 1.5], ['Qutub Minar', 'culture', 28.5245, 77.1855, 1.5],
  ['India Gate', 'sights', 28.6129, 77.2295, 0.5], ["Humayun's Tomb", 'culture', 28.5933, 77.2507, 1.5],
  ['Jama Masjid', 'culture', 28.6507, 77.2334, 1], ['Chandni Chowk Food Walk', 'food', 28.6506, 77.2303, 2],
  ['Lotus Temple', 'culture', 28.5535, 77.2588, 1], ['Taj Mahal (Agra)', 'sights', 27.1751, 78.0421, 8]]);

// ===================== MIDDLE EAST =====================
add('Makkah', 'Middle East', 'Saudi Arabia', 'SAR', [21.4225, 39.8262], [
  ['Masjid al-Haram', 'culture', 21.4225, 39.8262, 4], ['Jabal al-Nour (Cave of Hira)', 'nature', 21.4575, 39.8592, 3],
  ['Jabal Thawr', 'nature', 21.3775, 39.8492, 3], ['Mina', 'culture', 21.4133, 39.8933, 1],
  ['Mount Arafat', 'culture', 21.3549, 39.9842, 1.5], ['Clock Tower Museum', 'culture', 21.4189, 39.8256, 1.5],
  ["Masjid Aisha (Tan'eem)", 'culture', 21.4672, 39.7863, 1]]);
add('Madinah', 'Middle East', 'Saudi Arabia', 'SAR', [24.4672, 39.6111], [
  ['Masjid an-Nabawi', 'culture', 24.4672, 39.6111, 4], ['Quba Mosque', 'culture', 24.4393, 39.6172, 1],
  ['Mount Uhud & Martyrs Cemetery', 'nature', 24.5000, 39.6130, 1.5], ['Masjid al-Qiblatayn', 'culture', 24.4840, 39.5790, 1],
  ['Dates Market', 'food', 24.4620, 39.6150, 1], ['Jannat al-Baqi', 'culture', 24.4669, 39.6164, 0.5],
  ['Hejaz Railway Museum', 'culture', 24.4600, 39.6000, 1]]);
add('Dubai', 'Middle East', 'UAE', 'AED', [25.2048, 55.2708], [
  ['Burj Khalifa', 'sights', 25.1972, 55.2744, 1.5], ['Dubai Mall & Fountain Show', 'shopping', 25.1985, 55.2796, 2],
  ['Dubai Marina', 'sights', 25.0800, 55.1400, 2], ['Palm Jumeirah & Atlantis', 'sights', 25.1304, 55.1171, 2],
  ['Desert Safari', 'fun', 24.9500, 55.6500, 5], ['Al Fahidi Historical District', 'culture', 25.2636, 55.3000, 1.5],
  ['Gold & Spice Souks', 'shopping', 25.2700, 55.2970, 1.5], ['Museum of the Future', 'culture', 25.2192, 55.2819, 1.5],
  ['Jumeirah Beach & Burj Al Arab', 'nature', 25.1412, 55.1853, 1.5]]);
add('Abu Dhabi', 'Middle East', 'UAE', 'AED', [24.4539, 54.3773], [
  ['Sheikh Zayed Grand Mosque', 'culture', 24.4128, 54.4750, 1.5], ['Louvre Abu Dhabi', 'culture', 24.5337, 54.3980, 2],
  ['Qasr Al Watan', 'culture', 24.4620, 54.3050, 1.5], ['Ferrari World', 'fun', 24.4837, 54.6072, 4],
  ['Corniche Beach', 'nature', 24.4760, 54.3330, 1.5], ['Emirates Palace', 'sights', 24.4615, 54.3172, 1]]);
add('Doha', 'Middle East', 'Qatar', 'QAR', [25.2854, 51.5310], [
  ['Museum of Islamic Art', 'culture', 25.2955, 51.5390, 2], ['Souq Waqif', 'shopping', 25.2867, 51.5330, 2],
  ['The Pearl-Qatar', 'shopping', 25.3700, 51.5510, 2], ['Katara Cultural Village', 'culture', 25.3600, 51.5260, 1.5],
  ['National Museum of Qatar', 'culture', 25.2880, 51.5480, 2], ['Doha Corniche', 'nature', 25.3000, 51.5250, 1]]);
add('Istanbul', 'Middle East', 'Türkiye', 'TRY', [41.0082, 28.9784], [
  ['Hagia Sophia', 'culture', 41.0086, 28.9802, 1.5], ['Blue Mosque', 'culture', 41.0054, 28.9768, 1],
  ['Topkapi Palace', 'culture', 41.0115, 28.9834, 2.5], ['Basilica Cistern', 'sights', 41.0084, 28.9779, 1],
  ['Grand Bazaar', 'shopping', 41.0107, 28.9680, 2], ['Spice Bazaar', 'food', 41.0166, 28.9706, 1],
  ['Bosphorus Cruise', 'fun', 41.0175, 28.9730, 2], ['Galata Tower', 'sights', 41.0256, 28.9741, 1],
  ['Istiklal Avenue', 'shopping', 41.0340, 28.9790, 2]]);

// ===================== EUROPE =====================
add('London', 'Europe', 'United Kingdom', 'GBP', [51.5074, -0.1278], [
  ['Tower of London', 'sights', 51.5081, -0.0759, 2], ['Tower Bridge', 'sights', 51.5055, -0.0754, 0.5],
  ['British Museum', 'culture', 51.5194, -0.1270, 2.5], ['Buckingham Palace', 'sights', 51.5014, -0.1419, 1],
  ['Westminster & Big Ben', 'sights', 51.5007, -0.1246, 1], ['London Eye', 'sights', 51.5033, -0.1196, 1],
  ['Borough Market', 'food', 51.5055, -0.0910, 1.5], ['Covent Garden', 'shopping', 51.5117, -0.1240, 1.5],
  ['Hyde Park', 'nature', 51.5073, -0.1657, 1.5], ['Camden Market', 'shopping', 51.5413, -0.1460, 2]]);
add('Edinburgh', 'Europe', 'United Kingdom', 'GBP', [55.9533, -3.1883], [
  ['Edinburgh Castle', 'sights', 55.9486, -3.1999, 2], ['Royal Mile', 'culture', 55.9500, -3.1880, 1.5],
  ["Arthur's Seat", 'nature', 55.9441, -3.1618, 2], ['Palace of Holyroodhouse', 'culture', 55.9527, -3.1722, 1.5],
  ['Calton Hill', 'sights', 55.9554, -3.1826, 1], ['Victoria Street', 'shopping', 55.9478, -3.1936, 0.5],
  ['National Museum of Scotland', 'culture', 55.9469, -3.1899, 1.5], ['Dean Village', 'nature', 55.9523, -3.2176, 1]]);
add('Rome', 'Europe', 'Italy', 'EUR', [41.9028, 12.4964], [
  ['Colosseum', 'sights', 41.8902, 12.4922, 2], ['Roman Forum', 'culture', 41.8925, 12.4853, 1.5],
  ['Pantheon', 'culture', 41.8986, 12.4769, 0.5], ['Trevi Fountain', 'sights', 41.9009, 12.4833, 0.5],
  ['Vatican Museums & Sistine Chapel', 'culture', 41.9065, 12.4536, 3], ["St. Peter's Basilica", 'culture', 41.9022, 12.4539, 1.5],
  ['Spanish Steps', 'sights', 41.9060, 12.4828, 0.5], ['Trastevere Dinner', 'food', 41.8890, 12.4700, 2],
  ['Piazza Navona', 'sights', 41.8992, 12.4731, 0.5]]);
add('Venice', 'Europe', 'Italy', 'EUR', [45.4408, 12.3155], [
  ["St. Mark's Basilica", 'culture', 45.4345, 12.3397, 1], ["St. Mark's Square", 'sights', 45.4341, 12.3388, 0.5],
  ["Doge's Palace", 'culture', 45.4337, 12.3404, 1.5], ['Rialto Bridge', 'sights', 45.4380, 12.3359, 0.5],
  ['Gondola Ride', 'fun', 45.4370, 12.3340, 0.5], ['Burano Island', 'culture', 45.4855, 12.4170, 3],
  ['Rialto Market', 'food', 45.4397, 12.3346, 1], ['Grand Canal Vaporetto', 'fun', 45.4410, 12.3260, 1]]);
add('Florence', 'Europe', 'Italy', 'EUR', [43.7696, 11.2558], [
  ['Florence Cathedral (Duomo)', 'culture', 43.7731, 11.2560, 1.5], ['Uffizi Gallery', 'culture', 43.7678, 11.2553, 2.5],
  ['Ponte Vecchio', 'sights', 43.7680, 11.2531, 0.5], ["Accademia (Michelangelo's David)", 'culture', 43.7768, 11.2586, 1],
  ['Piazzale Michelangelo', 'sights', 43.7629, 11.2650, 1], ['Mercato Centrale', 'food', 43.7765, 11.2534, 1],
  ['Boboli Gardens', 'nature', 43.7625, 11.2484, 1.5], ['Pitti Palace', 'culture', 43.7652, 11.2500, 1.5]]);
add('Barcelona', 'Europe', 'Spain', 'EUR', [41.3874, 2.1686], [
  ['Sagrada Família', 'culture', 41.4036, 2.1744, 1.5], ['Park Güell', 'nature', 41.4145, 2.1527, 1.5],
  ['La Rambla', 'shopping', 41.3809, 2.1730, 1], ['La Boqueria Market', 'food', 41.3817, 2.1717, 1],
  ['Gothic Quarter', 'culture', 41.3833, 2.1765, 1.5], ['Casa Batlló', 'culture', 41.3916, 2.1649, 1],
  ['Barceloneta Beach', 'nature', 41.3784, 2.1925, 2], ['Montjuïc', 'sights', 41.3636, 2.1650, 2],
  ['Camp Nou', 'fun', 41.3809, 2.1228, 1.5]]);
add('Madrid', 'Europe', 'Spain', 'EUR', [40.4168, -3.7038], [
  ['Prado Museum', 'culture', 40.4138, -3.6921, 2.5], ['Royal Palace of Madrid', 'sights', 40.4180, -3.7143, 1.5],
  ['Retiro Park', 'nature', 40.4153, -3.6845, 1.5], ['Plaza Mayor', 'sights', 40.4155, -3.7074, 0.5],
  ['Puerta del Sol', 'sights', 40.4169, -3.7035, 0.5], ['Mercado de San Miguel', 'food', 40.4154, -3.7090, 1],
  ['Gran Vía', 'shopping', 40.4200, -3.7050, 1.5], ['Santiago Bernabéu Stadium', 'fun', 40.4531, -3.6883, 1.5]]);
add('Lisbon', 'Europe', 'Portugal', 'EUR', [38.7223, -9.1393], [
  ['Belém Tower', 'sights', 38.6916, -9.2160, 1], ['Jerónimos Monastery', 'culture', 38.6979, -9.2068, 1.5],
  ['Pastéis de Belém', 'food', 38.6975, -9.2032, 0.5], ['Alfama', 'culture', 38.7118, -9.1300, 2],
  ['Tram 28', 'fun', 38.7140, -9.1360, 1], ['São Jorge Castle', 'sights', 38.7139, -9.1335, 1.5],
  ['Time Out Market', 'food', 38.7071, -9.1459, 1], ['LX Factory', 'shopping', 38.7035, -9.1784, 1.5],
  ['Sintra & Pena Palace', 'culture', 38.7876, -9.3906, 6]]);
add('Amsterdam', 'Europe', 'Netherlands', 'EUR', [52.3676, 4.9041], [
  ['Rijksmuseum', 'culture', 52.3600, 4.8852, 2], ['Van Gogh Museum', 'culture', 52.3584, 4.8811, 1.5],
  ['Anne Frank House', 'culture', 52.3752, 4.8840, 1], ['Canal Cruise', 'fun', 52.3740, 4.8910, 1],
  ['Jordaan', 'shopping', 52.3770, 4.8810, 1.5], ['Vondelpark', 'nature', 52.3580, 4.8686, 1],
  ['Dam Square', 'sights', 52.3731, 4.8926, 0.5], ['Albert Cuyp Market', 'food', 52.3556, 4.8946, 1],
  ['Zaanse Schans Windmills', 'culture', 52.4740, 4.8170, 3]]);
add('Prague', 'Europe', 'Czechia', 'CZK', [50.0755, 14.4378], [
  ['Charles Bridge', 'sights', 50.0865, 14.4114, 0.5], ['Prague Castle', 'sights', 50.0911, 14.4016, 2.5],
  ['Old Town Square & Astronomical Clock', 'sights', 50.0870, 14.4208, 1], ['St. Vitus Cathedral', 'culture', 50.0909, 14.4005, 1],
  ['Jewish Quarter (Josefov)', 'culture', 50.0900, 14.4180, 1.5], ['Petřín Hill', 'nature', 50.0835, 14.3950, 1.5],
  ['Wenceslas Square', 'shopping', 50.0810, 14.4280, 1], ['Czech Beer Hall Dinner', 'food', 50.0900, 14.4240, 1]]);
add('Vienna', 'Europe', 'Austria', 'EUR', [48.2082, 16.3738], [
  ['Schönbrunn Palace', 'culture', 48.1845, 16.3122, 2.5], ["St. Stephen's Cathedral", 'culture', 48.2085, 16.3731, 1],
  ['Hofburg Palace', 'culture', 48.2066, 16.3655, 1.5], ['Belvedere Palace', 'culture', 48.1916, 16.3809, 1.5],
  ['Naschmarkt', 'food', 48.1990, 16.3630, 1], ['Prater & Giant Ferris Wheel', 'fun', 48.2166, 16.3958, 1.5],
  ['Vienna State Opera', 'culture', 48.2028, 16.3687, 1], ['Café Sacher', 'food', 48.2040, 16.3690, 1]]);
add('Berlin', 'Europe', 'Germany', 'EUR', [52.5200, 13.4050], [
  ['Brandenburg Gate', 'sights', 52.5163, 13.3777, 0.5], ['Reichstag Dome', 'sights', 52.5186, 13.3762, 1],
  ['Museum Island', 'culture', 52.5169, 13.4019, 3], ['East Side Gallery', 'culture', 52.5050, 13.4397, 1],
  ['Checkpoint Charlie', 'sights', 52.5075, 13.3904, 0.5], ['Berlin Wall Memorial', 'culture', 52.5351, 13.3903, 1],
  ['Holocaust Memorial', 'culture', 52.5139, 13.3787, 0.5], ['Markthalle Neun', 'food', 52.5021, 13.4316, 1],
  ['Tiergarten', 'nature', 52.5145, 13.3501, 1.5]]);
add('Budapest', 'Europe', 'Hungary', 'HUF', [47.4979, 19.0402], [
  ['Hungarian Parliament', 'sights', 47.5071, 19.0457, 1], ['Buda Castle', 'culture', 47.4962, 19.0396, 2],
  ["Fisherman's Bastion", 'sights', 47.5022, 19.0348, 1], ['Széchenyi Thermal Bath', 'fun', 47.5186, 19.0823, 2.5],
  ['Chain Bridge', 'sights', 47.4990, 19.0436, 0.5], ['Great Market Hall', 'food', 47.4870, 19.0583, 1],
  ['Ruin Bars (Szimpla Kert)', 'fun', 47.4970, 19.0633, 1.5], ["St. Stephen's Basilica", 'culture', 47.5009, 19.0539, 1],
  ['Danube Night Cruise', 'fun', 47.5000, 19.0480, 1]]);
add('Athens', 'Europe', 'Greece', 'EUR', [37.9838, 23.7275], [
  ['Acropolis & Parthenon', 'culture', 37.9715, 23.7257, 2.5], ['Acropolis Museum', 'culture', 37.9685, 23.7285, 1.5],
  ['Plaka', 'shopping', 37.9725, 23.7300, 1.5], ['Ancient Agora', 'culture', 37.9747, 23.7224, 1],
  ['Temple of Olympian Zeus', 'culture', 37.9693, 23.7331, 0.5], ['Mount Lycabettus', 'nature', 37.9818, 23.7432, 1.5],
  ['Syntagma Square (Changing of the Guard)', 'sights', 37.9755, 23.7348, 0.5], ['Monastiraki Flea Market', 'shopping', 37.9763, 23.7253, 1]]);
add('Santorini', 'Europe', 'Greece', 'EUR', [36.3932, 25.4615], [
  ['Oia Sunset', 'sights', 36.4618, 25.3753, 2], ['Fira Town', 'shopping', 36.4166, 25.4320, 2],
  ['Red Beach', 'nature', 36.3487, 25.3943, 1.5], ['Akrotiri Archaeological Site', 'culture', 36.3517, 25.4036, 1.5],
  ['Caldera Boat Tour', 'fun', 36.4100, 25.4100, 5], ['Perissa Black Sand Beach', 'nature', 36.3550, 25.4760, 2],
  ['Fira to Oia Hike', 'nature', 36.4380, 25.4100, 4]]);
add('Interlaken (Swiss Alps)', 'Europe', 'Switzerland', 'CHF', [46.6863, 7.8632], [
  ['Jungfraujoch – Top of Europe', 'sights', 46.5475, 7.9853, 6], ['Harder Kulm', 'sights', 46.6970, 7.8510, 1.5],
  ['Lauterbrunnen Valley', 'nature', 46.5935, 7.9091, 2], ['Grindelwald First', 'nature', 46.6590, 8.0540, 4],
  ['Lake Brienz Cruise', 'fun', 46.7300, 7.9500, 2], ['Spiez & Lake Thun', 'nature', 46.6880, 7.6800, 2],
  ['Höheweg Promenade', 'shopping', 46.6860, 7.8580, 1]]);

// ===================== AMERICAS =====================
add('New York', 'Americas', 'USA', 'USD', [40.7128, -74.0060], [
  ['Statue of Liberty', 'sights', 40.6892, -74.0445, 3], ['Central Park', 'nature', 40.7829, -73.9654, 2],
  ['Times Square', 'sights', 40.7580, -73.9855, 1], ['Empire State Building', 'sights', 40.7484, -73.9857, 1],
  ['Metropolitan Museum of Art', 'culture', 40.7794, -73.9632, 3], ['Brooklyn Bridge', 'sights', 40.7061, -73.9969, 1],
  ['9/11 Memorial & Museum', 'culture', 40.7115, -74.0134, 1.5], ['The High Line', 'nature', 40.7480, -74.0048, 1],
  ['Chelsea Market', 'food', 40.7424, -74.0061, 1], ['Top of the Rock', 'sights', 40.7587, -73.9787, 1],
  ['Fifth Avenue', 'shopping', 40.7600, -73.9750, 2]]);
add('Los Angeles', 'Americas', 'USA', 'USD', [34.0522, -118.2437], [
  ['Hollywood Walk of Fame', 'sights', 34.1016, -118.3267, 1], ['Griffith Observatory', 'sights', 34.1184, -118.3004, 1.5],
  ['Santa Monica Pier', 'fun', 34.0100, -118.4960, 2], ['Venice Beach', 'nature', 33.9850, -118.4695, 1.5],
  ['Getty Center', 'culture', 34.0780, -118.4741, 2.5], ['Universal Studios Hollywood', 'fun', 34.1381, -118.3534, 8],
  ['Rodeo Drive', 'shopping', 34.0697, -118.4029, 1], ['Grand Central Market', 'food', 34.0508, -118.2490, 1],
  ['Disneyland', 'fun', 33.8121, -117.9190, 8]]);
add('San Francisco', 'Americas', 'USA', 'USD', [37.7749, -122.4194], [
  ['Golden Gate Bridge', 'sights', 37.8199, -122.4783, 1.5], ['Alcatraz Island', 'culture', 37.8267, -122.4230, 3],
  ["Fisherman's Wharf & Pier 39", 'food', 37.8087, -122.4098, 2], ['Lombard Street', 'sights', 37.8021, -122.4187, 0.5],
  ['Chinatown', 'culture', 37.7941, -122.4078, 1.5], ['Cable Car Ride', 'fun', 37.7946, -122.4114, 1],
  ['Golden Gate Park', 'nature', 37.7694, -122.4862, 2], ['Ferry Building Marketplace', 'food', 37.7955, -122.3937, 1],
  ['Painted Ladies', 'sights', 37.7763, -122.4328, 0.5]]);
add('Las Vegas', 'Americas', 'USA', 'USD', [36.1699, -115.1398], [
  ['The Las Vegas Strip', 'fun', 36.1147, -115.1728, 3], ['Bellagio Fountains', 'sights', 36.1126, -115.1767, 0.5],
  ['Fremont Street Experience', 'fun', 36.1707, -115.1430, 2], ['High Roller', 'sights', 36.1176, -115.1683, 1],
  ['Grand Canyon West Day Trip', 'nature', 36.0120, -113.8110, 10], ['Sphere', 'fun', 36.1209, -115.1622, 2],
  ['Red Rock Canyon', 'nature', 36.1350, -115.4270, 3], ['Grand Canal Shoppes', 'shopping', 36.1212, -115.1697, 1.5]]);
add('Toronto', 'Americas', 'Canada', 'CAD', [43.6532, -79.3832], [
  ['CN Tower', 'sights', 43.6426, -79.3871, 1.5], ['Niagara Falls Day Trip', 'nature', 43.0896, -79.0849, 6],
  ['St. Lawrence Market', 'food', 43.6487, -79.3715, 1], ['Royal Ontario Museum', 'culture', 43.6677, -79.3948, 2],
  ['Distillery District', 'shopping', 43.6503, -79.3596, 1.5], ['Toronto Islands', 'nature', 43.6205, -79.3780, 3],
  ['Kensington Market', 'shopping', 43.6547, -79.4005, 1.5], ["Ripley's Aquarium", 'fun', 43.6424, -79.3860, 1.5]]);
add('Vancouver', 'Americas', 'Canada', 'CAD', [49.2827, -123.1207], [
  ['Stanley Park', 'nature', 49.3043, -123.1443, 2.5], ['Granville Island Market', 'food', 49.2711, -123.1340, 1.5],
  ['Capilano Suspension Bridge', 'nature', 49.3429, -123.1149, 2], ['Gastown', 'culture', 49.2840, -123.1090, 1],
  ['Grouse Mountain', 'nature', 49.3800, -123.0820, 3], ['Canada Place', 'sights', 49.2888, -123.1111, 0.5],
  ['English Bay', 'nature', 49.2860, -123.1430, 1], ['Whistler Day Trip', 'nature', 50.1163, -122.9574, 8]]);
add('Mexico City', 'Americas', 'Mexico', 'MXN', [19.4326, -99.1332], [
  ['Zócalo & Metropolitan Cathedral', 'sights', 19.4326, -99.1332, 1], ['Templo Mayor', 'culture', 19.4347, -99.1315, 1.5],
  ['Palacio de Bellas Artes', 'culture', 19.4352, -99.1412, 1], ['Chapultepec Castle', 'culture', 19.4204, -99.1819, 2],
  ['National Museum of Anthropology', 'culture', 19.4260, -99.1863, 2.5], ['Frida Kahlo Museum', 'culture', 19.3551, -99.1625, 1.5],
  ['Teotihuacan Pyramids', 'culture', 19.6925, -98.8438, 5], ['Xochimilco Boats', 'fun', 19.2570, -99.1050, 2],
  ['Roma & Condesa Taco Crawl', 'food', 19.4150, -99.1650, 2]]);
add('Cancún', 'Americas', 'Mexico', 'MXN', [21.1619, -86.8515], [
  ['Hotel Zone Beaches', 'nature', 21.1100, -86.7600, 3], ['Chichén Itzá', 'culture', 20.6843, -88.5678, 6],
  ['Isla Mujeres', 'nature', 21.2320, -86.7310, 5], ['Xcaret Park', 'fun', 20.5800, -87.1200, 8],
  ['Tulum Ruins', 'culture', 20.2147, -87.4290, 3], ['Cenote Ik Kil', 'nature', 20.6610, -88.5510, 1.5],
  ['Playa del Carmen 5th Avenue', 'shopping', 20.6296, -87.0739, 2]]);
add('Rio de Janeiro', 'Americas', 'Brazil', 'BRL', [-22.9068, -43.1729], [
  ['Christ the Redeemer', 'sights', -22.9519, -43.2105, 2], ['Sugarloaf Mountain', 'sights', -22.9492, -43.1546, 2],
  ['Copacabana Beach', 'nature', -22.9711, -43.1822, 2], ['Ipanema Beach', 'nature', -22.9838, -43.2048, 2],
  ['Selarón Steps', 'culture', -22.9154, -43.1791, 0.5], ['Tijuca Forest', 'nature', -22.9600, -43.2800, 3],
  ['Maracanã Stadium', 'fun', -22.9121, -43.2302, 1.5], ['Santa Teresa', 'culture', -22.9200, -43.1880, 1.5]]);
add('Buenos Aires', 'Americas', 'Argentina', 'ARS', [-34.6037, -58.3816], [
  ['La Boca & Caminito', 'culture', -34.6390, -58.3630, 1.5], ['Recoleta Cemetery', 'culture', -34.5875, -58.3934, 1.5],
  ['Plaza de Mayo & Casa Rosada', 'sights', -34.6081, -58.3703, 1], ['Teatro Colón', 'culture', -34.6010, -58.3831, 1.5],
  ['San Telmo Market', 'shopping', -34.6210, -58.3720, 2], ['Tango Show', 'fun', -34.6200, -58.3730, 2],
  ['Palermo Parks', 'nature', -34.5730, -58.4170, 2], ['Parrilla Steak Dinner', 'food', -34.5880, -58.4300, 1.5]]);
add('Cusco & Machu Picchu', 'Americas', 'Peru', 'PEN', [-13.5167, -71.9787], [
  ['Machu Picchu', 'culture', -13.1631, -72.5450, 5], ['Plaza de Armas', 'sights', -13.5167, -71.9787, 1],
  ['Sacsayhuamán', 'culture', -13.5085, -71.9817, 1.5], ['Qorikancha', 'culture', -13.5196, -71.9752, 1],
  ['Sacred Valley & Pisac', 'culture', -13.4180, -71.8470, 4], ['Rainbow Mountain', 'nature', -13.8693, -71.3030, 10],
  ['San Pedro Market', 'food', -13.5220, -71.9840, 1], ['Ollantaytambo', 'culture', -13.2581, -72.2636, 2]]);

// ===================== OCEANIA =====================
add('Sydney', 'Oceania', 'Australia', 'AUD', [-33.8688, 151.2093], [
  ['Sydney Opera House', 'culture', -33.8568, 151.2153, 1.5], ['Harbour Bridge Climb', 'sights', -33.8523, 151.2108, 3],
  ['Bondi Beach', 'nature', -33.8915, 151.2767, 2], ['Bondi to Coogee Walk', 'nature', -33.8990, 151.2700, 2],
  ['The Rocks', 'culture', -33.8599, 151.2090, 1.5], ['Royal Botanic Garden', 'nature', -33.8642, 151.2166, 1.5],
  ['Darling Harbour', 'fun', -33.8737, 151.2006, 2], ['Manly Ferry', 'fun', -33.8000, 151.2850, 3],
  ['Blue Mountains Day Trip', 'nature', -33.7320, 150.3120, 8]]);
add('Melbourne', 'Oceania', 'Australia', 'AUD', [-37.8136, 144.9631], [
  ['Federation Square', 'sights', -37.8180, 144.9691, 0.5], ['Hosier Lane Street Art', 'culture', -37.8166, 144.9692, 0.5],
  ['Queen Victoria Market', 'food', -37.8076, 144.9568, 1.5], ['Royal Botanic Gardens', 'nature', -37.8304, 144.9796, 1.5],
  ['St Kilda Beach', 'nature', -37.8676, 144.9740, 1.5], ['Great Ocean Road Day Trip', 'nature', -38.6662, 143.1050, 10],
  ['Melbourne Cricket Ground', 'fun', -37.8200, 144.9834, 1.5], ['Laneway Coffee Crawl', 'food', -37.8150, 144.9650, 1],
  ['Phillip Island Penguin Parade', 'nature', -38.5100, 145.1500, 5]]);
add('Auckland', 'Oceania', 'New Zealand', 'NZD', [-36.8485, 174.7633], [
  ['Sky Tower', 'sights', -36.8484, 174.7622, 1], ['Waiheke Island', 'nature', -36.8000, 175.1000, 6],
  ['Mount Eden', 'nature', -36.8770, 174.7640, 1], ['Auckland War Memorial Museum', 'culture', -36.8604, 174.7778, 2],
  ['Viaduct Harbour', 'food', -36.8430, 174.7590, 1.5], ['Hobbiton Movie Set Day Trip', 'fun', -37.8721, 175.6829, 6],
  ['Piha Beach', 'nature', -36.9530, 174.4710, 3]]);
add('Queenstown', 'Oceania', 'New Zealand', 'NZD', [-45.0312, 168.6626], [
  ['Skyline Gondola & Luge', 'fun', -45.0300, 168.6550, 2], ['Milford Sound Day Trip', 'nature', -44.6414, 167.8974, 12],
  ['Shotover Jet', 'fun', -44.9900, 168.6800, 1], ['Fergburger', 'food', -45.0330, 168.6590, 1],
  ['Lake Wakatipu Cruise', 'fun', -45.0350, 168.6600, 1.5], ['Arrowtown', 'culture', -44.9420, 168.8340, 2],
  ['Kawarau Bungy', 'fun', -45.0100, 168.8900, 2], ['Glenorchy', 'nature', -44.8500, 168.3880, 3]]);

// ===================== AFRICA =====================
add('Cairo', 'Africa', 'Egypt', 'EGP', [30.0444, 31.2357], [
  ['Pyramids of Giza', 'sights', 29.9792, 31.1342, 3], ['Great Sphinx', 'sights', 29.9753, 31.1376, 0.5],
  ['Grand Egyptian Museum', 'culture', 29.9940, 31.1190, 3], ['Khan el-Khalili Bazaar', 'shopping', 30.0478, 31.2623, 2],
  ['Al-Azhar & Islamic Cairo', 'culture', 30.0457, 31.2627, 1.5], ['Citadel of Saladin', 'culture', 30.0287, 31.2599, 1.5],
  ['Nile Felucca Ride', 'fun', 30.0420, 31.2240, 1], ['Saqqara Step Pyramid', 'culture', 29.8713, 31.2165, 2]]);
add('Marrakech', 'Africa', 'Morocco', 'MAD', [31.6295, -7.9811], [
  ['Jemaa el-Fnaa', 'food', 31.6258, -7.9891, 2], ['Majorelle Garden', 'nature', 31.6417, -8.0033, 1],
  ['Bahia Palace', 'culture', 31.6216, -7.9831, 1], ['Koutoubia Mosque', 'culture', 31.6237, -7.9936, 0.5],
  ['Medina Souks', 'shopping', 31.6300, -7.9870, 2], ['Ben Youssef Madrasa', 'culture', 31.6320, -7.9860, 1],
  ['Saadian Tombs', 'culture', 31.6170, -7.9890, 0.5], ['Atlas Mountains Day Trip', 'nature', 31.2000, -7.8600, 8]]);
add('Cape Town', 'Africa', 'South Africa', 'ZAR', [-33.9249, 18.4241], [
  ['Table Mountain', 'nature', -33.9628, 18.4098, 3], ['V&A Waterfront', 'shopping', -33.9036, 18.4207, 2],
  ['Robben Island', 'culture', -33.8076, 18.3712, 4], ['Boulders Beach Penguins', 'nature', -34.1975, 18.4513, 1.5],
  ['Cape of Good Hope', 'nature', -34.3568, 18.4740, 2], ['Kirstenbosch Botanical Garden', 'nature', -33.9875, 18.4327, 2],
  ['Bo-Kaap', 'culture', -33.9203, 18.4148, 1], ["Chapman's Peak Drive", 'sights', -34.0870, 18.3600, 1]]);

D['Makkah'].tags = D['Madinah'].tags = ['Umrah', 'Hajj'];

})();
