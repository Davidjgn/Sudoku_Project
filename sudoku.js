
let loadDataInfo = null
let errors = 0;  // = counter variable

// generating 9 arrays which include 9 arrays inside, 9 * 9 matrix
let board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
//console.log(board);


// STEP2 MockData function called with JSON data (parameter coming from promise)
const MockData = (data) => {
    // debugger;
    loadDataInfo = JSON.parse(data);  // JSON data parsed and stored in loadDataInfo variable 
    createSudokuBoard(loadDataInfo);  // loadDataInfo passed to createSudokuBoard 

    btnGenerate();  // calling btnGenerate function (=generating validation button and calling click function)
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
function createSudokuBoard(data) {   // [{} {} {} {} {} {} {} {} {}] 
    // debugger;

    // console.log(data, board);   // data.length = 9 objects, each object looks like {val: '232234327'} 
    for (let i = 0; i < data.length; i++) {

        if (i == 0) {  // if data[i] = 0, meaning first object {val: '232234327'}
            //console.log(data[i].val.split('').map(Number))
            // dividing '232234327' into '2' '3' '2' '2' '3' '4' '3' '2' '7'
            // storing each string into an array, changing them from string to number =>[2, 3, 2, 2, 3, 4, 3, 2, 7]
            // then, assigning a variable to each number
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);


            // identifying each board address by converting its row1 and col1 to index 
            // then, assigning val1, val2, val3 to each board;
            board[row1 - 1][col1 - 1] = val1;  // board[0][0] → board[3-1][2-1] →board[2][1] = 2
            board[row2 - 1][col2 - 1] = val2;  // board[0][0] → board[3-1][2-1] →board[2][1] = 4
            board[row3 - 1][col3 - 1] = val3;  // board[0][0] → board[2-1][3-1] →board[1][2] = 7
        }
        else if (i == 1) {
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

    // Board 9x9
    for (let r = 0; r < 9; r++) {   // row loop 
        //debugger;
        for (let c = 0; c < 9; c++) {  //column loop
            let tile = document.createElement("input");
            tile.type = "text";
            tile.id = r.toString() + "-" + c.toString();  // assign each box row&column id  0-0
            if (board[r][c] != "0") { //skipping all the 0 values in the board array
                tile.value = board[r][c]; //assigning board array values to each tile
                tile.setAttribute("disabled", true); //disabling tiles with a starting value
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");  // add horizontal line 
            }
            if (c == 2 || c == 5) {  // add vertical line 
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("change", validInput); //event listener for user inputs
            tile.classList.add("tile");

            document.getElementById("board").append(tile);
        }
    }
}

const validInput = (event) => { //Verifying the user can only input a number between 1-9
    let flag = false;
    for (let i = 1; i < 10; i++) {
        if (event.target.value == i || event.target.value == '') {
            flag = true;
            if (event.target.value != '') {
                event.target.classList.remove("test");
                const [r, c] = event.target.id.split('-').map(Number); //getting the index numbers
                board[r][c] = Number(event.target.value); //using the index numbers to store the user input into the board array
            }
            break;
        }
    }
    if (flag == false) { //if the user writes an invalid input 
        alert("Please input only one digit from 1-9");
        event.target.value = '';
    }
}

function btnGenerate() {  // creating a validation button and calling validation function when clicked

    let btnValid = document.createElement("button");
    btnValid.innerText = "Validation";
    btnValid.type = "button";
    document.querySelector("body").append(btnValid);

    btnValid.addEventListener("click", () => {
        checkDuplicates();
    })
}

// STEP4 duplicated values checked
function checkDuplicates() {
    // debugger;
    // Check rows
    for (let i = 0; i < board.length; i++) {
        let rowMap = {}; //1. rowMap object is initialized for every row, it will store the numbers encountered in the current row as keys
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== 0) {
                console.log(rowMap);
                if (rowMap[board[i][j]]) { //3. if the value is true, it means it has already been assigned and therefore, is a duplicate.
                    document.getElementById(`${i}-${j}`).classList.add("rowred");
                    errors += 1
                    // debugger;
                    document.getElementById("errors").innerText = errors;
                    alert("Duplicate elements exist");
                    return true; // Duplicate found in row
                }
                rowMap[board[i][j]] = true; //2. every number in the row is assigned as a key, with a true value
            }
            else {
                alert("Please fill out the empty boxes");
                return false;
            }
        }
    }

    // Check columns
    for (let j = 0; j < board[0].length; j++) {
        let colMap = {};//1. colMap object initialized for every column
        for (let i = 0; i < board.length; i++) {
            if (board[i][j] !== 0) {
                if (colMap[board[i][j]]) {//3. if the value is true, it means it has already been assigned and therefore, is a duplicate.
                    document.getElementById(`${i}-${j}`).classList.add("rowred");
                    errors += 1
                    // debugger;
                    alert("Duplicate elements exist");
                    return true; // Duplicate found in column
                }
                colMap[board[i][j]] = true;//2. every number in the row is assigned as a key, with a true value
                document.getElementById("errors").innerText = errors;
            }
        }
    }

    // Check 3x3 subgrids
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            let subgridMap = {};//1. subgridMap object initialized for every subgrid
            for (let i = row; i < row + 3; i++) {//loops through sets of 3 rows
                for (let j = col; j < col + 3; j++) {//loops through sets of 3 columns
                    if (board[i][j] !== 0) {
                        if (subgridMap[board[i][j]]) {//3. if a true value is found, it means there is a duplicate number
                            document.getElementById(`${i}-${j}`).classList.add("rowred");
                            errors += 1
                            // debugger;
                            alert("Duplicate elements exist");
                            return true; // Duplicate found in subgrid
                        }
                        subgridMap[board[i][j]] = true;//2. every number in the subgrid is stored as a key with a true value
                        document.getElementById("errors").innerText = errors;
                    }
                }
            }
        }
    }
    alert("YOU WIN!!")
    return false; // No duplicates found
}
