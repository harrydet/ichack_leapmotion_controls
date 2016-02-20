
function concatData(id, data) {
    return id + ": " + data + "<br>";
}

function getFingerName(fingerType) {
    switch(fingerType) {
        case 0:
            return 'Thumb';
            break;

        case 1:
            return 'Index';
            break;

        case 2:
            return 'Middle';
            break;

        case 3:
            return 'Ring';
            break;

        case 4:
            return 'Pinky';
            break;
    }
}

function concatJointPosition(id, position) {
    return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}

//Document ready event
$( document ).ready(function(){
    //Component initialization
    $('ul.tabs').tabs();

    // Leap.loop uses browser's requestAnimationFrame
    var options = { enableGestures: true };

    // Main Leap Loop
    Leap.loop(options, function(frame) {
        if(frame.valid && frame.gestures.length > 0){
            frame.gestures.forEach(function(gesture){
               switch (gesture.type){
                   case "circle":
                       console.log("Circle Gesture");
                       break;
                   case "keyTap":
                       console.log("Key Tap Gesture");
                       break;
                   case "screenTap":
                       console.log("Screen Tap Gesture");
                       break;
                   case "swipe":
                       console.log("Swipe Gesture");
                       break;
               }
            });
        }
    });

});


