document.addEventListener('DOMContentLoaded', (event) => {
    let tasks = [];
    let teamMembers = [];

    function generateAvatar(name) {
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        const hue = Math.floor(Math.random() * 360);
        return `<div class="avatar" style="background-color: hsl(${hue}, 70%, 60%);">${initials}</div>`;
    }

    function addTeamMember() {
        const name = prompt("Enter team member name:");
        if (name) {
            teamMembers.push(name);
            updateAssigneeOptions();
            displayTeamMembers();
        }
    }

    function displayTeamMembers() {
        const list = document.getElementById('team-list');
        list.innerHTML = teamMembers.map(member => `<div>${member}</div>`).join('');
    }

    function updateAssigneeOptions() {
        const select = document.getElementById('assignee');
        select.innerHTML = teamMembers.map(member => `<option>${member}</option>`).join('');
    }

    function createTask(name, assignee) {
        const date = new Date().toLocaleDateString();
        const task = {name, assignee, date, status: 'todo'};
        tasks.push(task);
        renderTasks();
    }

    document.getElementById('taskForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const assignee = document.getElementById('assignee').value;
        createTask(taskName, assignee);
        this.reset();
    });

    function renderTasks() {
        ['todo', 'inProgress', 'done'].forEach(status => {
            const div = document.getElementById(status);
            div.innerHTML = tasks.filter(t => t.status === status).map(task => `
                <div class="task" draggable="true" ondragstart="drag(event)" data-id="${tasks.indexOf(task)}">
                    ${generateAvatar(task.assignee)} ${task.name} - ${task.date}
                </div>
            `).join('');
        });
        updateReport();
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.getAttribute('data-id'));
    }

    function drop(ev) {
        ev.preventDefault();
        const taskId = ev.dataTransfer.getData("text");
        const task = tasks[taskId];
        task.status = ev.target.closest('.column').querySelector('h3').textContent.toLowerCase();
        renderTasks();
    }

    function updateReport() {
        const ctx = document.getElementById('taskChart').getContext('2d');
        const counts = {todo: 0, inProgress: 0, done: 0};
        tasks.forEach(t => counts[t.status]++);
        
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Todo', 'In Progress', 'Done'],
                datasets: [{
                    data: [counts.todo, counts.inProgress, counts.done],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            }
        });
    }

    // Initial setup
    displayTeamMembers();
    updateAssigneeOptions();
});