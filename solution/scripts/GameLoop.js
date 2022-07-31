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
    if(InputManager.isKeyDown('d')) {
      GameState.playerOne.ship.changeRotation(GameState.rotationChangeRate * GameState.frameInterval);
    }

    if(InputManager.isKeyDown('a')) {
      GameState.playerOne.ship.changeRotation(-GameState.rotationChangeRate * GameState.frameInterval);
    }

    if(InputManager.isKeyDown('w')) {
      GameState.playerOne.ship.accelerate(GameState.accelerationRate * GameState.frameInterval);
    }

    if(InputManager.isKeyDown('s')) {
      GameState.playerOne.ship.accelerate(-GameState.accelerationRate * GameState.frameInterval);
    }

    if(InputManager.isKeyPressedThisFrame(' ')) {
      GameState.playerOne.ship.fireCannons();
    }
  }

  if(!GameState.playerTwo.defeated) {
    if(InputManager.isKeyDown('ArrowRight')) {
      GameState.playerTwo.ship.changeRotation(GameState.rotationChangeRate * GameState.frameInterval);
    }

    if(InputManager.isKeyDown('ArrowLeft')) {
      GameState.playerTwo.ship.changeRotation(-GameState.rotationChangeRate * GameState.frameInterval);
    }

    if(InputManager.isKeyDown('ArrowUp')) {
      GameState.playerTwo.ship.accelerate(GameState.accelerationRate * GameState.frameInterval);
    }

    if(InputManager.isKeyDown('ArrowDown')) {
      GameState.playerTwo.ship.accelerate(-GameState.accelerationRate * GameState.frameInterval);
    }

    if(InputManager.isKeyPressedThisFrame('Enter')) {
      GameState.playerTwo.ship.fireCannons();
    }
  }
};
