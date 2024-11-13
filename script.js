let centerContent = '';  // Stores the content of the center cell
let currentTransform = 'none';  // Current transformation selected
let size = 1;  // Grid size multiplier, 1 for 3x3, 2 for 9x9

// Function to handle image upload for the center cell
function uploadImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const centerCell = document.getElementById('centerCell');
        centerContent = `url(${e.target.result})`;  // Set the center content as background image URL
        centerCell.style.backgroundImage = centerContent;
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

// Function to set grid size
function setSize(value) {
    size = parseInt(value);
    generateGrid();
}

// Function to copy center cell content to the clicked cell with transformation
function copyCenterToCell(cellIndex) {
    if (cellIndex === 4 && size === 1) return; // Prevent copying to center cell if size is 1 (3x3)

    const targetCell = document.getElementsByClassName('cell')[cellIndex];
    targetCell.style.backgroundImage = centerContent;
    targetCell.style.transform = currentTransform;
}

// Function to update the transform based on the dropdown or key press
function setTransform(value) {
    currentTransform = value;
    document.getElementById("transformSelect").value = value; // Update dropdown display
}

// Function to listen for key presses to change transform
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case '1':
            setTransform('none');
            break;
        case '2':
            setTransform('rotate(90deg)');
            break;
        case '3':
            setTransform('rotate(180deg)');
            break;
        case '4':
            setTransform('rotate(270deg)');
            break;
        case '5':
            setTransform('scale(-1, 1)');
            break;
        case '6':
            setTransform('scale(1, -1)');
            break;
    }
});

// Function to generate the grid based on the size setting
function generateGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear existing grid
    
    const gridSize = size * 3; // Calculate the total rows/columns for the grid
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    grid.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;

    // Create cells dynamically based on the grid size
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.onclick = () => copyCenterToCell(row * gridSize + col);

            // Set the center cell with special ID when size is 1 (3x3 grid)
            if (size === 1 && row === 1 && col === 1) {
                cell.id = 'centerCell';
                cell.onclick = drawInCenter;
            }
            
            grid.appendChild(cell);
        }
    }
}

// Initial grid generation
generateGrid();

// Function to "draw" (upload image) in the center cell
function drawInCenter() {
    const centerCell = document.getElementById('centerCell');
    if (!centerCell.style.backgroundImage) {
        centerCell.style.backgroundImage = centerContent;
    }
}
