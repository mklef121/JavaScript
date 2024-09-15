// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    // Dummy data for demonstration
    const tasks = [{date: '2023-05-01', time: '10:00', contact: 'John Doe', email: 'john@example.com', notes: 'Inspect property at 123 Real St.'}];
    const properties = [{image: 'https://via.placeholder.com/150', name: '123 Real St'}, /* more properties... */];

    // Task List
    const taskList = document.getElementById('taskList');
    const modal = document.getElementById('taskModal');
    const closeBtn = document.querySelector('.close');
    const taskDetails = document.getElementById('taskDetails');

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.date} - ${task.notes}`;
        li.classList.add('task-item');
        li.onclick = () => {
            taskDetails.innerHTML = `Date: ${task.date}<br>Time: ${task.time}<br>Contact: ${task.contact}<br>Email: ${task.email}<br>Notes: ${task.notes}`;
            modal.style.display = "block";
        };
        taskList.appendChild(li);
    });

    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

    // Charts
    new Chart(document.getElementById('propertyChart'), {
        type: 'bar',
        data: {
            labels: ['New Listings', 'In Contract', 'Sold'],
            datasets: [{
                label: 'Properties',
                data: [12, 19, 3],
                backgroundColor: ['#36a2eb', '#ff6384', '#ff9f40']
            }]
        },
        options: { responsive: true }
    });

    // Similar implementations for financeChart and marketTrends would go here

    // Property Search
    const searchInput = document.getElementById('searchInput');
    const priceRange = document.getElementById('priceRange');

    searchInput.oninput = priceRange.oninput = function() {
        // Implement search and filter logic here
        console.log('Searching for:', searchInput.value, 'Max Price:', priceRange.value);
    };

    // Populate property grid
    const propertyGrid = document.querySelector('.property-grid');
    properties.forEach(prop => {
        const div = document.createElement('div');
        div.innerHTML = `<img src="${prop.image}" alt="${prop.name}"><p>${prop.name}</p>`;
        propertyGrid.appendChild(div);
    });
});