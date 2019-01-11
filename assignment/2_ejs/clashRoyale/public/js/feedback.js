$(function () {

     // ============
    //  function to add new data
    // ============
    const addNewData = data => {
        var output = '';
        $.each(data, (key, item) => {
            output += "<div class='divFeedback' id="+key+">";
            output += "<span class='delete fontSize14 float-right text-dark mx-2'><i class='fas fa-trash-alt' id='delete" + key + "'></i></span>"
            output += "<span class='edit fontSize14 float-right text-dark mx-2'><i class='fas fa-edit' id='edit" + key + "'></i></span>"
            output += "<h5><span class='displayName mb-2'>" + item.name + "</span>" + "<i class='far ml-2 " + item.feeling + "'></i></h5>";
            output += "<span class='displayFeedback'>" + item.feedback + "</span></div>";
        });
        $('#apiStart').html(output);
    }

    // select emoji
    $(".emoji").on('click', e => {
        $(".emoji").removeClass('emojiClicked');
        $(".form-check-input").prop('checked', false)
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

    // ============
    //  delete
    // ============
    $("#apiStart").on("click", e => {
        let id = e.target.id.substring(6);

        if (e.target.classList.contains('fa-trash-alt')) {
            $.ajax({
                url: '/api/delete/'+id,
                type: 'DELETE',
                success: addNewData
            });
        }
    });

    // ============
    //  submit form
    // ============
    $('.formFeedback').submit(e => {
        e.preventDefault();
        $.post('api/', {
            name: $('#inputName').val(),
            feeling: $("input[type='radio']:checked").val(),
            feedback: $('#inputTextarea').val()
        }, addNewData);

        // initialize values
        $('#inputName').val("");
        $('#inputTextarea').val("");
        $(".emoji").removeClass('emojiClicked');
        $(".form-check-input").prop('checked', false)

    });

});