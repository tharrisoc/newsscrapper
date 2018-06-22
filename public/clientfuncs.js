"use strict";

$(document).ready(readyFunc);

function readyFunc() {

  // Click handler for any of the topic lines (class="headline")
  $(document).on("click", "h4", function() {
    // Save the Article ObjectId from the <h4> tag
    var thisId = $(this).attr("data-id");

    // get the article from the database by requesting it through
    // the appropriate route
    $.ajax({
        method: "GET",
        url: "/commentform/" + thisId
    })
    .then(function(data) {
        console.log(data);  //TWH DEBUG

        // fill in the Title and ObjectId
        $('input[name="articletitle"]').val(data.title);
        $('input[name="articleid"]').val(data._id);

        // clear out the Username, Password and Comment fields
        $('input[name="username"]').val("");
        $('input[name="password"]').val("");
        $('textarea[name="newcomment"]').val("");

        // add the ID of the article to the Add comment button
        $('#addcomment').attr('data-id', data._id);

        // scroll the form into view
        scrollToAnchor('formstart');
    });
  });

  // Click handler for any of the "View comments" anchor tags
  $(document).on( "click", "a.commentslink", function() {
    // Save the Article ObjectId from the <a> tag
    var thisId = $(this).attr("data-id");
console.log('In on( "click", ".commentslink, ... '); console.log(thisId);   // TWH DEBUG  
    // get the article from the database by requesting it through
    // the appropriate route
    $.ajax({
      method: "GET",
      url: "/getarticle/" + thisId
    })
    .then(function(data) {
console.log("Returned from /getarticle/:id"); console.log(data);  // TWH DEBUG
    });
  
  });


  // Click handler for the Add Comment Button
  $(document).on("click", "#addcomment", function() {
    // Get tie ObjectId of the article that this new comment is
    // associated with
    const articleID = $(this).attr("data-id");

    // Update the database through the appropriate POST route
    $.ajax({
      method: "POST",
      url: "/addcomment",
      data: {
          authoredby:   $('#username').val(),
          password:     $('#password').val(),
          email:        $('#email').val(),
          title:        $('#articletitle').val(),
          authoredon:   Date.now(),
          commenttitle: $('#commenttitle').val(),
          body:         $('#newcomment').val(),
          articleid:    articleID
      }
    })
    .then(
      function(data) {
        // upon success, notify the user
//      alert(JSON.stringify(data, undefined, 2));

        // clear out the fields on the form to prepare for the
        // next comment, and to prevent duplications
        $('#articletitle').val("");
        $('#articleid').val("");
        $('#username').val("");
        $('#password').val("");
        $('#email').val("");
        $('#commenttitle').val("");
        $('#newcomment').val("");
        $('#addcomment').attr('data-id', "");

/* [TODO: find and fix this bug] 
Uncaught TypeError: Cannot read property 'top' of undefined
    at scrollToAnchor (clientfuncs.js:90)
    at Object.<anonymous> (clientfuncs.js:79)
    at Object.<anonymous> (jquery.js:3276)
    at fire (jquery.js:3119)
    at Object.fireWith [as resolveWith] (jquery.js:3231)
    at done (jquery.js:9275)
    at XMLHttpRequest.callback (jquery.js:9685)
*/

/*
jQuery.Deferred exception: Cannot read property 'top' of undefined
TypeError: Cannot read property 'top' of undefined
    at scrollToAnchor (http://localhost:3000/clientfuncs.js:117:50)
    at Object.<anonymous> (http://localhost:3000/clientfuncs.js:104:9)
    at l (https://code.jquery.com/jquery-3.3.1.min.js:2:29375)
    at c (https://code.jquery.com/jquery-3.3.1.min.js:2:29677) undefined
*/
        // scroll to the top of the list of articles
        scrollToAnchor('articlesstart');
      },
      function(err) {
        console.log("ERROR after ajax POST /addcomment"); console.log(err);
        // If an error occurred, also notify the user
//      alert(JSON.stringify(err, undefined, 2));
      })
  });

}


function scrollToAnchor(aid) {
  const aTag = $("a[name='" + aid + "']");
//  $('html,body').animate({scrollTop:aTag.offset().top}, 'slow');
  $('html').animate({scrollTop:aTag.offset().top}, 'slow');
}