$(function() {
    // Configuration
    const url = 'http://127.0.0.1:8080'; // URL of webserver

    // Variables
    let $editor = $('#editor');
    var id = Math.round($.now() * Math.random()); // Generate a unique ID
    var texting = false; // A flag for drawing activity
    var clients = {};
    var prev = {}; // Previous coordinates container
    var socket = io.connect(url);
    var lastEmit = $.now();

    $editor
        .on('keypress', function(e) {
            e.preventDefault();
            console.log('qwe');
            if ($.now() - lastEmit > 30)
            {
                console.log('emit');
                socket.emit('keypress', {
                    'texting': texting,
                    'id': id,
                    'value' : getCharByCode(e.which)
                });
                lastEmit = $.now();
            }
        })
        .on('keyup', function(e) {
            texting = false;
        });

    // Keep users screen up to date with other users text
    socket.on('texting', function (data) {
        console.log('texting');
        console.log(data);

        // Save state
        clients[data.id] = data;
        clients[data.id].updated = $.now();
    });
    
    function getCharByCode(code) {
        return String.fromCharCode(code);
    }
});