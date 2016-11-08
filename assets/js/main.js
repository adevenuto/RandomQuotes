// fetch new Quote from API
var quote;
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
// Call new quote function
$('.quoteBtn').on('click', function(){
  newQuote();
});
// Change color on desktop view
$('.colorBtn').on('click', function(){
  randColor();
});
// Create Tweet from quote
$('#twitterLink').on('click touchstart', function(e){
  e.preventDefault();
  var tweetURL = "https://twitter.com/intent/tweet?text=";
  window.open(tweetURL + quote + encodeURIComponent(" #quotes"));
});
// Manage screen window width
$(function(){
  var body = $('body');
  $(window).on('load resize', function() {
    var w = window.innerWidth;
    if (w<=768) {
      $('.quoteBtn').removeClass('show');
      $('.quoteBtn, .fa-paint-brush').addClass('hide');
      body.attr('id', 'swipe');
    } else {
      $('.quoteBtn, .fa-paint-brush').removeClass('hide');
      $('.quoteBtn').addClass('show');
      body.removeAttr('id');
    }
  });
});
// Create random rgb color
function randColor() {
  var r = Math.floor(Math.random()*(250-0+1)+0);
  var g = Math.floor(Math.random()*(250-0+1)+0);
  var b = Math.floor(Math.random()*(250-0+1)+0);
  return $('body').css("background", "rgb(" + r +","+ g +","+ b + ")");
}
