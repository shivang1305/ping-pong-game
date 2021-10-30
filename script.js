let ball = document.querySelector(".ball");
let board = document.querySelector(".board"); 

let boardBounds = board.getBoundingClientRect();

let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");

let leftPlayerLives = 3;
let rightPlayerLives = 3;

document.addEventListener("keydown", function(e) {
    console.log(e);

    if(e.key == "w") {
        // move the left paddle up 
        movePaddle(leftPaddle, -window.innerHeight * 0.1);
    }
    
    else if(e.key == "s") {
        // move the left paddle down
        movePaddle(leftPaddle, window.innerHeight * 0.1);
    }

    else if(e.key == "ArrowUp") {
        // move the right paddle up
        movePaddle(rightPaddle, -window.innerHeight * 0.1);
    }

    else if(e.key == "ArrowDown") {
        // move the right paddle down
        movePaddle(rightPaddle, window.innerHeight * 0.1);
    }
});

function movePaddle(currPaddle, change) {
    let currPaddleBounds = currPaddle.getBoundingClientRect();

    // check that the paddle must not go beyond the boundary of board 
    if(currPaddleBounds.top + change >= boardBounds.top && currPaddleBounds.bottom + change <= boardBounds.bottom) {
        // change the top position of the current paddle
        currPaddle.style.top = currPaddleBounds.top + change + "px";
    }
}

let x = true, y = true;

function moveBall() {
    let ballCoord = ball.getBoundingClientRect();
    
    let ballTop = ballCoord.top;
    let ballBottom = ballCoord.bottom;
    let ballLeft = ballCoord.left;
    let ballRight = ballCoord.right;

    // check that ball is in bound or not
    // handle vertical bound
    if(ballTop <= boardBounds.top || ballBottom >= boardBounds.bottom) {
        // vertically outside
        y = !y;
    }

    // handle horizontal bound without the paddle with the boundary of board
    // if(ballLeft <= boardBounds.left || ballRight >= boardBounds.right) {
    //     // horizontally outside
    //     x = !x;
    // }

    // Collision of ball with paddle 
    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();

    // condition for a valid collision of ball with left paddle 
    if(ballLeft <= leftPaddleBounds.right && ballRight >= leftPaddleBounds.left && ballTop + 30 >= leftPaddleBounds.top && ballBottom - 30 <= leftPaddleBounds.bottom)
        x = !x;

    // condition for a valid collision of ball with right paddle 
    if(ballLeft <= rightPaddleBounds.right && ballRight >= rightPaddleBounds.left && ballTop + 30 >= rightPaddleBounds.top && ballBottom - 30 <= rightPaddleBounds.bottom)
        x = !x;

    // check if ball is collided with any players horizontal boundary
    let hasTouchedLeft = ballLeft < boardBounds.left;
    let hasTouchedRight = ballRight > boardBounds.right;

    if(hasTouchedLeft || hasTouchedRight) {
        if(hasTouchedLeft) {
            leftPlayerLives--;
            
            setColor(leftPlayerLives); // to change the color of the ball representing the lives of player A

            if(leftPlayerLives == 0) {
                alert("GAME OVER Player 🅱 won 🔥🔥");
                document.location.reload();
            }
            else
                return resetGame();
        }

        else if(hasTouchedRight) {
            rightPlayerLives--;

            setColor(3 + rightPlayerLives); // to change the color of the ball representing the lives of player A

            if(rightPlayerLives == 0) {
                alert("GAME OVER Player 🅰 won 🔥🔥");
                document.location.reload();
            }
            else
                return resetGame();
        }
    }

    ball.style.top = (y == true) ? ballTop + 10 + "px" : ballTop - 10 + "px";
    ball.style.left = (x == true) ? ballLeft + 10 + "px" : ballLeft - 10 + "px";

    requestAnimationFrame(moveBall); // it changes the animation frame continuously which gives the illusion that ball is moving 
}

requestAnimationFrame(moveBall);

function resetGame() {
    ball.style.top = window.innerHeight * 0.45 + "px";
    ball.style.left = window.innerWidth * 0.45 + "px";

    requestAnimationFrame(moveBall);
}

function setColor(index) {
    let allBalls = document.querySelectorAll(".fas.fa-circle");
    allBalls[index].style.color = "#686de0";
}

