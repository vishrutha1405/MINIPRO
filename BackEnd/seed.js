// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Theory = require('./models/Theory');
const Test = require('./models/Test');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Theory.deleteMany();
    await Test.deleteMany();
    console.log('🧹 Cleared existing data');

    // Create Admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: 'admin', 
      role: 'admin'
    });
    console.log('👤 Admin created: admin@gmail.com / admin');

    // Create Student
    const student = await User.create({
      name: 'Vishu User',
      email: 'vishu@gmail.com',
      password: '12345',
      role: 'student'
    });
    console.log('👤 Student created: vishu@gmail.com / 12345');

    // Create some sample Theory data
    await Theory.create([
      {
        subject: 'Physics',
        title: 'Laws of Motion',
        description: 'Newtons three laws of motion',
        content: '1. Inerta, 2. F=ma, 3. Action-Reaction',
        createdBy: admin._id
      },
      {
        subject: 'Maths',
        title: 'Algebra Basics',
        description: 'Introduction to variables and equations',
        content: 'x + y = z',
        createdBy: admin._id
      }
    ]);
    console.log('📚 Sample theory data created');

    // Create some sample Test data
    await Test.create([
      {
        subject: 'Physics',
        title: 'Motion Quiz',
        questions: [
          { 
            question: 'What is F in F=ma?', 
            options: ['Force', 'Friction', 'Frequency', 'Function'], 
            answer: 'Force' 
          },
          { 
            question: 'What is the SI unit of Mass?', 
            options: ['kg', 'm', 's', 'K'], 
            answer: 'kg' 
          }
        ],
        createdBy: admin._id
      }
    ]);
    console.log('📝 Sample test data created');

    console.log('🎉 Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
