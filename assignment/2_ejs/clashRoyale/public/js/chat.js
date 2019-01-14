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
    socket.emit('typing',$("#chatName").val())
  });

// listen on events
  socket.on('chat',data =>{
    $('#typing').html('');
    let $p =$("<p>",{"class":"pr-2"});

    if($("#chatName").val() === data.handleName){
      $p.addClass("text-primary")
    }else{
      $p.addClass("text-warning");
    };
    $p.append("<strong>"+data.handleName +":</strong><span class='msg'>"+data.message +"</span>");
    $("#chatBoard").prepend($p);
  });


  socket.on('typing', data=>{
    $("#typing").html('<p><em>'+data+'is typing a message...</em></p>');
  });

});