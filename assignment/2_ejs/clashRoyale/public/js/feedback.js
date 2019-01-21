$(function () {

// === function to add new data
    const addNewData = data => {
        var output = '';
        console.log(data)
         $.each(data,(key,item) => {
            output += "<div class='divFeedback' id="+item.id+">";
            output += "<span class='delete fontSize14 float-right text-dark mx-2'><i class='fas fa-trash-alt' id='delete" + item.id + "'></i></span>"
            output += "<span class='edit fontSize14 float-right text-dark mx-2'><i class='fas fa-edit' id='edit" + item.id + "'></i></span>"
            output += "<h5><span class='sName mb-2' id='sName" + item.id + "' contentEditable = 'false'>" + item.name + "</span>" + "<i class='far ml-2 " + item.feeling.icon + "'></i></h5>";
            output += "<div class='divFeedbk d-flex ' id='divFeedbk" + item.id + "' contentEditable = 'false'>"+ item.feedback + "</div></div>";
        });

        $('#apiStart').html(output);
    }

    
// === function to EDIT new data
    const editFeedback = e => {
        let edFeedbk = e.target.parentNode.nextSibling.nextSibling;
        edFeedbk.contentEditable = true;
        edFeedbk.classList.add('editingFeedback')
        edFeedbk.focus();

        let editID = edFeedbk.id.substring(9);

        $(edFeedbk).on('keypress',function(event){
            if(event.which === 13){
                let textContent = $(edFeedbk).text();
                $(this).html('');
                $(this).text(textContent);
                edFeedbk.contentEditable = false;
                edFeedbk.classList.remove('editingFeedback');   

                $.ajax({
                    url: '/api/edit/'+editID,
                    data:{"feedback":textContent},
                    type: 'PUT',
                    success: addNewData
                });                       
            } // end of if
        }); // end of enter (on keypress)    
    };

// === enable radio button behind emojis.
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
     

// === Submit Feedback Form.
    $('.formFeedback').submit(e => {
        e.preventDefault();         // デフォルトの処理を回避    
                                    // 入力値のチェック
        const icon = (!$("input[type='radio']:checked").attr('id'))?null:$("input[type='radio']:checked").attr('id').substring(4);
        const name = (!$('#inputName').val()? null:$('#inputName').val());
        const feedback = (!$('#inputTextarea').val()? null:$('#inputTextarea').val());

        $.post('api/', {            // apiにポスト
            name,
            feeling: $("input[type='radio']:checked").val(),
            icon,
            feedback
        }, addNewData);

        // initialize values
        $('#inputName').val("");
        $('#inputTextarea').val("");
        $(".emoji").removeClass('emojiClicked');
        $(".form-check-input").prop('checked', false)

    });

// === Delete Feedback Form.
    $("#apiStart").on("click", e => {
        let id = e.target.id.substring(6);
        console.log(id)
        if (e.target.classList.contains('fa-trash-alt')) {
            $.ajax({
                url: '/api/delete/'+id,
                type: 'DELETE',
                success: addNewData
            });
        }
        e.stopPropagation();

        // === edit Feedback.
        if (e.target.classList.contains('fa-edit')) {
            editFeedback(e)
        } // end of edit div
    }); // end of feedback

}); // end of jQuery