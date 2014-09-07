/**
 * Returns a list of the permutations of combinations of letters.
 */
function letterCombos(letters) {
  return combos(letters).reduce(function(result, combo) {
    return result.concat(perms(combo));
  }, []);
}

/**
 * Returns a list of the permutations of letters.
 */
function perms(letters) {
  if (letters.length < 1) return [[]];
  return letters.reduce(function(result, letter, i, letters) {
    var withoutLetter = perms(others(letters, i));
    var withLetter = copy(withoutLetter).map(function(perm) {
      perm.unshift(letter);
      return perm;
    });
    return result.concat(withLetter);
  }, []);
}

/**
 * Returns a list of the combinations of letters.
 */
function combos(letters) {
  if (letters.length < 1) return [[]];
  var withoutLetter = combos(tail(letters));
  var withLetter = copy(withoutLetter).map(function(combo) {
    combo.unshift(head(letters));
    return combo;
  });
  return [].concat(withLetter, withoutLetter);
}

/**
 * List helper functions
 */

/**
 * Returns the first element of the list.
 */
function head(list) {
  return list[0];
}

/**
 * Returns a new list with the first element removed from the original.
 */
function tail(list) {
  return list.slice(1);
}

/**
 * Returns a new list with the i-th element removed from the original.
 */
function others(list, i) {
  var removed = copy(list);
  removed.splice(i, 1);
  return removed;
}

/**
 * Returns a deep copy of the list.
 */
function copy(list) {
  return list.map(function(e) {
    if (e instanceof Array) return copy(e);
    return e;
  });
}

module.exports = letterCombos;
