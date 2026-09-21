const mysql = require('mysql2/promise');

async function seed() {
  console.log('Connecting to MySQL database "homestay"...');
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'homestay',
  });

  console.log('Ensuring category and landscape columns exist in Homestays table...');
  const [columns] = await conn.query('SHOW COLUMNS FROM Homestays');
  const colNames = columns.map((c) => c.Field.toLowerCase());

  if (!colNames.includes('category')) {
    await conn.query('ALTER TABLE Homestays ADD COLUMN category VARCHAR(100) NULL AFTER price_per_night');
    console.log('Added column `category` to Homestays.');
  }

  if (!colNames.includes('landscape')) {
    await conn.query('ALTER TABLE Homestays ADD COLUMN landscape VARCHAR(150) NULL AFTER category');
    console.log('Added column `landscape` to Homestays.');
  }

  // Get available hosts
  const [hosts] = await conn.query('SELECT user_id, full_name, email FROM Users WHERE role = "host"');
  const defaultHostId = hosts.length > 0 ? hosts[0].user_id : 4;
  console.log(`Found ${hosts.length} hosts. Using defaultHostId=${defaultHostId}`);

  // Update existing homestays to Rice Farm category
  await conn.query(`
    UPDATE Homestays 
    SET category = 'Rice Farm', landscape = 'Rice Farm'
    WHERE category IS NULL OR category = ''
  `);
  console.log('Updated existing homestays to category="Rice Farm".');

  // Define 3 authentic homestays for each category:
  // Categories: Mountain, Rice Farm, Riverside, Sea, Lake, Eco-Lodge
  const homestaysToSeed = [
    // 1. MOUNTAIN (3 homestays)
    {
      title: 'Bokor Mountain Mist Farmstay',
      province: 'Kampot',
      district: 'Teuk Chhou District',
      category: 'Mountain',
      landscape: 'Mountain',
      price_per_night: 28.00,
      description: 'Perched on the tranquil slopes beneath Bokor Mountain, enjoy crisp mountain breezes, organic fruit orchards, and traditional Khmer wooden cottages.',
      near_places: JSON.stringify(['Mount Bokor', 'Teuk Chhou Rapids', 'Pepper Plantation']),
      image_url: 'http://localhost:3000/uploads/PreahVihearTemple.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/PreahVihearTemple1.jpg',
        'http://localhost:3000/uploads/PreahVihearTemple2.jpg',
      ]),
      host_id: hosts[1]?.user_id || defaultHostId,
      status: 'Approved',
    },
    {
      title: 'Phnom Kulen Holy Mountain Sanctuary',
      province: 'Siem Reap',
      district: 'Svay Leu District',
      category: 'Mountain',
      landscape: 'Mountain',
      price_per_night: 32.00,
      description: 'Stay atop the sacred plateau of Phnom Kulen. Surrounded by freshwater mountain springs, ancient sandstone carvings, and authentic highland hospitality.',
      near_places: JSON.stringify(['Phnom Kulen Waterfall', '1000 Lingas River', 'Preah Ang Thom Pagoda']),
      image_url: 'http://localhost:3000/uploads/PreahVihearTemple1.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/PreahVihearTemple.jpg',
        'http://localhost:3000/uploads/PreahVihearTemple2.jpg',
      ]),
      host_id: hosts[2]?.user_id || defaultHostId,
      status: 'Approved',
    },
    {
      title: 'Cardamom Cloud Ridge Homestay',
      province: 'Koh Kong',
      district: 'Thmar Baing District',
      category: 'Mountain',
      landscape: 'Mountain',
      price_per_night: 24.00,
      description: 'Wake up above the cloud line in the misty Cardamom Range. Experience guided forest walks, wild honeycomb harvesting, and peaceful starlit evenings.',
      near_places: JSON.stringify(['Cardamom Forest Ridge', 'Tatai Mountain River', 'Krang Chek Waterfall']),
      image_url: 'http://localhost:3000/uploads/PreahVihearTemple2.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/PreahVihearTemple.jpg',
        'http://localhost:3000/uploads/forhost1.jpg',
      ]),
      host_id: hosts[3]?.user_id || defaultHostId,
      status: 'Approved',
    },

    // 2. RICE FARM (3 homestays - 2 new + existing Pouk Homestay)
    {
      title: 'Battambang Emerald Paddy Homestay',
      province: 'Battambang',
      district: 'Banan District',
      category: 'Rice Farm',
      landscape: 'Rice Farm',
      price_per_night: 18.00,
      description: 'Immerse in Cambodia’s famous rice bowl. Cycle along peaceful village dikes, learn heirloom rice planting, and enjoy farm-to-table home meals.',
      near_places: JSON.stringify(['Bamboo Train', 'Banan Temple', 'Golden Rice Paddies']),
      image_url: 'http://localhost:3000/uploads/homestay.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/homestay3.jpg',
        'http://localhost:3000/uploads/homestay4.jpg',
      ]),
      host_id: hosts[0]?.user_id || defaultHostId,
      status: 'Approved',
    },
    {
      title: 'Takeo Golden Harvest Farmhouse',
      province: 'Takeo',
      district: 'Bati District',
      category: 'Rice Farm',
      landscape: 'Rice Farm',
      price_per_night: 15.00,
      description: 'Experience generations of rice farming tradition in rural Takeo. Stay in a raised wooden house overlooking endless seasonal paddy fields.',
      near_places: JSON.stringify(['Tonle Bati Lake', 'Phnom Chisor Temple', 'Silk Weaving Center']),
      image_url: 'http://localhost:3000/uploads/heritage.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/forhost2.jpg',
        'http://localhost:3000/uploads/homestay5.jpg',
      ]),
      host_id: hosts[1]?.user_id || defaultHostId,
      status: 'Approved',
    },

    // 3. RIVERSIDE (3 homestays)
    {
      title: 'Kampot River Palms Homestay',
      province: 'Kampot',
      district: 'Kampong Bay District',
      category: 'Riverside',
      landscape: 'Riverside',
      price_per_night: 22.00,
      description: 'Direct riverfront stay shaded by nipa palms. Relax on private wooden docks, kayak at sunset through the Green Cathedral loop, and savor fresh river prawns.',
      near_places: JSON.stringify(['Praek Tuek Chhu River', 'Green Cathedral Kayak Loop', 'Old Market Bridge']),
      image_url: 'http://localhost:3000/uploads/forhost1.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/forhost2.jpg',
        'http://localhost:3000/uploads/homestay6.jpg',
      ]),
      host_id: hosts[2]?.user_id || defaultHostId,
      status: 'Approved',
    },
    {
      title: 'Mekong Freshwater Dolphin Retreat',
      province: 'Kratie',
      district: 'Sambour District',
      category: 'Riverside',
      landscape: 'Riverside',
      price_per_night: 20.00,
      description: 'Sleep to the soothing sounds of the mighty Mekong River. Witness rare Irrawaddy river dolphins and enjoy bicycle tours along idyllic river islands.',
      near_places: JSON.stringify(['Kampi Dolphin Pool', 'Koh Trong Pomelo Island', 'Mekong Rapids']),
      image_url: 'http://localhost:3000/uploads/photo-1788243826967-713092874.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/photo-1788400726786-143719736.jpg',
        'http://localhost:3000/uploads/forhost1.jpg',
      ]),
      host_id: hosts[0]?.user_id || defaultHostId,
      status: 'Approved',
    },
    {
      title: 'Steung Sangker Riverside Wooden House',
      province: 'Battambang',
      district: 'Wat Kor Village',
      category: 'Riverside',
      landscape: 'Riverside',
      price_per_night: 16.00,
      description: 'Authentic Khmer architecture nestled right on the banks of Steung Sangker. Shaded by ancient mango trees and surrounded by heritage wooden estates.',
      near_places: JSON.stringify(['Sangker Riverfront', 'Wat Kor Heritage Village', 'Battambang Colonial Center']),
      image_url: 'http://localhost:3000/uploads/homestay6.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/homestay5.jpg',
        'http://localhost:3000/uploads/homestay4.jpg',
      ]),
      host_id: hosts[3]?.user_id || defaultHostId,
      status: 'Approved',
    },

    // 4. SEA (3 homestays)
    {
      title: 'Kep Coastal Fisherman Bungalow',
      province: 'Kep',
      district: 'Damnak Chang\'aeur District',
      category: 'Sea',
      landscape: 'Sea',
      price_per_night: 26.00,
      description: 'Overlooking the Gulf of Thailand, step directly into authentic coastal village life. Enjoy daily ocean catch cooked with world-renowned Kampot pepper.',
      near_places: JSON.stringify(['Kep Crab Market', 'Kep National Park', 'Rabbit Island Pier']),
      image_url: 'http://localhost:3000/uploads/forhost2.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/homestay.jpg',
        'http://localhost:3000/uploads/homestay3.jpg',
      ]),
      host_id: hosts[1]?.user_id || defaultHostId,
      status: 'Approved',
    },
    {
      title: 'Koh Rong Sanloem Coral Sands Homestay',
      province: 'Preah Sihanouk',
      district: 'M\'Pai Bay Village',
      category: 'Sea',
      landscape: 'Sea',
      price_per_night: 35.00,
      description: 'Tranquil island homestay steps from powdery white sand and turquoise shallow waters. Snorkel vibrant coral reefs and unwind under coconut palms.',
      near_places: JSON.stringify(['Saracen Bay', 'M\'Pai Bay Coral Reef', 'Clear Water Pier']),
      image_url: 'http://localhost:3000/uploads/homestay5.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/homestay6.jpg',
        'http://localhost:3000/uploads/forhost2.jpg',
      ]),
      host_id: hosts[2]?.user_id || defaultHostId,
      status: 'Approved',
    },
    {
      title: 'Ream Mangrove Beach Homestay',
      province: 'Preah Sihanouk',
      district: 'Ream National Park',
      category: 'Sea',
      landscape: 'Sea',
      price_per_night: 25.00,
      description: 'Where dense mangrove conservation meets secluded coastal waters. Guided estuary boat excursions, coastal bird watching, and fresh seafood barbecue.',
      near_places: JSON.stringify(['Ream National Park', 'Silver Beach', 'Mangrove Estuary']),
      image_url: 'http://localhost:3000/uploads/photo-1788400726786-143719736.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/photo-1788401324976-342705228.jpg',
        'http://localhost:3000/uploads/homestay.jpg',
      ]),
      host_id: hosts[0]?.user_id || defaultHostId,
      status: 'Approved',
    },

    // 5. LAKE (3 homestays)
    {
      title: 'Tonle Sap Floating Village Stilt Stay',
      province: 'Siem Reap',
      district: 'Kampong Phluk District',
      category: 'Lake',
      landscape: 'Lake',
      price_per_night: 19.00,
      description: 'Experience the rhythm of Southeast Asia’s largest freshwater lake. High-stilted traditional wooden home offering boat tours through flooded mangrove forests.',
      near_places: JSON.stringify(['Tonle Sap Great Lake', 'Flooded Mangrove Forest', 'Stilt Village Center']),
      image_url: 'http://localhost:3000/uploads/homestay3.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/homestay4.jpg',
        'http://localhost:3000/uploads/heritage.jpg',
      ]),
      host_id: hosts[1]?.user_id || defaultHostId,
      status: 'Approved',
    },
    {
      title: 'Kampong Luong Lakeview Wooden Haven',
      province: 'Pursat',
      district: 'Krakor District',
      category: 'Lake',
      landscape: 'Lake',
      price_per_night: 17.00,
      description: 'Truly floating on Tonle Sap Lake! Learn ancient freshwater fishing techniques, observe floating schools and markets, and enjoy stunning lake sunsets.',
      near_places: JSON.stringify(['Kampong Luong Floating Community', 'Tonle Sap Bird Sanctuary', 'Krakor River Mouth']),
      image_url: 'http://localhost:3000/uploads/homestay4.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/homestay3.jpg',
        'http://localhost:3000/uploads/photo-1788243826967-713092874.jpg',
      ]),
      host_id: hosts[2]?.user_id || defaultHostId,
      status: 'Approved',
    },
    {
      title: 'West Baray Reservoir Tranquil Homestay',
      province: 'Siem Reap',
      district: 'Baray Village',
      category: 'Lake',
      landscape: 'Lake',
      price_per_night: 14.00,
      description: 'Peaceful stay right beside the ancient Angkorian reservoir. Clear freshwater swimming, bamboo hammock huts, and organic herb garden cuisine.',
      near_places: JSON.stringify(['West Baray Lake Beach', 'West Mebon Island', 'Local Craft Workshops']),
      image_url: 'http://localhost:3000/uploads/heritage.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/homestay.jpg',
        'http://localhost:3000/uploads/homestay5.jpg',
      ]),
      host_id: hosts[3]?.user_id || defaultHostId,
      status: 'Approved',
    },

    // 6. ECO-LODGE (3 homestays)
    {
      title: 'Chi Phat Community Eco-Lodge',
      province: 'Koh Kong',
      district: 'Chi Phat Commune',
      category: 'Eco-Lodge',
      landscape: 'Eco-Lodge',
      price_per_night: 23.00,
      description: 'Pioneering community-based ecotourism. Solar-powered bamboo eco-lodge supporting rainforest wildlife protection and indigenous forestry preservation.',
      near_places: JSON.stringify(['Cardamom Rainforest Trails', 'Bat Cave', 'O\'Malu Waterfall']),
      image_url: 'http://localhost:3000/uploads/photo-1788401324976-342705228.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/photo-1788243826967-713092874.jpg',
        'http://localhost:3000/uploads/forhost1.jpg',
      ]),
      host_id: hosts[0]?.user_id || defaultHostId,
      status: 'Approved',
    },
    {
      title: 'Mondulkiri Elephant Forest Eco-Stay',
      province: 'Mondulkiri',
      district: 'Sen Monorom District',
      category: 'Eco-Lodge',
      landscape: 'Eco-Lodge',
      price_per_night: 30.00,
      description: 'Nestled in the rolling highland pine forests of Mondulkiri. Ethical wildlife observations, Bunong hill-tribe cultural stories, and cool highland breezes.',
      near_places: JSON.stringify(['Elephant Valley Sanctuary', 'Bousra Waterfall', 'Bunong Cultural Village']),
      image_url: 'http://localhost:3000/uploads/homestay.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/homestay6.jpg',
        'http://localhost:3000/uploads/forhost2.jpg',
      ]),
      host_id: hosts[1]?.user_id || defaultHostId,
      status: 'Approved',
    },
    {
      title: 'Kirirom Pine Forest Sanctuary Eco-Lodge',
      province: 'Kampong Speu',
      district: 'Phnom Sruoch District',
      category: 'Eco-Lodge',
      landscape: 'Eco-Lodge',
      price_per_night: 27.00,
      description: 'Eco-friendly timber bungalows hidden amidst aromatic high-elevation pine groves. Solar energy, mountain trail biking, and zero-waste community farming.',
      near_places: JSON.stringify(['Kirirom National Park', 'Chambok Ecotourism Waterfall', 'Pine Forest Trails']),
      image_url: 'http://localhost:3000/uploads/homestay5.jpg',
      gallery_photos: JSON.stringify([
        'http://localhost:3000/uploads/homestay4.jpg',
        'http://localhost:3000/uploads/forhost1.jpg',
      ]),
      host_id: hosts[2]?.user_id || defaultHostId,
      status: 'Approved',
    },
  ];

  console.log(`Checking existing homestays to avoid duplicate insertions...`);
  const [existingTitles] = await conn.query('SELECT title FROM Homestays');
  const existingSet = new Set(existingTitles.map((r) => r.title.toLowerCase().trim()));

  let insertedCount = 0;
  for (const item of homestaysToSeed) {
    if (existingSet.has(item.title.toLowerCase().trim())) {
      console.log(`Skipping existing: "${item.title}"`);
      // Update its category & landscape just in case
      await conn.query(
        'UPDATE Homestays SET category = ?, landscape = ?, status = "Approved" WHERE LOWER(title) = ?',
        [item.category, item.landscape, item.title.toLowerCase().trim()]
      );
      continue;
    }

    await conn.query(
      `INSERT INTO Homestays (
        title, province, district, category, landscape, price_per_night,
        description, near_places, image_url, gallery_photos, host_id, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.title,
        item.province,
        item.district,
        item.category,
        item.landscape,
        item.price_per_night,
        item.description,
        item.near_places,
        item.image_url,
        item.gallery_photos,
        item.host_id,
        item.status,
      ]
    );
    insertedCount++;
    console.log(`Inserted [${item.category}]: "${item.title}" in ${item.province}`);
  }

  console.log(`\nSeed completed! Inserted ${insertedCount} new homestays.`);

  // Verify counts per category
  const [counts] = await conn.query(`
    SELECT category, COUNT(*) as count 
    FROM Homestays 
    WHERE status = 'Approved' 
    GROUP BY category
  `);
  console.log('\n--- APPROVED HOMESTAYS PER CATEGORY ---');
  console.table(counts);

  const [totalApproved] = await conn.query(`
    SELECT COUNT(*) as total FROM Homestays WHERE status = 'Approved'
  `);
  console.log(`Total Approved Homestays in DB: ${totalApproved[0].total}`);

  await conn.end();
}

seed().catch((err) => {
  console.error('Seed script error:', err);
  process.exit(1);
});
