#! usr/local/bin/node

var Trie = require('./trie');
var Scrabble = require('./scrabble');
var letterCombos = require('./letter_combos');

/**
 * Returns a list of valid combos that can be made with the list of letters
 */
function validCombos(dictionary, letters) {
  return letterCombos(letters).filter(function(combo) {
    var word = combo.join('');
    return dictionary.lookup(word);
  });
}

/**
 * Returns a list of valid words that can be made with the list of letters
 */
function validWords(dictionary, letters) {
  return validCombos(dictionary, letters).map(function(combo) {
    return combo.join('');
  });
}

/**
 * Gets up to seven letters from the command line arguments
 * if there are any, otherwise returns seven letters from a
 * simulated Scrabble hand.
 */
function getLetters() {
  var args = process.argv.slice(2);
  if (args.length > 0) {
    // Split up letters.
    args = args.reduce(function(acc, arg) {
      return acc.concat(arg.split(''));
    }, []);

    // Take up to the first seven letters.
    var end = Math.min(args.length, 7);
    return args.slice(0, end);
  } else {
    console.log('Simulating a random hand...');
    var bag = new Scrabble.Bag();
    var hand = new Scrabble.Hand(bag);

    return hand.letters();
  }
}

// Use the Official Scrabble Players Dictionary.
var dictionary = Trie.load('./ospd.txt');
var letters = getLetters();

console.log('Letters:', letters);
console.log('Valid words:', validWords(dictionary, letters));
