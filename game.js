// Game state, command parsing, logic
window.DUNGEON_GAME = {
  state: {
    location: 'entrance',
    inventory: [],
    health: 20,
    hunger: 0,
    fatigue: 0,
    light: false,
    alive: true
  },

  output: [],
  stats: "",
  
  describeRoom() {
    const loc = this.state.location;
    const room = DUNGEON_WORLD.rooms[loc];
    let s = room.desc;
    if (room.items.length) s += `\nItems here: ${room.items.map(i=>DUNGEON_WORLD.items[i].name).join(', ')}.`;
    if (room.monsters.length) s += `\nYou see: ${room.monsters.map(m=>DUNGEON_WORLD.monsters[m].name).join(', ')}.`;
    s += `\nExits: ${Object.keys(room.exits).join(', ')}.`;
    return s;
  },

  showStats() {
    const {health, hunger, fatigue, inventory, location} = this.state;
    this.stats = `Location: ${location} | HP: ${health} | Hunger: ${hunger} | Fatigue: ${fatigue}\nInventory: ${inventory.join(', ')||'none'}`;
  },

  do(cmdline) {
    if (!this.state.alive) {
      this.output.push("You can't do anything. You are dead.");
      return;
    }
    let cmd = cmdline.trim().toLowerCase();
    if (!cmd) return;

    // Movement
    if (cmd.startsWith("go ")) {
      let dir = cmd.slice(3);
      let room = DUNGEON_WORLD.rooms[this.state.location];
      if (room.exits[dir]) {
        this.state.location = room.exits[dir];
        this.state.fatigue++;
        this.output.push(this.describeRoom());
      } else {
        this.output.push("You can't go that way.");
      }
    }
    // Look
    else if (cmd==="look") {
      this.output.push(this.describeRoom());
    }
    // Take item
    else if (cmd.startsWith("take ")) {
      let itemName = cmd.slice(5);
      let room = DUNGEON_WORLD.rooms[this.state.location];
      let idx = room.items.findIndex(i=>i===itemName);
      if (idx>-1) {
        this.state.inventory.push(itemName);
        room.items.splice(idx,1);
        this.output.push(`You take the ${itemName}.`);
      } else {
        this.output.push("No such item here.");
      }
    }
    // Inventory
    else if (cmd==="inventory") {
      this.output.push(`Inventory: ${this.state.inventory.join(', ')||'none'}.`);
    }
    // Eat
    else if (cmd.startsWith("eat ")) {
      let itemName = cmd.slice(4);
      let invIdx = this.state.inventory.indexOf(itemName);
      if (invIdx>-1 && DUNGEON_WORLD.items[itemName].type==='food') {
        this.state.inventory.splice(invIdx,1);
        this.state.hunger = Math.max(0, this.state.hunger-5);
        this.output.push(`You eat the ${itemName}. Hunger reduced.`);
      } else {
        this.output.push("You can't eat that.");
      }
    }
    // Use torch
    else if (cmd.startsWith("use torch")) {
      if (this.state.inventory.includes("torch")) {
        this.state.light = true;
        this.output.push("You light the torch. You can see in the dark now.");
      } else {
        this.output.push("You don't have a torch.");
      }
    }
    // Attack
    else if (cmd.startsWith("attack ")) {
      let target = cmd.slice(7);
      let room = DUNGEON_WORLD.rooms[this.state.location];
      let mIdx = room.monsters.findIndex(m=>m===target);
      if (mIdx>-1) {
        let monster = DUNGEON_WORLD.monsters[target];
        let dmg = this.state.inventory.includes('rusty sword') ? 5 : 2;
        monster.hp -= dmg;
        this.output.push(`You attack the ${monster.name} for ${dmg} damage.`);
        if (monster.hp<=0) {
          this.output.push(`You slay the ${monster.name}.`);
          room.monsters.splice(mIdx,1);
        } else {
          this.state.health -= monster.attack;
          this.output.push(`The ${monster.name} hits you for ${monster.attack} damage.`);
          if (this.state.health<=0) {
            this.output.push("You died!");
            this.state.alive = false;
          }
        }
      } else {
        this.output.push("No such enemy here.");
      }
    }
    // Help
    else if (cmd==="help") {
      this.output.push("Commands: go [direction], look, take [item], inventory, eat [item], use torch, attack [monster], help");
    }
    // Rest
    else if (cmd==="rest") {
      this.state.fatigue = Math.max(0, this.state.fatigue-5);
      this.state.health = Math.min(20, this.state.health+3);
      this.output.push("You rest for a while. Fatigue reduced, health restored a bit.");
    }
    else {
      this.output.push("Unknown command. Type 'help' for options.");
    }
    this.showStats();
  }
};
