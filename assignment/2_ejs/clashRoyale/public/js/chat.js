$(function(){
// Make connection
  const socket = io.connect("http://localhost:3500");

  $('#chatButton').on('click', event =>{
    // emit - 2 params (1: name of message, 2: data that we are sending)
    event.preventDefault();

    socket.emit('chat',{
      message: $("#chatMessage").val(),
      handleName: $("#chatName").val()
    });
    $("#chatMessage").val('');
    $("#chatMessage").focus();
  });


  $("#chatMessage").keypress(e => {
    // enter
    if(e.which === 13){
      socket.emit('chat',{
        message: $("#chatMessage").val(),
        handleName: $("#chatName").val()
      });
      $("#chatMessage").val('');
      $("#chatMessage").focus();
    } else{
      socket.emit('typing',$("#chatName").val())
    }
  });

// listen on events
  socket.on('chat',data =>{
    $('#typing').html('');
    let $p =$("<p>");
    let $s = $("<span>",{"class":"msg"});
    // let $div = $("<div>",{"class":"typing"})

    if($("#chatName").val() === data.handleName){
      $p.addClass("myChat")
    }else{
      $p.addClass("yourChat")
    };
    $s.append(data.message)
    $p.append("<strong>"+data.handleName +":</strong>").append($s);
    $("#chatBoard").prepend($p);

  });

// listening on other people's typing
  socket.on('typing', data=>{
    $("#typing").html('<p><em>'+data+'is typing a message...</em></p>');
  });

});