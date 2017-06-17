  baseArr= [0,1,2,3,4,5,6,7,8,9];
  randomArr= [];
  for (i=1; i<=4; i++) {
    randomIndex= Math.floor(Math.random()* (baseArr.length-1) +1);
    randomArr.push(baseArr[randomIndex]);
    baseArr.splice(randomIndex, 1);
  };
  console.log(randomArr);

$('#input').keyup(function(e){

  var number = $(this).val();
  numberArray= number.split('').map(Number);
  var numberLength = number.length;

  const COND = numberLength <= 3 || numberLength > 4;

  $("#error").toggleClass("msg-error", COND);
  $("input").toggleClass("input-error", COND);

  if (e.which == 13 && numberLength == 4){
    $('#input').val('');
    if (randomArr.toString()==numberArray.toString()) {
      $('#winModal').modal('show');
      $("#replay").click(function(){
        location.reload();
      });
    }

    var count=0;
    $(numberArray).each(function(){
      var value= this;
      var position= $.inArray(Number(this), numberArray);

      cloneArr= numberArray.slice(0)
      cloneArr.splice(position,1);

      for(i=0; i < cloneArr.length; i++) {
        if (value==cloneArr[i]){
            $("#error").addClass("msg-error");
            $("input").addClass("input-error");
            count+=1;
        };
      };
    });
    if (!count>0){
      var picas=0;
      var fijas=0;
      for (i=0; i<numberArray.length; i++) {
        place = $.inArray(numberArray[i], randomArr);
        if (place != -1) {
          if (place == i) {
            fijas+=1;
          } else {
            picas+=1;
          };
        };
      };
      $('tbody').prepend('<tr><td>'+number+'</td> <td>'+picas+'</td> <td>'+fijas+'</td><tr>');
    };
  };
});
