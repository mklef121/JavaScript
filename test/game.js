// Setup PIXI.js
const app = new PIXI.Application({
    view: document.getElementById('gameCanvas'),
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xaaaaaa
});

// Load resources
app.loader
    .add('tower', 'path/to/tower-image.png')
    .add('enemy', 'path/to/enemy-image.png')
    .load(setup);

let towers = [];
let enemies = [];
let towerId = 0;

function setup() {
    // Create a tower
    const tower = new PIXI.Sprite(app.loader.resources['tower'].texture);
    tower.x = app.screen.width / 2;
    tower.y = app.screen.height / 2;
    tower.anchor.set(0.5);
    tower.interactive = true;
    tower.buttonMode = true;
    tower.on('pointerdown', () => addTower(towerId++));
    app.stage.addChild(tower);
}

function addTower(id) {
    const tower = new PIXI.Sprite(app.loader.resources['tower'].texture);
    tower.x = Math.random() * app.screen.width;
    tower.y = Math.random() * app.screen.height;
    tower.anchor.set(0.5);
    tower.id = id;
    app.stage.addChild(tower);
    towers.push(tower);
}

function spawnEnemy() {
    const enemy = new PIXI.Sprite(app.loader.resources['enemy'].texture);
    enemy.x = Math.random() * app.screen.width;
    enemy.y = -enemy.height;
    enemy.vx = Math.random() * 2 - 1;
    enemy.vy = Math.random() * 2 + 1;
    app.stage.addChild(enemy);
    enemies.push(enemy);
}

// Game loop
app.ticker.add((delta) => {
    for (const enemy of enemies) {
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;

        if (enemy.y > app.screen.height) {
            app.stage.removeChild(enemy);
            enemies = enemies.filter(e => e !== enemy);
        }
    }
    
    // Collision detection between towers and enemies
    for (const tower of towers) {
        for (const enemy of enemies) {
            if (tower.getBounds().intersects(enemy.getBounds())) {
                app.stage.removeChild(enemy);
                enemies = enemies.filter(e => e !== enemy);
                break;
            }
        }
    }
});

// Spawn enemies every 2 seconds
setInterval(spawnEnemy, 2000);
