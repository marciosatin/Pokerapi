$(document).ready(function(){

  var $button = $('button');

  $button.on('click', function(e){
    e.preventDefault();
    var hand = [],
        cards = $('.hand li');

    cards.each(function(){
      hand.push({
        "rank": $(this).data('rank'),
        "suit": $(this).data('suit')
      });
    });

    $.post("/hand", {"hand": hand}, function(response){
      console.log(response);
    });
  });
});
