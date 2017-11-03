var http = require("http").createServer(handler);
var io = require("socket.io").listen(http); //socket library
var fs = require("fs"); // variable for file system
var firmata = require("firmata");

var board = new firmata.Board("/dev/ttyACM0", function(){ // ACM Abstract Control Model for serial communication with Arduino (could be USB)
    console.log("Connecting to Arduino");
    console.log("Activation of Pin 13");
    board.pinMode(13, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
    console.log("Activation of Pin 8");
    board.pinMode(8, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
    console.log("Activation of Pin 5");
    board.pinMode(7, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
    console.log("Activation of Pin 2");
    board.pinMode(2, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
});


function handler(req, res) {
    fs.readFile(__dirname + "/assignment04.html",
    function (err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Error loading html page.");
        }
    res.writeHead(200);
    res.end(data);
    })
}


http.listen(8080); //server will listen on port 8080

io.sockets.on("connection", function(socket) {
    socket.on("commandToArduino", function(commandNo){
        if (commandNo == "1") {
            board.digitalWrite(13, board.HIGH); // write HIGH on pin 13
        }
        if (commandNo == "0") {
            board.digitalWrite(13, board.LOW); // write LOW on pin 13
        }
        
        if (commandNo == "2") {
            board.digitalWrite(8, board.LOW); // write LOW on pin 8
        }
        
        if (commandNo == "3") {
            board.digitalWrite(8, board.HIGH); // write HIGH on pin 8
        } 
        
        if (commandNo == "4") {
            board.digitalWrite(7, board.LOW); // write LOW on pin 5
        }
        
        if (commandNo == "5") {
            board.digitalWrite(7, board.HIGH); // write HIGH on pin 5
        } 
        
        if (commandNo == "6") {
            board.digitalWrite(2, board.LOW); // write LOW on pin 2
        }
        
        if (commandNo == "7") {
            board.digitalWrite(2, board.HIGH); // write HIGH on pin 2
        } 
        
        if (commandNo == "8") {
            board.digitalWrite(2, board.LOW); // write LOW on pin 2
            board.digitalWrite(7, board.LOW);
            board.digitalWrite(8, board.LOW);
            board.digitalWrite(13, board.LOW);
        }
        
        if (commandNo == "9") {
            board.digitalWrite(2, board.HIGH); // write HIGH on pin 2
            board.digitalWrite(7, board.HIGH);
            board.digitalWrite(8, board.HIGH);
            board.digitalWrite(13, board.HIGH);
        } 
    });
});
