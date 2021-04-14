var ball, database, position; 

function setup(){
    database = firebase.database(); //Linked the variable database to the firebase database. Correct database found due to the configuration given in index.html.
    createCanvas(500,500); 
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballPosition = database.ref('ball/position'); //.ref is an in-built method that takes the path that refers to the particular position of the database. Basically, refers to the location.
    ballPosition.on("value", readPosition, showError); //.on creates a listener that keeps on listening to the changes in database and every time a change in the database value of the position happens, the readPosition function is called.
    console.log(database);
}

function draw(){
    background("white");
    if(position !== undefined) {
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }
}

function writePosition(x,y){
    //.set updates the value, the way .on reads the value
    database.ref('ball/position').set({
        'x' : position.x + x,
        'y' : position.y + y
    })
}

function readPosition(data) {
    position = data.val(); //.val takes the value and assigns the value to the variable position.
    ball.x = position.x;
    ball.y = position.y;
    //console.log(position.x);
}

function showError() {
    console.log("Error in writing to the database");
}