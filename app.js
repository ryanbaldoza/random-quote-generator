$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

var counter = 0;  
$("#getMessage").on("click", function() {
  var flag = true;
  
$.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").then(function(json) {
  if (flag) {
  flag = false;
    $('a').attr("disabled", true);
  $("#getMessage").attr("disabled", true).prepend("<i class='fa fa-spinner  fa-spin'><i> ");  
  var imageUrl = "https://source.unsplash.com/all/" + counter++;
 var html = "<blockquote>" + '<i style="font-size:.9em" class="fa  fa-quote-left"></i>  '+ json.quoteText  + '  <i style="font-size:.9em" class="fa  fa-quote-right"></i>' + "<br><cite> - " + (json.quoteAuthor ? json.quoteAuthor : 'Anonymous' + "</cite></blockquote>");    
$("img").attr("src", imageUrl);
$('container-fluid').animateCss('fadeOut'); 

var twitUrl = "https://twitter.com/intent/tweet?text=";
var newHtml = html.replace(/\s+/g, " ");
$('.btnTweet').attr("href", twitUrl + json.quoteText + "-" + json.quoteAuthor);
  
}  
      
var $imgElement = $("body").find("img");
$imgElement.load(function() {
    $(".message").animateCss('fadeIn');
    $(".message").html(html);
    $("#getMessage").attr("disabled", false).html("Get Random Quote");
  $('a').attr("disabled", false);
})    
      })
.fail(function() {
  var html = "<blockquote>We're out of quotes. Please refresh the page</blockquote>"
  $(".message").html(html);
});
});


