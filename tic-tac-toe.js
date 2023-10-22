onload = function () {
    
    let body = ['','','','','','','','','']
    let status = document.getElementById("status")
    let board = document.getElementById("board")
    let squares = [...board.children]
    let isWinner = false
    

    let whoIsNext = ["X", "O"][Math.round(Math.random())]
    //adds the squares to the board
    squares.forEach((square, index) => {  
        square.className = "square"
        square.id = `${index}`
        //add either x or o dependent on whos turn
        square.addEventListener('click', () => {
            if(square.innerHTML === "" && !isWinner){
                square.classList.add(whoIsNext)
                square.innerHTML = whoIsNext;
                body[parseInt(square.id)] = whoIsNext
                checkbody()
                whoIsNext = whoIsNext === "X" ? "O" : "X";      
            }
        })

        //applies hover effect class when user cursor is over a square
        square.addEventListener('mouseover', () => {
            square.classList.add("hover")
        })
        //remove class when user leaves
        square.addEventListener('mouseout', () => {
            square.classList.remove("hover")
        })
    })
    
    //gives u the winner
    //arrow function is es6 and gives a cleaner syntax that to use the function keyword
    const checkbody = () => {
        
        if(checkPossibility("XXX")){
            status.classList.add("you-won")
            status.innerHTML = "Congratulations! X is the Winner!"
            isWinner = true
        } else if(checkPossibility("OOO")){
            status.classList.add("you-won")
            status.innerHTML = "Congratulations! O is the Winner!"
            isWinner = true
        }
    }

    //Checks possible wins
    const checkPossibility = (str) => {
        const rows = [
            body.slice(0, 3),
            body.slice(3, 6),
            body.slice(6, 9)
        ];
    
        const cols = [
            [body[0], body[3], body[6]],
            [body[1], body[4], body[7]],
            [body[2], body[5], body[8]]
        ];
    
        const diags = [
            [body[0], body[4], body[8]],
            [body[2], body[4], body[6]]
        ];
    
        const rowWin = rows.some(row => row.join("").includes(str));
        const columnWin = cols.some(col => col.join("").includes(str));
        const diagWin = diags.some(diag => diag.join("").includes(str));
    
        return rowWin || columnWin || diagWin;
    };
    

    //reset everyting
    let resetButton = document.getElementsByClassName("btn")[0]
    resetButton.addEventListener('click', () => {
        body = ['','','','','','','','','']
        status.classList.remove("you-won")
        status.innerHTML = "Move your mouse over a square and click to play an X or an O."
        isWinner = false
        squares.forEach(square => {
            if(square.classList.contains("X")){
                square.classList.remove("X")
            }else if(square.classList.contains("O")){
                square.classList.remove("O")
            }
            square.innerHTML = ""
        })
    })
}