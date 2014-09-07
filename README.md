Scrabble Suggestor
==================

A command line tool for suggesting valid Scrabble words, using the Official Scrabble Players Dictionary

Usage
-----

    node scrabble_suggestor.js [letters]

Examples
--------

    $ node scrabble_suggestor.js dags
    Letters: [ 'd', 'a', 'g', 's' ]
    Valid words: [ 'dags',
      'gads',
      'dag',
      'gad',
      'ads',
      'sad',
      'da',
      'ad',
      'gas',
      'sag',
      'ag',
      'as' ]

    $ node scrabble_suggestor.js P T S O
    Letters: [ 'P', 'T', 'S', 'O' ]
    Valid words: [ 'POTS',
      'POST',
      'TOPS',
      'SPOT',
      'STOP',
      'OPTS',
      'POT',
      'TOP',
      'OPT',
      'SOP',
      'OPS',
      'OP',
      'SOT',
      'TO',
      'SO',
      'OS' ]

    $ node scrabble_suggestor.js
    Simulating a random hand...
    Letters: [ 'W', 'Q', 'I', 'N', 'H', 'M', 'K' ]
    Valid words: [ 'WHIN',
      'WINK',
      'WIN',
      'WHIM',
      'HIN',
      'MINK',
      'NIM',
      'INK',
      'KIN',
      'IN',
      'HIM',
      'KHI',
      'HI',
      'MI',
      'HM' ]

TODO
----
- Use wildcard _ characters
- Sort valid words by value
