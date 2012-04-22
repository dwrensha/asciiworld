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
         world[row][col] = newThing(row, col, "&nbsp");
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



 function newThing(row, col, char) {
  
     var o;
 
     switch (char) {
     case "@" : // player
         o =  new Player();
         break;
     case "B" :  // bomb
         o = new Bomb()
         objectsThatAct.push(o);
         break;
     case "C" :  // cannon
         o = new Cannon()
         objectsThatAct.push(o);
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

 addToWorld(Array("SCORE:"),
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
             res += world[row][j].renderChar;
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
