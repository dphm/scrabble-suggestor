var fs = require('fs');

function Trie(value, children) {
  this.value = value || '';
  this.children = children || [];
};

/**
 * Loads each line from a file into a new trie.
 */
Trie.load = function(filename) {
  var trie = new Trie();

  var lines = fs.readFileSync(filename, 'utf8').split('\n');
  lines.forEach(function(line) {
    trie.insert(line);
  });

  return trie;
};

Trie.prototype = {
  /**
   * Inserts the string into the trie.
   */
  insert: function(str) {
    str = str.toLowerCase();

    // Get the subtrie and substring to insert.
    var toInsert = afterMatch({ trie: this, str: str });

    if (toInsert.str.length > 0) {
      // Insert substring into subtrie.
      toInsert.trie.children.push(toTrie(toInsert.str));
    }

    return this;
  },

  /**
   * Returns true if the string is in the trie.
   */
  lookup: function(str) {
    str = str.toLowerCase();

    // Find the end of the string in the trie after matching.
    return afterMatch({ trie: this, str: str }).trie === null;
  }

  // TODO: delete
}

/**
 * TRIE HELPERS
 */

/**
 * Returns true if the trie node's value matches the given value.
 */
function matchesValue(trie, value) {
  return trie.value === value;
}

/**
 * Returns true if the trie node is the end of a string.
 */
function matchesEnd(trie) {
  // The trie node is the end of a string if it has a null child.
  return trie.children.some(function(child) { return child === null });
}

/**
 * Returns the matching trie if the first character
 * in the string matches the value of the trie node.
 */
function trieMatchingFirstChar(tries, str) {
  var matches = tries.filter(function(trie) {
    return trie !== null && matchesValue(trie, head(str));
  });
  if (matches.length > 0) return matches[0];
  return false;
}

/**
 * Takes an object { trie, str }. Returns an object { trie, str },
 * containing the subtrie and substring left after prefixes of the
 * given trie and given string have been matched.
 */
function afterMatch(data) {
  var trie = data.trie;
  var str = data.str;

  if (str.length > 0) {
    // Get the subtrie matching the first character of the string.
    var subtrie = trieMatchingFirstChar(trie.children, str);
    if (subtrie) {
      // Continue matching on the subtrie and the rest of the string.
      return afterMatch({ trie: subtrie, str: tail(str) });
    }
  } else {
    if (matchesEnd(trie)) {
      // Return a null trie if the whole string was matched.
      return { trie: null, str: '' };
    }
  }

  // Return the subtrie and substring when they no longer match.
  return { trie: trie, str: str };
}

/**
 * STRING HELPERS
 */

/**
 * Returns the first character of the string.
 */
function head(str) {
  return str[0];
}

/**
 * Returns the string without the first character.
 */
function tail(str) {
  return str.slice(1);
}

/**
 * Returns the trie representation of the string.
 */
function toTrie(str) {
  str = str || '';
  if (str === '') {
    // Return a null trie at the end of the string.
    return null;
  } else {
    // Add the rest of the string to the head node's children.
    return new Trie(head(str), [toTrie(tail(str))]);
  }
}

module.exports = Trie;
