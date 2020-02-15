var X = ["A", "B", "C", "D", "E", "F", "G", "H"];
var Y = [1, 2, 3, 4, 5, 6, 7, 8];

$(".chess.pawn").click(function () {
    var id = $(this).parent().attr("id");
    var x = id[0];
    var y = parseInt(id[1]);
    
    if ($(this).hasClass("black")) {

    } else {

    }
});

$(".chess.king").click(function () {
    var id = $(this).parent().attr("id");
    var x = id[0];
    var y = parseInt(id[1]);

});

$(".chess.queen").click(function () {
    var id = $(this).parent().attr("id");
    var x = id[0];
    var y = parseInt(id[1]);

});

$(".chess.bishop").click(function () {
    var id = $(this).parent().attr("id");
    var x = id[0];
    var y = parseInt(id[1]);

});

$(".chess.knight").click(function () {
    var id = $(this).parent().attr("id");
    var x = id[0];
    var y = parseInt(id[1]);

});

$(".chess.rook").click(function () {
    var id = $(this).parent().attr("id");
    var x = id[0];
    var y = parseInt(id[1]);

});