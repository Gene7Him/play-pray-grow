
// 1. We must use 'use client' for forms and user interaction
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // To redirect after success

export default function NewWeekPage() {
  // 2. Create state for each form field
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [coreVerse, setCoreVerse] = useState('');
  // ... (you can add states for snacks, lessons, etc.)

  const router = useRouter(); // Get the router
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. This function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing
    setIsLoading(true);
    setError(null);

    // This is the data object you will send to your API
    const newWeekData = {
      title: title,
      theme: theme,
      core_verse: coreVerse,
      // Add default/empty values for the other fields your API expects
      meeting_days: [],
      snacks: [],
      lessons: [],
      notes: '',
    };

    try {
      // 4. Call your new POST API endpoint
      const response = await fetch('/api/weeks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWeekData),
      });

      if (!response.ok) {
        throw new Error('Failed to create new week');
      }

      const result = await response.json();
      
      // 5. It worked! Redirect to the new week's page
      alert('Successfully created new week!');
      // This assumes you have a page at /weeks/[id] to view a week
      router.push(`/weeks/${result.newWeek.week_id}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 6. This is the HTML form
  return (
    <div>
      <h1>Create a New Week</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="title">Title:</label><br />
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '300px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="theme">Theme:</label><br />
          <input
            id="theme"
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="coreVerse">Core Verse:</label><br />
          <input
            id="coreVerse"
            type="text"
            value={coreVerse}
            onChange={(e) => setCoreVerse(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Create Week'}
        </button>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </form>
    </div>
  );
}