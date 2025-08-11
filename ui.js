// Input/output handler
const outputBox = document.getElementById('output');
const statsBox = document.getElementById('stats');
const cmdBox = document.getElementById('command');
const sendBtn = document.getElementById('send');
function render() {
  outputBox.textContent = DUNGEON_GAME.output.slice(-7).join('\n\n');
  statsBox.textContent = DUNGEON_GAME.stats;
}
function handleCommand() {
  const cmd = cmdBox.value;
  DUNGEON_GAME.do(cmd);
  cmdBox.value = '';
  render();
  cmdBox.focus();
}
sendBtn.onclick = handleCommand;
cmdBox.onkeydown = e => { if (e.key==='Enter') handleCommand(); };

// Start game
DUNGEON_GAME.output.push(DUNGEON_GAME.describeRoom());
DUNGEON_GAME.showStats();
render();
