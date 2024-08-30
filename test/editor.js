const stage = new Konva.Stage({
    container: 'editorContainer',
    width: window.innerWidth,
    height: window.innerHeight
});

const layer = new Konva.Layer();
stage.add(layer);

const pathLayer = new Konva.Layer();
stage.add(pathLayer);

let paths = [];
let isDrawing = false;

stage.on('mousedown', (e) => {
    if (e.target === stage) {
        isDrawing = true;
        const pos = stage.getPointerPosition();
        const path = new Konva.Line({
            stroke: 'black',
            strokeWidth: 5,
            lineCap: 'round',
            lineJoin: 'round',
            points: [pos.x, pos.y],
            draggable: true
        });
        pathLayer.add(path);
        paths.push(path);
    }
});

stage.on('mousemove', (e) => {
    if (isDrawing) {
        const pos = stage.getPointerPosition();
        const path = paths[paths.length - 1];
        path.points(path.points().concat([pos.x, pos.y]));
        pathLayer.batchDraw();
    }
});

stage.on('mouseup', () => {
    isDrawing = false;
});

// Save level
function saveLevel() {
    const data = paths.map(path => path.points());
    localStorage.setItem('level', JSON.stringify(data));
}

// Load level
function loadLevel() {
    const data = JSON.parse(localStorage.getItem('level'));
    data.forEach(points => {
        const path = new Konva.Line({
            stroke: 'black',
            strokeWidth: 5,
            lineCap: 'round',
            lineJoin: 'round',
            points: points,
            draggable: true
        });
        pathLayer.add(path);
    });
    pathLayer.batchDraw();
}
