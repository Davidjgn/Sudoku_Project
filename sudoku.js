
let loadDataInfo = null
let errors = 0;  // = counter variable

// generating 9 arrays which include 9 arrays inside, 9 * 9 matrix
let board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

// STEP2 MockData function called with JSON data (parameter coming from promise)
const MockData = (data) => {
    // debugger;
    loadDataInfo = JSON.parse(data);  // JSON data parsed and stored in loadDataInfo variable 
    createSudokuBoard(loadDataInfo);  // loadDataInfo passed to createSudokuBoard 

    btnGenerate(board);  // calling btnGenerate function (=generating validation button and calling click function)
}

const errorFun = (msg) => {
    alert(msg);
}

// STEP1 JSON data loaded
let loadPromise = new Promise((load, error) => {
    let httpReq = new XMLHttpRequest();
    httpReq.onload = () => {
        if (httpReq.status == 200)
            load(httpReq.response);
        else
            error(httpReq.statusText);
    }
    httpReq.open("GET", "./MOCK_DATA.json");
    httpReq.send();
}).then(MockData, errorFun);


// STEP3 9*9 board created
function createSudokuBoard(data) {
    // debugger;

    for (let i = 0; i < data.length; i++) {

        if (i == 0) {  // if data[i] = 0, meaning first object {val: '232234327'}
            // dividing '232234327' into '2' '3' '2' '2' '3' '4' '3' '2' '7'
            // storing each string into an array, changing them from string to number =>[2, 3, 2, 2, 3, 4, 3, 2, 7]
            // then, assigning a variable to each number
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);

            // identifying each board address by converting its row1 and col1 to index 
            // then, assigning val1, val2, val3 to each 3*3 square;
            board[row1 - 1][col1 - 1] = val1;  
            board[row2 - 1][col2 - 1] = val2;  
            board[row3 - 1][col3 - 1] = val3; 
        }
        else if (i == 1) {
            // '113214227' => [1, 1, 3, 2, 1, 4, 2, 2, 7]
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 - 1][col1 + 2] = val1; 
            board[row2 - 1][col2 + 2] = val2; 
            board[row3 - 1][col3 + 2] = val3; 
        }
        else if (i == 2) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 - 1][col1 + 5] = val1;
            board[row2 - 1][col2 + 5] = val2;
            board[row3 - 1][col3 + 5] = val3;
        }
        else if (i == 3) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 2][col1 - 1] = val1;
            board[row2 + 2][col2 - 1] = val2;
            board[row3 + 2][col3 - 1] = val3;
        }
        else if (i == 4) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 2][col1 + 2] = val1;
            board[row2 + 2][col2 + 2] = val2;
            board[row3 + 2][col3 + 2] = val3;
        }
        else if (i == 5) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 2][col1 + 5] = val1;
            board[row2 + 2][col2 + 5] = val2;
            board[row3 + 2][col3 + 5] = val3;
        }
        else if (i == 6) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 5][col1 - 1] = val1;
            board[row2 + 5][col2 - 1] = val2;
            board[row3 + 5][col3 - 1] = val3;
        }
        else if (i == 7) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 5][col1 + 2] = val1;
            board[row2 + 5][col2 + 2] = val2;
            board[row3 + 5][col3 + 2] = val3;
        }
        else if (i == 8) {
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 5][col1 + 5] = val1;
            board[row2 + 5][col2 + 5] = val2;
            board[row3 + 5][col3 + 5] = val3;
        }
    }

    // creating each tile for 9*9 matrix
    for (let r = 0; r < 9; r++) {   // row loop 
        //debugger;
        for (let c = 0; c < 9; c++) {  //column loop
            //let tile = document.createElement("div");
            let tile = document.createElement("input");
            tile.type = "text";
            tile.id = r.toString() + "-" + c.toString();  // assigning each box row&column id e.g.) 0-0
            if (board[r][c] != "0") {  // if the value is not 0, disable click event and change bgc
                tile.value = board[r][c];
                tile.setAttribute("disabled", true);
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {  // adding horizontal line every 3 tiles
                tile.classList.add("horizontal-line");  
            }
            if (c == 2 || c == 5) {  // adding vertical line every 3 tiles
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("change", validInput);  // calling input tag's change event
            tile.classList.add("tile");

            document.getElementById("board").append(tile);
        }
    }
}

const validInput = (event) => {
    let flag = false;
    for (let i = 1; i < 10; i++) {
        if (event.target.value == i || event.target.value == '') {
            flag = true;
            if (event.target.value != '') {
                event.target.classList.remove("empty");
                event.target.classList.remove("test");
                const [r, c] = event.target.id.split('-').map(Number);
                board[r][c] = Number(event.target.value);
            }
            break;
        }
    }
    if (flag == false) {
        alert("Please input only one digit from 1-9")
        event.target.value = '';
        event.target.classList.add("empty");
    }
}

function btnGenerate(board) {  // creating a validation button and calling validation function when clicked

    let btnValid = document.querySelector("button");
    btnValid.innerText = "Validate";
    btnValid.type = "button";

    btnValid.addEventListener("click", () => {
        checkDuplicates(board);
    })
}

// STEP4 duplicated values checked
function checkDuplicates(board) {
    // debugger;
    // Check rows
    for (let i = 0; i < board.length; i++) {
        let rowMap = {};
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== 0) {
                if (rowMap[board[i][j]]) {
                    document.getElementById(`${i}-${j}`).classList.add("rowred");
                    errors += 1
                    // debugger;
                    alert("Duplicate elements exist");
                    return true; // Duplicate found in row
                }
                rowMap[board[i][j]] = true;
                document.getElementById("errors").innerText = errors;
            }
            else {
                alert("Please fill out the empty boxes");
                return false;
            }
        }
    }

    // Check columns
    for (let j = 0; j < board[0].length; j++) {
        let colMap = {};
        for (let i = 0; i < board.length; i++) {
            if (board[i][j] !== 0) {
                if (colMap[board[i][j]]) {
                    document.getElementById(`${i}-${j}`).classList.add("rowred");
                    errors += 1
                    // debugger;
                    alert("Duplicate elements exist");
                    return true; // Duplicate found in column
                }
                colMap[board[i][j]] = true;
                document.getElementById("errors").innerText = errors;
            }
        }
    }

    // Check 3x3 subgrids
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            let subgridMap = {};
            for (let i = row; i < row + 3; i++) {
                for (let j = col; j < col + 3; j++) {
                    if (board[i][j] !== 0) {
                        if (subgridMap[board[i][j]]) {
                            document.getElementById(`${i}-${j}`).classList.add("rowred");
                            errors += 1
                            // debugger;
                            alert("Duplicate elements exist");
                            return true; // Duplicate found in subgrid
                        }
                        subgridMap[board[i][j]] = true;
                        document.getElementById("errors").innerText = errors;
                    }
                }
            }
        }
    }
    alert("YOU WIN!!")
    return false; // No duplicates found
}
