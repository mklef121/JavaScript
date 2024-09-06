Here's a design plan for a visually appealing webpage summarizing Nigeria's education statistics based on the 2021 UNESCO report data provided:

### Design Plan:
1. **Header**: A clean header with the title "Nigeria's Education Sector Overview".
2. **Introduction**: Brief text introducing the importance of education statistics in Nigeria.
3. **Graphical Sections**:
   - **Early Childhood Education**: Pie chart or doughnut chart showing attendance rates.
   - **Primary Education**: Bar chart for enrollment by gender and a line graph for GAR and NAR over years.
   - **Junior Secondary**: Stacked bar chart showing urban vs. rural enrollment and private vs. public schools.
   - **Senior Secondary**: Comparative bar chart for attendance rates by gender and location (urban/rural).
4. **Interactive Elements**: Use tooltips or modals to provide more detailed statistics or explanations when users hover or click on data points.
5. **Color Scheme**: Use a harmonious palette, perhaps inspired by Nigerian cultural colors, ensuring good contrast for readability.
6. **Summary Text**: Each graphic will be accompanied by a summary paragraph explaining key insights.

### HTML/CSS/JS Code:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nigeria's Education Sector Analysis</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        header {
            background-color: #4CAF50;
            color: white;
            padding: 1rem;
            text-align: center;
        }

        .container {
            padding: 2rem;
            max-width: 1200px;
            margin: auto;
        }

        .section {
            margin-bottom: 2rem;
        }

        .section h2 {
            color: #4CAF50;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 0.5rem;
        }

        .section p,
        .section ul {
            font-size: 1rem;
            line-height: 1.5;
        }

        .section ul {
            list-style-type: disc;
            margin-left: 2rem;
        }

        canvas {
            max-width: 100%;
            height: auto;
        }

        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 1rem;
            position: fixed;
            bottom: 0;
            width: 100%;
        }

        .data-source {
            text-align: center;
            font-style: italic;
            margin-top: 1rem;
        }

        header p {
            text-align: center;
        }

        .canvas-container {
            position: relative;
            width: 100%;
            max-width: 850px;
            margin: auto;
        }
    </style>
</head>

<body>
    <header>
        <h1>Nigeria's Education Sector Analysis</h1>
        <p>Data Source: UNESCO Nigeria Education Sector Analysis Report (2021)</p>
    </header>
    <div class="container">
        <!-- Education System Breakdown -->
        <div class="section">
            <h2>Education System Breakdown</h2>
            <div class="educationSystemParent canvas-container">
                <canvas id="educationSystemChart"></canvas>
            </div>

            <p>This diagram illustrates the different levels of education in Nigeria:</p>
            <ul>
                <li><strong>Pre-primary:</strong> Comprising kindergarten and three levels of nursery with over 7
                    million children enrolled in 2018.</li>
                <li><strong>Primary:</strong> Hosting more than 28 million learners, with about 50% girls and notable
                    regional gender disparities.</li>
                <li><strong>Junior Secondary:</strong> Enrolling 6.65 million students, with about 80% of eligible
                    children attending.</li>
                <li><strong>Senior Secondary:</strong> Two-thirds of eligible children attending, with a gross
                    attendance rate of 66%.</li>
                <li><strong>Technical & Vocational:</strong> Plays a crucial role in
                    skill development.</li>
                <li><strong>Basic & Literacy Education:</strong> Focuses on adult literacy and basic skills, essential
                    for lifelong learning.</li>
            </ul>
            <p class="data-source">Data Source: UNESCO Nigeria Education Sector Analysis Report (2021)</p>
        </div>

        <!-- Enrollment Distribution -->
        <div class="section">
            <h2>Enrollment Distribution by Education Level</h2>
            <div class="enrollmentDistributionParent canvas-container">
                <canvas id="enrollmentDistributionChart"></canvas>
            </div>
            <p>This pie chart shows the distribution of students across different education levels in Nigeria:</p>
            <ul>
                <li><strong>Pre-primary:</strong> 7 million (approx. 15% of total enrollment).</li>
                <li><strong>Primary:</strong> 28 million (approx. 60% of total enrollment).</li>
                <li><strong>Junior Secondary:</strong> 6.65 million (approx. 15% of total enrollment).</li>
                <li><strong>Senior Secondary:</strong> 4 million (approx. 10% of total enrollment).</li>
            </ul>
        </div>

        <!-- Gender Parity in Primary Education -->
        <div class="section">
            <h2>Gender Parity in Primary Education</h2>
            <div class="genderParityParent canvas-container">
                <canvas id="genderParityChart"></canvas>
            </div>
            <p>This bar chart shows gender parity in Primary Education:</p>
            <ul>
                <li><strong>Male Students:</strong> 14.7 million.</li>
                <li><strong>Female Students:</strong> 13.9 million.</li>
                <li><strong>Gender Parity Index (GPI):</strong> 0.94, indicating near gender parity with a slight
                    discrepancy.</li>
                <li><strong>Regional Disparities:</strong> Significant gender disparities in the North West region.</li>
            </ul>
        </div>

        <!-- Junior and Senior Secondary Enrollment Rates -->
        <div class="section">
            <h2>Junior and Senior Secondary Enrollment Rates</h2>
            <div class="secondaryEnrollmentParent canvas-container">
                <canvas id="secondaryEnrollmentChart"></canvas>
            </div>
            <p>This bar chart compares gross and net attendance rates:</p>
            <ul>
                <li><strong>Junior Secondary Gross Attendance Rate:</strong> 80%.</li>
                <li><strong>Junior Secondary Net Attendance Rate:</strong> 60%.</li>
                <li><strong>Senior Secondary Gross Attendance Rate:</strong> 66%.</li>
                <li><strong>Senior Secondary Net Attendance Rate:</strong> 67%.</li>
                <li><strong>Disparities:</strong> Urban boys have higher attendance rates compared to rural girls,
                    highlighting challenges in rural education access.</li>
            </ul>
        </div>
    </div>

    <!-- Chart.js Library -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // Education System Breakdown Chart
        const ctxEduSys = document.getElementById('educationSystemChart').getContext('2d');
        new Chart(ctxEduSys, {
            type: 'bar',
            data: {
                labels: ['Pre-primary', 'Primary', 'Junior Secondary', 'Senior Secondary', 'Technical & Vocational', 'Tertiary & Higher Education', 'Basic & Literacy Education'],
                datasets: [{
                    label: 'Education System Breakdown (in millions)',
                    data: [7, 28, 6.65, 4, 2, 2, 1],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw + ' million';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Number of Students (millions)'
                        },

                        beginAtZero: true,
                        responsive: false,
                        maintainAspectRatio: true

                    },
                }
            }
        });

        // Enrollment Distribution by Education Level
        const ctxEnrollDist = document.getElementById('enrollmentDistributionChart').getContext('2d');
        new Chart(ctxEnrollDist, {
            type: 'pie',
            data: {
                labels: ['Pre-primary', 'Primary', 'Junior Secondary', 'Senior Secondary'],
                datasets: [{
                    label: 'Enrollment Distribution',
                    data: [7, 28, 6.65, 4],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw + ' million';
                            }
                        }
                    }
                }
            }
        });

        // Gender Parity in Primary Education
        const ctxGenderParity = document.getElementById('genderParityChart').getContext('2d');
        new Chart(ctxGenderParity, {
            type: 'polarArea',
            data: {
                labels: ['Male', 'Female'],
                datasets: [{
                    label: 'Number of Students (millions)',
                    data: [14.7, 13.9],
                    backgroundColor: ['#1a4a8a', '#ef9db3'],
                    
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw + ' million';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    }
                }
            }
        });

        // Junior and Senior Secondary Enrollment Rates
        const ctxSecEnroll = document.getElementById('secondaryEnrollmentChart').getContext('2d');
        new Chart(ctxSecEnroll, {
            type: 'bar',
            data: {
                labels: ['Junior Secondary', 'Senior Secondary'],
                datasets: [
                    {
                        label: 'Gross Attendance Rate (%)',
                        data: [80, 66],
                        backgroundColor: '#FFCE56',
                        borderColor: '#FFCE56',
                        borderWidth: 1,
                    },
                    {
                        label: 'Net Attendance Rate (%)',
                        data: [60, 67],
                        backgroundColor: '#4BC0C0',
                        borderColor: '#4BC0C0',
                        borderWidth: 1,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Attendance Rate (%)'
                        }
                    }
                }
            }
        });
    </script>
</body>

</html>
```

### Explanation:

- **Charts**: Chart.js is used for creating interactive charts. Each section has a chart representing key statistics from the text.
- **CSS**: The design uses a clean, modern look with a green color theme reminiscent of Nigerian flag colors, promoting readability and visual appeal.
- **JS**: JavaScript is used to render the charts dynamically. The charts are populated with data extracted from the provided prompt.
- **Accessibility**: Ensure that tooltips or alternative text are used within the charts to make the information accessible.


This code will create a comprehensive and aesthetically pleasing page that visually represents the key statistics from the UNESCO report on Nigeria's education system.