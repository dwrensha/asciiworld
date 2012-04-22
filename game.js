 var worldrows = 100
 var worldcolumns = 200

 var world = new Array(worldrows)
 for (var ii = 0; ii < world.length; ++ii) {
     world[ii] = new Array(worldcolumns)
 }

 var turn = 1;

 var objectsThatAct = new Array();

 function isEmpty(row, col) {
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

 function Bomb() {
     this.act = 
         (function () {
             if (turn % 2 == 1) {
                 console.log("crawl");
                 removeThingFromWorld(this.row, this.col);
                 this.row -= 1;
                 if (this.col < player.col) {
                     this.col += 1;
                 } else if (this.col > player.col) {
                     this.col -= 1;
                 }
                 return addThingToWorld(this.row, this.col, this);
             }
             return true;
         })
 }

 function Cannon() {
     this.act =
         (function() {
             if (turn % 10 == 0) {
                 console.log("boom")
                 newThing(this.row - 1, this.col, "B");
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


 function newThing(row, col, char) {
  
     var o;
 
     switch (char) {
     case "@" : // player
         o = new Player();
         break;
     case "0" : // score
         o = new Score(0);
         scoreObj = o;
         break;
     case "1" : // score
         o = new Score(1);
         break;
     case "B" :  // bomb
         o = new Bomb()
         objectsThatAct.push(o);
         break;
     case "C" :  // cannon
         o = new Cannon()
         objectsThatAct.push(o);
         break;
     case "g" : // gold
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

 addToWorld(new Array("WWWWWWWWWW",
                      "W W      W",
                      "W W      W",
                      "W W      W",
                      "W W @  W W",
                      "W      W W",
                      "W      W W",
                      "W      W W",
                      "WWwWWWWWWW"),
            59,
            122);
            
 addToWorld(Array("ARROW KEYS",
                  "          ",
                  "  TO MOVE "),
            76, 123);

 addToWorld(Array("SCORE: 0"),
             51, 101);
 
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
//             if (c.length > 1) {
//                 j += c.length - 1;
//             }
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
     console.log("stuff: " + objectsThatAct.length);
     ++turn;
     scoreObj.increment();

 }

function kpress(event) {
 console.log(event)
}

function kup(event) {
 console.log(event)
}

function kdown(event) {
    console.log(event);
    if (event.which != 0)
        switch (event.keyCode) {
        case 37 : // LEFT
            viewportj -= 1;
            break;
        case 38 : // UP
            viewporti -= 1;
            break;
        case 39 : // RIGHT
            viewportj += 1;
            break;
        case 40 : // DOWN
            viewporti += 1;
            break;
        default:
        }
    else {
        // default action.
        return true;
    }

    takeTurn();
    render();

    return true;
}

window.onkeypress = kpress;
window.onkeyup = kup;
window.onkeydown = kdown;
