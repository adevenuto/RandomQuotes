var quote = "";

function newQuote() {
  $('.quotesDisplay, .quoteAuthor').removeClass('fade-in-display');
  $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/', // src
      type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
      data: {}, // Additional parameters here
      dataType: 'json',
      success: function(data) {
        quote = data.quote;
        $('.quoteAuthor').html("- " + data.author);
        $('.quotesDisplay').html("<i class='fa fa-quote-left'></i> " + data.quote);
        $('.quotesDisplay, .quoteAuthor').addClass('fade-in-display');
      },
      error: function(err) { alert(err); },
      beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "7LtWGu5bh1mshjPEn1ZlhNIxalL0p1cKlJijsnvuqmTMQ5ucQA"); //  Mashape key
      }
  });
}

$('.quoteBtn').on('click', function(){
  newQuote();
});

$('#twitterLink').on('click touchstart', function(e){
  e.preventDefault();
  var tweetURL = "https://twitter.com/intent/tweet?text=";
  window.open(tweetURL + quote + encodeURIComponent(" #quotes"));
});

$(function(){
  var w = window.innerWidth;
  var body = $('body');
    if (w<767) {
      $('.quoteBtn').removeClass('show');
      $('.quoteBtn').addClass('hide');
      body.attr('id', 'swipe');
    }
    $(window).resize(function(){
  var w = window.innerWidth;
  var body = $('body');
    if (w<767) {
      $('.quoteBtn').removeClass('show');
      $('.quoteBtn').addClass('hide');
      body.attr('id', 'swipe');
    } else {
      $('.quoteBtn').removeClass('hide');
      $('.quoteBtn').addClass('show');
      body.removeAttr('id');
    }
  });
});

function randColor() {
  var r = Math.floor(Math.random()*(250-0+1)+0);
  var g = Math.floor(Math.random()*(250-0+1)+0);
  var b = Math.floor(Math.random()*(250-0+1)+0);
  $('body').css("background", "rgb(" + r +","+ g +","+ b + ")");
}

  var triggerElementID = null; // this variable is used to identity the triggering element
  var fingerCount = 0;
  var startX = 0;
  var startY = 0;
  var curX = 0;
  var curY = 0;
  var deltaX = 0;
  var deltaY = 0;
  var horzDiff = 0;
  var vertDiff = 0;
  var minLength = 72; // the shortest distance the user may swipe
  var swipeLength = 0;
  var swipeAngle = null;
  var swipeDirection = null;

  function touchStart(event,passedName) {
    // disable the standard ability to select the touched object
    event.preventDefault();
    // get the total number of fingers touching the screen
    fingerCount = event.touches.length;
    // since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
    // check that only one finger was used
    if ( fingerCount == 1 ) {
      // get the coordinates of the touch
      startX = event.touches[0].pageX;
      startY = event.touches[0].pageY;
      // store the triggering element ID
      triggerElementID = passedName;
    } else {
      // more than one finger touched so cancel
      touchCancel(event);
    }
  }

  function touchMove(event) {
    event.preventDefault();
    if ( event.touches.length == 1 ) {
      curX = event.touches[0].pageX;
      curY = event.touches[0].pageY;
    } else {
      touchCancel(event);
    }
  }

  function touchEnd(event) {
    event.preventDefault();
    // check to see if more than one finger was used and that there is an ending coordinate
    if ( fingerCount == 1 && curX !== 0 ) {
      // use the Distance Formula to determine the length of the swipe
      swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
      // if the user swiped more than the minimum length, perform the appropriate action
      if ( swipeLength >= minLength ) {
        caluculateAngle();
        determineSwipeDirection();
        processingRoutine();
        touchCancel(event); // reset the variables
      } else {
        touchCancel(event);
      }
    } else {
      touchCancel(event);
    }
  }

  function touchCancel(event) {
    // reset the variables back to default values
    fingerCount = 0;
    startX = 0;
    startY = 0;
    curX = 0;
    curY = 0;
    deltaX = 0;
    deltaY = 0;
    horzDiff = 0;
    vertDiff = 0;
    swipeLength = 0;
    swipeAngle = null;
    swipeDirection = null;
    triggerElementID = null;
  }

  function caluculateAngle() {
    var X = startX-curX;
    var Y = curY-startY;
    var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
    var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
    swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
    if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
  }

  function determineSwipeDirection() {
    if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
      swipeDirection = 'left';
    } else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
      swipeDirection = 'left';
    } else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
      swipeDirection = 'right';
    } else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
      swipeDirection = 'down';
    } else {
      swipeDirection = 'up';
    }
  }

  function processingRoutine() {
    var swipedElement = document.getElementById('swipe');
    if ( swipeDirection == 'left' ) {
      newQuote();
    } else if ( swipeDirection == 'right' ) {
      newQuote();
    } else if ( swipeDirection == 'up' ) {
      randColor()
    } else if ( swipeDirection == 'down' ) {
      randColor()
    }
  }

