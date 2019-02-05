$(document).ready(function () {
    // avator setup
    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function () {
        readURL(this);
    });

    const newUser = data =>{
        $('#newProfileModal').append("<p> Profile created Successfully. Please login with your username to use chat.</p>");
        $('#newComp').modal('toggle');
    }

   // submit
   $('.formNewProfile').submit(e => {
        e.preventDefault();  
                    
        const username = (!$('#username').val()? null:$('#username').val());
        const email = (!$('#email').val()? null:$('#email').val());
        const password = (!$('#password1').val()? null:$('#password1').val());

        $.post('profile',{
            username, email, password
            },newUser
        );
    });
});

