$(document).ready(function () {

    if (typeof BAT === "undefined") {
        alert("Load this page into Johnny's Webview");
        return;
    }

    window.onerror = function (e) {
        BAT.debug(e.message || e.toString() || e);
    };

    BAT.setWindowTitle("YouTube Topmost");

    var $actions = $(".actions")
      , $undecorateButton = $(".undecorate", $actions)
      , $closeButton = $(".close", $actions)
      , $start = $(".start", $actions)
      , $input = $("input.video-url")
      , argv = BAT.argv()
      ;

    // Get video url
    var url = argv[argv.length - 1];

    if (!/^http/.test(url)) {
        url = "http://www.youtube.com/embed/" + url;
    } else {
        url = "http://www.youtube.com/embed/" + url.match(/\?v\=(.*)/)[1];
    }

    url += "?autoplay=1";

    $input.val(url);
    $("a", $start).attr("href", $input.val());
    $input.on("input", function () {
        $("a", $start).attr("href", $input.val());
    });

    // Handle click on close button
    $closeButton.on("click", function () {
        BAT.closeWindow();
    });
});
