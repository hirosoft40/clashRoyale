$(function(){
    // select emoji
    $(".emoji").on('click',(e)=>{
        $(".emoji").removeClass('emojiClicked');
        $(".form-check-input").prop('checked',false)
        e.target.classList.add('emojiClicked');
        e.target.previousElementSibling.checked = true;
        // $("input[name='feeling'][value= radioValue]").prop('checked',true);
    });

    // (1) when accessed to the webpage, display all information on json file
    // $.getJSON (url[, data][, success])
    // data === a plain object or string that is sent to the server with the request.
    $.getJSON("api", addNewData);

    // (2) submit button click した後の処理をかく
    // jQuery.post(url_destination[, data][, success][,dataType])
    // dat === a plain object or string that ise sent to the server with the request.
    // success === a callback function that is executed if the request succeeds. Required if dataType is provided, but can be null in that case.
    // デフォルトの処理を回避
    // 入力値のチェック
   // apiにポスト
   // OK => display on webpage

    $('.formFeedback').submit(e =>{
        e.preventDefaut();
        $.post('api',{
            name: $('#inputName').val(),
            feeling: $("input[type='radio':checked").val(),
            message:$('#inputTextarea').val()
        
       }, addNewData);
    });

    const addNewData= (data)=>{
        var output ='';
        $.each(data, (key, item)=>{
            output += "<div class='divFeedback'>";
            output += "<span class='delete fontSize16 float-right text-dark mx-2' id='delete"+key+"'><i class='fas fa-trash-alt'></i></span>"
            output += "<span class='edit fontSize16 float-right text-dark mx-2' id='edit"+key+"'><i class='fas fa-edit></i></span>"

            output += "<h5><span class='displayName mb-2'>"+item.name+"</span>"+"<i class='far ml-2 "+item.feeling+"'></i></h5>";
            output += "<span class='displayFeedback'>"+item.feedback+"</span></div>";
        });
        
        $('#apiStart').html(output);
    }
    // ============
    //delete処理する

    // ============

});