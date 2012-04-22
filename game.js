 var worldrows = 100
 var worldcolumns = 200

 var world = new Array(worldrows)
 for (var ii = 0; ii < world.length; ++ii) {
     world[ii] = new Array(worldcolumns)
 }

 function worldCharAt(row, col) {
     if (row < 0 || col < 0 ||
         row >= worldrows || col >= worldcolumns) {
         return 'X';
     }
     var res = world[row][col];
     if (res === undefined) {
         return " ";
     } else {
         return res.renderChar;
     }
 }

 var turn = 1;

 var objectsThatAct = new Array();

 function isEmpty(row, col) {
     if (row < 0 || col < 0 ||
         row >= worldrows || col >= worldcolumns) {
         return false;
     }
     var o = world[row][col];
     if (o === undefined) return true;
     if (o.renderChar == " " || 
         o.renderChar == "&nbsp") return true;
     return false;
 }

 function addThingToWorld(row, col, thing) {
     if (0 <= row && 0 <= col &&
         row < worldrows && col < worldcolumns) {
         world[row][col] = thing;
         return true;
     } else {
         return false;
     }
 }
 function removeThingFromWorld(row, col) {
     if (0 <= row && 0 <= col &&
         row < worldrows && col < worldcolumns) {
         world[row][col] = undefined
     };
 }

 function GenericThing(char) {
 }

 var player;


 function Player() {
     player = this;
 }

 var turnInterval;
 
 function die() {
     addToWorld(new Array("KABOOM.",
                          "YOU HAVE",
                          "DIED."),
                player.row,
                player.col)
     window.onkeydown = function () {};
     window.clearInterval(turnInterval);

 }

 function Bomb() {
     this.act = 
         (function () {
             if (turn % 2 == 1) {
                 removeThingFromWorld(this.row, this.col);
                 var targetcol = this.col;
                 var targetrow = this.row - 1;
                 if (this.col < player.col) {
                     targetcol = this.col + 1;
                 } else if (this.col > player.col) {
                     targetcol = this.col - 1;
                 }

                 // portals
                 if (worldCharAt(targetrow, targetcol) == 'p') {
                     var p = world[targetrow][targetcol];
                     targetrow = p.other.row + (targetrow - this.row)
                     targetcol = p.other.col + (targetcol - this.col)
                 }


                 if (isEmpty(targetrow, targetcol)) {
                     this.row = targetrow
                     this.col = targetcol
                     return addThingToWorld(this.row, this.col, this);
                 }

                 switch (worldCharAt(targetrow, targetcol)) {
                 case "-":
                 case "+":
                 case "|":
                 case "w":
                     // destroy it.
                     removeThingFromWorld(targetrow, targetcol); 
                     console.log("destroying it");
                     return false;
                     break;
                 case "@" : 
                     die();
                     break;
                 default : 
                     return false;
                 }

             }
             return true;
         })
 }

 function Cannon() {
     this.act =
         (function() {
             if (turn % 21 == 0) {
                 newThing(this.row - 1, this.col, "*");
             }
             return true;

         })
 }

 var scoreObj;

 function Score (s) {
     this.score = s;
     this.parent = undefined;
     this.child = undefined;
     this.shiftRight = (function () {
         if (this.child !== undefined) {
             this.child.shiftRight();
         }
         addThingToWorld(this.row, this.col + 1, this);
         this.col += 1;
     })
     this.increment = (function () {
         this.score += 1;
         if (this.score == 10) {
             this.score = 0;

             if (this.parent === undefined) {
                 console.log("adding score digit");
                 this.shiftRight();
                 this.parent = newThing(this.row, this.col - 1, "1");
                 this.parent.child = this;
             } else {
                 this.parent.increment();
             }

         }
         this.renderChar = String(this.score);
     });
 }

 function Gold () {

 }

 function Silver () {
     this.loc = 0;
     this.reloc = (function () {
         switch (this.loc) {
         case 0:
             this.row = 66;
             this.col = 129;
             addThingToWorld(this.row, this.col, this);
             this.loc = 1;
             break;
         case 1: 
             this.row = 60;
             this.col = 122;
             addThingToWorld(this.row, this.col, this);
             this.loc = 0;
             break;
         default:
         }
     })
 }

 var otherportal = undefined;

 function Portal () {
     if (otherportal === undefined) {
         otherportal = this;
         this.other = undefined;
     } else {
         this.other = otherportal;
         otherportal.other = this;
     }

 }


 function newThing(row, col, char) {
  
     var o;
 
     switch (char) {
     case "@" : // player
         o = new Player();
         player = o;
         break;
     case "0" : // score
         o = new Score(0);
         scoreObj = o;
         break;
     case "1" : // score
         o = new Score(1);
         break;
     case "*" :  // bomb
         o = new Bomb()
         objectsThatAct.push(o);
         break;
     case "C" :  // cannon
         o = new Cannon()
         objectsThatAct.push(o);
         break;
     case "g" : // gold
         o = new Gold();
         break;
     case "s" : // silver
         o = new Silver();
         break;
     case "p" : // portal
         o = new Portal();
         break;
     default :
         o = new GenericThing(char);
     }

     o.renderChar = char;
     o.row = row;
     o.col = col;
     world[row][col] = o;
     return o;

 }

 function addToWorld(stringarray, row, col) {
     for(var i = 0; i < stringarray.length; ++i){
         for(var j = 0; j < stringarray[i].length; ++j) {
             var myrow = i + row;
             var mycol = j + col
             newThing(myrow, mycol, stringarray[i].charAt(j))
         }
     }
 }

 addToWorld(new Array("+-+------+",
                      "|s|      |",
                      "| |      |",
                      "| |      |",
                      "| | @  | |",
                      "|      | |",
                      "|      | |",
                      "|      | |",
                      "+------+-+"),
            59,
            121);

 addToWorld(new Array("+----------+",
                      "|          |",
                      "| +- ----+g|",
                      "| |      |g|",
                      "| | -----+g|",
                      "| |  |   |g|",
                      "| ++ + + |g|",
                      "|  |   |   |",
                      "+- --------+"),
            70,
            20);
            
 addToWorld(Array("ARROW KEYS",
                  "----------",
                  " TO MOVE  ",
                  "----------"),
            74, 121);

 addToWorld(Array("SCORE: 0"),
             51, 101);

 addToWorld(Array("ggg"),
             48, 90);

 addToWorld(Array("=> MUSIC =>"),
            90, 121);

 addToWorld(Array("----------------------",
                  "|||||||ggggg||||||||||",
                  "----------------------"),
            30, 105);
 
 addToWorld(new Array("+-+",
                      "|\u266A|",
                      "+-+"),
            87, 170)

 addToWorld(new Array("+---+",
                      "|   |",
                      "| p |",
                      "|   |",
                      "+---+"),
            94, 169)

 addToWorld(new Array("+---+",
                      "|   |",
                      "| p |",
                      "|   |",
                      "+---+"),
            15, 60)
            
            addToWorld(new Array("  ^",
                                 "  |", 
                                 "  |",
                                 "    ",
                                 "PORTAL"),
                       54, 60)

 addToWorld(
     new Array("A Little Fable",
               "Franz Kafka"),
     4, 150)

 addToWorld(
     new Array("\"Alas,\" said the mouse,",
               "\"the world is growing smaller",
               " every day.\""),
     20, 150)

 addToWorld(
     new Array("\"At the beginning",
               " it was so big that",
               " I was afraid.\""),
     40, 150)

 addToWorld(
     new Array("\"I was glad when",
               " at last I saw the walls",
               " far away to the",
               " right and left,\""),
     60, 150)

 addToWorld(
     new Array("\"but these walls",
               " have narrowed so quickly...\""),
     80, 150)


 var viewportrows = 30;
 var viewportcolumns = 50;

 var viewporti = 50;
 var viewportj = 100;

 function subarrayToString(row, start, end) {
     var res = "";

     if (row < 0 || row >= worldrows) {
         for (var j = start; j < end; ++j) {
             res += 'X';
         }
         return res;
     }

     for (var j = start; j < end; ++j) {
         if (j < 0 || j >= worldcolumns) {
             res += 'X';
         } else if (world[row][j] !== undefined) {
             var c = world[row][j].renderChar;
             res += c;
         } else {
             res += '&nbsp'
         }
     }

     return res.replace(/ /g,'&nbsp');
 }

 function render() {
     var e;
     for (var i = 0; i < viewportrows; ++i) {
         e = document.getElementById('line' + i);
         e.innerHTML = subarrayToString(i + viewporti, viewportj, viewportj + viewportcolumns)
     }
 }

 function takeTurn() {
     var numthings = objectsThatAct.length;
     for (var i = 0; i < numthings; ++i){
         var o = objectsThatAct.shift();
         if (o.act()) {
             objectsThatAct.push(o);
         }
     }
     ++turn;
     render();
 }

function kpress(event) {
// console.log(event)
}

function kup(event) {
// console.log(event)
}

function kdown(event) {
//    console.log(event);
    if (event.which != 0) {
        var targetrow = player.row;
        var targetcol = player.col;
        var move = false;
        switch (event.keyCode) {
        case 37 : // LEFT
            targetcol = player.col - 1;
            move = true;
            break;
        case 38 : // UP
            targetrow = player.row - 1;
            move = true;
            break;
        case 39 : // RIGHT
            targetcol = player.col + 1;
            move = true;
            break;
        case 40 : // DOWN
            targetrow = player.row + 1;
            move = true;
            break;
        default:
        }
        if (move) {
            
            // portals
            if (worldCharAt(targetrow, targetcol) == 'p') {
                var p = world[targetrow][targetcol];
                targetrow = p.other.row + (targetrow - player.row)
                targetcol = p.other.col + (targetcol - player.col)
            }

            if (isEmpty(targetrow, targetcol)) {


                removeThingFromWorld(player.row, player.col);
                addThingToWorld(targetrow, targetcol, player);
                player.row = targetrow;
                player.col = targetcol;
            } else {
                switch (worldCharAt(targetrow, targetcol)) {
                case "s":
                    world[targetrow][targetcol].reloc();
                    removeThingFromWorld(player.row, player.col);
                    addThingToWorld(targetrow, targetcol, player);
                    player.row = targetrow;
                    player.col = targetcol;
                    scoreObj.increment();

                    break;
                case "g":
                    removeThingFromWorld(player.row, player.col);
                    addThingToWorld(targetrow, targetcol, player);
                    player.row = targetrow;
                    player.col = targetcol;
                    for (var i = 0; i < 100; ++i) { scoreObj.increment(); }
                    break;
                case "*":
                    removeThingFromWorld(targetrow, targetcol);
                    die();
                    render();
                    return true;
                    break;
                case '\u266A': //music
                    removeThingFromWorld(player.row, player.col);
                    addThingToWorld(targetrow, targetcol, player);
                    player.row = targetrow;
                    player.col = targetcol;
                    document.getElementById('music').play();
                    break;
                default:

                }
                
            }


            if (player.col < viewportj + 8) {
                viewportj = player.col - 8;
            }
            if (player.row < viewporti + 4) {
                viewporti = player.row - 4;
            }
            if (player.col > viewportj + viewportcolumns - 8) {
                viewportj = player.col - viewportcolumns + 8;
            }
            if (player.row > viewporti + viewportrows - 4) {
                viewporti = player.row - viewportrows + 4;
            }
        }
        
    } else {
        // default action.
        return true;
    }

    render();

    return true;
}


turnInterval = window.setInterval(takeTurn, 200);
window.onkeypress = kpress;
window.onkeyup = kup;
window.onkeydown = kdown;
