/*
    game.js: 实现游戏逻辑
*/

function game() {
    // 棋盘的横坐标轴
    var xAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];

    // 棋盘的纵坐标轴
    var yAxis = [1, 2, 3, 4, 5, 6, 7, 8];

    // 棋子走一步的路线所包含的始末位置, 例如["A8", "A6"]表示棋子从A8格走到A6格
    var action = [];

    // 获取网格的ID
    function getPosition(grid) {
        var gridId = $(grid).attr("id");
        var x = gridId[0];
        var y = parseInt(gridId[1]);

        return [x, y];
    }

    // 将军
    function checkmate(piece) {
        var attackableGrids = attackableScope(piece);
        for (var gridId of attackableGrids) {
            var grid = $("#"+gridId);
            if ($(grid.children()[0]).hasClass("king")) {
                grid.toggleClass("checkmate");
            }
        }
    }

    function clearBaforeMove() {
        $(".grid.checkmate").removeClass("checkmate");
    }

    function clearAfterMove() {
        $(".grid.active").removeClass("active");
        $(".grid.movable-scope").removeClass("movable-scope");
        $(".grid.attackable-scope").removeClass("attackable-scope");
    }

    $(".grid").click(function () {
        clearBaforeMove();

        var $grid = $(this);
        var movableGrids = [];
        var attackableGrids = [];
        $grid.toggleClass("active");

        if ($grid.children().length == 1) {
            var $piece1 = $($grid.children()[0]);
            movableGrids = movableScope($piece1);
            attackableGrids = attackableScope($piece1);
        }

        action.push(getPosition($grid).join(""));
        if (action.length == 2) {
            var $fromGrid = $("#"+action[0]);
            var $toGrid = $("#"+action[1]);

            if ($fromGrid.children()[0] != undefined) {
                var $piece1 = $($fromGrid.children()[0]);
                movableGrids = movableScope($piece1);
                attackableGrids = attackableScope($piece1);

                if ($toGrid.children()[0] != undefined) {
                    var $piece2 = $($toGrid.children()[0]);

                    if ($piece1.attr("color") != $piece2.attr("color")) {
                        if (movableGrids.indexOf(action[1]) != -1 || attackableGrids.indexOf(action[1]) != -1) {
                            $fromGrid.remove($piece1);
                            $toGrid.empty($piece2);
                            $toGrid.append($piece1);

                            $fromGrid.toggleClass("active");
                            $toGrid.toggleClass("active");

                            console.log($piece1.parent());
                            checkmate($piece1);
                            
                        } else {
                            console.log("invalid move");
                        }                   
                    }
                } else {
                    if (movableGrids.indexOf(action[1]) != -1 || attackableGrids.indexOf(action[1]) != -1) {
                        $fromGrid.remove($piece1);
                        $toGrid.append($piece1);

                        $fromGrid.toggleClass("active");
                        $toGrid.toggleClass("active");

                        console.log($piece1.parent());
                        checkmate($piece1);
                    } else {
                        console.log("invalid move");
                    }
                    
                }

                if ($piece1.hasClass("initial")) {
                    $piece1.removeClass("initial");
                }
            }

            clearAfterMove();

            action = [];
        }
    });

    function movableScope(piece) {
        var scope = [];
        var position = getPosition(piece.parent());

        // 士兵
        if (piece.hasClass("pawn")) {
            if (piece.hasClass("white")) {
                if (piece.hasClass("initial")) {
                    for (var i = 1; i <= 2; i++) {
                        var $grid = $("#"+position[0]+(position[1]+i));
                        if ($grid.children().length == 0) {
                            $grid.toggleClass("movable-scope");
                            scope.push($grid.attr("id"));
                        }
                    }
                } else {
                    for (var i = 1; i <= 1; i++) {
                        var $grid = $("#"+position[0]+(position[1]+i));
                        if ($grid.children().length == 0) {
                            $grid.toggleClass("movable-scope");
                            scope.push($grid.attr("id"));
                        }
                    }
                }
            } else {
                if (piece.hasClass("initial")) {
                    for (var i = 1; i <= 2; i++) {
                        var $grid = $("#"+position[0]+(position[1]-i));
                        if ($grid.children().length == 0) {
                            $grid.toggleClass("movable-scope");
                            scope.push($grid.attr("id"));
                        }
                    }
                } else {
                    for (var i = 1; i <= 1; i++) {
                        var $grid = $("#"+position[0]+(position[1]-i));
                        if ($grid.children().length == 0) {
                            $grid.toggleClass("movable-scope");
                            scope.push($grid.attr("id"));
                        }
                    }
                }
            }

            return scope;
        }

        // 国王
        if (piece.hasClass("king")) {
            for (var grid of around(piece.parent())) {
                if (grid != undefined && grid.children(".chess").length == 0) {
                    grid.toggleClass("movable-scope");
                    scope.push(grid.attr("id"));
                }
            }

            return scope;
        }

        // 王后
        if (piece.hasClass("queen")) {
            var centerGrid = piece.parent();

            var topGrid = top(centerGrid);            
            while (topGrid != undefined) {
                if (topGrid.children().length == 0) {
                    topGrid.toggleClass("movable-scope");
                    scope.push(topGrid.attr("id"));
                    topGrid = top(topGrid);
                } else {
                    break;
                }
            }

            var toprightGrid = topright(centerGrid);
            while (toprightGrid != undefined) {
                if (toprightGrid.children().length == 0) {
                    toprightGrid.toggleClass("movable-scope");
                    scope.push(toprightGrid.attr("id"));
                    toprightGrid = topright(toprightGrid);
                } else {
                    break;
                }
            }

            var rightGrid = right(centerGrid);
            while (rightGrid != undefined) {
                if (rightGrid.children().length == 0) {
                    rightGrid.toggleClass("movable-scope");
                    scope.push(rightGrid.attr("id"));
                    rightGrid = right(rightGrid);
                } else {
                    break;
                }
            }

            var bottomrightGrid = bottomright(centerGrid);
            while (bottomrightGrid != undefined) {
                if (bottomrightGrid.children().length == 0) {
                    bottomrightGrid.toggleClass("movable-scope");
                    scope.push(bottomrightGrid.attr("id"));
                    bottomrightGrid = bottomright(bottomrightGrid);
                } else {
                    break;
                }
            }

            var bottomGrid = bottom(centerGrid);
            while (bottomGrid != undefined) {
                if (bottomGrid.children().length == 0) {
                    bottomGrid.toggleClass("movable-scope");
                    scope.push(bottomGrid.attr("id"));
                    bottomGrid = bottom(bottomGrid);
                } else {
                    break;
                }
            }

            var bottomleftGrid = bottomleft(centerGrid);
            while (bottomleftGrid != undefined) {
                if (bottomleftGrid.children().length == 0) {
                    bottomleftGrid.toggleClass("movable-scope");
                    scope.push(bottomleftGrid.attr("id"));
                    bottomleftGrid = bottomleft(bottomleftGrid);
                } else {
                    break;
                }
            }

            var leftGrid = left(centerGrid);
            while (leftGrid != undefined) {
                if (leftGrid.children().length == 0) {
                    leftGrid.toggleClass("movable-scope");
                    scope.push(leftGrid.attr("id"));
                    leftGrid = left(leftGrid);
                } else {
                    break;
                }
            }

            var topleftGrid = topleft(centerGrid);
            while (topleftGrid != undefined) {
                if (topleftGrid.children().length == 0) {
                    topleftGrid.toggleClass("movable-scope");
                    scope.push(topleftGrid.attr("id"));
                    topleftGrid = topleft(topleftGrid);
                } else {
                    break;
                }
             }

            return scope;
        }

        // 主教
        if (piece.hasClass("bishop")) {
            var centerGrid = piece.parent();

            var toprightGrid = topright(centerGrid);
            while (toprightGrid != undefined) {
                if (toprightGrid.children().length == 0) {
                    toprightGrid.toggleClass("movable-scope");
                    scope.push(toprightGrid.attr("id"));
                    toprightGrid = topright(toprightGrid);
                } else {
                    break;
                }
            }

            var bottomrightGrid = bottomright(centerGrid);
            while (bottomrightGrid != undefined) {
                if (bottomrightGrid.children().length == 0) {
                    bottomrightGrid.toggleClass("movable-scope");
                    scope.push(bottomrightGrid.attr("id"));
                    bottomrightGrid = bottomright(bottomrightGrid);
                } else {
                    break;
                }
            }

            var bottomleftGrid = bottomleft(centerGrid);
            while (bottomleftGrid != undefined) {
                if (bottomleftGrid.children().length == 0) {
                    bottomleftGrid.toggleClass("movable-scope");
                    scope.push(bottomleftGrid.attr("id"));
                    bottomleftGrid = bottomleft(bottomleftGrid);
                } else {
                    break;
                }
            }

            var topleftGrid = topleft(centerGrid);
            while (topleftGrid != undefined) {
                if (topleftGrid.children().length == 0) {
                    topleftGrid.toggleClass("movable-scope");
                    scope.push(topleftGrid.attr("id"));
                    topleftGrid = topleft(topleftGrid);
                } else {
                    break;
                }
             }

            return scope;
        }

        // 城堡
        if (piece.hasClass("rook")) {
            var centerGrid = piece.parent();

            var topGrid = top(centerGrid);            
            while (topGrid != undefined) {
                if (topGrid.children().length == 0) {
                    topGrid.toggleClass("movable-scope");
                    scope.push(topGrid.attr("id"));
                    topGrid = top(topGrid);
                } else {
                    break;
                }
            }

            var rightGrid = right(centerGrid);
            while (rightGrid != undefined) {
                if (rightGrid.children().length == 0) {
                    rightGrid.toggleClass("movable-scope");
                    scope.push(rightGrid.attr("id"));
                    rightGrid = right(rightGrid);
                } else {
                    break;
                }
            }

            var bottomGrid = bottom(centerGrid);
            while (bottomGrid != undefined) {
                if (bottomGrid.children().length == 0) {
                    bottomGrid.toggleClass("movable-scope");
                    scope.push(bottomGrid.attr("id"));
                    bottomGrid = bottom(bottomGrid);
                } else {
                    break;
                }
            }

            var leftGrid = left(centerGrid);
            while (leftGrid != undefined) {
                if (leftGrid.children().length == 0) {
                    leftGrid.toggleClass("movable-scope");
                    scope.push(leftGrid.attr("id"));
                    leftGrid = left(leftGrid);
                } else {
                    break;
                }
            }

            return scope;
        }
    }

    function attackableScope(piece) {
        var scope = [];

        // 士兵
        if (piece.hasClass("pawn")) {
            var aroundGrids = around(piece.parent());

            if (piece.hasClass("white")) {
                var topLeftGrid = aroundGrids[7];
                var topRightGrid = aroundGrids[1];
                for (var grid of [topLeftGrid, topRightGrid]) {
                    if (grid != undefined && grid.children().length == 1 && $(grid.children()[0]).attr("color") != piece.attr("color")) {
                        grid.toggleClass("attackable-scope");
                        scope.push(grid.attr("id"));
                    }
                }            
            } else {
                var bottomLeftGrid = aroundGrids[5];
                var bottomRightGrid = aroundGrids[3];

                for (var grid of [bottomLeftGrid, bottomRightGrid]) {
                    if (grid != undefined && grid.children().length == 1 && $(grid.children()[0]).attr("color") != piece.attr("color")) {
                        grid.toggleClass("attackable-scope");
                        scope.push(grid.attr("id"));
                    }
                }
            }
            return scope;
        }

        // 国王
        if (piece.hasClass("king")) {
            for (var grid of around(piece.parent())) {
                if (grid != undefined && grid.children().length == 1 && $(grid.children()[0]).attr("color") != piece.attr("color")) {
                    grid.toggleClass("attackable-scope");
                    scope.push(grid.attr("id"));
                }
            }
            return scope;
        }

        // 王后
        if (piece.hasClass("queen")) {
            var centerGrid = piece.parent();

            var topGrid = top(centerGrid);            
            while (topGrid != undefined) {
                if (topGrid.children().length == 1) {
                    if ($(topGrid.children()[0]).attr("color") != piece.attr("color")) {
                        topGrid.toggleClass("attackable-scope");
                        scope.push(topGrid.attr("id"));                        
                    }
                    break;                   
                } else {
                    topGrid = top(topGrid);
                }
            }

            var toprightGrid = topright(centerGrid);
            while (toprightGrid != undefined) {
                if (toprightGrid.children().length == 1) {
                    if ($(toprightGrid.children()[0]).attr("color") != piece.attr("color")) {
                        toprightGrid.toggleClass("attackable-scope");
                        scope.push(toprightGrid.attr("id"));                        
                    }
                    break;
                } else {
                    toprightGrid = topright(toprightGrid);
                }
            }

            var rightGrid = right(centerGrid);
            while (rightGrid != undefined) {
                if (rightGrid.children().length == 1) {
                    if ($(rightGrid.children()[0]).attr("color") != piece.attr("color")) {
                        rightGrid.toggleClass("attackable-scope");
                        scope.push(rightGrid.attr("id"));                        
                    }
                    break;
                } else {
                    rightGrid = right(rightGrid);
                }
            }

            var bottomrightGrid = bottomright(centerGrid);
            while (bottomrightGrid != undefined) {
                if (bottomrightGrid.children().length == 1) {
                    if ($(bottomrightGrid.children()[0]).attr("color") != piece.attr("color")) {
                        bottomrightGrid.toggleClass("attackable-scope");
                        scope.push(bottomrightGrid.attr("id"));
                    }
                    break;
                } else {
                    bottomrightGrid = bottomright(bottomrightGrid);
                }
            }

            var bottomGrid = bottom(centerGrid);
            while (bottomGrid != undefined) {
                if (bottomGrid.children().length == 1) {
                    if ($(bottomGrid.children()[0]).attr("color") != piece.attr("color")) {
                        bottomGrid.toggleClass("attackable-scope");
                        scope.push(bottomGrid.attr("id"));
                    }
                    break;
                } else {
                    bottomGrid = bottom(bottomGrid);
                }
            }

            var bottomleftGrid = bottomleft(centerGrid);
            while (bottomleftGrid != undefined) {
                if (bottomleftGrid.children().length == 1) {
                    if ($(bottomleftGrid.children()[0]).attr("color") != piece.attr("color")) {
                        bottomleftGrid.toggleClass("attackable-scope");
                        scope.push(bottomleftGrid.attr("id"));
                    }
                    break;
                } else {
                    bottomleftGrid = bottomleft(bottomleftGrid);
                }
            }

            var leftGrid = left(centerGrid);
            while (leftGrid != undefined) {
                if (leftGrid.children().length == 1) {
                    if ($(leftGrid.children()[0]).attr("color") != piece.attr("color")) {
                        leftGrid.toggleClass("attackable-scope");
                        scope.push(leftGrid.attr("id"));
                    }
                    break;
                } else {
                    leftGrid = left(leftGrid);
                }
            }

            var topleftGrid = topleft(centerGrid);            
            while (topleftGrid != undefined) {
                if (topleftGrid.children().length == 1) {
                    if ($(topleftGrid.children()[0]).attr("color") != piece.attr("color")) {
                        topleftGrid.toggleClass("attackable-scope");
                        scope.push(topleftGrid.attr("id"));                        
                    }
                    break;                   
                } else {
                    topleftGrid = topleft(topleftGrid);
                }
            }

            return scope;
        }


        // 主教
        if (piece.hasClass("bishop")) {
            var centerGrid = piece.parent();

            var toprightGrid = topright(centerGrid);
            while (toprightGrid != undefined) {
                if (toprightGrid.children().length == 1) {
                    if ($(toprightGrid.children()[0]).attr("color") != piece.attr("color")) {
                        toprightGrid.toggleClass("attackable-scope");
                        scope.push(toprightGrid.attr("id"));                        
                    }
                    break;
                } else {
                    toprightGrid = topright(toprightGrid);
                }
            }

            var bottomrightGrid = bottomright(centerGrid);
            while (bottomrightGrid != undefined) {
                if (bottomrightGrid.children().length == 1) {
                    if ($(bottomrightGrid.children()[0]).attr("color") != piece.attr("color")) {
                        bottomrightGrid.toggleClass("attackable-scope");
                        scope.push(bottomrightGrid.attr("id"));
                    }
                    break;
                } else {
                    bottomrightGrid = bottomright(bottomrightGrid);
                }
            }

            var bottomleftGrid = bottomleft(centerGrid);
            while (bottomleftGrid != undefined) {
                if (bottomleftGrid.children().length == 1) {
                    if ($(bottomleftGrid.children()[0]).attr("color") != piece.attr("color")) {
                        bottomleftGrid.toggleClass("attackable-scope");
                        scope.push(bottomleftGrid.attr("id"));
                    }
                    break;
                } else {
                    bottomleftGrid = bottomleft(bottomleftGrid);
                }
            }

            var topleftGrid = topleft(centerGrid);            
            while (topleftGrid != undefined) {
                if (topleftGrid.children().length == 1) {
                    if ($(topleftGrid.children()[0]).attr("color") != piece.attr("color")) {
                        topleftGrid.toggleClass("attackable-scope");
                        scope.push(topleftGrid.attr("id"));                        
                    }
                    break;                   
                } else {
                    topleftGrid = topleft(topleftGrid);
                }
            }

            return scope;
        }


        // 城堡
        if (piece.hasClass("rook")) {
            var centerGrid = piece.parent();

            var topGrid = top(centerGrid);            
            while (topGrid != undefined) {
                if (topGrid.children().length == 1) {
                    if ($(topGrid.children()[0]).attr("color") != piece.attr("color")) {
                        topGrid.toggleClass("attackable-scope");
                        scope.push(topGrid.attr("id"));                        
                    }
                    break;                   
                } else {
                    topGrid = top(topGrid);
                }
            }

            var rightGrid = right(centerGrid);
            while (rightGrid != undefined) {
                if (rightGrid.children().length == 1) {
                    if ($(rightGrid.children()[0]).attr("color") != piece.attr("color")) {
                        rightGrid.toggleClass("attackable-scope");
                        scope.push(rightGrid.attr("id"));                        
                    }
                    break;
                } else {
                    rightGrid = right(rightGrid);
                }
            }

            var bottomGrid = bottom(centerGrid);
            while (bottomGrid != undefined) {
                if (bottomGrid.children().length == 1) {
                    if ($(bottomGrid.children()[0]).attr("color") != piece.attr("color")) {
                        bottomGrid.toggleClass("attackable-scope");
                        scope.push(bottomGrid.attr("id"));
                    }
                    break;
                } else {
                    bottomGrid = bottom(bottomGrid);
                }
            }

            var leftGrid = left(centerGrid);
            while (leftGrid != undefined) {
                if (leftGrid.children().length == 1) {
                    if ($(leftGrid.children()[0]).attr("color") != piece.attr("color")) {
                        leftGrid.toggleClass("attackable-scope");
                        scope.push(leftGrid.attr("id"));
                    }
                    break;
                } else {
                    leftGrid = left(leftGrid);
                }
            }

            return scope;
        }
    }

    function isMarginTop(grid) {
        var position = getPosition(grid);
        return position[1] == yAxis[7];
    }

    function isMarginBottom(grid) {
        var position = getPosition(grid);
        return position[1] == yAxis[0];
    }

    function isMarginLeft(grid) {
        var position = getPosition(grid);
        return position[0] == xAxis[0];
    }

    function isMarginRight(grid) {
        var position = getPosition(grid);
        return position[0] == xAxis[7];
    }

    function top(grid) {
        var position = getPosition(grid);
        if (isMarginTop(grid) == true) {
            return undefined;
        } else {
            return $("#"+position[0]+(position[1]+1));
        }
    }

    function bottom(grid) {
        var position = getPosition(grid);
        if (isMarginBottom(grid) == true) {
            return undefined;
        } else {
            return $("#"+position[0]+(position[1]-1));
        }
    }

    function left(grid) {
        var position = getPosition(grid);
        if (isMarginLeft(grid) == true) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])-1]+position[1]);
        }        
    }

    function right(grid) {
        var position = getPosition(grid);
        if (isMarginRight(grid) == true) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])+1]+position[1]);
        }
    }

    function topleft(grid) {
        var position = getPosition(grid);
        if (isMarginTop(grid) || isMarginLeft(grid)) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])-1]+(position[1]+1));
        }
    }

    function topright(grid) {
        var position = getPosition(grid);
        if (isMarginTop(grid) || isMarginRight(grid)) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])+1]+(position[1]+1));
        }
    }

    function bottomleft(grid) {
        var position = getPosition(grid);
        if (isMarginBottom(grid) || isMarginLeft(grid)) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])-1]+(position[1]-1));
        }
    }

    function bottomright(grid) {
        var position = getPosition(grid);
        if (isMarginBottom(grid) || isMarginRight(grid)) {
            return undefined;
        } else {
            return $("#"+xAxis[xAxis.indexOf(position[0])+1]+(position[1]-1));
        }
    }

    function isMargin(grid) {
        return {
            marginTop: isMarginTop(grid), 
            marginRight: isMarginRight(grid), 
            marginButtom: isMarginBottom(grid), 
            marginLeft: isMarginLeft(grid)
        };
    }

    function around(grid) {
        return [top(grid), topright(grid), right(grid), bottomright(grid), bottom(grid), bottomleft(grid), left(grid), topleft(grid)];
    }
}

game();

