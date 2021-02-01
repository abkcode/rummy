var app = new Vue({
  el: "#app",
  data: {
    suits: ["hearts", "spades", "clubs", "diams"],
    ranks: [2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "q", "k", "a"],
    deck: [],
    player1: {
      cards: [],
      points: 0
    },
    player2: {
      cards: [],
      points: 0
    },
    player3: {
      cards: [],
      points: 0
    },
    player4: {
      cards: [],
      points: 0
    }
  },
  created: function() {
    this.initDeck();
    this.dealPlayerCards(this.player1.cards);
    this.dealPlayerCards(this.player2.cards);
    this.dealPlayerCards(this.player3.cards);
    this.dealPlayerCards(this.player4.cards);
    // this.player4.cards[9].suit = "diams";
    // this.player4.cards[9].rank = 9;
    // this.player4.cards[10].suit = "diams";
    // this.player4.cards[10].rank = 10;
    // this.player4.cards[11].suit = "diams";
    // this.player4.cards[11].rank = 10;
    // this.player4.cards[12].suit = "diams";
    // this.player4.cards[12].rank = "j";
  },
  methods: {
    initDeck() {
      this.createDeck();
      this.shuffleDeck();
      this.tmpCode();
    },
    createDeck() {
      this.deck = [];
      for (let suit in this.suits) {
        for (let rank in this.ranks) {
          this.deck.push({ rank: this.ranks[rank], suit: this.suits[suit] });
        }
      }
    },
    shuffleDeck() {
      const deck = this.deck;
      let m = deck.length,
        i;

      while (m) {
        i = Math.floor(Math.random() * m--);

        [deck[m], deck[i]] = [deck[i], deck[m]];
      }

      this.deck = deck;
    },
    dealCard() {
      return this.deck.pop();
    },
    dealPlayerCards(obj) {
      for (let i = 0; i < 13; i++) {
        obj.push(this.dealCard());
      }
    },
    calculatePoints(obj) {
      const cards = obj.cards;
      const ranks = this.ranks;
      const suits = this.suits;
      cards.sort(function(a, b) {
        return ranks.indexOf(a.rank) + suits.indexOf(a.suit) * 100 >
          ranks.indexOf(b.rank) + suits.indexOf(b.suit) * 100
          ? 1
          : -1;
      });
      var seq = 0;
      for (let i = 0; i < cards.length - 1; i++) {
        var card1 = cards[i];
        var card2 = cards[i + 1];
        if (
          suits.indexOf(card1.suit) == suits.indexOf(card2.suit) &&
          ranks.indexOf(card1.rank) == ranks.indexOf(card2.rank) - 1
        ) {
          console.log(seq);
          seq++;
          if (seq >= 2) {
            obj.points = 100;
          }
        } else {
          seq = 0;
        }
      }
      obj.cards = cards;
    },
    tmpCode(){
      let cards = [
        { suit: "spades", rank: 5, index: 1 },
        { suit: "spades", rank: 6, index: 2 },
        { suit: "spades", rank: 7, index: 3 },
        { suit: "hearts", rank: "a", index: 4 },
        { suit: "hearts", rank: "a", index: 5 },
        { suit: "hearts", rank: "a", index: 6 },
        { suit: "diams", rank: 2, index: 7 },
        { suit: "spades", rank: 3, index: 8 },
        { suit: "diams", rank: 10, index: 9 },
        { suit: "hearts", rank: 10, index: 10 },
        { suit: "hearts", rank: 9, index: 11 },
        { suit: "diams", rank: 9, index: 12 },
        { suit: "spades", rank: 9, index: 13 }
      ];
      
      let pureGroups = this.identifyPureGroup(cards);
      console.log(pureGroups);
    },
    identifyPureGroup(cards) {
      return [
        [
          { suit: "spades", rank: 5, index: 1 },
          { suit: "spades", rank: 6, index: 2 },
          { suit: "spades", rank: 7, index: 3 }
        ],
        [
          { suit: "hearts", rank: "a", index: 4 },
          { suit: "hearts", rank: "a", index: 5 },
          { suit: "hearts", rank: "a", index: 6 }
        ]
      ];
    }
  }
});



function identifyGroup(cards, i) {
  if (i == 0) {
    return [
      [
        { suit: "hearts", rank: "a", index: 4 },
        { suit: "hearts", rank: "a", index: 5 },
        { suit: "hearts", rank: "a", index: 6 }
      ],
      [
        { suit: "hearts", rank: "a", index: 6 },
        { suit: "diams", rank: 2, index: 7 },
        { suit: "spades", rank: 3, index: 8 }
      ],
      [
        { suit: "hearts", rank: 9, index: 11 },
        { suit: "diams", rank: 9, index: 12 },
        { suit: "spades", rank: 9, index: 13 }
      ]
    ];
  } else {
    return [
      [
        { suit: "spades", rank: 5, index: 1 },
        { suit: "spades", rank: 6, index: 2 },
        { suit: "spades", rank: 7, index: 3 }
      ],
      [
        ({ suit: "hearts", rank: 9, index: 11 },
        { suit: "diams", rank: 9, index: 12 },
        { suit: "spades", rank: 9, index: 13 })
      ]
    ];
  }
}



// for (let i = 0; i < pureGroups.length; i++) {
//   var tmpCards = cards;
//   for (let j = 0; j < pureGroups[i].length; j++) {
//     tmpCards = tmpCards.filter(function(obj) {
//       return obj.index !== pureGroups[i][j].index;
//     });
//   }
//   console.log(tmpCards);

//   var groups = identifyGroup(tmpCards, i);

//   break;
// }

// seq: [
//   [
//     { suit: "hearts", rank: "a", index: 6 },
//     { suit: "diams", rank: 2, index: 7 },
//     { suit: "spades", rank: 3, index: 8 }
//   ]
// ];
