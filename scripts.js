document.getElementById('bookRoomButton').addEventListener('click', function() {
    const room = document.getElementById('room').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const meetingTitle = document.getElementById('meetingTitle').value;

    if (validateForm(room, date, startTime, endTime, meetingTitle)) {
        const bookingItem = `${room} on ${date} from ${startTime} to ${endTime} (${meetingTitle})`;

        // Add to bookings list
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = bookingItem;

        // Add update and delete buttons
        const updateButton = document.createElement('button');
        updateButton.className = 'btn btn-warning btn-sm float-right ml-2';
        updateButton.textContent = 'Update';
        updateButton.onclick = function() {
            updateBooking(listItem, room, date, startTime, endTime, meetingTitle);
        };

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm float-right';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteBooking(listItem, room);
        };

        listItem.appendChild(updateButton);
        listItem.appendChild(deleteButton);
        document.getElementById('bookingsList').appendChild(listItem);

        // Show booking confirmation message
        const confirmationMessage = document.createElement('div');
        confirmationMessage.className = 'alert alert-success';
        confirmationMessage.textContent = `Your booking for ${bookingItem} has been confirmed!`;
        document.getElementById('bookingConfirmation').innerHTML = '';
        document.getElementById('bookingConfirmation').appendChild(confirmationMessage);

        // Update available rooms
        updateAvailableRooms(room);
    } else {
        alert('Please fill in all fields.');
    }
});

function validateForm(room, date, startTime, endTime, meetingTitle) {
    if (!room || !date || !startTime || !endTime || !meetingTitle) {
        return false;
    }
    // Additional validation logic can be added here
    return true;
}

function updateBooking(listItem, room, date, startTime, endTime, meetingTitle) {
    // Logic to update the booking
    document.getElementById('room').value = room;
    document.getElementById('date').value = date;
    document.getElementById('startTime').value = startTime;
    document.getElementById('endTime').value = endTime;
    document.getElementById('meetingTitle').value = meetingTitle;
    
    // Remove the old list item
    listItem.remove();
}

function deleteBooking(listItem, room) {
    // Logic to delete the booking
    listItem.remove();
    restoreRoomCapacity(room);
}

function updateAvailableRooms(room) {
    const roomsList = document.getElementById('roomsList').children;
    for (let i = 0; i < roomsList.length; i++) {
        if (roomsList[i].getAttribute('data-room') === room) {
            let capacity = parseInt(roomsList[i].getAttribute('data-capacity'));
            capacity -= 1; // Decrease capacity by 1
            roomsList[i].setAttribute('data-capacity', capacity);
            roomsList[i].textContent = `${room} (Capacity: ${capacity})`;
            break;
        }
    }
}

function restoreRoomCapacity(room) {
    const roomsList = document.getElementById('roomsList').children;
    for (let i = 0; i < roomsList.length; i++) {
        if (roomsList[i].getAttribute('data-room') === room) {
            let capacity = parseInt(roomsList[i].getAttribute('data-capacity'));
            capacity += 1; // Increase capacity by 1
            roomsList[i].setAttribute('data-capacity', capacity);
            roomsList[i].textContent = `${room} (Capacity: ${capacity})`;
            break;
        }
    }
}
