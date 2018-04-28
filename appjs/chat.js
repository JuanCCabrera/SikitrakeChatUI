angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$location',
    function($http, $log, $scope, $location) {
        var thisCtrl = this;

        this.messageList = [];
        this.counter  = 2;
        this.newText = "";

        this.loadMessages = function(){
            // Get the messages from the server through the rest api
            //thisCtrl.messageList.push({"id": 1, "text": "Hola Mi Amigo", "author" : "Bob",
            //"like" : 4, "nolike" : 1});
            //thisCtrl.messageList.push({"id": 2, "text": "Hello World", "author": "Joe",
            //    "like" : 11, "nolike" : 12});

            var url = "http://localhost:5000/SikitrakeChat/Messages/LikesAndDislikes";
            $http.get(url).then(
                function (response){
                    console.log("response: " + JSON.stringify(response));
                    thisCtrl.messageList = response.data.Messages;
                    $log.error("Message Loaded: ", JSON.stringify(thisCtrl.messageList));
            }, // error callback
            function (response){
                // This is the error function
                // If we get here, some error occurred.
                // Verify which was the cause and show an alert.
                var status = response.status;
                if (status == 0){
                    alert("No hay conexion a Internet");
                }
                else if (status == 401){
                    alert("Su sesion expiro. Conectese de nuevo.");
                }
                else if (status == 403){
                    alert("No esta autorizado a usar el sistema.");
                }
                else if (status == 404){
                    alert("No se encontro la informacion solicitada.");
                }
                else {
                    alert("Error interno del sistema.");
                }
            });

            $log.error("Message Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        this.postMsg = function(){
            var msg = thisCtrl.newText;
            // Need to figure out who I am
            var author = "TestMan";
            var nextId = thisCtrl.counter++;
            var mdate = "05/03/17"
            thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "date" : mdate, "like" : 0, "nolike" : 0});
            thisCtrl.newText = "";
        };

        this.messageDetails = function (id){
            $location.url('/messageDetails/' + id);
        }

        this.loadMessages();
        console.log("Loading Complete");
}]);
