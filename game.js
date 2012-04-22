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
                 world[this.row][this.col] = newThing(this.row, this.col, "&nbsp");
                 this.row -= 1;
                 if (this.col < player.col) {
                     this.col += 1;
                 } else if (this.col > player.col) {
                     this.col -= 1;
                 }
                 world[this.row][this.col] = this;

             }
         })
 }

 function Cannon() {
     this.act =
         (function() {
             if (turn % 10 == 0) {
                 console.log("boom")
                 newThing(this.row - 1, this.col, "B");
             }

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



 function subarrayToString(arr, start, end) {
     var res = "";
     for (var j = start; j < end; ++j) {
         if (arr[j] !== undefined) {
             res += arr[j].renderChar;
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
         e.innerHTML = subarrayToString(world[i + viewporti], viewportj, viewportj + viewportcolumns)
     }
 }

 function takeTurn() {
     for (var i = 0; i < objectsThatAct.length; ++i){
         var o = objectsThatAct[i];
         o.act();
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
