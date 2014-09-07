var Scrabble = {
  Bag: function() {
    this.tiles = {
      A: { value:  1, quantity:  9 },
      B: { value:  3, quantity:  2 },
      C: { value:  3, quantity:  2 },
      D: { value:  2, quantity:  4 },
      E: { value:  1, quantity: 12 },
      F: { value:  4, quantity:  2 },
      G: { value:  2, quantity:  3 },
      H: { value:  4, quantity:  2 },
      I: { value:  1, quantity:  9 },
      J: { value:  8, quantity:  1 },
      K: { value:  5, quantity:  1 },
      L: { value:  1, quantity:  4 },
      M: { value:  3, quantity:  2 },
      N: { value:  1, quantity:  6 },
      O: { value:  1, quantity:  8 },
      P: { value:  3, quantity:  2 },
      Q: { value: 10, quantity:  1 },
      R: { value:  1, quantity:  6 },
      S: { value:  1, quantity:  4 },
      T: { value:  1, quantity:  6 },
      U: { value:  1, quantity:  4 },
      V: { value:  4, quantity:  2 },
      W: { value:  4, quantity:  2 },
      X: { value:  8, quantity:  1 },
      Y: { value:  4, quantity:  2 },
      Z: { value: 10, quantity:  1 },
      _: { value:  0, quantity:  2 }
    }
  },

  Tile: function(letter, value) {
    this.letter = letter;
    this.value = value;
  },

  Hand: function(bag) {
    this.bag = bag;
    this.tiles = bag.drawTiles(7);
  }
}

Scrabble.Bag.prototype = {
  /**
   * Draws one random tile from the bag.
   */
  drawTile: function() {
    var i = Math.floor(Math.random() * 27);
    var letter = Object.keys(this.tiles)[i];

    if (this.tiles[letter].quantity < 1) {
      // Draw a new tile if there are none left for that letter.
      return this.drawTile();
    } else {
      this.tiles[letter].quantity--;
      return new Scrabble.Tile(letter, this.tiles[letter].value);
    }
  },

  /**
   * Draws n random tiles from the bag.
   */
  drawTiles: function(n) {
    var tiles = [];
    for (var i = 0; i < n; i++) {
      tiles.push(this.drawTile());
    }
    return tiles;
  }
};

Scrabble.Hand.prototype = {
  /**
   * Returns a list of the letters of the tiles in the hand.
   */
  letters: function() {
    return this.tiles.map(function(tile) {
      return tile.letter;
    });
  }
}

module.exports = Scrabble;
