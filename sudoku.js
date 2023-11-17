
let numSelected = null;
let tileSelected = null;
let loadDataInfo = null
var errors = 0;


let solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

const MockData = (data) => { // Funcion to load information from Json
    debugger;
    loadDataInfo = JSON.parse(data);
    setGame(loadDataInfo); // callback function to create digits number and set numbers.

}

const errorFun = (msg) => {
    alert(msg);
}
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


function setGame(loadDataInfo) {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    };

    // ------------------------ Remember 232234327 for 2 is column 3 is row and 2 is values, if have in 2 and 3 need be replace 4 like that example. --//
    
   debugger;
    createSudokuBoard(loadDataInfo);
}

function createSudokuBoard(data) {
    debugger;
    const board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));


    for(let i = 0; i < data.length; i++){
        if(i == 0){
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 - 1][col1 - 1] = val1;
            board[row2 - 1][col2 - 1] = val2;
            board[row3 - 1][col3 - 1] = val3;
        }
        else if(i == 1){
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 - 1][col1 + 2] = val1;
            board[row2 - 1][col2 + 2] = val2;
            board[row3 - 1][col3 + 2] = val3;
        }
        else if(i == 2){
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 - 1][col1 + 5] = val1;
            board[row2 - 1][col2 + 5] = val2;
            board[row3 - 1][col3 + 5] = val3;
        }
        else if(i == 3){
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 2][col1 - 1] = val1;
            board[row2 + 2][col2 - 1] = val2;
            board[row3 + 2][col3 - 1] = val3;
        }
        else if(i == 4){
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 2][col1 + 2] = val1;
            board[row2 + 2][col2 + 2] = val2;
            board[row3 + 2][col3 + 2] = val3;
        }
        else if(i == 5){
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 2][col1 + 5] = val1;
            board[row2 + 2][col2 + 5] = val2;
            board[row3 + 2][col3 + 5] = val3;
        }
        else if(i == 6){
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 5][col1 - 1] = val1;
            board[row2 + 5][col2 - 1] = val2;
            board[row3 + 5][col3 - 1] = val3;
        }
        else if(i == 7){
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 5][col1 + 2] = val1;
            board[row2 + 5][col2 + 2] = val2;
            board[row3 + 5][col3 + 2] = val3;
        }
        else if(i == 8){
            const [col1, row1, val1, col2, row2, val2, col3, row3, val3] = data[i].val.split('').map(Number);
            board[row1 + 5][col1 + 5] = val1;
            board[row2 + 5][col2 + 5] = val2;
            board[row3 + 5][col3 + 5] = val3;
        }
      

    }
    
    // Board 9x9
    for (let r = 0; r < 9; r++) {
        debugger;
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "0") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
           
            document.getElementById("board").append(tile);
        }
    }
  }

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}
