window.TestLib = (function() {
    function log(name = 'ai') {
        console.log('minh la ' + name);
    }
    var n = 7;

    return {
        'log': log,
        'n': n
    }
}());