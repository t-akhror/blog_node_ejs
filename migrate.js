const mongoose = require('mongoose');
require('dotenv').config()

async function migrateBlogsToPosts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = mongoose.connection.db;

    // 1. blogs collectiondan barcha hujjatlarni olish
    const blogs = await db.collection('blogs').find({}).toArray();

    if (blogs.length === 0) {
      console.log("Hech qanday hujjat topilmadi.");
      return;
    }

    // 2. posts collectionga hujjatlarni joylash
    await db.collection('posts').insertMany(blogs);

    console.log(`✅ ${blogs.length} ta hujjat muvaffaqiyatli ko‘chirildi (blogs ➝ posts).`);
  } catch (err) {
    console.error("❌ Xatolik:", err);
  } finally {
    await mongoose.disconnect();
  }
}

migrateBlogsToPosts();
