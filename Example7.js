var http = require("http").createServer(handler);
var io = require("socket.io").listen(http); //socket library
var fs = require("fs"); // variable for file system
var firmata = require("firmata");

var board = new firmata.Board("/dev/ttyACM0", function(){ // ACM Abstract Control Model for serial communication with Arduino (could be USB)
    console.log("Connecting to Arduino");
    console.log("Activation of Pin 13");
    board.pinMode(13, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
    console.log("Activation of Pin 8");
    board.pinMode(2, board.MODES.INPUT); // Configures the specified pin to behave either as an input or an output.
});


function handler(req, res) {
    fs.readFile(__dirname + "/Example7.html",
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


var sendValueViaSocket = function(){};


board.on("ready", function() {
    io.sockets.on("connection", function(socket) {
    console.log("Socket id: " + socket.id);
    socket.emit("messageToClient", "Srv connected, board OK");
    
    sendValueViaSocket = function(value) {
        io.sockets.emit("messageToClient", value);
    }
    
    }); //end of sockets.on connection
    
    board.digitalRead(2, function(value) {
        if (value == 0) {
            console.log("LED OFF");
            board.digitalWrite(13, board.LOW);
            sendValueViaSocket(0);
        }
        if (value == 1) {
            console.log("LED ON");
            board.digitalWrite(13, board.HIGH);
            sendValueViaSocket(1);
        }
        
    }); // end of board digital read


}); // end of board.on ready


