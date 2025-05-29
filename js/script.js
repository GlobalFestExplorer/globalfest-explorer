
function searchEvents() {
    const input = document.getElementById('search').value.toLowerCase();
    const events = JSON.parse(localStorage.getItem('events'));
    const filtered = events.filter(event =>
        event.name.toLowerCase().includes(input) ||
        event.location.toLowerCase().includes(input) ||
        event.date.includes(input)
    );
    displayEvents(filtered);
}

function displayEvents(events) {
    const container = document.getElementById('event-list');
    container.innerHTML = '';
    events.forEach(event => {
        const div = document.createElement('div');
        div.className = 'event-card';
        div.innerHTML = `<h3>${event.name}</h3><p>${event.date} - ${event.location}</p>`;
        div.onclick = () => alert(`More info about: ${event.name}`);
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const sampleEvents = [
        { name: 'Holi Festival', date: 'March 20, 2025', location: 'India' },
        { name: 'Carnival', date: 'February 28, 2025', location: 'Brazil' },
        { name: 'Oktoberfest', date: 'September 21, 2025', location: 'Germany' }
    ];
    localStorage.setItem('events', JSON.stringify(sampleEvents));
    displayEvents(sampleEvents);
});

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fpmdbfrqwvxxtxglkbes.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwbWRiZnJxd3Z4eHR4Z2xrYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODg5MTIsImV4cCI6MjA2NDA2NDkxMn0.5Yk8WEzGeLNJRCl24dW1pUI5D32RJenExOE7XL9rvdQ'
);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getFestivals() {
  const { data, error } = await supabase
    .from('festivals')
    .select('*')
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching festivals:', error);
    return [];
  }

  return data;
}

