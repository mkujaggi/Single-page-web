var socket=io();

$(document).on('submit','#ques-form',function (e) {
    e.preventDefault();
    var name = $('#inputName').val();
    var email = $('#inputEmail').val();
    var phone = $('#inputPhone').val();
    socket.emit('formSubmit',{
        name:name,
        email:email,
        phone:phone
    },function () {
        formSubmit();
        $('#inputName').val('');
        $('#inputEmail').val('');
        $('#inputPhone').val('');
    });
    
});

function formSubmit() {
    $('#submitted').html('Thank you.')
}

