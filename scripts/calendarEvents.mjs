// scripts/calendarEvents.mjs

export function initializeFullCalendar() {
    // FIX: Change 'calendar' to 'calendar-container'
    var calendarEl = document.getElementById('calendar-container'); 

    // Check if the element exists before trying to initialize
    if (!calendarEl) {
        console.error("Calendar element #calendar-container not found!"); // Updated error message
        return;
    }

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Default view (Month view)
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay' // Views available
        },
        events: [
            // Example Events (Replace with your actual events)
            {
                title: 'Parent-Teacher Meeting',
                start: '2025-12-15T10:00:00', // Use ISO 8601 format
                end: '2025-12-15T12:00:00',
                color: '#4a7c59' // Green color
            },
            {
                title: 'Christmas Break Starts',
                start: '2025-12-20',
                allDay: true, // No specific time
                color: '#c0392b' // Red color
            },
            {
                title: 'New Year Classes Resume',
                start: '2026-01-05',
                allDay: true,
                color: '#2980b9' // Blue color
            },
            {
                title: 'Visit the school website',
                url: 'dantonifa.github.io',
                start: '2025-12-25'
            }
        ]
        // You can also use an events feed from a JSON file:
        // events: './api/events.json' 
    });

    // Render the calendar UI
    calendar.render();
}