// Destination library, part 3 – Europe in depth, all of Japan, Maldives and many more.
// Place format: [name, category, lat, lng, suggested hours]
(() => {
const D = window.MP_DESTINATIONS;
const add = (name, region, country, currency, center, places, tags) => { D[name] = { region, country, currency, center, places, ...(tags ? { tags } : {}) }; };
const more = (name, places) => D[name] && D[name].places.push(...places);

// ---------- Extra highlights for existing cities ----------
more('Paris', [['Palace of Versailles', 'culture', 48.8049, 2.1204, 4], ['Disneyland Paris', 'fun', 48.8722, 2.7758, 8], ['Galeries Lafayette', 'shopping', 48.8738, 2.3320, 1.5]]);
more('London', [['Warner Bros. Studio Tour – Harry Potter', 'fun', 51.6907, -0.4185, 4], ['Windsor Castle', 'culture', 51.4839, -0.6044, 2.5], ['Natural History Museum', 'culture', 51.4967, -0.1764, 2]]);
more('Tokyo', [['Tokyo Disneyland', 'fun', 35.6329, 139.8804, 8], ['Ghibli Museum', 'culture', 35.6962, 139.5704, 2], ['Ginza', 'shopping', 35.6717, 139.7650, 1.5]]);
more('Amsterdam', [['Keukenhof Tulip Gardens', 'nature', 52.2697, 4.5462, 3]]);
more('Florence', [['Leaning Tower of Pisa', 'sights', 43.7230, 10.3966, 2], ['Siena – Piazza del Campo', 'culture', 43.3185, 11.3316, 3]]);
D['Edinburgh'].tags = ['Scotland'];
D['London'].tags = ['England'];

// ===================== GERMANY =====================
add('Munich', 'Europe', 'Germany', 'EUR', [48.1351, 11.5820], [
  ['Marienplatz & Glockenspiel', 'sights', 48.1374, 11.5755, 1], ['Frauenkirche', 'culture', 48.1386, 11.5736, 0.5],
  ['Viktualienmarkt', 'food', 48.1351, 11.5763, 1], ['Hofbräuhaus', 'food', 48.1376, 11.5799, 1.5],
  ['English Garden', 'nature', 48.1642, 11.6056, 2], ['Nymphenburg Palace', 'culture', 48.1583, 11.5033, 2],
  ['BMW Welt & Museum', 'fun', 48.1770, 11.5560, 2], ['Munich Residenz', 'culture', 48.1410, 11.5790, 2],
  ['Dachau Memorial Site', 'culture', 48.2700, 11.4680, 3]]);
add('Neuschwanstein & Füssen', 'Europe', 'Germany', 'EUR', [47.5700, 10.7000], [
  ['Neuschwanstein Castle', 'sights', 47.5576, 10.7498, 2.5], ['Hohenschwangau Castle', 'culture', 47.5552, 10.7372, 1.5],
  ["Marienbrücke (Mary's Bridge)", 'sights', 47.5580, 10.7520, 0.5], ['Alpsee Lake', 'nature', 47.5550, 10.7300, 1],
  ['Füssen Old Town', 'culture', 47.5700, 10.7010, 1.5], ['Tegelberg Cable Car', 'nature', 47.5630, 10.7770, 2]]);
add('Hamburg', 'Europe', 'Germany', 'EUR', [53.5511, 9.9937], [
  ['Speicherstadt', 'culture', 53.5440, 9.9900, 1.5], ['Elbphilharmonie Plaza', 'sights', 53.5413, 9.9841, 1],
  ['Miniatur Wunderland', 'fun', 53.5439, 9.9887, 3], ['Hamburg Fish Market', 'food', 53.5459, 9.9530, 1],
  ['St. Pauli & Reeperbahn', 'fun', 53.5497, 9.9650, 1.5], ['Hamburg City Hall', 'sights', 53.5503, 9.9930, 0.5],
  ['Alster Lakes', 'nature', 53.5620, 10.0050, 1.5], ['Harbour Boat Tour', 'fun', 53.5460, 9.9700, 1]]);
add('Cologne', 'Europe', 'Germany', 'EUR', [50.9375, 6.9603], [
  ['Cologne Cathedral', 'culture', 50.9413, 6.9583, 1.5], ['Hohenzollern Bridge', 'sights', 50.9413, 6.9658, 0.5],
  ['Chocolate Museum', 'fun', 50.9322, 6.9642, 1.5], ['Old Town & Rhine Promenade', 'food', 50.9380, 6.9620, 1.5],
  ['Museum Ludwig', 'culture', 50.9410, 6.9610, 1.5], ['Rhine River Cruise', 'fun', 50.9390, 6.9650, 1.5]]);
add('Heidelberg', 'Europe', 'Germany', 'EUR', [49.3988, 8.6724], [
  ['Heidelberg Castle', 'sights', 49.4106, 8.7153, 2], ['Old Bridge', 'sights', 49.4142, 8.7101, 0.5],
  ["Philosophers' Walk", 'nature', 49.4160, 8.7060, 1.5], ['Hauptstrasse', 'shopping', 49.4120, 8.7000, 1.5],
  ['Königstuhl Funicular', 'nature', 49.3990, 8.7250, 1.5], ['Heidelberg University', 'culture', 49.4105, 8.7060, 1]]);
add('Frankfurt', 'Europe', 'Germany', 'EUR', [50.1109, 8.6821], [
  ['Römerberg', 'sights', 50.1104, 8.6820, 1], ['Main Tower', 'sights', 50.1125, 8.6720, 1],
  ['Städel Museum', 'culture', 50.1030, 8.6740, 2], ['Sachsenhausen Apple Wine Taverns', 'food', 50.1030, 8.6900, 1.5],
  ['Kleinmarkthalle', 'food', 50.1130, 8.6830, 1], ['Palmengarten', 'nature', 50.1230, 8.6570, 1.5]]);
add('Black Forest', 'Europe', 'Germany', 'EUR', [48.0000, 8.1000], [
  ['Triberg Waterfalls', 'nature', 48.1310, 8.2310, 1.5], ['Freiburg Old Town', 'culture', 47.9950, 7.8520, 2],
  ['Titisee Lake', 'nature', 47.8990, 8.1550, 2], ['Baden-Baden Thermal Baths', 'fun', 48.7600, 8.2410, 2.5],
  ['Black Forest Cake Café', 'food', 48.1290, 8.2280, 1], ['Feldberg Summit', 'nature', 47.8740, 8.0040, 2]]);
add('Rothenburg ob der Tauber', 'Europe', 'Germany', 'EUR', [49.3772, 10.1786], [
  ['Market Square', 'sights', 49.3770, 10.1790, 1], ['Plönlein', 'sights', 49.3748, 10.1792, 0.5],
  ['Town Wall Walk', 'culture', 49.3770, 10.1830, 1], ['Christmas Museum & Shop', 'shopping', 49.3765, 10.1785, 1],
  ["Night Watchman's Tour", 'fun', 49.3770, 10.1790, 1], ['Burggarten', 'nature', 49.3768, 10.1755, 0.5]]);

// ===================== AUSTRIA =====================
add('Salzburg', 'Europe', 'Austria', 'EUR', [47.8095, 13.0550], [
  ['Hohensalzburg Fortress', 'sights', 47.7950, 13.0477, 2], ['Mirabell Gardens', 'nature', 47.8058, 13.0418, 1],
  ['Getreidegasse', 'shopping', 47.8000, 13.0430, 1], ["Mozart's Birthplace", 'culture', 47.8000, 13.0435, 1],
  ['Salzburg Cathedral', 'culture', 47.7979, 13.0470, 0.5], ['Sound of Music Tour', 'fun', 47.8000, 13.0400, 4],
  ['Hellbrunn Palace', 'culture', 47.7620, 13.0610, 1.5]]);
add('Hallstatt', 'Europe', 'Austria', 'EUR', [47.5622, 13.6493], [
  ['Hallstatt Postcard Viewpoint', 'sights', 47.5630, 13.6470, 0.5], ['Hallstatt Salt Mine', 'culture', 47.5620, 13.6340, 2.5],
  ['World Heritage Skywalk', 'sights', 47.5610, 13.6400, 1], ['Market Square', 'culture', 47.5622, 13.6493, 0.5],
  ['Lake Hallstatt Boat Ride', 'fun', 47.5640, 13.6500, 1], ['Dachstein 5 Fingers', 'nature', 47.5280, 13.6930, 3],
  ['Bone House (Beinhaus)', 'culture', 47.5615, 13.6480, 0.5]]);
add('Innsbruck', 'Europe', 'Austria', 'EUR', [47.2692, 11.4041], [
  ['Golden Roof', 'sights', 47.2687, 11.3933, 0.5], ['Nordkette Cable Car', 'nature', 47.3070, 11.3810, 3],
  ['Hofburg Imperial Palace', 'culture', 47.2690, 11.3950, 1], ['Swarovski Crystal Worlds', 'fun', 47.2950, 11.6010, 2],
  ['Ambras Castle', 'culture', 47.2560, 11.4340, 1.5], ['Bergisel Ski Jump', 'sights', 47.2490, 11.3990, 1]]);

// ===================== UNITED KINGDOM – England =====================
add('Manchester', 'Europe', 'United Kingdom', 'GBP', [53.4808, -2.2426], [
  ['Old Trafford', 'fun', 53.4631, -2.2913, 1.5], ['Etihad Stadium', 'fun', 53.4831, -2.2004, 1.5],
  ['Science and Industry Museum', 'culture', 53.4770, -2.2550, 1.5], ['Northern Quarter', 'shopping', 53.4840, -2.2340, 1.5],
  ['John Rylands Library', 'culture', 53.4806, -2.2484, 1], ['Manchester Art Gallery', 'culture', 53.4787, -2.2414, 1],
  ['Curry Mile', 'food', 53.4520, -2.2260, 1]], ['England']);
add('Liverpool', 'Europe', 'United Kingdom', 'GBP', [53.4084, -2.9916], [
  ['Anfield Stadium Tour', 'fun', 53.4308, -2.9608, 1.5], ['The Beatles Story', 'culture', 53.3995, -2.9920, 1.5],
  ['Royal Albert Dock', 'sights', 53.4005, -2.9920, 1.5], ['The Cavern Club', 'fun', 53.4065, -2.9876, 1],
  ['Liverpool Cathedral', 'culture', 53.3974, -2.9733, 1], ['Museum of Liverpool', 'culture', 53.4040, -2.9950, 1.5]], ['England']);
add('Bath & Stonehenge', 'Europe', 'United Kingdom', 'GBP', [51.3811, -2.3590], [
  ['Roman Baths', 'culture', 51.3811, -2.3595, 1.5], ['Bath Abbey', 'culture', 51.3815, -2.3587, 0.5],
  ['Royal Crescent', 'sights', 51.3870, -2.3680, 0.5], ['Pulteney Bridge', 'sights', 51.3835, -2.3570, 0.5],
  ['Thermae Bath Spa', 'fun', 51.3800, -2.3610, 2], ["Sally Lunn's Bunns", 'food', 51.3808, -2.3578, 1],
  ['Stonehenge', 'sights', 51.1789, -1.8262, 2]], ['England']);
add('Oxford', 'Europe', 'United Kingdom', 'GBP', [51.7520, -1.2577], [
  ['Christ Church College', 'culture', 51.7500, -1.2560, 1.5], ['Bodleian Library', 'culture', 51.7540, -1.2540, 1],
  ['Radcliffe Camera', 'sights', 51.7534, -1.2540, 0.5], ['Covered Market', 'food', 51.7520, -1.2580, 1],
  ['Punting on the Cherwell', 'fun', 51.7510, -1.2470, 1], ['Ashmolean Museum', 'culture', 51.7555, -1.2601, 1.5]], ['England']);
add('Cambridge', 'Europe', 'United Kingdom', 'GBP', [52.2053, 0.1218], [
  ["King's College Chapel", 'culture', 52.2047, 0.1164, 1], ['Punting on the Cam', 'fun', 52.2040, 0.1150, 1],
  ['Trinity College', 'culture', 52.2070, 0.1170, 1], ['Fitzwilliam Museum', 'culture', 52.2000, 0.1190, 1.5],
  ['Mathematical Bridge', 'sights', 52.2023, 0.1146, 0.5], ['Cambridge Market', 'food', 52.2055, 0.1190, 1]], ['England']);
add('York', 'Europe', 'United Kingdom', 'GBP', [53.9590, -1.0815], [
  ['York Minster', 'culture', 53.9623, -1.0819, 1.5], ['The Shambles', 'shopping', 53.9595, -1.0802, 1],
  ['City Walls Walk', 'sights', 53.9620, -1.0870, 1.5], ['Jorvik Viking Centre', 'culture', 53.9575, -1.0805, 1.5],
  ['National Railway Museum', 'fun', 53.9605, -1.0960, 2], ["Clifford's Tower", 'sights', 53.9558, -1.0800, 0.5],
  ["Bettys Tea Room", 'food', 53.9600, -1.0850, 1]], ['England']);
add('Lake District', 'Europe', 'United Kingdom', 'GBP', [54.4609, -3.0886], [
  ['Windermere Lake Cruise', 'fun', 54.3650, -2.9210, 1.5], ['Grasmere & Dove Cottage', 'culture', 54.4580, -3.0230, 1.5],
  ['World of Beatrix Potter', 'fun', 54.3640, -2.9200, 1], ['Keswick & Derwentwater', 'nature', 54.6000, -3.1400, 2],
  ['Scafell Pike', 'nature', 54.4542, -3.2116, 6], ['Ambleside', 'food', 54.4320, -2.9620, 1],
  ['Castlerigg Stone Circle', 'culture', 54.6027, -3.0985, 0.5]], ['England']);
add('Cotswolds', 'Europe', 'United Kingdom', 'GBP', [51.8330, -1.8330], [
  ['Bibury', 'sights', 51.7590, -1.8330, 1], ['Bourton-on-the-Water', 'sights', 51.8850, -1.7590, 1.5],
  ['Castle Combe', 'sights', 51.4930, -2.2290, 1], ['Stow-on-the-Wold', 'shopping', 51.9300, -1.7230, 1],
  ['Broadway Tower', 'sights', 52.0250, -1.8370, 1], ['Blenheim Palace', 'culture', 51.8414, -1.3611, 2.5],
  ['Chipping Campden', 'culture', 52.0510, -1.7800, 1]], ['England']);

// ===================== UNITED KINGDOM – Scotland =====================
add('Glasgow', 'Europe', 'United Kingdom', 'GBP', [55.8642, -4.2518], [
  ['Kelvingrove Art Gallery', 'culture', 55.8686, -4.2906, 2], ['Glasgow Cathedral', 'culture', 55.8628, -4.2350, 1],
  ['Glasgow Necropolis', 'culture', 55.8622, -4.2310, 1], ['Riverside Museum', 'culture', 55.8650, -4.3060, 1.5],
  ['Buchanan Street', 'shopping', 55.8610, -4.2540, 1.5], ['University of Glasgow', 'culture', 55.8721, -4.2882, 1],
  ['West End Food Scene', 'food', 55.8750, -4.2930, 1.5]], ['Scotland']);
add('Scottish Highlands (Inverness)', 'Europe', 'United Kingdom', 'GBP', [57.4778, -4.2247], [
  ['Loch Ness & Urquhart Castle', 'sights', 57.3241, -4.4419, 2], ['Culloden Battlefield', 'culture', 57.4780, -4.0960, 1.5],
  ['Inverness Castle', 'sights', 57.4760, -4.2260, 0.5], ['Glencoe', 'nature', 56.6826, -5.1023, 3],
  ['Glenfinnan Viaduct (Harry Potter train)', 'sights', 56.8763, -5.4318, 1.5], ['Eilean Donan Castle', 'sights', 57.2740, -5.5160, 1],
  ['Ben Nevis', 'nature', 56.7969, -5.0036, 6], ['Cairngorms National Park', 'nature', 57.1170, -3.6400, 3]], ['Scotland', 'Loch Ness']);
add('Isle of Skye', 'Europe', 'United Kingdom', 'GBP', [57.2736, -6.2155], [
  ['Old Man of Storr', 'nature', 57.5070, -6.1830, 3], ['Fairy Pools', 'nature', 57.2510, -6.2720, 2],
  ['Quiraing', 'nature', 57.6430, -6.2640, 2.5], ['Neist Point Lighthouse', 'sights', 57.4235, -6.7882, 1.5],
  ['Portree Harbour', 'food', 57.4120, -6.1940, 1.5], ['Dunvegan Castle', 'culture', 57.4480, -6.5900, 1.5],
  ['Kilt Rock', 'sights', 57.6100, -6.1720, 0.5]], ['Scotland']);

// ===================== IRELAND =====================
add('Dublin', 'Europe', 'Ireland', 'EUR', [53.3498, -6.2603], [
  ['Trinity College & Book of Kells', 'culture', 53.3438, -6.2546, 1.5], ['Guinness Storehouse', 'fun', 53.3419, -6.2867, 2],
  ['Temple Bar', 'food', 53.3455, -6.2643, 2], ['Dublin Castle', 'culture', 53.3429, -6.2674, 1],
  ["St Patrick's Cathedral", 'culture', 53.3395, -6.2715, 1], ['Cliffs of Moher Day Trip', 'nature', 52.9715, -9.4309, 10],
  ['Howth Cliff Walk', 'nature', 53.3780, -6.0650, 3], ['Phoenix Park', 'nature', 53.3559, -6.3298, 1.5]]);

// ===================== FRANCE =====================
add('Nice & French Riviera', 'Europe', 'France', 'EUR', [43.7102, 7.2620], [
  ['Promenade des Anglais', 'sights', 43.6950, 7.2650, 1], ['Vieux Nice & Cours Saleya Market', 'food', 43.6960, 7.2750, 1.5],
  ['Castle Hill', 'sights', 43.6950, 7.2810, 1], ['Monaco & Monte Carlo', 'sights', 43.7384, 7.4246, 4],
  ['Èze Village', 'culture', 43.7280, 7.3610, 2], ['Cannes La Croisette', 'shopping', 43.5510, 7.0170, 2],
  ['Antibes Old Town', 'culture', 43.5804, 7.1251, 2], ['Villefranche-sur-Mer', 'nature', 43.7040, 7.3110, 1.5]], ['Monaco', 'Côte d\'Azur']);
add('Lyon', 'Europe', 'France', 'EUR', [45.7640, 4.8357], [
  ['Basilica of Notre-Dame de Fourvière', 'culture', 45.7623, 4.8226, 1], ['Vieux Lyon & Traboules', 'culture', 45.7620, 4.8270, 1.5],
  ['Les Halles Paul Bocuse', 'food', 45.7630, 4.8500, 1.5], ['Place Bellecour', 'sights', 45.7578, 4.8320, 0.5],
  ["Parc de la Tête d'Or", 'nature', 45.7770, 4.8530, 1.5], ['Musée des Confluences', 'culture', 45.7330, 4.8180, 2],
  ['Bouchon Dinner', 'food', 45.7670, 4.8340, 1.5]]);
add('Marseille', 'Europe', 'France', 'EUR', [43.2965, 5.3698], [
  ['Old Port (Vieux-Port)', 'sights', 43.2951, 5.3740, 1], ['Notre-Dame de la Garde', 'culture', 43.2840, 5.3710, 1],
  ['Le Panier', 'culture', 43.2990, 5.3690, 1.5], ['MuCEM', 'culture', 43.2967, 5.3610, 1.5],
  ['Calanques National Park', 'nature', 43.2100, 5.4500, 4], ["Château d'If", 'sights', 43.2799, 5.3253, 2],
  ['Bouillabaisse Dinner', 'food', 43.2930, 5.3720, 1.5]]);
add('Provence (Avignon)', 'Europe', 'France', 'EUR', [43.9493, 4.8055], [
  ['Palais des Papes', 'culture', 43.9508, 4.8076, 1.5], ["Pont d'Avignon", 'sights', 43.9539, 4.8048, 0.5],
  ['Valensole Lavender Fields', 'nature', 43.8370, 5.9830, 2], ['Gordes', 'sights', 43.9110, 5.2000, 1.5],
  ['Sénanque Abbey', 'culture', 43.9283, 5.1868, 1], ['Pont du Gard', 'sights', 43.9475, 4.5350, 2],
  ['Roussillon Ochre Trail', 'nature', 43.9020, 5.2930, 1.5], ['Arles Roman Arena', 'culture', 43.6776, 4.6310, 1.5]], ['Lavender']);
add('Bordeaux', 'Europe', 'France', 'EUR', [44.8378, -0.5792], [
  ['Place de la Bourse & Water Mirror', 'sights', 44.8412, -0.5695, 0.5], ['La Cité du Vin', 'culture', 44.8625, -0.5506, 2],
  ['Saint-Émilion Day Trip', 'food', 44.8940, -0.1560, 5], ['Rue Sainte-Catherine', 'shopping', 44.8390, -0.5740, 1.5],
  ['Bordeaux Cathedral', 'culture', 44.8378, -0.5775, 0.5], ['Marché des Capucins', 'food', 44.8310, -0.5680, 1],
  ['Dune du Pilat', 'nature', 44.5890, -1.2130, 3]]);
add('Strasbourg & Alsace', 'Europe', 'France', 'EUR', [48.5734, 7.7521], [
  ['Strasbourg Cathedral', 'culture', 48.5818, 7.7509, 1], ['Petite France', 'sights', 48.5806, 7.7414, 1.5],
  ['Colmar Little Venice', 'sights', 48.0730, 7.3580, 2], ['River Ill Boat Tour', 'fun', 48.5820, 7.7450, 1],
  ['Riquewihr', 'culture', 48.1670, 7.2980, 1.5], ['Haut-Kœnigsbourg Castle', 'sights', 48.2493, 7.3446, 1.5],
  ['Christmas Market', 'shopping', 48.5830, 7.7480, 1.5]]);
add('Normandy & Mont-Saint-Michel', 'Europe', 'France', 'EUR', [49.1000, -0.5000], [
  ['Mont-Saint-Michel Abbey', 'culture', 48.6361, -1.5115, 3], ['D-Day Beaches (Omaha Beach)', 'culture', 49.3690, -0.8720, 3],
  ['Bayeux Tapestry', 'culture', 49.2745, -0.7000, 1.5], ['Étretat Cliffs', 'nature', 49.7070, 0.2030, 2],
  ['Honfleur Harbour', 'sights', 49.4190, 0.2330, 1.5], ["Monet's Garden, Giverny", 'nature', 49.0750, 1.5330, 2]]);
add('Chamonix (Mont Blanc)', 'Europe', 'France', 'EUR', [45.9237, 6.8694], [
  ['Aiguille du Midi', 'sights', 45.8790, 6.8873, 3], ['Mer de Glace & Montenvers Train', 'nature', 45.9300, 6.9180, 2.5],
  ['Lac Blanc Hike', 'nature', 45.9800, 6.8920, 5], ['Chamonix Town', 'food', 45.9237, 6.8694, 1.5],
  ['Tandem Paragliding', 'fun', 45.9300, 6.8700, 1]]);

// ===================== ITALY =====================
add('Milan', 'Europe', 'Italy', 'EUR', [45.4642, 9.1900], [
  ['Duomo di Milano', 'culture', 45.4641, 9.1919, 1.5], ['Galleria Vittorio Emanuele II', 'shopping', 45.4655, 9.1900, 1],
  ['The Last Supper', 'culture', 45.4660, 9.1710, 1], ['Sforza Castle', 'culture', 45.4705, 9.1795, 1.5],
  ['Navigli District', 'food', 45.4520, 9.1760, 2], ['Brera District', 'culture', 45.4720, 9.1880, 1.5],
  ['La Scala', 'culture', 45.4674, 9.1895, 1], ['San Siro Stadium', 'fun', 45.4781, 9.1240, 1.5]]);
add('Lake Como', 'Europe', 'Italy', 'EUR', [45.9870, 9.2570], [
  ['Bellagio', 'sights', 45.9850, 9.2580, 2], ['Varenna', 'sights', 46.0100, 9.2840, 1.5],
  ['Villa del Balbianello', 'culture', 45.9650, 9.2030, 1.5], ['Villa Carlotta', 'nature', 45.9860, 9.2350, 1.5],
  ['Como Town & Brunate Funicular', 'sights', 45.8130, 9.0860, 2], ['Lake Ferry Hopping', 'fun', 45.9900, 9.2600, 1]]);
add('Amalfi Coast & Naples', 'Europe', 'Italy', 'EUR', [40.6340, 14.6027], [
  ['Positano', 'sights', 40.6281, 14.4850, 2], ['Amalfi Town & Cathedral', 'culture', 40.6340, 14.6027, 1.5],
  ['Ravello – Villa Rufolo', 'nature', 40.6490, 14.6120, 1.5], ['Pompeii', 'culture', 40.7490, 14.4840, 3],
  ['Naples Pizza', 'food', 40.8518, 14.2681, 1], ['Capri & Blue Grotto', 'nature', 40.5600, 14.2050, 5],
  ['Path of the Gods', 'nature', 40.6250, 14.5260, 3], ['Mount Vesuvius', 'nature', 40.8210, 14.4260, 2.5]], ['Capri', 'Pompeii']);
add('Cinque Terre', 'Europe', 'Italy', 'EUR', [44.1270, 9.7200], [
  ['Manarola', 'sights', 44.1065, 9.7290, 1], ['Vernazza', 'sights', 44.1350, 9.6840, 1],
  ['Riomaggiore', 'sights', 44.0990, 9.7380, 1], ['Monterosso Beach', 'nature', 44.1460, 9.6540, 2],
  ['Corniglia', 'sights', 44.1200, 9.7090, 1], ['Blue Trail Hike', 'nature', 44.1300, 9.7000, 3],
  ['Portovenere', 'sights', 44.0500, 9.8350, 1.5]]);
add('Sicily', 'Europe', 'Italy', 'EUR', [37.6000, 14.0154], [
  ['Palermo Cathedral', 'culture', 38.1143, 13.3560, 1], ['Ballarò Market', 'food', 38.1110, 13.3590, 1],
  ['Taormina Ancient Theatre', 'culture', 37.8520, 15.2920, 1.5], ['Mount Etna', 'nature', 37.7510, 14.9934, 5],
  ['Valley of the Temples', 'culture', 37.2900, 13.5850, 2.5], ['Cefalù', 'sights', 38.0390, 14.0220, 2],
  ['Ortigia, Syracuse', 'culture', 37.0600, 15.2930, 2]]);
add('Dolomites', 'Europe', 'Italy', 'EUR', [46.5500, 11.9500], [
  ['Seceda Ridge', 'nature', 46.6000, 11.7240, 4], ['Tre Cime di Lavaredo', 'nature', 46.6186, 12.3020, 4],
  ['Lago di Braies', 'nature', 46.6945, 12.0857, 2], ['Alpe di Siusi', 'nature', 46.5400, 11.6200, 3],
  ["Cortina d'Ampezzo", 'shopping', 46.5405, 12.1357, 1.5], ['Val di Funes Church', 'sights', 46.6400, 11.7240, 1]]);

// ===================== SPAIN & PORTUGAL =====================
add('Seville', 'Europe', 'Spain', 'EUR', [37.3891, -5.9845], [
  ['Real Alcázar', 'culture', 37.3830, -5.9910, 2], ['Seville Cathedral & Giralda', 'culture', 37.3858, -5.9931, 1.5],
  ['Plaza de España', 'sights', 37.3772, -5.9869, 1], ['Metropol Parasol', 'sights', 37.3934, -5.9918, 1],
  ['Barrio Santa Cruz', 'culture', 37.3860, -5.9890, 1.5], ['Flamenco Show', 'fun', 37.3880, -5.9900, 1.5],
  ['Triana Market', 'food', 37.3860, -6.0030, 1]], ['Andalusia']);
add('Granada', 'Europe', 'Spain', 'EUR', [37.1773, -3.5986], [
  ['Alhambra', 'culture', 37.1761, -3.5881, 3], ['Generalife Gardens', 'nature', 37.1770, -3.5840, 1],
  ['Albaicín & Mirador San Nicolás', 'sights', 37.1810, -3.5926, 1.5], ['Granada Cathedral', 'culture', 37.1763, -3.5990, 1],
  ['Sacromonte Caves', 'culture', 37.1830, -3.5850, 1.5], ['Free Tapas on Calle Navas', 'food', 37.1740, -3.5990, 1.5]], ['Andalusia', 'Islamic heritage']);
add('Valencia', 'Europe', 'Spain', 'EUR', [39.4699, -0.3763], [
  ['City of Arts and Sciences', 'sights', 39.4545, -0.3505, 2.5], ['Mercado Central', 'food', 39.4739, -0.3790, 1],
  ['Old Town & Cathedral', 'culture', 39.4755, -0.3753, 1.5], ['Turia Gardens', 'nature', 39.4740, -0.3700, 1.5],
  ['Paella at Malvarrosa Beach', 'food', 39.4800, -0.3240, 2], ['Albufera Natural Park', 'nature', 39.3330, -0.3520, 2]]);
add('Mallorca', 'Europe', 'Spain', 'EUR', [39.6953, 3.0176], [
  ['Palma Cathedral', 'culture', 39.5675, 2.6483, 1], ['Palma Old Town', 'shopping', 39.5700, 2.6500, 1.5],
  ['Valldemossa', 'culture', 39.7106, 2.6223, 1.5], ['Cap de Formentor', 'nature', 39.9620, 3.2130, 2],
  ['Caves of Drach', 'nature', 39.5370, 3.3310, 1.5], ['Sóller Vintage Train', 'fun', 39.7670, 2.7150, 2],
  ['Es Trenc Beach', 'nature', 39.3420, 2.9900, 3]]);
add('Porto', 'Europe', 'Portugal', 'EUR', [41.1579, -8.6291], [
  ['Ribeira', 'sights', 41.1405, -8.6133, 1.5], ['Dom Luís I Bridge', 'sights', 41.1400, -8.6094, 0.5],
  ['Livraria Lello', 'culture', 41.1469, -8.6149, 0.5], ['Port Wine Cellars, Gaia', 'food', 41.1370, -8.6130, 1.5],
  ['Clérigos Tower', 'sights', 41.1457, -8.6140, 0.5], ['São Bento Station Tiles', 'culture', 41.1456, -8.6106, 0.5],
  ['Douro Valley Day Trip', 'nature', 41.1600, -7.7900, 8]]);
add('Algarve', 'Europe', 'Portugal', 'EUR', [37.0179, -7.9304], [
  ['Benagil Sea Cave', 'nature', 37.0874, -8.4256, 2], ['Ponta da Piedade', 'nature', 37.0806, -8.6693, 1.5],
  ['Praia da Marinha', 'nature', 37.0900, -8.4120, 2], ['Lagos Old Town', 'culture', 37.1020, -8.6730, 1.5],
  ['Faro Old Town', 'culture', 37.0140, -7.9350, 1.5], ['Sagres & Cape St. Vincent', 'nature', 37.0230, -8.9970, 2]]);

// ===================== BELGIUM & SWITZERLAND =====================
add('Brussels', 'Europe', 'Belgium', 'EUR', [50.8503, 4.3517], [
  ['Grand Place', 'sights', 50.8467, 4.3525, 1], ['Manneken Pis', 'sights', 50.8450, 4.3500, 0.5],
  ['Atomium', 'sights', 50.8949, 4.3415, 1.5], ['Royal Galleries & Chocolate Shops', 'food', 50.8480, 4.3550, 1],
  ['Magritte Museum', 'culture', 50.8420, 4.3580, 1.5], ['Belgian Waffles & Frites', 'food', 50.8470, 4.3500, 0.5],
  ['Mini-Europe', 'fun', 50.8940, 4.3390, 1.5]]);
add('Bruges', 'Europe', 'Belgium', 'EUR', [51.2093, 3.2247], [
  ['Markt & Belfry', 'sights', 51.2085, 3.2243, 1.5], ['Canal Boat Tour', 'fun', 51.2060, 3.2260, 0.5],
  ['Basilica of the Holy Blood', 'culture', 51.2094, 3.2271, 0.5], ['Minnewater Lake', 'nature', 51.1980, 3.2240, 1],
  ['Begijnhof', 'culture', 51.2010, 3.2230, 0.5], ['Rozenhoedkaai', 'sights', 51.2070, 3.2270, 0.5],
  ['Chocolate Shops', 'food', 51.2080, 3.2250, 1]]);
add('Zurich', 'Europe', 'Switzerland', 'CHF', [47.3769, 8.5417], [
  ['Old Town & Bahnhofstrasse', 'shopping', 47.3720, 8.5390, 1.5], ['Lake Zurich Cruise', 'fun', 47.3660, 8.5430, 1.5],
  ['Lindt Home of Chocolate', 'food', 47.3170, 8.5590, 2], ['Grossmünster', 'culture', 47.3700, 8.5440, 0.5],
  ['Uetliberg', 'nature', 47.3490, 8.4910, 2], ['Swiss National Museum', 'culture', 47.3790, 8.5400, 1.5],
  ['Rhine Falls', 'nature', 47.6779, 8.6150, 2]]);
add('Lucerne', 'Europe', 'Switzerland', 'CHF', [47.0502, 8.3093], [
  ['Chapel Bridge', 'sights', 47.0517, 8.3077, 0.5], ['Lion Monument', 'culture', 47.0585, 8.3104, 0.5],
  ['Mount Pilatus', 'nature', 46.9790, 8.2550, 4], ['Mount Titlis', 'nature', 46.7720, 8.4370, 5],
  ['Lake Lucerne Cruise', 'fun', 47.0500, 8.3100, 1.5], ['Lucerne Old Town', 'culture', 47.0520, 8.3050, 1],
  ['Mount Rigi', 'nature', 47.0560, 8.4850, 4]]);
add('Zermatt (Matterhorn)', 'Europe', 'Switzerland', 'CHF', [46.0207, 7.7491], [
  ['Matterhorn Glacier Paradise', 'sights', 45.9380, 7.7300, 3], ['Gornergrat Railway', 'fun', 45.9830, 7.7840, 3],
  ['5 Lakes Walk', 'nature', 46.0100, 7.7800, 3], ['Zermatt Village', 'shopping', 46.0207, 7.7491, 1.5],
  ['Riffelsee Reflection', 'nature', 45.9880, 7.7710, 1], ['Sunnegga Paradise', 'nature', 46.0080, 7.7700, 1.5]]);
add('Geneva', 'Europe', 'Switzerland', 'CHF', [46.2044, 6.1432], [
  ["Jet d'Eau", 'sights', 46.2074, 6.1556, 0.5], ['Old Town & St. Pierre Cathedral', 'culture', 46.2010, 6.1480, 1.5],
  ['Palais des Nations (UN)', 'culture', 46.2266, 6.1405, 1.5], ['CERN Science Gateway', 'culture', 46.2340, 6.0550, 2],
  ['Lake Geneva Cruise', 'fun', 46.2090, 6.1520, 1.5], ['Flower Clock', 'nature', 46.2040, 6.1520, 0.5],
  ['Montreux & Chillon Castle', 'culture', 46.4142, 6.9274, 3]]);

// ===================== NORDICS =====================
add('Iceland (Reykjavik)', 'Europe', 'Iceland', 'ISK', [64.1466, -21.9426], [
  ['Hallgrímskirkja', 'culture', 64.1417, -21.9266, 1], ['Harpa Concert Hall', 'sights', 64.1503, -21.9327, 0.5],
  ['Blue Lagoon', 'fun', 63.8804, -22.4495, 3], ['Þingvellir National Park', 'nature', 64.2559, -21.1299, 1.5],
  ['Geysir', 'nature', 64.3104, -20.3024, 1], ['Gullfoss Waterfall', 'nature', 64.3271, -20.1199, 1],
  ['Northern Lights Tour', 'nature', 64.2000, -21.5000, 4], ['Seljalandsfoss', 'nature', 63.6156, -19.9886, 1],
  ['Reynisfjara Black Sand Beach', 'nature', 63.4044, -19.0450, 1.5]], ['Northern Lights', 'Golden Circle']);
add('Oslo', 'Europe', 'Norway', 'NOK', [59.9139, 10.7522], [
  ['Oslo Opera House', 'sights', 59.9075, 10.7531, 1], ['Vigeland Sculpture Park', 'culture', 59.9270, 10.7000, 1.5],
  ['Museum of the Viking Age', 'culture', 59.9050, 10.6840, 1.5], ['Akershus Fortress', 'sights', 59.9070, 10.7360, 1],
  ['MUNCH Museum', 'culture', 59.9060, 10.7550, 1.5], ['Holmenkollen Ski Jump', 'fun', 59.9640, 10.6670, 1.5],
  ['Aker Brygge', 'food', 59.9100, 10.7270, 1.5]]);
add('Bergen & Norwegian Fjords', 'Europe', 'Norway', 'NOK', [60.3913, 5.3221], [
  ['Bryggen Wharf', 'culture', 60.3975, 5.3244, 1], ['Fløibanen Funicular', 'sights', 60.3960, 5.3290, 1.5],
  ['Bergen Fish Market', 'food', 60.3950, 5.3250, 1], ['Flåm Railway (Norway in a Nutshell)', 'fun', 60.8630, 7.1140, 8],
  ['Nærøyfjord Cruise', 'nature', 60.8800, 6.9000, 2], ['Geirangerfjord', 'nature', 62.1000, 7.0940, 4]], ['Fjords']);
add('Tromsø (Northern Lights)', 'Europe', 'Norway', 'NOK', [69.6492, 18.9553], [
  ['Northern Lights Chase', 'nature', 69.6500, 19.5000, 5], ['Arctic Cathedral', 'culture', 69.6481, 18.9873, 0.5],
  ['Fjellheisen Cable Car', 'sights', 69.6420, 18.9990, 1.5], ['Husky Sledding', 'fun', 69.7500, 19.2000, 4],
  ['Polaria Arctic Aquarium', 'fun', 69.6450, 18.9480, 1], ['Whale Watching (Skjervøy)', 'nature', 70.0330, 20.9700, 7]], ['Aurora', 'Arctic']);
add('Stockholm', 'Europe', 'Sweden', 'SEK', [59.3293, 18.0686], [
  ['Gamla Stan', 'culture', 59.3250, 18.0710, 1.5], ['Vasa Museum', 'culture', 59.3280, 18.0914, 1.5],
  ['Royal Palace', 'culture', 59.3268, 18.0717, 1.5], ['ABBA The Museum', 'fun', 59.3253, 18.0963, 1.5],
  ['Skansen Open-Air Museum', 'fun', 59.3270, 18.1030, 2], ['Stockholm City Hall', 'sights', 59.3275, 18.0543, 1],
  ['Södermalm & Fotografiska', 'culture', 59.3178, 18.0855, 1.5], ['Archipelago Boat Trip', 'nature', 59.3240, 18.0800, 3]]);
add('Copenhagen', 'Europe', 'Denmark', 'DKK', [55.6761, 12.5683], [
  ['Nyhavn', 'sights', 55.6798, 12.5907, 1], ['Tivoli Gardens', 'fun', 55.6737, 12.5681, 3],
  ['The Little Mermaid', 'sights', 55.6929, 12.5993, 0.5], ['Rosenborg Castle', 'culture', 55.6858, 12.5774, 1.5],
  ['Christiansborg Palace', 'culture', 55.6761, 12.5800, 1.5], ['Christiania', 'culture', 55.6740, 12.5980, 1],
  ['Torvehallerne Food Market', 'food', 55.6840, 12.5700, 1], ['Strøget', 'shopping', 55.6780, 12.5750, 1.5]]);
add('Helsinki', 'Europe', 'Finland', 'EUR', [60.1699, 24.9384], [
  ['Helsinki Cathedral', 'culture', 60.1704, 24.9522, 0.5], ['Suomenlinna Sea Fortress', 'sights', 60.1454, 24.9881, 3],
  ['Market Square & Old Market Hall', 'food', 60.1675, 24.9530, 1], ['Temppeliaukio Rock Church', 'culture', 60.1730, 24.9250, 0.5],
  ['Uspenski Cathedral', 'culture', 60.1684, 24.9600, 0.5], ['Löyly Sauna', 'fun', 60.1520, 24.9300, 2],
  ['Design District', 'shopping', 60.1630, 24.9420, 1.5]]);
add('Rovaniemi (Lapland)', 'Europe', 'Finland', 'EUR', [66.5039, 25.7294], [
  ['Santa Claus Village', 'fun', 66.5436, 25.8473, 3], ['Arktikum Museum', 'culture', 66.5070, 25.7240, 1.5],
  ['Reindeer Farm Visit', 'fun', 66.5400, 25.8800, 2], ['Husky Safari', 'fun', 66.5500, 25.9000, 3],
  ['Northern Lights Hunt', 'nature', 66.6000, 25.8000, 4], ['Ranua Wildlife Park', 'nature', 65.9270, 26.4030, 3]], ['Santa', 'Northern Lights']);

// ===================== CENTRAL & SOUTHERN EUROPE =====================
add('Krakow', 'Europe', 'Poland', 'PLN', [50.0647, 19.9450], [
  ['Main Market Square', 'sights', 50.0617, 19.9373, 1], ['Wawel Castle', 'culture', 50.0540, 19.9354, 2],
  ['Kazimierz', 'food', 50.0510, 19.9450, 2], ["St. Mary's Basilica", 'culture', 50.0616, 19.9394, 0.5],
  ['Wieliczka Salt Mine', 'fun', 49.9830, 20.0550, 3], ['Auschwitz-Birkenau Memorial', 'culture', 50.0343, 19.1784, 4],
  ["Schindler's Factory", 'culture', 50.0475, 19.9617, 1.5]]);
add('Warsaw', 'Europe', 'Poland', 'PLN', [52.2297, 21.0122], [
  ['Old Town Market Square', 'sights', 52.2497, 21.0122, 1], ['Royal Castle', 'culture', 52.2480, 21.0150, 1.5],
  ['Łazienki Park', 'nature', 52.2150, 21.0350, 1.5], ['Palace of Culture and Science', 'sights', 52.2318, 21.0060, 1],
  ['Warsaw Uprising Museum', 'culture', 52.2323, 20.9810, 2], ['POLIN Museum', 'culture', 52.2494, 20.9930, 2],
  ['Wilanów Palace', 'culture', 52.1650, 21.0900, 1.5]]);
add('Dubrovnik', 'Europe', 'Croatia', 'EUR', [42.6507, 18.0944], [
  ['City Walls Walk', 'sights', 42.6410, 18.1080, 2], ['Old Town & Stradun', 'culture', 42.6410, 18.1100, 1.5],
  ['Srđ Cable Car', 'sights', 42.6430, 18.1120, 1.5], ['Lokrum Island', 'nature', 42.6260, 18.1210, 3],
  ['Fort Lovrijenac', 'sights', 42.6410, 18.1030, 0.5], ['Banje Beach', 'nature', 42.6420, 18.1170, 1.5],
  ["Rector's Palace", 'culture', 42.6403, 18.1105, 1]], ['Game of Thrones']);
add('Split & Plitvice Lakes', 'Europe', 'Croatia', 'EUR', [43.5081, 16.4402], [
  ["Diocletian's Palace", 'culture', 43.5080, 16.4400, 1.5], ['Riva Promenade', 'food', 43.5070, 16.4390, 1],
  ['Marjan Hill', 'nature', 43.5100, 16.4200, 1.5], ['Plitvice Lakes National Park', 'nature', 44.8654, 15.5820, 6],
  ['Krka Waterfalls', 'nature', 43.8040, 15.9640, 4], ['Hvar Island', 'nature', 43.1729, 16.4411, 6],
  ['Trogir Old Town', 'culture', 43.5170, 16.2510, 2]]);
add('Slovenia (Ljubljana & Lake Bled)', 'Europe', 'Slovenia', 'EUR', [46.0569, 14.5058], [
  ['Lake Bled & Island Church', 'nature', 46.3625, 14.0940, 2.5], ['Bled Castle', 'sights', 46.3700, 14.1000, 1],
  ['Vintgar Gorge', 'nature', 46.3920, 14.0850, 2], ['Ljubljana Old Town & Triple Bridge', 'culture', 46.0510, 14.5060, 1.5],
  ['Ljubljana Castle', 'sights', 46.0490, 14.5080, 1.5], ['Postojna Cave', 'nature', 45.7830, 14.2040, 2.5],
  ['Lake Bohinj', 'nature', 46.2780, 13.8860, 2]]);
add('Sarajevo & Mostar', 'Europe', 'Bosnia & Herzegovina', 'BAM', [43.8563, 18.4131], [
  ['Baščaršija Old Bazaar', 'culture', 43.8597, 18.4313, 1.5], ['Gazi Husrev-beg Mosque', 'culture', 43.8590, 18.4290, 0.5],
  ['Latin Bridge', 'sights', 43.8578, 18.4290, 0.5], ['Tunnel of Hope', 'culture', 43.8190, 18.3380, 1.5],
  ['Yellow Fortress Sunset', 'sights', 43.8610, 18.4380, 1], ['Ćevapi Lunch', 'food', 43.8590, 18.4280, 1],
  ['Mostar Old Bridge', 'sights', 43.3373, 17.8150, 4]], ['Islamic heritage', 'Bosnia']);
add('Malta', 'Europe', 'Malta', 'EUR', [35.9375, 14.3754], [
  ["Valletta & St. John's Co-Cathedral", 'culture', 35.8977, 14.5126, 2], ['Upper Barrakka Gardens', 'sights', 35.8950, 14.5110, 0.5],
  ['Mdina Silent City', 'culture', 35.8860, 14.4030, 1.5], ['Blue Lagoon, Comino', 'nature', 36.0140, 14.3230, 4],
  ['Blue Grotto', 'nature', 35.8190, 14.4560, 1], ['Gozo Island', 'nature', 36.0440, 14.2510, 5],
  ['Marsaxlokk Fishing Village', 'food', 35.8420, 14.5440, 1.5]]);
add('Mykonos', 'Europe', 'Greece', 'EUR', [37.4467, 25.3289], [
  ['Little Venice', 'sights', 37.4460, 25.3260, 1], ['Mykonos Windmills', 'sights', 37.4440, 25.3260, 0.5],
  ['Paradise Beach', 'nature', 37.4100, 25.3530, 3], ['Delos Island', 'culture', 37.3960, 25.2680, 3],
  ['Matoyianni Street', 'shopping', 37.4450, 25.3280, 1], ['Panagia Paraportiani', 'culture', 37.4470, 25.3250, 0.5]]);
add('Cappadocia', 'Middle East', 'Türkiye', 'TRY', [38.6431, 34.8289], [
  ['Hot Air Balloon Ride', 'fun', 38.6500, 34.8400, 3], ['Göreme Open-Air Museum', 'culture', 38.6400, 34.8450, 1.5],
  ['Uchisar Castle', 'sights', 38.6300, 34.8050, 1], ['Derinkuyu Underground City', 'culture', 38.3730, 34.7350, 1.5],
  ['Love Valley', 'nature', 38.6600, 34.8200, 1.5], ['Paşabağ Fairy Chimneys', 'nature', 38.6730, 34.8550, 1],
  ['Avanos Pottery', 'shopping', 38.7150, 34.8470, 1]], ['Turkey']);
add('Antalya', 'Middle East', 'Türkiye', 'TRY', [36.8969, 30.7133], [
  ['Kaleiçi Old Town', 'culture', 36.8840, 30.7050, 1.5], ["Hadrian's Gate", 'culture', 36.8860, 30.7090, 0.5],
  ['Düden Waterfalls', 'nature', 36.8580, 30.7830, 1], ['Konyaaltı Beach', 'nature', 36.8630, 30.6370, 2],
  ['Aspendos Theatre', 'culture', 36.9390, 31.1720, 2], ['Pamukkale Day Trip', 'nature', 37.9200, 29.1200, 10]], ['Turkey']);

// ===================== JAPAN =====================
add('Sapporo', 'Asia', 'Japan', 'JPY', [43.0618, 141.3545], [
  ['Odori Park', 'nature', 43.0600, 141.3480, 1], ['Sapporo TV Tower', 'sights', 43.0610, 141.3560, 0.5],
  ['Nijo Market', 'food', 43.0590, 141.3580, 1], ['Sapporo Beer Museum', 'fun', 43.0710, 141.3690, 1.5],
  ['Susukino & Ramen Yokocho', 'food', 43.0550, 141.3530, 1.5], ['Mt. Moiwa Ropeway Night View', 'sights', 43.0230, 141.3220, 1.5],
  ['Shiroi Koibito Park', 'fun', 43.0890, 141.2720, 1.5], ['Jozankei Onsen', 'nature', 42.9670, 141.1630, 3]], ['Hokkaido', 'Snow Festival']);
add('Otaru', 'Asia', 'Japan', 'JPY', [43.1907, 140.9947], [
  ['Otaru Canal', 'sights', 43.1990, 141.0030, 1], ['Sakaimachi Street', 'shopping', 43.1940, 141.0050, 1.5],
  ['Otaru Music Box Museum', 'shopping', 43.1920, 141.0070, 1], ['Sushi Street', 'food', 43.1960, 140.9980, 1],
  ['Mt. Tengu Ropeway', 'sights', 43.1830, 140.9670, 1.5]], ['Hokkaido']);
add('Furano & Biei', 'Asia', 'Japan', 'JPY', [43.4500, 142.5000], [
  ['Farm Tomita Lavender', 'nature', 43.4180, 142.4270, 1.5], ['Blue Pond (Shirogane)', 'nature', 43.4930, 142.6140, 1],
  ['Shikisai-no-Oka', 'nature', 43.5340, 142.4850, 1], ['Ningle Terrace', 'shopping', 43.3250, 142.3530, 1],
  ['Asahiyama Zoo', 'fun', 43.7680, 142.4800, 2.5], ['Shirahige Waterfall', 'nature', 43.4850, 142.6390, 0.5],
  ['Furano Ski Resort', 'fun', 43.3300, 142.3600, 4]], ['Hokkaido', 'Lavender']);
add('Niseko', 'Asia', 'Japan', 'JPY', [42.8048, 140.6874], [
  ['Niseko Grand Hirafu Skiing', 'fun', 42.8600, 140.7000, 5], ['Mt. Yotei', 'nature', 42.8270, 140.8110, 6],
  ['Niseko Onsen', 'nature', 42.8500, 140.6500, 2], ['Hirafu Village Dining', 'food', 42.8580, 140.7040, 1.5],
  ['Lake Toya', 'nature', 42.6000, 140.8500, 3]], ['Hokkaido', 'Ski', 'Snow']);
add('Hakodate', 'Asia', 'Japan', 'JPY', [41.7687, 140.7288], [
  ['Mount Hakodate Night View', 'sights', 41.7590, 140.7040, 1.5], ['Hakodate Morning Market', 'food', 41.7730, 140.7260, 1],
  ['Goryokaku Fort', 'culture', 41.7970, 140.7570, 1.5], ['Kanemori Red Brick Warehouses', 'shopping', 41.7670, 140.7170, 1],
  ['Motomachi Slopes', 'culture', 41.7620, 140.7110, 1.5], ['Yunokawa Onsen', 'nature', 41.7770, 140.7880, 1.5]], ['Hokkaido']);
add('Nara', 'Asia', 'Japan', 'JPY', [34.6851, 135.8048], [
  ['Todai-ji Temple', 'culture', 34.6890, 135.8398, 1.5], ['Nara Park Deer', 'nature', 34.6850, 135.8430, 1],
  ['Kasuga Taisha', 'culture', 34.6812, 135.8484, 1], ['Kofuku-ji', 'culture', 34.6830, 135.8310, 0.5],
  ['Naramachi', 'shopping', 34.6780, 135.8290, 1], ['Isuien Garden', 'nature', 34.6870, 135.8360, 0.5]], ['Kansai']);
add('Hiroshima & Miyajima', 'Asia', 'Japan', 'JPY', [34.3853, 132.4553], [
  ['Peace Memorial Park & Museum', 'culture', 34.3920, 132.4520, 2], ['Atomic Bomb Dome', 'sights', 34.3955, 132.4536, 0.5],
  ['Hiroshima Castle', 'sights', 34.4027, 132.4590, 1], ['Okonomimura', 'food', 34.3920, 132.4620, 1],
  ['Itsukushima Shrine (Floating Torii)', 'culture', 34.2959, 132.3199, 1.5], ['Mount Misen', 'nature', 34.2790, 132.3190, 2.5],
  ['Shukkeien Garden', 'nature', 34.4000, 132.4670, 1]]);
add('Mt Fuji & Hakone', 'Asia', 'Japan', 'JPY', [35.3500, 138.9500], [
  ['Lake Kawaguchiko', 'nature', 35.5100, 138.7600, 2], ['Chureito Pagoda', 'sights', 35.5011, 138.8015, 1],
  ['Fuji-Q Highland', 'fun', 35.4870, 138.7800, 5], ['Oshino Hakkai', 'sights', 35.4600, 138.8330, 1],
  ['Hakone Open-Air Museum', 'culture', 35.2440, 139.0510, 1.5], ['Owakudani Volcanic Valley', 'nature', 35.2440, 139.0200, 1],
  ['Lake Ashi Pirate Ship', 'fun', 35.2050, 139.0250, 1], ['Hakone Shrine', 'culture', 35.2050, 139.0260, 0.5]], ['Fuji', 'Onsen']);
add('Nikko', 'Asia', 'Japan', 'JPY', [36.7500, 139.6000], [
  ['Nikko Toshogu Shrine', 'culture', 36.7580, 139.5988, 2], ['Shinkyo Bridge', 'sights', 36.7530, 139.6040, 0.5],
  ['Kegon Falls', 'nature', 36.7380, 139.5030, 1], ['Lake Chuzenji', 'nature', 36.7360, 139.4800, 1.5],
  ['Kanmangafuchi Abyss', 'nature', 36.7480, 139.5880, 1], ['Edo Wonderland', 'fun', 36.8380, 139.7130, 3]]);
add('Kamakura & Yokohama', 'Asia', 'Japan', 'JPY', [35.3192, 139.5467], [
  ['Great Buddha of Kamakura', 'culture', 35.3167, 139.5359, 1], ['Tsurugaoka Hachimangu', 'culture', 35.3260, 139.5560, 1],
  ['Komachi Street', 'food', 35.3200, 139.5520, 1], ['Enoshima Island', 'nature', 35.2990, 139.4800, 2.5],
  ['Hase-dera Temple', 'culture', 35.3125, 139.5332, 1], ['Yokohama Chinatown', 'food', 35.4425, 139.6455, 1.5],
  ['Minato Mirai', 'sights', 35.4560, 139.6330, 1.5], ['Cup Noodles Museum', 'fun', 35.4555, 139.6385, 1.5]]);
add('Kanazawa', 'Asia', 'Japan', 'JPY', [36.5613, 136.6562], [
  ['Kenroku-en Garden', 'nature', 36.5621, 136.6627, 1.5], ['Kanazawa Castle', 'sights', 36.5650, 136.6590, 1],
  ['Higashi Chaya District', 'culture', 36.5720, 136.6660, 1.5], ['Omicho Market', 'food', 36.5715, 136.6564, 1],
  ['21st Century Museum', 'culture', 36.5609, 136.6582, 1.5], ['Nagamachi Samurai District', 'culture', 36.5630, 136.6500, 1]]);
add('Takayama & Shirakawa-go', 'Asia', 'Japan', 'JPY', [36.1461, 137.2522], [
  ['Sanmachi Suji Old Town', 'culture', 36.1413, 137.2620, 1.5], ['Miyagawa Morning Market', 'food', 36.1450, 137.2600, 1],
  ['Hida Folk Village', 'culture', 36.1370, 137.2440, 1.5], ['Hida Beef Sushi', 'food', 36.1420, 137.2590, 1],
  ['Shirakawa-go Village', 'culture', 36.2577, 136.9064, 3], ['Shiroyama Viewpoint', 'sights', 36.2630, 136.9080, 0.5],
  ['Shinhotaka Ropeway', 'nature', 36.2860, 137.5750, 3]], ['Japanese Alps']);
add('Nagoya', 'Asia', 'Japan', 'JPY', [35.1815, 136.9066], [
  ['Nagoya Castle', 'sights', 35.1856, 136.8991, 1.5], ['Toyota Commemorative Museum', 'culture', 35.1830, 136.8800, 1.5],
  ['Atsuta Shrine', 'culture', 35.1270, 136.9080, 1], ['Osu Shopping District', 'shopping', 35.1590, 136.9010, 1.5],
  ['SCMaglev and Railway Park', 'fun', 35.0490, 136.8510, 2], ['Hitsumabushi Eel', 'food', 35.1700, 136.9080, 1],
  ['Legoland Japan', 'fun', 35.0500, 136.8430, 5]]);
add('Kobe & Himeji', 'Asia', 'Japan', 'JPY', [34.6901, 135.1955], [
  ['Harborland & Port Tower', 'sights', 34.6825, 135.1867, 1.5], ['Kobe Beef Dinner', 'food', 34.6930, 135.1940, 1.5],
  ['Kitano Ijinkan', 'culture', 34.7010, 135.1910, 1.5], ['Nunobiki Herb Gardens & Ropeway', 'nature', 34.7140, 135.1910, 2],
  ['Nankinmachi Chinatown', 'food', 34.6880, 135.1880, 1], ['Arima Onsen', 'nature', 34.7970, 135.2470, 3],
  ['Himeji Castle', 'sights', 34.8394, 134.6939, 2]], ['Kansai']);
add('Fukuoka', 'Asia', 'Japan', 'JPY', [33.5904, 130.4017], [
  ['Nakasu Yatai Food Stalls', 'food', 33.5930, 130.4050, 1.5], ['Ohori Park', 'nature', 33.5860, 130.3770, 1],
  ['Fukuoka Castle Ruins', 'culture', 33.5840, 130.3830, 1], ['Canal City Hakata', 'shopping', 33.5899, 130.4108, 1.5],
  ['Kushida Shrine', 'culture', 33.5930, 130.4100, 0.5], ['Dazaifu Tenmangu', 'culture', 33.5215, 130.5350, 2],
  ['Fukuoka Tower', 'sights', 33.5933, 130.3515, 1], ['Hakata Ramen', 'food', 33.5930, 130.4040, 1]], ['Kyushu']);
add('Okinawa', 'Asia', 'Japan', 'JPY', [26.2124, 127.6792], [
  ['Shuri Castle', 'culture', 26.2170, 127.7195, 1.5], ['Kokusai Street', 'shopping', 26.2150, 127.6870, 1.5],
  ['Churaumi Aquarium', 'fun', 26.6943, 127.8779, 2.5], ['Kouri Island', 'nature', 26.6990, 128.0230, 1.5],
  ['Cape Manzamo', 'nature', 26.5050, 127.8510, 0.5], ['American Village', 'shopping', 26.3160, 127.7570, 1.5],
  ['Blue Cave Snorkeling', 'nature', 26.4420, 127.7120, 2], ['Makishi Public Market', 'food', 26.2140, 127.6890, 1]], ['Beach', 'Island']);
add('Gyeongju', 'Asia', 'South Korea', 'KRW', [35.8562, 129.2247], [
  ['Bulguksa Temple', 'culture', 35.7900, 129.3320, 1.5], ['Seokguram Grotto', 'culture', 35.7950, 129.3490, 1],
  ['Daereungwon Tomb Complex', 'culture', 35.8380, 129.2120, 1], ['Donggung Palace & Wolji Pond', 'sights', 35.8347, 129.2266, 1],
  ['Cheomseongdae Observatory', 'sights', 35.8347, 129.2190, 0.5], ['Hwangnidan-gil', 'food', 35.8370, 129.2100, 1.5]]);

// ===================== MALDIVES & INDIAN OCEAN =====================
add('Maldives', 'Asia', 'Maldives', 'USD', [4.1755, 73.5093], [
  ['Malé Grand Friday Mosque', 'culture', 4.1755, 73.5115, 0.5], ['Malé Fish Market', 'food', 4.1774, 73.5076, 0.5],
  ['Artificial Beach, Malé', 'nature', 4.1780, 73.5180, 1], ['Hulhumalé Beach', 'nature', 4.2140, 73.5420, 1.5],
  ['Maafushi Island', 'nature', 3.9430, 73.4900, 5], ['Banana Reef Snorkel & Dive', 'nature', 4.2380, 73.5340, 3],
  ['Sandbank Picnic', 'fun', 4.0500, 73.4700, 3], ['Sunset Dolphin Cruise', 'fun', 4.1900, 73.4500, 2],
  ['Hanifaru Bay Manta Rays', 'nature', 5.1720, 73.1450, 6], ['South Ari Whale Shark Tour', 'nature', 3.4800, 72.8300, 6],
  ['Resort Island Day Pass', 'fun', 4.0800, 73.4300, 8]], ['Beach', 'Island', 'Honeymoon', 'Diving']);
add('Mauritius', 'Africa', 'Mauritius', 'MUR', [-20.3484, 57.5522], [
  ['Le Morne Underwater Waterfall', 'nature', -20.4550, 57.3110, 2], ['Chamarel Seven Coloured Earth', 'nature', -20.4400, 57.3730, 1.5],
  ['Île aux Cerfs', 'nature', -20.2720, 57.8060, 5], ['Port Louis Central Market', 'food', -20.1610, 57.5010, 1.5],
  ['Grand Bassin (Ganga Talao)', 'culture', -20.4180, 57.4920, 1], ['Black River Gorges', 'nature', -20.4000, 57.4300, 3],
  ['Trou aux Cerfs Crater', 'nature', -20.3160, 57.5130, 0.5]], ['Beach', 'Island', 'Honeymoon']);
add('Seychelles', 'Africa', 'Seychelles', 'SCR', [-4.5000, 55.6000], [
  ["Anse Source d'Argent", 'nature', -4.3710, 55.8270, 3], ['Vallée de Mai', 'nature', -4.3310, 55.7400, 2],
  ['Beau Vallon Beach', 'nature', -4.6160, 55.4290, 2], ['Victoria Market', 'food', -4.6200, 55.4520, 1],
  ['Anse Lazio', 'nature', -4.2930, 55.7020, 3], ['Curieuse Island Tortoises', 'nature', -4.2830, 55.7290, 4]], ['Beach', 'Island', 'Honeymoon']);

// ===================== MORE ASIA =====================
add('Krabi', 'Asia', 'Thailand', 'THB', [8.0863, 98.9063], [
  ['Railay Beach', 'nature', 8.0110, 98.8380, 3], ['Four Islands Tour', 'nature', 7.9600, 98.8100, 6],
  ['Ao Nang Beach', 'nature', 8.0330, 98.8240, 2], ['Tiger Cave Temple', 'culture', 8.1270, 98.9230, 2],
  ['Emerald Pool', 'nature', 7.9250, 99.2660, 2], ['Krabi Town Night Market', 'food', 8.0630, 98.9170, 1.5],
  ['Hong Islands', 'nature', 8.0810, 98.6800, 5]], ['Beach', 'Island']);
add('Koh Samui', 'Asia', 'Thailand', 'THB', [9.5120, 100.0136], [
  ['Big Buddha Temple', 'culture', 9.5710, 100.0600, 0.5], ['Chaweng Beach', 'nature', 9.5310, 100.0620, 2],
  ["Fisherman's Village", 'food', 9.5590, 100.0270, 1.5], ['Ang Thong Marine Park', 'nature', 9.6200, 99.6800, 8],
  ['Na Muang Waterfall', 'nature', 9.4670, 99.9770, 1], ['Hin Ta Hin Yai Rocks', 'sights', 9.4430, 100.0450, 0.5]], ['Beach', 'Island']);
add('Pattaya', 'Asia', 'Thailand', 'THB', [12.9236, 100.8825], [
  ['Sanctuary of Truth', 'culture', 12.9727, 100.8890, 2], ['Walking Street', 'fun', 12.9270, 100.8720, 2],
  ['Nong Nooch Tropical Garden', 'nature', 12.7650, 100.9340, 3], ['Koh Larn', 'nature', 12.9200, 100.7850, 5],
  ['Pattaya Viewpoint', 'sights', 12.9200, 100.8640, 0.5], ['Pattaya Floating Market', 'shopping', 12.8680, 100.9050, 1.5]], ['Beach']);
add('Lombok & Gili Islands', 'Asia', 'Indonesia', 'IDR', [-8.5833, 116.1167], [
  ['Gili Trawangan', 'nature', -8.3500, 116.0420, 6], ['Mount Rinjani', 'nature', -8.4110, 116.4570, 10],
  ['Kuta Lombok & Mandalika', 'nature', -8.8950, 116.2830, 3], ['Tanjung Aan Beach', 'nature', -8.9100, 116.3200, 2],
  ['Sade Sasak Village', 'culture', -8.8380, 116.2920, 1], ['Islamic Center Mataram', 'culture', -8.5800, 116.1050, 1],
  ['Benang Kelambu Waterfall', 'nature', -8.5520, 116.3390, 2]], ['Beach', 'Island']);
add('Labuan Bajo & Komodo', 'Asia', 'Indonesia', 'IDR', [-8.4964, 119.8877], [
  ['Komodo National Park', 'nature', -8.5500, 119.4890, 8], ['Padar Island Viewpoint', 'nature', -8.6560, 119.5650, 3],
  ['Pink Beach', 'nature', -8.6060, 119.5200, 2], ['Manta Point', 'nature', -8.4400, 119.5500, 2],
  ['Kanawa Island', 'nature', -8.4980, 119.7570, 4], ['Sylvia Hill Sunset', 'sights', -8.4650, 119.8800, 1],
  ['Kampung Ujung Seafood Market', 'food', -8.4960, 119.8800, 1]], ['Island', 'Diving']);
add('Bandung', 'Asia', 'Indonesia', 'IDR', [-6.9175, 107.6191], [
  ['Kawah Putih', 'nature', -7.1660, 107.4020, 2], ['Tangkuban Perahu', 'nature', -6.7590, 107.6100, 2],
  ['Floating Market Lembang', 'fun', -6.8190, 107.6180, 1.5], ['Braga Street', 'culture', -6.9180, 107.6090, 1],
  ['Factory Outlets, Jalan Riau', 'shopping', -6.9060, 107.6180, 2], ['Dusun Bambu', 'nature', -6.7940, 107.5780, 2]]);
add('Luang Prabang', 'Asia', 'Laos', 'LAK', [19.8856, 102.1347], [
  ['Kuang Si Falls', 'nature', 19.7490, 101.9910, 3], ['Mount Phousi Sunset', 'sights', 19.8890, 102.1370, 1],
  ['Morning Alms Giving', 'culture', 19.8900, 102.1380, 1], ['Royal Palace Museum', 'culture', 19.8900, 102.1360, 1],
  ['Night Market', 'shopping', 19.8880, 102.1350, 1.5], ['Wat Xieng Thong', 'culture', 19.8960, 102.1430, 0.5],
  ['Pak Ou Caves', 'culture', 20.0560, 102.2170, 3]]);
add('Phnom Penh', 'Asia', 'Cambodia', 'USD', [11.5564, 104.9282], [
  ['Royal Palace & Silver Pagoda', 'culture', 11.5636, 104.9312, 1.5], ['Tuol Sleng Genocide Museum', 'culture', 11.5494, 104.9178, 1.5],
  ['Choeung Ek Memorial', 'culture', 11.4846, 104.9020, 1.5], ['Central Market', 'shopping', 11.5695, 104.9210, 1],
  ['Riverside Sunset Cruise', 'fun', 11.5700, 104.9300, 1.5], ['Wat Phnom', 'culture', 11.5760, 104.9230, 0.5]]);
add('Boracay', 'Asia', 'Philippines', 'PHP', [11.9674, 121.9248], [
  ['White Beach', 'nature', 11.9600, 121.9240, 3], ['Puka Shell Beach', 'nature', 11.9980, 121.9200, 2],
  ['Island Hopping', 'nature', 11.9700, 121.9100, 4], ["Willy's Rock", 'sights', 11.9640, 121.9230, 0.5],
  ["D'Mall", 'shopping', 11.9610, 121.9250, 1], ['Mount Luho Viewpoint', 'sights', 11.9890, 121.9330, 1],
  ['Sunset Paraw Sailing', 'fun', 11.9600, 121.9200, 1]], ['Beach', 'Island']);
add('Palawan (El Nido)', 'Asia', 'Philippines', 'PHP', [11.1784, 119.3930], [
  ['Big Lagoon', 'nature', 11.1740, 119.3370, 2], ['Island Hopping Tour A', 'nature', 11.1500, 119.3500, 6],
  ['Nacpan Beach', 'nature', 11.3200, 119.4170, 3], ['Taraw Cliff', 'nature', 11.1850, 119.3970, 2],
  ['Las Cabañas Beach Sunset', 'nature', 11.1520, 119.3990, 1.5], ['Puerto Princesa Underground River', 'nature', 10.1930, 118.9270, 4]], ['Beach', 'Island']);
add('Cebu', 'Asia', 'Philippines', 'PHP', [10.3157, 123.8854], [
  ["Magellan's Cross", 'culture', 10.2934, 123.9020, 0.5], ['Basilica del Santo Niño', 'culture', 10.2943, 123.9017, 0.5],
  ['Oslob Whale Sharks', 'nature', 9.4570, 123.3780, 3], ['Kawasan Falls', 'nature', 9.8040, 123.3730, 3],
  ['Temple of Leah', 'culture', 10.3720, 123.8760, 1], ['Moalboal Sardine Run', 'nature', 9.9480, 123.3720, 2],
  ['Cebu Lechon', 'food', 10.3100, 123.8930, 1]]);
add('Kathmandu', 'Asia', 'Nepal', 'NPR', [27.7172, 85.3240], [
  ['Swayambhunath (Monkey Temple)', 'culture', 27.7149, 85.2904, 1.5], ['Boudhanath Stupa', 'culture', 27.7215, 85.3620, 1],
  ['Pashupatinath Temple', 'culture', 27.7104, 85.3488, 1.5], ['Kathmandu Durbar Square', 'culture', 27.7046, 85.3074, 1.5],
  ['Thamel', 'shopping', 27.7154, 85.3123, 2], ['Bhaktapur', 'culture', 27.6710, 85.4298, 3],
  ['Nagarkot Sunrise', 'nature', 27.7150, 85.5200, 3], ['Everest Mountain Flight', 'nature', 27.6960, 85.3590, 2]], ['Himalaya', 'Everest']);
add('Sri Lanka', 'Asia', 'Sri Lanka', 'LKR', [7.8731, 80.7718], [
  ['Sigiriya Rock Fortress', 'culture', 7.9570, 80.7603, 3], ['Temple of the Tooth, Kandy', 'culture', 7.2936, 80.6413, 1.5],
  ['Kandy to Ella Train', 'fun', 6.8667, 81.0466, 7], ['Nine Arch Bridge', 'sights', 6.8768, 81.0608, 1],
  ['Galle Fort', 'culture', 6.0260, 80.2170, 2], ['Yala Safari', 'nature', 6.3720, 81.5190, 5],
  ['Galle Face Green, Colombo', 'food', 6.9270, 79.8450, 1], ['Mirissa Whale Watching', 'nature', 5.9480, 80.4560, 4],
  ['Dambulla Cave Temple', 'culture', 7.8568, 80.6490, 1.5]], ['Colombo', 'Kandy', 'Ella']);
add('Jaipur', 'Asia', 'India', 'INR', [26.9124, 75.7873], [
  ['Amber Fort', 'culture', 26.9855, 75.8513, 2.5], ['Hawa Mahal', 'sights', 26.9239, 75.8267, 0.5],
  ['City Palace', 'culture', 26.9258, 75.8237, 1.5], ['Jantar Mantar', 'culture', 26.9248, 75.8246, 1],
  ['Nahargarh Fort', 'sights', 26.9373, 75.8155, 1.5], ['Johari Bazaar', 'shopping', 26.9200, 75.8270, 1.5],
  ['Jal Mahal', 'sights', 26.9534, 75.8462, 0.5]], ['Rajasthan']);
add('Mumbai', 'Asia', 'India', 'INR', [19.0760, 72.8777], [
  ['Gateway of India', 'sights', 18.9220, 72.8347, 0.5], ['Elephanta Caves', 'culture', 18.9633, 72.9315, 3],
  ['Marine Drive', 'sights', 18.9440, 72.8230, 1], ['Chhatrapati Shivaji Terminus', 'culture', 18.9400, 72.8350, 0.5],
  ['Haji Ali Dargah', 'culture', 18.9827, 72.8089, 1], ['Colaba Causeway', 'shopping', 18.9150, 72.8260, 1.5],
  ['Juhu Beach Street Food', 'food', 19.0990, 72.8260, 1.5]]);
add('Goa', 'Asia', 'India', 'INR', [15.4500, 73.8500], [
  ['Baga Beach', 'nature', 15.5560, 73.7520, 2], ['Basilica of Bom Jesus', 'culture', 15.5009, 73.9116, 1],
  ['Fort Aguada', 'sights', 15.4920, 73.7730, 1], ['Anjuna Flea Market', 'shopping', 15.5740, 73.7400, 2],
  ['Dudhsagar Falls', 'nature', 15.3144, 74.3143, 4], ['Fontainhas Latin Quarter', 'culture', 15.4960, 73.8320, 1.5],
  ['Palolem Beach', 'nature', 15.0100, 74.0230, 2]], ['Beach']);
add('Kashmir (Srinagar)', 'Asia', 'India', 'INR', [34.0837, 74.7973], [
  ['Dal Lake Shikara Ride', 'fun', 34.1100, 74.8600, 2], ['Shalimar Bagh Mughal Garden', 'nature', 34.1480, 74.8790, 1],
  ['Gulmarg Gondola', 'nature', 34.0500, 74.3800, 4], ['Pahalgam', 'nature', 34.0160, 75.3150, 5],
  ['Sonamarg', 'nature', 34.3030, 75.2930, 5], ['Hazratbal Shrine', 'culture', 34.1280, 74.8420, 0.5]], ['Snow', 'Mountains']);
add('Almaty', 'Asia', 'Kazakhstan', 'KZT', [43.2220, 76.8512], [
  ['Big Almaty Lake', 'nature', 43.0500, 76.9850, 3], ['Shymbulak Ski Resort', 'nature', 43.1280, 77.0800, 4],
  ['Kok Tobe Hill', 'sights', 43.2330, 76.9750, 1.5], ['Zenkov Cathedral & Panfilov Park', 'culture', 43.2580, 76.9530, 1],
  ['Green Bazaar', 'food', 43.2630, 76.9530, 1], ['Charyn Canyon', 'nature', 43.3560, 79.0800, 8],
  ['Medeu Ice Rink', 'fun', 43.1570, 77.0590, 1.5]], ['Central Asia', 'Snow']);
add('Uzbekistan (Samarkand & Bukhara)', 'Asia', 'Uzbekistan', 'UZS', [39.6270, 66.9750], [
  ['Registan Square', 'culture', 39.6547, 66.9758, 2], ['Shah-i-Zinda Necropolis', 'culture', 39.6630, 66.9880, 1.5],
  ['Gur-e-Amir Mausoleum', 'culture', 39.6484, 66.9690, 1], ['Bibi-Khanym Mosque', 'culture', 39.6610, 66.9790, 1],
  ['Siab Bazaar', 'food', 39.6620, 66.9800, 1], ['Imam al-Bukhari Complex', 'culture', 39.7420, 66.9050, 1.5],
  ['Bukhara Old City & Po-i-Kalyan', 'culture', 39.7760, 64.4140, 4], ['Ark of Bukhara', 'culture', 39.7780, 64.4110, 1]], ['Islamic heritage', 'Silk Road', 'Central Asia']);
add('Guilin & Yangshuo', 'Asia', 'China', 'CNY', [25.0000, 110.3500], [
  ['Li River Cruise', 'nature', 25.0800, 110.4200, 5], ['Yangshuo West Street', 'shopping', 24.7780, 110.4920, 1.5],
  ['Reed Flute Cave', 'nature', 25.3080, 110.2590, 1], ['Elephant Trunk Hill', 'sights', 25.2690, 110.2970, 1],
  ['Longji Rice Terraces', 'nature', 25.7570, 110.1110, 5], ['Yulong River Bamboo Rafting', 'fun', 24.7790, 110.4400, 2]]);
add('Zhangjiajie', 'Asia', 'China', 'CNY', [29.2500, 110.4800], [
  ['Avatar Mountains (Yuanjiajie)', 'nature', 29.3450, 110.4290, 4], ['Tianmen Mountain', 'nature', 29.0510, 110.4820, 4],
  ['Grand Canyon Glass Bridge', 'fun', 29.3950, 110.7000, 2], ['Golden Whip Stream', 'nature', 29.3250, 110.4380, 2],
  ['Bailong Elevator', 'sights', 29.3430, 110.4410, 1], ['Tianzi Mountain', 'nature', 29.3920, 110.4590, 2]]);
add("Xi'an", 'Asia', 'China', 'CNY', [34.3416, 108.9398], [
  ['Terracotta Warriors', 'culture', 34.3853, 109.2786, 3], ['City Wall Bike Ride', 'fun', 34.2580, 108.9420, 2],
  ['Muslim Quarter Food Street', 'food', 34.2640, 108.9400, 2], ["Great Mosque of Xi'an", 'culture', 34.2640, 108.9380, 1],
  ['Big Wild Goose Pagoda', 'culture', 34.2190, 108.9600, 1], ['Bell & Drum Towers', 'sights', 34.2610, 108.9420, 1]], ['Silk Road']);
add('Chengdu', 'Asia', 'China', 'CNY', [30.5728, 104.0668], [
  ['Giant Panda Base', 'nature', 30.7330, 104.1460, 3], ['Jinli Ancient Street', 'shopping', 30.6450, 104.0480, 1.5],
  ['Kuanzhai Alley', 'culture', 30.6690, 104.0560, 1.5], ['Leshan Giant Buddha', 'culture', 29.5440, 103.7700, 5],
  ['Sichuan Hotpot Dinner', 'food', 30.6570, 104.0800, 2], ['Wenshu Monastery', 'culture', 30.6760, 104.0730, 1],
  ['Sichuan Opera Face-Changing', 'culture', 30.6600, 104.0650, 1.5]], ['Panda']);
add('Macau', 'Asia', 'Macau', 'MOP', [22.1987, 113.5439], [
  ["Ruins of St. Paul's", 'culture', 22.1975, 113.5409, 0.5], ['Senado Square', 'sights', 22.1935, 113.5395, 0.5],
  ['The Venetian Macao', 'fun', 22.1474, 113.5600, 2], ['A-Ma Temple', 'culture', 22.1860, 113.5310, 0.5],
  ['Macau Tower', 'sights', 22.1800, 113.5370, 1], ['Taipa Village & Egg Tarts', 'food', 22.1550, 113.5560, 1.5],
  ['Cotai Strip', 'fun', 22.1440, 113.5640, 2]]);

// ===================== MORE MIDDLE EAST & CAUCASUS =====================
add('Jordan (Petra & Amman)', 'Middle East', 'Jordan', 'JOD', [31.9539, 35.9106], [
  ['Petra – The Treasury', 'culture', 30.3229, 35.4517, 5], ['Petra Monastery', 'culture', 30.3380, 35.4330, 2],
  ['Wadi Rum Desert', 'nature', 29.5730, 35.4200, 6], ['Dead Sea Float', 'nature', 31.7180, 35.5900, 3],
  ['Amman Citadel', 'culture', 31.9550, 35.9350, 1.5], ['Roman Theatre, Amman', 'culture', 31.9515, 35.9390, 1],
  ['Jerash Roman City', 'culture', 32.2800, 35.8910, 2.5], ['Hashem Falafel', 'food', 31.9530, 35.9320, 1]], ['Dead Sea', 'Wadi Rum']);
add('AlUla', 'Middle East', 'Saudi Arabia', 'SAR', [26.6170, 37.9230], [
  ["Hegra (Mada'in Salih)", 'culture', 26.7900, 37.9530, 3], ['Elephant Rock', 'nature', 26.6700, 37.9600, 1],
  ['Maraya Mirrored Building', 'sights', 26.6200, 37.8270, 1], ['AlUla Old Town', 'culture', 26.6100, 37.9200, 1.5],
  ['Harrat Viewpoint', 'sights', 26.5800, 37.8700, 1], ['Dadan & Jabal Ikmah', 'culture', 26.6600, 37.9300, 2]]);
add('Jeddah', 'Middle East', 'Saudi Arabia', 'SAR', [21.4858, 39.1925], [
  ['Al-Balad Historic District', 'culture', 21.4840, 39.1870, 2], ["King Fahd's Fountain", 'sights', 21.5150, 39.1460, 0.5],
  ['Jeddah Corniche', 'nature', 21.5700, 39.1100, 1.5], ['Floating Mosque (Al-Rahma)', 'culture', 21.5560, 39.1140, 0.5],
  ['Red Sea Mall', 'shopping', 21.6290, 39.1100, 2], ['Seafood on the Corniche', 'food', 21.5900, 39.1100, 1.5]], ['Umrah']);
add('Riyadh', 'Middle East', 'Saudi Arabia', 'SAR', [24.7136, 46.6753], [
  ['Kingdom Centre Sky Bridge', 'sights', 24.7114, 46.6744, 1], ['Masmak Fortress', 'culture', 24.6312, 46.7133, 1],
  ['Diriyah – At-Turaif', 'culture', 24.7340, 46.5750, 2], ['Edge of the World', 'nature', 24.9500, 45.9900, 5],
  ['National Museum', 'culture', 24.6480, 46.7100, 2], ['Boulevard City', 'fun', 24.7680, 46.6030, 3]]);
add('Muscat', 'Middle East', 'Oman', 'OMR', [23.6000, 58.5000], [
  ['Sultan Qaboos Grand Mosque', 'culture', 23.5839, 58.3886, 1], ['Mutrah Souq', 'shopping', 23.6170, 58.5650, 1.5],
  ['Royal Opera House', 'culture', 23.6110, 58.4740, 1], ['Mutrah Corniche', 'food', 23.6180, 58.5700, 1],
  ['Wadi Shab', 'nature', 22.8380, 59.2400, 5], ['Bimmah Sinkhole', 'nature', 23.0360, 59.0720, 1],
  ['Nizwa Fort', 'culture', 22.9330, 57.5300, 3]]);
add('Baku', 'Middle East', 'Azerbaijan', 'AZN', [40.3800, 49.8500], [
  ['Old City (Icherisheher)', 'culture', 40.3660, 49.8370, 1.5], ['Flame Towers', 'sights', 40.3590, 49.8270, 0.5],
  ['Heydar Aliyev Center', 'culture', 40.3958, 49.8678, 1], ['Baku Boulevard', 'nature', 40.3650, 49.8450, 1.5],
  ['Maiden Tower', 'culture', 40.3661, 49.8372, 0.5], ['Gobustan Rock Art & Mud Volcanoes', 'nature', 40.1100, 49.3900, 4],
  ['Ateshgah Fire Temple', 'culture', 40.4150, 50.0080, 1]], ['Caucasus']);
add('Tbilisi & Kazbegi', 'Middle East', 'Georgia', 'GEL', [41.7151, 44.8271], [
  ['Narikala Fortress', 'sights', 41.6880, 44.8090, 1.5], ['Abanotubani Sulfur Baths', 'fun', 41.6880, 44.8110, 1.5],
  ['Old Tbilisi', 'culture', 41.6910, 44.8080, 1.5], ['Bridge of Peace', 'sights', 41.6930, 44.8080, 0.5],
  ['Holy Trinity Cathedral', 'culture', 41.6970, 44.8170, 1], ['Gergeti Trinity Church, Kazbegi', 'nature', 42.6624, 44.6203, 8],
  ['Mtskheta', 'culture', 41.8420, 44.7210, 2], ['Georgian Supra Dinner', 'food', 41.6940, 44.8030, 1.5]], ['Caucasus', 'Georgia']);
add('Luxor & the Nile', 'Africa', 'Egypt', 'EGP', [25.6872, 32.6396], [
  ['Karnak Temple', 'culture', 25.7188, 32.6573, 2.5], ['Valley of the Kings', 'culture', 25.7402, 32.6014, 3],
  ['Luxor Temple', 'culture', 25.6995, 32.6390, 1.5], ['Hot Air Balloon over Luxor', 'fun', 25.7300, 32.6100, 2],
  ['Temple of Hatshepsut', 'culture', 25.7380, 32.6065, 1.5], ['Colossi of Memnon', 'sights', 25.7205, 32.6105, 0.5],
  ['Nile Cruise to Aswan', 'fun', 24.0889, 32.8998, 8]], ['Egypt', 'Nile']);
add('Fes & Chefchaouen', 'Africa', 'Morocco', 'MAD', [34.0331, -5.0003], [
  ['Fes el-Bali Medina', 'culture', 34.0640, -4.9730, 3], ['Chouara Tannery', 'culture', 34.0660, -4.9710, 0.5],
  ['Al-Qarawiyyin', 'culture', 34.0650, -4.9730, 0.5], ['Bou Inania Madrasa', 'culture', 34.0620, -4.9830, 0.5],
  ['Chefchaouen Blue City', 'sights', 35.1688, -5.2636, 4], ['Sahara Camel Trek (Merzouga)', 'nature', 31.0990, -4.0120, 10]], ['Islamic heritage', 'Sahara']);

// ===================== MORE AFRICA =====================
add('Zanzibar', 'Africa', 'Tanzania', 'TZS', [-6.1659, 39.2026], [
  ['Stone Town', 'culture', -6.1630, 39.1880, 2], ['Prison Island Tortoises', 'nature', -6.1270, 39.1640, 2],
  ['Nungwi Beach', 'nature', -5.7270, 39.2940, 3], ['Jozani Forest', 'nature', -6.2620, 39.4100, 2],
  ['Spice Farm Tour', 'food', -6.0900, 39.2400, 2], ['The Rock Restaurant', 'food', -6.2680, 39.5370, 1.5],
  ['Mnemba Atoll Snorkeling', 'nature', -5.8170, 39.3830, 4], ['Forodhani Night Market', 'food', -6.1610, 39.1880, 1]], ['Beach', 'Island']);
add('Kenya Safari (Nairobi & Masai Mara)', 'Africa', 'Kenya', 'KES', [-1.2921, 36.8219], [
  ['Masai Mara Game Drive', 'nature', -1.4950, 35.1440, 8], ['Giraffe Centre', 'nature', -1.3760, 36.7440, 1],
  ['Sheldrick Elephant Orphanage', 'nature', -1.3720, 36.7760, 1.5], ['Nairobi National Park', 'nature', -1.3730, 36.8580, 4],
  ['Lake Nakuru', 'nature', -0.3650, 36.0880, 6], ['Amboseli (Kilimanjaro views)', 'nature', -2.6530, 37.2600, 8],
  ['Carnivore Restaurant', 'food', -1.3280, 36.8050, 1.5]], ['Safari', 'Wildlife']);
add('Victoria Falls', 'Africa', 'Zimbabwe / Zambia', 'USD', [-17.9243, 25.8572], [
  ['Victoria Falls Rainforest Walk', 'nature', -17.9300, 25.8460, 2], ['Zambezi Sunset Cruise', 'fun', -17.9050, 25.8000, 2.5],
  ["Devil's Pool", 'nature', -17.9240, 25.8550, 2], ['Chobe Day Safari', 'nature', -17.8000, 25.1500, 8],
  ['Helicopter Flight of Angels', 'fun', -17.9100, 25.8300, 0.5], ['Victoria Falls Bridge Bungee', 'fun', -17.9280, 25.8570, 1]], ['Safari']);

// ===================== MORE AMERICAS =====================
add('Washington DC', 'Americas', 'USA', 'USD', [38.9072, -77.0369], [
  ['Lincoln Memorial', 'sights', 38.8893, -77.0502, 1], ['National Mall', 'sights', 38.8895, -77.0230, 2],
  ['US Capitol', 'sights', 38.8899, -77.0091, 1.5], ['National Air and Space Museum', 'culture', 38.8882, -77.0199, 2],
  ['The White House', 'sights', 38.8977, -77.0365, 0.5], ['Natural History Museum', 'culture', 38.8913, -77.0261, 2],
  ['Georgetown', 'food', 38.9050, -77.0630, 1.5]]);
add('Chicago', 'Americas', 'USA', 'USD', [41.8781, -87.6298], [
  ['Millennium Park & The Bean', 'sights', 41.8827, -87.6233, 1], ['Art Institute of Chicago', 'culture', 41.8796, -87.6237, 2.5],
  ['Skydeck (Willis Tower)', 'sights', 41.8789, -87.6359, 1], ['Navy Pier', 'fun', 41.8917, -87.6086, 1.5],
  ['Architecture River Cruise', 'fun', 41.8880, -87.6250, 1.5], ['Deep-Dish Pizza', 'food', 41.8920, -87.6270, 1],
  ['Magnificent Mile', 'shopping', 41.8950, -87.6240, 1.5]]);
add('Miami', 'Americas', 'USA', 'USD', [25.7617, -80.1918], [
  ['South Beach', 'nature', 25.7826, -80.1341, 2], ['Art Deco District', 'sights', 25.7810, -80.1310, 1],
  ['Wynwood Walls', 'culture', 25.8010, -80.1990, 1.5], ['Little Havana', 'food', 25.7650, -80.2190, 1.5],
  ['Everglades Airboat Tour', 'nature', 25.7570, -80.6420, 3], ['Vizcaya Museum & Gardens', 'culture', 25.7440, -80.2100, 1.5],
  ['Bayside Marketplace', 'shopping', 25.7780, -80.1870, 1]]);
add('Orlando', 'Americas', 'USA', 'USD', [28.5383, -81.3792], [
  ['Magic Kingdom', 'fun', 28.4177, -81.5812, 8], ['EPCOT', 'fun', 28.3747, -81.5494, 8],
  ['Universal Studios Florida', 'fun', 28.4794, -81.4685, 8], ['Islands of Adventure', 'fun', 28.4711, -81.4716, 8],
  ['Kennedy Space Center', 'culture', 28.5240, -80.6810, 5], ['ICON Park', 'fun', 28.4430, -81.4680, 1.5],
  ['Disney Springs', 'shopping', 28.3710, -81.5190, 2]], ['Disney', 'Theme parks']);
add('Hawaii (Honolulu & Oahu)', 'Americas', 'USA', 'USD', [21.3069, -157.8583], [
  ['Waikiki Beach', 'nature', 21.2793, -157.8292, 2], ['Diamond Head', 'nature', 21.2610, -157.8060, 2],
  ['Pearl Harbor', 'culture', 21.3650, -157.9500, 3], ['Hanauma Bay', 'nature', 21.2690, -157.6940, 3],
  ['North Shore', 'nature', 21.5940, -158.1040, 4], ['Polynesian Cultural Center', 'culture', 21.6390, -157.9200, 4],
  ['Kualoa Ranch', 'fun', 21.5210, -157.8370, 3], ['Poke at Ala Moana', 'food', 21.2910, -157.8430, 1]], ['Beach', 'Island']);
add('Banff', 'Americas', 'Canada', 'CAD', [51.1784, -115.5708], [
  ['Lake Louise', 'nature', 51.4254, -116.1773, 2], ['Moraine Lake', 'nature', 51.3217, -116.1860, 1.5],
  ['Banff Gondola', 'sights', 51.1440, -115.5730, 1.5], ['Icefields Parkway', 'nature', 51.7000, -116.5000, 6],
  ['Banff Upper Hot Springs', 'fun', 51.1520, -115.5610, 1.5], ['Johnston Canyon', 'nature', 51.2450, -115.8390, 2],
  ['Banff Avenue', 'shopping', 51.1770, -115.5700, 1]], ['Rockies']);
add('Montreal & Quebec City', 'Americas', 'Canada', 'CAD', [45.5017, -73.5673], [
  ['Old Montreal', 'culture', 45.5070, -73.5540, 1.5], ['Notre-Dame Basilica', 'culture', 45.5045, -73.5561, 1],
  ['Mount Royal', 'nature', 45.5048, -73.5874, 2], ['Jean-Talon Market', 'food', 45.5360, -73.6150, 1],
  ["Schwartz's Deli", 'food', 45.5160, -73.5780, 1], ['Old Quebec City Day Trip', 'culture', 46.8139, -71.2080, 8]]);
add('Havana', 'Americas', 'Cuba', 'CUP', [23.1136, -82.3666], [
  ['Old Havana', 'culture', 23.1360, -82.3510, 2], ['Malecón', 'sights', 23.1440, -82.3700, 1],
  ['Classic Car Tour', 'fun', 23.1350, -82.3600, 1.5], ['El Capitolio', 'sights', 23.1350, -82.3590, 1],
  ['Plaza de la Catedral', 'culture', 23.1410, -82.3510, 0.5], ['Fábrica de Arte Cubano', 'culture', 23.1210, -82.4080, 2],
  ['Viñales Valley', 'nature', 22.6160, -83.7060, 8]]);
add('Cartagena', 'Americas', 'Colombia', 'COP', [10.4200, -75.5500], [
  ['Walled City', 'culture', 10.4230, -75.5490, 2], ['Castillo San Felipe', 'culture', 10.4220, -75.5390, 1.5],
  ['Getsemaní', 'culture', 10.4210, -75.5460, 1.5], ['Rosario Islands', 'nature', 10.1700, -75.7500, 6],
  ['Bocagrande Beach', 'nature', 10.4000, -75.5550, 2], ['Café del Mar Sunset', 'food', 10.4250, -75.5520, 1]], ['Beach']);

// ===================== MORE OCEANIA =====================
add('Gold Coast', 'Oceania', 'Australia', 'AUD', [-28.0167, 153.4000], [
  ["Surfers Paradise Beach", 'nature', -28.0027, 153.4310, 2], ['SkyPoint Observation Deck', 'sights', -28.0060, 153.4290, 1],
  ['Warner Bros. Movie World', 'fun', -27.9070, 153.3120, 7], ['Sea World', 'fun', -27.9570, 153.4260, 6],
  ['Currumbin Wildlife Sanctuary', 'nature', -28.1350, 153.4870, 3], ['Burleigh Head', 'nature', -28.0890, 153.4560, 1.5],
  ['Springbrook National Park', 'nature', -28.2320, 153.2730, 4]], ['Beach', 'Theme parks']);
add('Cairns & Great Barrier Reef', 'Oceania', 'Australia', 'AUD', [-16.9186, 145.7781], [
  ['Great Barrier Reef Cruise', 'nature', -16.7500, 146.0000, 8], ['Kuranda Scenic Railway & Skyrail', 'fun', -16.8180, 145.6370, 5],
  ['Daintree Rainforest', 'nature', -16.2500, 145.4000, 8], ['Cairns Esplanade Lagoon', 'nature', -16.9180, 145.7790, 1],
  ['Green Island', 'nature', -16.7590, 145.9720, 5], ['Cairns Night Markets', 'food', -16.9200, 145.7790, 1]], ['Diving', 'Reef']);
add('Perth', 'Oceania', 'Australia', 'AUD', [-31.9505, 115.8605], [
  ['Kings Park', 'nature', -31.9600, 115.8330, 1.5], ['Rottnest Island Quokkas', 'nature', -32.0060, 115.5150, 6],
  ['Fremantle', 'culture', -32.0569, 115.7439, 3], ['Cottesloe Beach', 'nature', -31.9960, 115.7510, 2],
  ['Elizabeth Quay', 'sights', -31.9580, 115.8580, 1], ['Pinnacles Desert', 'nature', -30.6050, 115.1590, 8],
  ['Swan Valley Food Trail', 'food', -31.8170, 116.0000, 4]]);
add('Tasmania (Hobart)', 'Oceania', 'Australia', 'AUD', [-42.8821, 147.3272], [
  ['MONA', 'culture', -42.8124, 147.2600, 3], ['Salamanca Market', 'shopping', -42.8870, 147.3330, 2],
  ['kunanyi / Mount Wellington', 'nature', -42.8960, 147.2370, 1.5], ['Port Arthur Historic Site', 'culture', -43.1470, 147.8510, 4],
  ['Wineglass Bay', 'nature', -42.1590, 148.3010, 5], ['Cradle Mountain', 'nature', -41.6840, 145.9520, 6],
  ['Bonorong Wildlife Sanctuary', 'nature', -42.7240, 147.2550, 1.5]]);
add('Rotorua', 'Oceania', 'New Zealand', 'NZD', [-38.1368, 176.2497], [
  ['Te Puia Geysers', 'nature', -38.1630, 176.2510, 2], ['Wai-O-Tapu Thermal Wonderland', 'nature', -38.3550, 176.3700, 2],
  ['Polynesian Spa', 'fun', -38.1380, 176.2580, 2], ['Redwoods Treewalk', 'nature', -38.1570, 176.2740, 1.5],
  ['Skyline Rotorua Luge', 'fun', -38.1170, 176.2240, 2], ['Māori Hāngī Dinner', 'food', -38.1600, 176.2500, 3],
  ['Waitomo Glowworm Caves', 'nature', -38.2610, 175.1040, 3]]);
add('Fiji', 'Oceania', 'Fiji', 'FJD', [-17.8000, 177.4500], [
  ['Mamanuca Islands Cruise', 'nature', -17.7000, 177.1500, 7], ['Cloud 9 Floating Bar', 'fun', -17.6880, 177.1680, 3],
  ['Garden of the Sleeping Giant', 'nature', -17.7460, 177.4870, 1.5], ['Sabeto Mud Pool & Hot Springs', 'fun', -17.7570, 177.4950, 1],
  ['Sri Siva Subramaniya Temple', 'culture', -17.8090, 177.4210, 0.5], ['Coral Coast', 'nature', -18.1600, 177.6000, 4],
  ['Nadi Market', 'food', -17.8020, 177.4160, 1]], ['Beach', 'Island', 'Honeymoon']);
add('Bora Bora', 'Oceania', 'French Polynesia', 'XPF', [-16.5004, -151.7415], [
  ['Matira Beach', 'nature', -16.5410, -151.7330, 2], ['Lagoon Snorkel with Sharks & Rays', 'nature', -16.5000, -151.7000, 4],
  ['Mount Otemanu 4x4 Tour', 'nature', -16.5120, -151.7470, 3], ['Vaitape Village', 'shopping', -16.5020, -151.7520, 1],
  ['Overwater Bungalow Day', 'fun', -16.4800, -151.7100, 6], ['Sunset Catamaran', 'fun', -16.5000, -151.7600, 2]], ['Beach', 'Island', 'Honeymoon']);
})();
