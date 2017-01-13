(function (window) {

    var speakWord = "Hello";

    var helloSpeaker = {};

    helloSpeaker.speak = function (name) {

        console.log(speakWord + " " + name);
        
        //page output -- not required
        var msg = speakWord + " " + name;
        var ul = document.getElementById("myList");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(msg));
        ul.appendChild(li);
        //page output -- not required
    }

    window.helloSpeaker = helloSpeaker;

})(window);

