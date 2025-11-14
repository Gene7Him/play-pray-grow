// seed.js

import { redis } from './lib/redis.js'; // Make sure this path is correct

// This is the data you provided
const week1Data = {
  week_id: 1,
  title: 'God Made Me',
  core_verse: 'Psalm 139:14',
  theme: 'God Made My Body',
  meeting_days: ['Tuesday', 'Wednesday', 'Thursday'],
  snacks: ['Apple juice', 'Grapes', 'Milk', 'Apples'],
  lessons: [
    {
      id: 1,
      title: 'Touch & Texture Exploration',
      focus: 'My Hands Can Feel',
      subjects: {
        'Morning Circle': [
          'Welcome song',
          'Prayer',
          'Bible Verse',
          'Movement warm-up',
        ],
        'Science/Nature': [
          'Mini Outdoor Touch Walk',
          'Touch & Texture bins',
        ],
        'Math & Literacy': [
          'Counting fingers',
          'Sorting textures',
          "Read 'Hands Can' by Cheryl Willis Hudson",
        ],
        Art: ['Texture Hand Collage'],
        'Music & Movement': [
          'He’s Got the Whole World in His Hands',
          'Wonderfully Made',
        ],
        'Social Emotional': ['Reflection', 'Closing Prayer'],
      },
      supplies: [
        'Construction paper',
        'Glue',
        'Scissors',
        'Cotton',
        'Sandpaper',
        'Buttons',
        'Bubble wrap',
      ],
      reflection_questions: [
        'What do your hands help you do?',
        'How can your hands show love?',
      ],
    },
  ],
  notes: 'End of lessons project: Closing Wonder Moment',
};

// An async function to add the data
async function seedDatabase() {
  try {
    const key = 'week:1';

    // -----------------------------------------------------------------
    //  👇 THIS IS THE CHANGE 👇
    // We use redis.json.set, not redis.set
    // We pass the object directly, not a stringified version
    // "$" is the path, meaning the root of the JSON document
    // -----------------------------------------------------------------
    await redis.json.set(key, "$", week1Data);

    console.log('✅ Successfully seeded database with "week:1" as JSON');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    if (redis.quit) {
      await redis.quit();
      console.log('Redis connection closed.');
    }
  }
}

// Run the function
seedDatabase();