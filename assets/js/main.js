var quote = "";
$('#quoteBtn').on('click', function(){
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
})
$('#twitterLink').on('click', function(e){
  e.preventDefault();
  var tweetURL = "https://twitter.com/intent/tweet?text=";
  window.open(tweetURL + quote + encodeURIComponent(" #quotes"));
})