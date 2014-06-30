$(document).ready(function () {

    if (typeof $API === "undefined") {
        alert("Load this page into Johnny's Webview");
        return;
    }

    window.onerror = function (e) {
        $API.debug(e.message || e.toString() || e);
    };

    var $actions = $(".actions")
      , $undecorateButton = $(".undecorate", $actions)
      , $closeButton = $(".close", $actions)
      , $start = $(".start", $actions)
      , $input = $("input.video-url")
      , argv = $API.argv()
      ;

    // Get video url
    var url = argv[argv.length - 1];
    if (!/^http/.test(url)) {
        url = "http://www.youtube.com/embed/" + url;
    }
    url += "?autoplay=1";

    $input.val(url);
    $("a", $start).attr("href", $input.val());
    $input.on("input", function () {
        $("a", $start).attr("href", $input.val());
    });
    $start.on("click", function () {
        $API.setWindowFlags("UNDECORATED");
    });

    // Handle click on close button
    $closeButton.on("click", function () {
        $API.closeWindow();
    });
});
