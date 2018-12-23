
/*******************************
 * Server.js c'est le serveur de l'Application
 * @author:Ekangoh steve divan / @Rampage
 */


var http = require('http');


httpServer=http.createServer(function(req,res){
    console.log('un utilisateur a afficher la page');
    res.end('hello world');
});

httpServer.listen(1337);
var io=require('socket.io').listen(httpServer);
var Ousers={};
var messages=[];
var history;


io.sockets.on('connection', function(socket){
    
    var me=false;
    console.log('new user');

    for(var k in Ousers )
{
    socket.emit('newusr',Ousers[k]);
}

for(var k in messages )
{
    socket.emit('newmsg',messages[k]);
}

/***********
 * Reception d'un message
 */

 socket.on('newmsg',function(message){
     message.user=me;
     message.date=new Date();
     message.h = new date.getHours();
     message.m = new date.getMinutes();
     messages.push(message);

     if(messages.length > history)
     {
        messages.shift();
     }

     io.sockets.emit('newmsg',message);
 })




/******
 * Connexion d'un utilisateur
 * @login est l'evenement qui sera envoyer pour la connexion
 */
    socket.on('login', function(user){
        console.log(user);
        me=user;
        me.id=user.mail.replace('@','-').replace('.','-');
        me.avatar=user.username;
        socket.emit('connecté');
        Ousers[me.id]=me;
        me.password=user.password;
        io.sockets.emit('newusr',me);
    });

/********
 * Deconnexion d'un utilisateur
 * @disconnect est l'evenement qui sera envoyer pour la deconnexion
 */

    socket.on('disconnect',function(){
        if(!me)
        {
            return false;
        }
        delete Ousers[me.id];
        io.sockets.emit('deconnecte',me)
    })
})