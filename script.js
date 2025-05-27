
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
