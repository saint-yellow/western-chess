// 棋盘的横坐标轴
var xAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];

// 棋盘的纵坐标轴
var yAxis = [1, 2, 3, 4, 5, 6, 7, 8];

// 获取棋子的位置, 即棋子所处的网格的ID
function getPosition(chess) {
    var gridId = $(chess).parent().attr("id");
    var x = gridId[0];
    var y = parseInt(gridId[1]);

    return [x, y];
}


$(".chess.pawn").click(function () {
    var position = getPosition(this);
});

$(".chess.king").click(function () {
    var position = getPosition(this);

});

$(".chess.queen").click(function () {
    var position = getPosition(this);

});

$(".chess.bishop").click(function () {
    var position = getPosition(this);

});

$(".chess.knight").click(function () {
    var position = getPosition(this);

});

$(".chess.rook").click(function () {
    var position = getPosition(this);

});
