const GameLoop = {
};


GameLoop.init = function() {
  window.requestAnimationFrame(GameLoop.loop);
};

GameLoop.loop = function(timestamp) {
  GameState.frameInterval = timestamp - GameState.lastTimestamp;
  GameState.lastTimestamp = timestamp;

  GameLoop.handleInput();

  GameState.updateState();

  Renderer.render(timestamp);

  InputManager.refreshDownKeys();
  window.requestAnimationFrame(GameLoop.loop);
};

GameLoop.handleInput = function() {
  if(InputManager.isKeyPressedThisFrame('i')) {
    GameState.debugInfoShown = !GameState.debugInfoShown;
  }

  if(!GameState.playerOne.defeated) {
    if(InputManager.isKeyPressedThisFrame(' ')) {
      GameState.playerOne.ship.fireCannons();
    }
  }

  if(!GameState.playerTwo.defeated) {
    if(InputManager.isKeyPressedThisFrame('Enter')) {
      GameState.playerTwo.ship.fireCannons();
    }
  }
};
