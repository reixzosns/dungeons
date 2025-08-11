// Dungeon map, items, monsters, rooms
window.DUNGEON_WORLD = {
  rooms: {
    'entrance': {
      desc: "You stand at the ancient stone entrance. A flickering torch lights the way. Passages lead north and east.",
      exits: { north: 'corridor', east: 'storeroom' },
      items: ['torch'],
      monsters: []
    },
    'corridor': {
      desc: "A damp, narrow corridor. The air is cold. The floor is littered with bones. Passages lead south and north.",
      exits: { south: 'entrance', north: 'darkroom' },
      items: ['rusty sword'],
      monsters: ['rat']
    },
    'storeroom': {
      desc: "A cramped storeroom filled with rotting crates. It smells of mold. Passage leads west.",
      exits: { west: 'entrance' },
      items: ['apple'],
      monsters: []
    },
    'darkroom': {
      desc: "A pitch-black chamber. You can barely see. You sense movement in the dark. Passages lead south.",
      exits: { south: 'corridor' },
      items: ['old key'],
      monsters: ['goblin']
    }
  },
  items: {
    'torch': { name: 'torch', type: 'light', desc: 'A wooden torch. It helps see in the dark.', usable: true },
    'rusty sword': { name: 'rusty sword', type: 'weapon', desc: 'A heavy, rusty sword. Not very sharp.', usable: false },
    'apple': { name: 'apple', type: 'food', desc: 'A half-rotten apple. Not delicious, but edible.', usable: true },
    'old key': { name: 'old key', type: 'key', desc: 'A corroded iron key. Might unlock something.', usable: false }
  },
  monsters: {
    'rat': {name:'giant rat', hp:5, attack:1, desc:'A giant rat with red eyes.'},
    'goblin': {name:'goblin', hp:12, attack:3, desc:'A sneaky goblin with a dagger.'}
  }
};
