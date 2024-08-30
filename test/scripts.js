let income = 0;
let budget = {};
let expenses = {};

function setIncome() {
    income = parseFloat(document.getElementById('income').value) || 0;
    document.getElementById('totalIncome').textContent = `Total Income: $${income}`;
    updateCharts();
}

function addBudgetItem() {
    const item = document.getElementById('item').value;
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    if (item && amount) {
        budget[item] = amount;
        document.getElementById('item').value = '';
        document.getElementById('amount').value = '';
        updateCharts();
    }
}

function addExpense() {
    const expenseItem = document.getElementById('expenseItem').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value) || 0;
    if (expenseItem && expenseAmount) {
        if (!expenses[expenseItem]) {
            expenses[expenseItem] = 0;
        }
        expenses[expenseItem] += expenseAmount;
        document.getElementById('expenseItem').value = '';
        document.getElementById('expenseAmount').value = '';
        updateCharts();
    }
}

function updateCharts() {
    const totalBudget = Object.values(budget).reduce((a, b) => a + b, 0);
    const totalSpent = Object.values(expenses).reduce((a, b) => a + b, 0);
    document.getElementById('totalBudget').textContent = `Total Budget: $${totalBudget}`;
    document.getElementById('totalSpent').textContent = `Total Spent: $${totalSpent}`;
    
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    const ctxBar = document.getElementById('barChart').getContext('2d');
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    
    // Pie Chart
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: Object.keys(budget),
            datasets: [{
                data: Object.values(budget),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff9999', '#66b3ff'],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Bar Chart
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: Object.keys(budget),
            datasets: [
                {
                    label: 'Budget',
                    data: Object.values(budget),
                    backgroundColor: '#36a2eb',
                    borderColor: '#fff',
                    borderWidth: 1
                },
                {
                    label: 'Spent',
                    data: Object.keys(budget).map(item => expenses[item] || 0),
                    backgroundColor: '#ff6384',
                    borderColor: '#fff',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        }
    });
    
    // Line Chart
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: Object.keys(expenses),
            datasets: [{
                label: 'Expenses Over Time',
                data: Object.values(expenses),
                borderColor: '#ff6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true
        }
    });
}
