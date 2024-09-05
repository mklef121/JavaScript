To create a colorful and interactive geography app as described, we'll integrate several APIs and functionalities into a single HTML file with embedded JavaScript and CSS. Here's a plan before we dive into coding:

**Plan:**

1. **Setup HTML Structure**
    - Container for interactive maps
    - Geo-Quiz section
    - Country Profiles section
    - Virtual Tours section
2. **Add CSS for Styling**
    - Apply vibrant colors and styles for each section
    - Ensure responsiveness and aesthetic appeal
3. **Include JavaScript Functionality**
    - Interactive Maps:
        - Use a mapping library like Leaflet.js
        - Implement zooming and different view modes (Streetview, Satellite)
    - Geo-Quiz:
        - Fetch quiz questions and options
        - Implement scoring and restart logic
    - Country Profiles:
        - Fetch and display country data using the restcountries API
        - Implement a searchable dropdown for country selection
    - Virtual Tours:
        - Fetch landmark images from Unsplash
        - Display and manage detailed information about landmarks

**Here's the code implementation:**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>World Geography Explorer</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" rel="stylesheet" />
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #e0f7fa;
        }

        header {
            background-color: #00796b;
            color: white;
            padding: 15px;
            text-align: center;
        }

        nav {
            margin: 20px 0;
        }

        nav button {
            background-color: #004d40;
            border: none;
            color: white;
            padding: 10px 20px;
            margin: 5px;
            cursor: pointer;
            border-radius: 5px;
        }

        nav button:hover {
            background-color: #00251a;
        }

        main {
            padding: 20px;
        }

        .view {
            display: none;
        }

        .active {
            display: block;
        }

        #map,
        #quiz,
        #profile,
        #tour,
        #challenge {
            padding: 20px;
            border-radius: 8px;
            background-color: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        #mapContainer {
            height: 500px;
            width: 100%;
        }

        #profileContent {
            min-height: 300px;
        }

        .map-controls {
            margin-bottom: 10px;
        }

        .map-controls button {
            background-color: #00796b;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
            margin-right: 5px;
        }

        .map-controls button:hover {
            background-color: #004d40;
        }

        .searchable-select {
            margin-bottom: 20px;
            width: 100%;
        }

        .searchable-select select {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        .country-info {
            margin-top: 20px;
        }

        .country-info img {
            max-width: 100px;
            border-radius: 5px;
            margin-bottom: 10px;
        }

        .virtual-tour-list {
            list-style-type: none;
            padding: 0;
        }

        .virtual-tour-item {
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-bottom: 20px;
            overflow: hidden;
            display: flex;
            background-color: #ffffff;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
            cursor: pointer;
        }

        .virtual-tour-item img {
            width: 200px;
            height: 120px;
            object-fit: cover;
        }

        .virtual-tour-item-content {
            padding: 15px;
            flex: 1;
        }

        .virtual-tour-item h3 {
            margin-top: 0;
            color: #00796b;
        }

        .virtual-tour-item p {
            margin: 0;
            color: #555;
        }

        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
            padding-top: 60px;
        }

        .modal-content {
            background-color: #fefefe;
            margin: 5% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 900px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            position: relative;
        }

        .modal-content img {
            width: 100%;
            border-radius: 8px;
        }

        .close-button {
            position: absolute;
            top: 10px;
            right: 25px;
            color: #000;
            font-size: 35px;
            font-weight: bold;
            cursor: pointer;
        }

        .close-button:hover,
        .close-button:focus {
            color: #f00;
            text-decoration: none;
            cursor: pointer;
        }

        .modal-content h3 {
            margin-top: 10px;
            color: #333;
        }

        .modal-content p {
            color: #666;
        }

        #quiz-container {
            margin: 50px auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
        }

        #question-container {
            margin-bottom: 20px;
        }

        #options-container {
            display: flex;
            flex-direction: column;
        }

        .option-button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px;
            margin: 5px 0;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }

        .option-button:hover {
            background-color: #45a049;
        }

        #result-container {
            text-align: center;
        }

        #retry-button {
            background-color: #007BFF;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }

        #retry-button:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <header>
        <h1>World Geography Explorer</h1>
        <nav>
            <button onclick="showView('map')">Interactive Map</button>
            <button onclick="showView('quiz')">Geo-Quiz</button>
            <button onclick="showView('profile')">Country Profiles</button>
            <button onclick="showView('tour')">Virtual Tours</button>
        </nav>
    </header>

    <main>
        <section id="map" class="view">
            <div class="map-controls">
                <button onclick="setMapView('street')">Street View</button>
                <button onclick="setMapView('satellite')">Satellite View</button>
            </div>
            <div id="mapContainer"></div>
        </section>
        <section id="quiz" class="view">
            <div id="quizContent"></div>
            <main>
                <section id="geo-quiz">
                    <div id="quiz-container">
                        <h1>Geo Quiz</h1>
                        <div id="question-container">
                            <p id="question-text"></p>
                            <div id="options-container"></div>
                        </div>
                        <div id="result-container" style="display: none;">
                            <h2>Your Final Score: <span id="final-score"></span></h2>
                            <button id="retry-button">Retry</button>
                        </div>
                    </div>
                </section>
            </main>
        </section>
        <section id="profile" class="view">
            <div class="searchable-select">
                <select id="countrySelect" style="width: 100%;">
                    <option value="">Select a country...</option>
                </select>
            </div>
            <div id="profileContent" class="country-info"></div>
        </section>
        <section id="tour" class="view">
            <h2>Notable Monuments</h2>
            <ul class="virtual-tour-list">
                <li class="virtual-tour-item" data-modal="modal-eiffel">
                    <img src="https://images.unsplash.com/photo-1564557819856-21e62e235c6b" alt="Eiffel Tower">
                    <div class="virtual-tour-item-content">
                        <h3>Eiffel Tower</h3>
                        <p>The Eiffel Tower, a wrought-iron lattice tower on the Champ de Mars in Paris, France, was
                            constructed between 1887 and 1889.</p>
                    </div>
                </li>
                <li class="virtual-tour-item" data-modal="modal-great-wall">
                    <img src="https://images.unsplash.com/photo-1590050371954-f8c5beb14b1e" alt="Great Wall of China">
                    <div class="virtual-tour-item-content">
                        <h3>Great Wall of China</h3>
                        <p>The Great Wall of China is a series of fortifications made of various materials that stretch
                            across northern China.</p>
                    </div>
                </li>
                <li class="virtual-tour-item" data-modal="modal-statue-liberty">
                    <img src="https://images.unsplash.com/photo-1473167052083-3d31fa1f6776" alt="Statue of Liberty">
                    <div class="virtual-tour-item-content">
                        <h3>Statue of Liberty</h3>
                        <p>The Statue of Liberty, a colossal neoclassical sculpture on Liberty Island in New York
                            Harbor, was a gift from France to the United States.</p>
                    </div>
                </li>
                <li class="virtual-tour-item" data-modal="modal-taj-mahal">
                    <img src="https://images.unsplash.com/photo-1587135941948-670b381f08ce" alt="Taj Mahal">
                    <div class="virtual-tour-item-content">
                        <h3>Taj Mahal</h3>
                        <p>The Taj Mahal is an Islamic ivory-white marble mausoleum on the right bank of the river
                            Yamuna in Agra, India.</p>
                    </div>
                </li>
                <li class="virtual-tour-item" data-modal="modal-colosseum">
                    <img src="https://images.unsplash.com/photo-1668164787690-dd7d728b43fd" alt="Colosseum">
                    <div class="virtual-tour-item-content">
                        <h3>Colosseum</h3>
                        <p>The Colosseum, also known as the Flavian Amphitheatre, is an ancient amphitheater located in
                            the center of Rome, Italy.</p>
                    </div>
                </li>
                <li class="virtual-tour-item" data-modal="modal-angkor-wat">
                    <img src="https://plus.unsplash.com/premium_photo-1661924223647-40abbac077c0" alt="Angkor Wat">
                    <div class="virtual-tour-item-content">
                        <h3>Angkor Wat</h3>
                        <p>Angkor Wat is a temple complex in Cambodia and the largest religious monument in the world.
                        </p>
                    </div>
                </li>
                <li class="virtual-tour-item" data-modal="modal-petra">
                    <img src="https://images.unsplash.com/photo-1712323028707-6e59c3d2271a" alt="Petra">
                    <div class="virtual-tour-item-content">
                        <h3>Petra</h3>
                        <p>Petra is a historical and archaeological city in southern Jordan, famous for its rock-cut
                            architecture.</p>
                    </div>
                </li>
                <li class="virtual-tour-item" data-modal="modal-machu-picchu">
                    <img src="https://images.unsplash.com/photo-1719016849700-8179f2c9f96d" alt="Machu Picchu">
                    <div class="virtual-tour-item-content">
                        <h3>Machu Picchu</h3>
                        <p>Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern
                            Peru on a 2,430-meter (7,970 ft) mountain ridge.</p>
                    </div>
                </li>
                <li class="virtual-tour-item" data-modal="modal-christ-redeemer">
                    <img src="https://images.unsplash.com/photo-1698861318156-9f08765535da" alt="Christ the Redeemer">
                    <div class="virtual-tour-item-content">
                        <h3>Christ the Redeemer</h3>
                        <p>Christ the Redeemer is an iconic statue of Jesus Christ in Rio de Janeiro, Brazil, completed
                            in 1931.</p>
                    </div>
                </li>
            </ul>
        </section>
    </main>

    <!-- Modals -->
    <div id="modal-eiffel" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="https://images.unsplash.com/photo-1564557819856-21e62e235c6b" alt="Eiffel Tower">
            <h3>Eiffel Tower</h3>
            <p>The Eiffel Tower, a wrought-iron lattice tower on the Champ de Mars in Paris, France, was constructed
                between 1887 and 1889. Named after the engineer Gustave Eiffel, whose company designed and built the
                structure, it has become a global cultural icon of France and one of the most recognizable structures in
                the world. Standing at 324 meters tall, it was the tallest man-made structure in the world until the
                completion of the Chrysler Building in New York in 1930. The tower is visited by millions of tourists
                every year and offers stunning views of Paris.</p>
        </div>
    </div>

    <div id="modal-great-wall" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="https://images.unsplash.com/photo-1590050371954-f8c5beb14b1e" alt="Great Wall of China">
            <h3>Great Wall of China</h3>
            <p>The Great Wall of China is a series of fortifications made of various materials that stretch across
                northern China. It was built to protect Chinese states and empires from invasions and raids by nomadic
                groups. The wall is not a single continuous wall but rather a collection of walls and fortifications. It
                is one of the most impressive architectural feats in history, stretching over 13,000 miles and spanning
                diverse terrains such as mountains, deserts, and plains.</p>
        </div>
    </div>

    <div id="modal-statue-liberty" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="https://images.unsplash.com/photo-1473167052083-3d31fa1f6776" alt="Statue of Liberty">
            <h3>Statue of Liberty</h3>
            <p>The Statue of Liberty, a colossal neoclassical sculpture on Liberty Island in New York Harbor, was a gift
                from France to the United States. Designed by French sculptor Frédéric Auguste Bartholdi and built by
                Gustave Eiffel, it was dedicated on October 28, 1886. The statue represents a universal symbol of
                freedom and democracy. Standing 305 feet tall, it has become one of the most recognizable landmarks in
                the world and a symbol of hope and opportunity for immigrants arriving in the U.S.</p>
        </div>
    </div>

    <div id="modal-taj-mahal" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="https://images.unsplash.com/photo-1587135941948-670b381f08ce" alt="Taj Mahal">
            <h3>Taj Mahal</h3>
            <p>The Taj Mahal is an Islamic ivory-white marble mausoleum on the right bank of the river Yamuna in Agra,
                India. It was commissioned by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal, who died
                during childbirth. Completed in 1653, the Taj Mahal is widely recognized as the jewel of Muslim art in
                India and one of the universally admired masterpieces of the world's heritage. The complex includes a
                mosque and a guest house, and is set in a vast Mughal garden.</p>
        </div>
    </div>

    <div id="modal-colosseum" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="https://images.unsplash.com/photo-1668164787690-dd7d728b43fd" alt="Colosseum">
            <h3>Colosseum</h3>
            <p>The Colosseum, also known as the Flavian Amphitheatre, is an ancient amphitheater located in the center
                of Rome, Italy. Constructed between 70-80 AD under the emperors Vespasian and Titus, it was used for
                gladiatorial contests, public spectacles, and mock sea battles. With a capacity of up to 80,000
                spectators, the Colosseum is one of the greatest works of Roman engineering and architecture, and
                remains an iconic symbol of Ancient Rome.</p>
        </div>
    </div>

    <div id="modal-angkor-wat" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="https://plus.unsplash.com/premium_photo-1661924223647-40abbac077c0" alt="Angkor Wat">
            <h3>Angkor Wat</h3>
            <p>Angkor Wat is a temple complex in Cambodia and the largest religious monument in the world. Originally
                constructed as a Hindu temple dedicated to the god Vishnu, it was gradually transformed into a Buddhist
                temple. Built in the early 12th century by King Suryavarman II, Angkor Wat is renowned for its grandeur,
                detailed bas-reliefs, and impressive scale, covering over 162 hectares. It is a symbol of Cambodia and a
                significant cultural and historical landmark.</p>
        </div>
    </div>

    <div id="modal-petra" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="https://images.unsplash.com/photo-1712323028707-6e59c3d2271a" alt="Petra">
            <h3>Petra</h3>
            <p>Petra is a historical and archaeological city in southern Jordan, famous for its rock-cut architecture
                and water conduit system. Established as the capital of the Nabataean Kingdom in the 4th century BC,
                Petra thrived as a major trade center for centuries. Its most famous structure, the Treasury, is carved
                into a sandstone cliff and is a testament to the skill of its builders. Petra was rediscovered by
                Western explorers in 1812 and is now one of the New Seven Wonders of the World.</p>
        </div>
    </div>

    <div id="modal-machu-picchu" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="https://images.unsplash.com/photo-1719016849700-8179f2c9f96d" alt="Machu Picchu">
            <h3>Machu Picchu</h3>
            <p>Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru on a
                2,430-meter (7,970 ft) mountain ridge. Built by Inca Emperor Pachacuti, it was later abandoned during
                the Spanish conquest. The site consists of over 200 buildings and is renowned for its sophisticated
                dry-stone construction, panoramic views, and terraced fields. Machu Picchu was brought to international
                attention by American historian Hiram Bingham in 1911 and is now one of the most popular tourist
                destinations in South America.</p>
        </div>
    </div>

    <div id="modal-christ-redeemer" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="https://images.unsplash.com/photo-1698861318156-9f08765535da" alt="Christ the Redeemer">
            <h3>Christ the Redeemer</h3>
            <p>Christ the Redeemer is an iconic statue of Jesus Christ in Rio de Janeiro, Brazil. Completed in 1931, the
                30-meter tall statue stands atop the Corcovado Mountain and overlooks the city. Designed by Brazilian
                engineer Heitor da Silva Costa and sculpted by French artist Paul Landowski, the statue is a symbol of
                Christianity and a prominent landmark in Brazil. Its panoramic views of the city and the surrounding
                landscape make it one of the most visited and recognized monuments in the world.</p>
        </div>
    </div>

    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Include Leaflet -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <!-- Include Select2 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
    <script>
        let map;
        let mapLayer;
        let countriesData = [];

        function showView(viewId) {
            const views = document.querySelectorAll('.view');
            views.forEach(view => {
                view.classList.remove('active');
            });
            document.getElementById(viewId).classList.add('active');
        }

        function init() {
            showView('map'); // Default to showing the map
            initMap();
            initQuiz();
            initProfiles();
            initTour();
            initQuiz();  // Start the quiz on page load
        }

        function initMap() {
            const mapContainer = document.getElementById('mapContainer');
            map = L.map(mapContainer).setView([37.7749, -122.4194], 13); // Default to San Francisco

            // Set the default layer to OpenStreetMap
            mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Add zoom control
            L.control.zoom({ position: 'topright' }).addTo(map);

            // Add scale control
            L.control.scale().addTo(map);
        }

        function setMapView(viewType) {
            if (viewType === 'satellite') {
                mapLayer.remove(); // Remove current layer
                mapLayer = L.tileLayer('https://{s}.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=YOUR_MAPBOX_ACCESS_TOKEN', {
                    attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
                }).addTo(map);
            } else {
                mapLayer.remove(); // Remove current layer
                mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
            }
        }

        function initProfiles() {
            const profileContent = document.getElementById('profileContent');
            const countrySelect = document.getElementById('countrySelect');

            // Fetch country data
            fetch('https://restcountries.com/v3.1/all')
                .then(response => response.json())
                .then(data => {
                    countriesData = data;
                    populateCountrySelect(countriesData);
                })
                .catch(error => {
                    console.error('Error fetching country data:', error);
                });
        }

        function populateCountrySelect(countries) {
            const countrySelect = $('#countrySelect');
            countrySelect.empty(); // Clear existing options
            countrySelect.append('<option value="">Select a country...</option>'); // Add placeholder option

            countries.forEach(country => {
                const option = $('<option></option>').val(country.cca3).text(country.name.common);
                countrySelect.append(option);
            });

            // Initialize Select2 on the select element
            countrySelect.select2({
                placeholder: 'Select a country...',
                width: 'resolve'
            });

            // Event handler for country selection change
            countrySelect.on('change', showCountryInfo);
        }

        function showCountryInfo() {
            const countryCode = $('#countrySelect').val();
            const profileContent = document.getElementById('profileContent');

            if (countryCode) {
                const country = countriesData.find(c => c.cca3 === countryCode);
                if (country) {
                    profileContent.innerHTML = `
                        <h2>${country.name.common}</h2>
                        <img src="${country.flags.png}" alt="${country.name.common} flag">
                        <p><strong>Capital:</strong> ${country.capital ? country.capital.join(', ') : 'N/A'}</p>
                        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Subregion:</strong> ${country.subregion}</p>
                        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                        <p><strong>Currency:</strong> ${Object.values(country.currencies).map(c => c.name).join(', ')}</p>
                    `;
                }
            } else {
                profileContent.innerHTML = '<p>Select a country to see details.</p>';
            }
        }

        function initTour() {
            document.querySelectorAll('.virtual-tour-item').forEach(item => {
                item.addEventListener('click', () => {
                    const modalId = item.getAttribute('data-modal');
                    document.getElementById(modalId).style.display = 'block';
                });
            });

            document.querySelectorAll('.close-button').forEach(button => {
                button.addEventListener('click', () => {
                    button.closest('.modal').style.display = 'none';
                });
            });

            window.addEventListener('click', event => {
                if (event.target.classList.contains('modal')) {
                    event.target.style.display = 'none';
                }
            });
        }

        const questions = [
            { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
            { question: "Which country is the largest by land area?", options: ["China", "United States", "Canada", "Russia"], answer: "Russia" },
            { question: "What is the smallest country in the world?", options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], answer: "Vatican City" },
            { question: "Which river is the longest?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], answer: "Nile" },
            { question: "Which mountain is the highest?", options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"], answer: "Mount Everest" },
            { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: "Canberra" },
            { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
            { question: "Which desert is the largest?", options: ["Sahara", "Gobi", "Kalahari", "Antarctic"], answer: "Antarctic" },
            { question: "Which country has the longest coastline?", options: ["United States", "Canada", "Australia", "Russia"], answer: "Canada" },
            { question: "What is the largest island in the world?", options: ["Greenland", "New Guinea", "Borneo", "Madagascar"], answer: "Greenland" },
            { question: "Which country is known as the Land of the Rising Sun?", options: ["Japan", "China", "South Korea", "Thailand"], answer: "Japan" },
            { question: "What is the largest city in Africa by population?", options: ["Lagos", "Cairo", "Johannesburg", "Nairobi"], answer: "Lagos" },
            { question: "Which European country is known for its fjords?", options: ["Sweden", "Norway", "Finland", "Denmark"], answer: "Norway" },
            { question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: "Ottawa" },
            { question: "Which is the most populous city in the world?", options: ["Tokyo", "Shanghai", "Delhi", "New York"], answer: "Tokyo" },
            { question: "Which country is known for the Great Wall?", options: ["Japan", "South Korea", "China", "Vietnam"], answer: "China" },
            { question: "What is the largest lake in Africa?", options: ["Lake Victoria", "Lake Tanganyika", "Lake Malawi", "Lake Albert"], answer: "Lake Victoria" },
            { question: "Which continent is known as the Dark Continent?", options: ["Asia", "Australia", "Africa", "South America"], answer: "Africa" },
            { question: "What is the longest river in South America?", options: ["Amazon", "Orinoco", "Parana", "São Francisco"], answer: "Amazon" },
            { question: "Which city is known as the City of Canals?", options: ["Amsterdam", "Venice", "Bruges", "Stockholm"], answer: "Venice" },
            { question: "Which country has the most volcanoes?", options: ["Indonesia", "Japan", "Iceland", "Philippines"], answer: "Indonesia" }
        ];

        let score = 0;
        let currentQuestionIndex = 0;

        function initQuiz() {
            document.getElementById('retry-button').onclick = initQuiz;

            score = 0;
            currentQuestionIndex = 0;
            document.getElementById('result-container').style.display = 'none';
            document.getElementById('question-container').style.display = 'block';

            loadQuestion();
        }

        function loadQuestion() {
            if (currentQuestionIndex >= questions.length) {
                showFinalResult();
                return;
            }

            let question
            // when it's the first question, shuffle the array so it's random
            if (currentQuestionIndex == 0) {
                question = shuffleArray(questions)[currentQuestionIndex];

            } else {
                question = questions[currentQuestionIndex];

            }

            document.getElementById('question-text').innerText = question.question;
            const optionsContainer = document.getElementById('options-container');
            optionsContainer.innerHTML = '';

            question.options.forEach(option => {
                const button = document.createElement('button');
                button.innerText = option;
                button.className = 'option-button';
                button.onclick = () => checkAnswer(option);
                optionsContainer.appendChild(button);
            });

        }

        function checkAnswer(selectedOption) {
            const correctAnswer = questions[currentQuestionIndex].answer;
            if (selectedOption === correctAnswer) {
                score += 2;
                currentQuestionIndex++;
                loadQuestion();
            } else {
                showFinalResult();
            }
        }

        function showFinalResult() {
            document.getElementById('question-container').style.display = 'none';
            document.getElementById('result-container').style.display = 'block';
            document.getElementById('final-score').innerText = score;
        }



        function shuffleArray(array) {
            let len = array.length,
                currentIndex;
            for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
                let randIndex = Math.floor(Math.random() * (currentIndex + 1));
                var temp = array[currentIndex];
                array[currentIndex] = array[randIndex];
                array[randIndex] = temp;
            }

            return array
        }

        $(document).ready(init);
    </script>
</body>

</html>
```

**Explanation:**

1. **HTML Structure:**
    - The header contains the title and navigation links.
    - The container div holds four main sections: Interactive Maps, Geo-Quiz, Country Profiles, and Virtual Tours.
2. **CSS Styling:**
    - Sets a light background color and uses vibrant green for the header.
    - Adds styling for different sections, including shadows and rounded corners.
    - Styles the modal for virtual tours to center it on the screen.
3. **JavaScript Functionality:**
    - Maps Integration: Placeholder for map integration (Mapbox and Open Streetmap).
    - Geo-Quiz: Displays random questions, evaluates answers, and tracks scores.
    - Country Profiles: Fetches country data from the RestCountries API and populates the dropdown and country details.
    - Virtual Tours: Displays landmark images from Unsplash and shows detailed descriptions in a modal popup.

The code provided is designed to be colorful and interactive, allowing users to explore world geography through various engaging features.