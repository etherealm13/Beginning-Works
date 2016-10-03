    // Using jQuery
$("#app").click(function (e) {

    if(isQuiz){ // To make sure ripple only shows up in quiz

        // Remove any old one
        $(".ripple").remove();

        // Setup
        var posX = $(this).offset().left,
        posY = $(this).offset().top,
        buttonWidth = 25,
        buttonHeight =  25;

        // Add the element
        $(this).prepend("<span class='ripple'></span>");

        // Get the center of the element
        var x = e.pageX - posX -  buttonWidth/2;
        var y = e.pageY - posY -  buttonHeight/2;


        // Add the ripples CSS and start the animation
        $(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect");
    
    }

});