/**
 * a HUD container and child items
 */

var url = "http://shtike.scriptrapps.io/Nasa/getDay";
var day;
fetch(url).then(function(response) {return response.json()}).then(function (json){
       day = json;
})
url = "http://shtike.scriptrapps.io/Nasa/getMonth";
var month;
fetch(url).then(function(response) {return response.json()}).then(function (json){
    month = json;
})
url = "http://shtike.scriptrapps.io/Nasa/getYear";
var year; 
fetch(url).then(function(response) {return response.json()}).then(function (json){
    year = json;
})

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(132, 25));
    }
});


/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend( {
  /**
   * constructor
   */
  init : function (x, y) {
    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 132, 100]);

    // create a font
    this.font = new me.BitmapFont("32x32_font", 32);
    this.font.set("left");

    // local copy of the global score
    this.score = -1;
  },

  /**
   * update function
   */
  update : function (dt) {
    // we don't draw anything fancy here, so just
    // return true if the score has been updated
    if (this.score !== game.data.score) {
      this.score = game.data.score;
      return true;
    }
    return false;
  },

  /**
   * draw the score
   */
  draw : function (renderer) {
    string = "C:" + game.data.score + " T:" + Math.floor((Date.now() - me.game.start) / 1000) + " " + month + "/" + day + "/" + year;

    this.font.draw (renderer, string, this.pos.x, this.pos.y);
  }
});