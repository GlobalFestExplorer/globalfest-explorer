<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

  const supabase = createClient(
    'https://fpmdbfrqwvxxtxglkbes.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwbWRiZnJxd3Z4eHR4Z2xrYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODg5MTIsImV4cCI6MjA2NDA2NDkxMn0.5Yk8WEzGeLNJRCl24dW1pUI5D32RJenExOE7XL9rvdQ'
  );

  // DOM elements
  const nameInput = document.getElementById('search');
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const container = document.getElementById('event-list');

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

  function displayEvents(events) {
    container.innerHTML = '';
    events.forEach(event => {
      const div = document.createElement('div');
      div.className = 'event-card';
      div.innerHTML = `
        <h3>${event.name}</h3>
        <p>${formatDateRange(event.start_date, event.end_date)} - ${event.country || event.city || 'Unknown'}</p>
      `;
      div.onclick = () => window.location.href = `event-detail.html?id=${event.id}`;
      container.appendChild(div);
    });
  }

  function formatDateRange(start, end) {
    const s = new Date(start);
    const e = end ? new Date(end) : null;
    const opt = { month: 'short', day: 'numeric', year: 'numeric' };
    return e ? `${s.toLocaleDateString(undefined, opt)} – ${e.toLocaleDateString(undefined, opt)}` : s.toLocaleDateString(undefined, opt);
  }

  async function searchEvents() {
    const nameQuery = nameInput.value.toLowerCase();
    const locationQuery = nameInput.value.toLowerCase(); // optional second use of same input
    const start = startDateInput.value;
    const end = endDateInput.value;

    const events = await getFestivals();

    const filtered = events.filter(event => {
      const matchesName = !nameQuery || event.name.toLowerCase().includes(nameQuery);
      const matchesLocation =
        !locationQuery ||
        [event.country, event.city, event.region]
          .filter(Boolean)
          .some(val => val.toLowerCase().includes(locationQuery));
      
      const eventStart = new Date(event.start_date);
      const eventEnd = event.end_date ? new Date(event.end_date) : eventStart;

      const matchesDate =
        (!start || eventEnd >= new Date(start)) &&
        (!end || eventStart <= new Date(end));

      return matchesName && matchesLocation && matchesDate;
    });

    displayEvents(filtered);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const events = await getFestivals();
    displayEvents(events);
  });

  // Add listener to search field and optionally a button
  document.getElementById('search-button').addEventListener('click', searchEvents);
</script>
