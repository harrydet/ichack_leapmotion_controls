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
                       var clockwise = false;
                       var pointableID = gesture.pointableIds[0];
                       var direction = frame.pointable(pointableID).direction;
                       var dotProduct = Leap.vec3.dot(direction, gesture.normal);

                       if (dotProduct  >  0) clockwise = true;
                       if(clockwise){
                           incrementYear();
                           updateChart();
                       } else {
                           decrementYear();
                           updateChart();
                       }
                       console.log(clockwise?"Clockwise gesture":"Counter-clockwise gesture");
                       break;
                   case "keyTap":
                       console.log("Key Tap Gesture");
                       break;
                   case "screenTap":
                       console.log("Screen Tap Gesture");
                       break;
                   case "swipe":
                       var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);

                       var swipeDirection;
                       if (isHorizontal) {
                           if (gesture.direction[0] > 0) {
                               swipeDirection = "right";
                           } else {
                               swipeDirection = "left";
                           }
                       } else {
                           if(gesture.direction[1] > 0){
                               swipeDirection = "up";
                           } else {
                               swipeDirection = "down";
                           }
                       }
                       $('ul.tabs').tabs('select_tab', 'test4');
                       console.log("Swipe direction: " + swipeDirection);
                       break;
               }
            });
        }
    });

});


