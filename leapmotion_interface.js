var graphYearControl = true;

//Document ready event
$( document ).ready(function(){
    //Component initialization
    $('ul.tabs').tabs();

    // Leap.loop uses browser's requestAnimationFrame
    var options = { enableGestures: true };
    var selectedTab = 'graph1';

    //No-loop
    var ctl = new Leap.Controller({enableGestures: true});

    var swiper = ctl.gesture('swipe');

    var toleranceSwipe = 10;
    var toleranceRotation = 0.55;
    var cooloff = 3000;

    //FPS control
    var skipFrame = 10;
    var currentFrame = 0;

    swiper.update(function(g) {
        if (Math.abs(g.translation()[0]) > toleranceSwipe || Math.abs(g.translation()[1]) > toleranceSwipe) {
            Math.abs(g.translation()[0]) > toleranceSwipe ? (g.translation()[0] > 0 ? loadGraph('graph1') : loadGraph('graph2')):null;
            //Math.abs(g.translation()[1]) > toleranceSwipe ? (g.translation()[1] > 0 ? addSymbol() : removeSymbol()):null;
        }
    });

    /*ctl.on('gesture', function(gesture){
        switch (gesture.type){
            case "keyTap":
                rightChangeBase();
                break;
            case "circle":
                var clockwise = false;
                var pointableID = gesture.pointableIds[0];
                var direction = ctl.frame(0).pointable(pointableID).direction;
                var dotProduct = Leap.vec3.dot(direction, gesture.normal);

                if (dotProduct  >  0) clockwise = true;

                if(clockwise){
                    _.debounce(addSymbol(), 3000);
                } else {
                    _.debounce(removeSymbol(), 3000);
                }

        }
    });*/

    ctl.on('frame', function (frame) {
        for(var h = 0; h < frame.hands.length; h++){
            var hand = frame.hands[h];
            var rollRadians = hand.roll();
            //console.log(rollRadians);
            if(Math.abs(rollRadians) > toleranceRotation && currentFrame >= skipFrame && graphYearControl){
                //console.log("Enough rotation");
                if(rollRadians < 0){
                    _.debounce(incrementChart($('ul li a.active').attr('href')), cooloff);
                } else {
                    _.debounce(decrementChart($('ul li a.active').attr('href')), cooloff);
                }

            }
        }
        for(var g = 0; g < frame.gestures.length; g++){
            var gesture = frame.gestures[g];
            switch (gesture.type){
                case "keyTap":
                    rightChangeBase();
                    break;
                case "screenTap":
                    _.debounce(loopSymbol(), 3000);

            }
        }
        currentFrame++;
        if(currentFrame > skipFrame){
            currentFrame = 0;
        }
    });

    ctl.connect();


    /*// Main Leap Loop
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
                               $('ul.tabs').tabs('select_tab', 'graph2');
                           } else {
                               swipeDirection = "left";
                               $('ul.tabs').tabs('select_tab', 'graph1', function(){createChart();});

                           }
                       } else {
                           if(gesture.direction[1] > 0){
                               swipeDirection = "up";
                           } else {
                               swipeDirection = "down";
                           }
                       }
                       console.log("Swipe direction: " + swipeDirection);
                       break;
               }
            });
        }
    });*/

});

function loadGraph(graphId){
    if(graphId === 'graph1'){
        //graphYearControl = true;
    } else {
        //graphYearControl = false;
    }
    $('ul.tabs').tabs('select_tab', graphId, function(){createChart();});
}

function incrementChart(graphId){
    switch(graphId){
        case "#graph1":
            incrementYear();
            updateChart();
            break;
        case "#graph2":
            incrementMonthLineChart();
            updateLineChart();
            break;
    }

}

function decrementChart(graphId){
    switch(graphId){
        case "#graph1":
            decrementYear();
            updateChart();
            break;
        case "#graph2":
            decrementMonthLineChart();
            updateLineChart();
            break;
    }
}





