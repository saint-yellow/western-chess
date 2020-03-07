/*
    game.js: 实现游戏逻辑
*/

// 棋盘的横坐标轴
var xAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];

// 棋盘的纵坐标轴
var yAxis = [1, 2, 3, 4, 5, 6, 7, 8];


var activeGrid = "";

// 获取网格的ID
function getPosition(grid) {
    var gridId = $(grid).attr("id");
    var x = gridId[0];
    var y = parseInt(gridId[1]);

    return [x, y];
}

$(".grid").click(function(e) {
    // 选定网格
    var $chosenGrid = $(e.currentTarget);

    // 活动网格
    var $activeGrid = $(activeGrid);

    // 活动网格上有棋子
    if ($activeGrid.children()[0] != undefined) {
        var $activeChess = $($activeGrid.children()[0]);

        if ($chosenGrid.children()[0] != undefined) {
            var $chosenChess = $($chosenGrid.children()[0]);

            if (($activeChess.hasClass("white") && $chosenChess.hasClass("black")) || ($activeChess.hasClass("black") && $chosenChess.hasClass("white"))) {
                $activeGrid.remove($activeChess);
                $chosenGrid.empty($chosenChess);
                $chosenGrid.append($activeChess);
            }
        } else {
            $activeChess.remove($activeChess);
            $chosenGrid.append($activeChess);
        }
    }

    $chosenGrid.toggleClass("active");
    $activeGrid.toggleClass("active");
    
    // 活动网格的位置转移
    activeGrid = e.currentTarget;
});

function isMargin(grid) {
    var position = getPosition(grid);

    function isMarginTop() {
        if (position[1] == yAxis[7]) {
            return true;
        } else {
            return false;
        }
    }

    function isMarginButtom() {
        if (position[1] == yAxis[0]) {
            return true;
        } else {
            return false;
        }
    }

    function isMarginLeft() {
        if (position[0] == xAxis[0]) {
            return true;
        } else {
            return false;
        }
    }

    function isMarginRight() {
        if (position[0] == xAxis[7]) {
            return true;
        } else {
            return false;
        }
    }

    return {
        marginTop: isMarginTop(), 
        marginRight: isMarginRight(), 
        marginButtom: isMarginButtom(), 
        marginLeft: isMarginLeft()
    };
}

function around(grid) {
    var position  = getPosition(grid);
    var marginCheck = isMargin(grid);

    function north() {
        if (marginCheck.marginTop == true) {
            return undefined;
        } else {
            return $("#"+position[0]+(position[1]+1));
        }
    }

    function east() {
        if (marginCheck.marginRight == true) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])+1]+position[1]);
        }
    }

    function south() {
        if (marginCheck.marginButtom == true) {
            return undefined;
        } else {
            return $("#"+position[0]+(position[1]-1));
        }
    }

    function west() {
        if (marginCheck.marginLeft == true) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])-1]+position[1]);
        }
    }

    function northeast() {
        if (marginCheck.marginTop == true || marginCheck.marginRight == true) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])+1]+(position[1]+1));
        }
    }

    function southeast() {
        if (marginCheck.marginButtom == true || marginCheck.marginRight == true) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])+1]+(position[1]-1));
        }
    }

    function southwest() {
        if (marginCheck.marginButtom == true || marginCheck.marginLeft == true) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])-1]+(position[1]-1));
        }
    }

    function northwest() {
        if (marginCheck.marginTop == true || marginCheck.marginLeft == true) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])-1]+(position[1]+1));
        }
    }

    return [north(), northeast(), east(), southeast(), south(), southwest(), west(), northwest()];
}

