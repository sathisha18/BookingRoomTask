document.getElementById('bookRoomButton').addEventListener('click', function() {
    const room = document.getElementById('room').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const meetingTitle = document.getElementById('meetingTitle').value;

    if (date && startTime && endTime && meetingTitle) {
        const bookingItem = `${room} on ${date} from ${startTime} to ${endTime} (${meetingTitle})`;

        // Add to bookings list
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = bookingItem;
        document.getElementById('bookingsList').appendChild(listItem);

        // Show booking confirmation message
        const confirmationMessage = document.createElement('div');
        confirmationMessage.className = 'alert alert-success';
        confirmationMessage.textContent = `Your booking for ${bookingItem} has been confirmed!`;
        document.getElementById('bookingConfirmation').innerHTML = '';
        document.getElementById('bookingConfirmation').appendChild(confirmationMessage);

        // Update available rooms
        const roomsList = document.getElementById('roomsList').children;
        for (let i = 0; i < roomsList.length; i++) {
            if (roomsList[i].getAttribute('data-room') === room) {
                let capacity = parseInt(roomsList[i].getAttribute('data-capacity'));
                capacity -= 1; // Decrease capacity by 1
                if (capacity > 0) {
                    roomsList[i].setAttribute('data-capacity', capacity);
                    roomsList[i].textContent = `${room} (Capacity: ${capacity})`;
                } else {
                    roomsList[i].remove(); // Remove the room if capacity is 0
                }
                break;
            }
        }
    } else {
        alert('Please fill in all fields.');
    }
});
