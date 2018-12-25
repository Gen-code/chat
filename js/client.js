/*******************************
 * Client.js s'occupe des evenements cote client
 * @author:Ekangoh steve divan / @Rampage
 */




(function($){

    var socket = io.connect('http://localhost:1337/');
    var msg = $('#messvue').html();
    var lastSms = false;
    $('#messvue').remove();


    $('#login-form').submit(function(event){
        event.preventDefault();
        socket.emit('login',{
            username: $('#username'). val(),
            mail: $('#email').val(),
            /****password: $('#password').val()**/
        })

        });
        
        socket.on('connecté',function(){
            $('#login').fadeOut();
            $('#message').focus();
        })

        /***********************
         *Envoie d'un message 
         *******/

         $('#form').submit(function(event){
             event.preventDefault();
             socket.emit(newmsg,{message : $('#message').val()});
             $('#message').val('');
             $('#message').focus(); 
         })

         socket.on('newmsg',function(message){
if(lastSms != message.user.id){
    $('messages').append('<div class="sep"></div>');
    lastSms = message.user.id
}
        $('#messages').append('<div class="message">'+ mustache.render('messvue',message) +
        '</div>');
             
             $('#messages').animate({scrollTop : $('#messages').prop('scrollHeight')}, 500 );

         })

/******
 * Connexion d'un utilisateur
 * @login est l'evenement qui sera envoyer pour la connexion
 */


        socket.on('newusr',function(user){
            $('#users').append('<img src="img/' + user.avatar + '.jpg" id="' + user.id + 
            '" style="border:4px;border-radius:50%";height:50px;width:50px">');

        })


        /********
 * Deconnexion d'un utilisateur
 * @disconnect est l'evenement qui sera envoyer pour la deconnexion
 */

        socket.on('deconnecte',function(user){
             $('#' + user.id.remove());
        })

})(jQuery);