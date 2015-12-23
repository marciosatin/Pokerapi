var poker = {};

var containsNTimes = function (handRanks, rank, num) {
  var count = 0
      result =  false;

  handRanks.forEach(function (hand) {
    if (rank === hand) {
      count++;
    }
    if (count === num) {
      result = true;
    }
  });
  return result;
};

poker.getHand = function (hand) {
  var
  /*hand = [
    {"rank":"two", "suit":"spades"},
    {"rank":"seven", "suit":"spades"},
    {"rank":"five", "suit":"spades"},
    {"rank":"four", "suit":"spades"},
    {"rank":"three", "suit":"spades"}
  ],*/

  result = {
    "handString": null,
    "error": null
  },

  ranks = ["two", "three", "four", "five", "six", "seven", "eight",
                "nine", "ten", "jack", "queen", "king", "ace"],

  suits = ["spades", "hearts", "clubs", "diamonds"],

  handRanks = hand.map(function(card){
    return card.rank;
  }),

  handSuits = hand.map(function(card){
    return card.suit;
  });

  var hasPair = poker.containsPair(ranks, handRanks);

  if (hasPair) {
    result.handString = "Pair";
  }

  return result;

};

poker.containsPair = function (ranks, handRanks) {
    var result = false;

    ranks.forEach(function (rank){
      if (containsNTimes(handRanks, rank, 2)) {
        result = true;
      }
    })
    return result;
}

poker.containsTreeOfaKind = function (ranks, handRanks) {
  var result = false;

  ranks.forEach(function (rank){
    if (containsNTimes(handRanks, rank, 3)) {
      result = true;
    }
  })
  return result;
};

poker.containsFourOfaKind = function (ranks, handRanks) {
  var result = false;

  ranks.forEach(function (rank){
    if (containsNTimes(handRanks, rank, 4)) {
      result = true;
    }
  })
  return result;
};

poker.containsTwoPair = function (ranks, handRanks) {
  var count = 0;
  ranks.forEach(function (rank){
    if (containsNTimes(handRanks, rank, 2)) {
      count++;
    }
  });
  return (count > 1);
}

poker.containsFullHouse = function (ranks, handRanks) {
  var result = false,
      result2 = false,
      rankA = null;

  ranks.forEach(function (rank){
    if (containsNTimes(handRanks, rank, 3)) {
      result = true;
      rankA = rank;
    }
  });
  if ((result) && (rankA !== null)) {
    ranks.forEach(function (rank){
      if (rank !== rankA) {
        if (containsNTimes(handRanks, rank, 2)) {
          result2 = true;
        }
      }
    });
  }

  return (result2 && result);
}

poker.containsStraigth = function (ranks, handRanks) {
  if (!poker.containsPair(ranks, handRanks)) {
    var maiorMenor = [];
    for (var j in handRanks) {
      for (var i in ranks) {
          if (ranks[i] == handRanks[j]) {
            maiorMenor.push({
              "key": ranks[i],
              "value": i
            });
          }
      }
    }
    maiorMenor.sort(function(a, b){ return (a.value - b.value);});
    return (((maiorMenor[4].value - maiorMenor[0].value) == 4) || ((maiorMenor[4].value - maiorMenor[0].value) == 12));
  }
  return false;
}

poker.containsFlush = function (suits, handSuits) {
  var result = false;

  suits.forEach(function (suit){
    if (containsNTimes(handSuits, suit, 5)) {
      result = true;
    };
  });

  return result;
}

poker.containsStraigthFlush = function (ranks, handRanks, suits, handSuits) {
  return (poker.containsFlush(suits, handSuits) && poker.containsStraigth(ranks, handRanks));
}

poker.containsRoyalFlush = function (ranks, handRanks, suits, handSuits) {
  var ace = false,
      ten = false;
  if (poker.containsStraigthFlush(ranks, handRanks, suits, handSuits)) {
    handRanks.forEach(function (rank) {
      if (rank == "ace") {
        ace = true;
      } else if (rank == "ten") {
        ten = true;
      }
    });
    return (ace && ten);
  }
  return false;
}

module.exports = poker;

//console.log(containsStraigthFlush());
