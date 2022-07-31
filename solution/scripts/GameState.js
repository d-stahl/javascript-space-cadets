const GameState = {
  frameInterval: 1,
  lastTimestamp: 0,
  playerOne: null,
  playerTwo: null,
  activePlayers: [],
  shipRadius: 32,
  borderMargin: 3,
  borderBounciness: 0.5,
  borderCollisionDamage: 10.0,
  damageToParticlesRatio: 120,
  energyRegenerationRate: 0.0001,
  shieldRegenerationEnergyThreshold: 0.5,
  shieldRegenerationRate: 0.0002,
  shieldRegenerationEnergyCost: 2.0,
  accelerationEnergyCost: 1.1,
  rotationEnergyCost: 15.0,
  debugInfoShown: false,
  rotationChangeRate: 0.000005,
  accelerationRate: 0.0001,
  engineParticleSpeed: 0.15,
  engineParticleLifetime: 700,
  cannonShotSpeed: 1.2,
  cannonShotLifetime: 4000,
  cannonShotEnergyCost: 0.03,
  cannonShotDamage: 0.3,
  numberOfAudioChannels: 8
};

GameState.init = function() {
  GameState.playerOne = new Player(new Spaceship(0, 0, 0, 'images/tiefighter.png'), new StatusBar('images/statusbar-left.png', 'left'));
  GameState.activePlayers.push(GameState.playerOne);
  GameState.playerOne.ship.x = Math.round(CanvasManager.canvas.width * 0.25);
  GameState.playerOne.ship.y = Math.round(CanvasManager.canvas.height * 0.5);
  GameState.playerOne.ship.angle = Math.PI * 0.5;
  GameState.playerOne.ship.accelerationParticleEmitters.push(new ParticleEmitter({x: -0.1, y: -0.1}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, Math.PI, {width: 1.5, height: 1.5}, '#1a6d87', '#a5a5a5', true, false, 0.0));
  GameState.playerOne.ship.accelerationParticleEmitters.push(new ParticleEmitter({x: -0.1, y: 0.1}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, Math.PI, {width: 1.5, height: 1.5}, '#1a6d87', '#a5a5a5', true, false, 0.0));
  GameState.playerOne.ship.decelerationParticleEmitters.push(new ParticleEmitter({x: 0.05, y: -0.35}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, 0.0, {width: 1.5, height: 1.5}, '#1a6d87', '#a5a5a5', true, false, 0.0));
  GameState.playerOne.ship.decelerationParticleEmitters.push(new ParticleEmitter({x: 0.05, y: 0.35}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, 0.0, {width: 1.5, height: 1.5}, '#1a6d87', '#a5a5a5', true, false, 0.0));
  GameState.playerOne.ship.clockwiseRotationParticleEmitters.push(new ParticleEmitter({x: -0.05, y: -0.8}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, Math.PI, {width: 1.5, height: 1.5}, '#1a6d87', '#a5a5a5', true, false, 0.0));
  GameState.playerOne.ship.counterClockwiseRotationParticleEmitters.push(new ParticleEmitter({x: -0.05, y: 0.8}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, Math.PI, {width: 1.5, height: 1.5}, '#1a6d87', '#a5a5a5', true, false, 0.0));
  GameState.playerOne.ship.cannonParticleEmitters.push(new ParticleEmitter({x: 0.6, y: 0.2}, GameState.cannonShotSpeed, GameState.cannonShotLifetime, 0.0, {width: 25.0, height: 1.5}, '#0c5a00', '#31c51a', false, true, GameState.cannonShotDamage));
  GameState.playerOne.ship.cannonParticleEmitters.push(new ParticleEmitter({x: 0.6, y: -0.2}, GameState.cannonShotSpeed, GameState.cannonShotLifetime, 0.0, {width: 25.0, height: 1.5}, '#0c5a00', '#31c51a', false, true, GameState.cannonShotDamage));
  GameState.playerOne.ship.cannonFiringSounds.push(new ChanneledAudio('sounds/tie-fighter-cannon-1.mp3'));
  GameState.playerOne.ship.cannonFiringSounds.push(new ChanneledAudio('sounds/tie-fighter-cannon-2.mp3'));
  GameState.playerOne.ship.cannonFiringSounds.push(new ChanneledAudio('sounds/tie-fighter-cannon-3.mp3'));

  GameState.playerTwo = new Player(new Spaceship(0, 0, 0, 'images/xwing.png'), new StatusBar('images/statusbar-right.png', 'right'));
  GameState.activePlayers.push(GameState.playerTwo);
  GameState.playerTwo.ship.x = Math.round(CanvasManager.canvas.width * 0.75);
  GameState.playerTwo.ship.y = Math.round(CanvasManager.canvas.height * 0.5);
  GameState.playerTwo.ship.angle = Math.PI * 1.5;
  GameState.playerTwo.ship.accelerationParticleEmitters.push(new ParticleEmitter({x: -0.80, y: -0.30}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, Math.PI, {width: 1.5, height: 1.5}, '#f46a00', '#f49800', true, false, 0.0));
  GameState.playerTwo.ship.accelerationParticleEmitters.push(new ParticleEmitter({x: -0.80, y: 0.30}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, Math.PI, {width: 1.5, height: 1.5}, '#f46a00', '#f49800', true, false, 0.0));
  GameState.playerTwo.ship.decelerationParticleEmitters.push(new ParticleEmitter({x: -0.50, y: -0.35}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, 0.0, {width: 1.5, height: 1.5}, '#f46a00', '#f49800', true, false, 0.0));
  GameState.playerTwo.ship.decelerationParticleEmitters.push(new ParticleEmitter({x: -0.50, y: 0.35}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, 0.0, {width: 1.5, height: 1.5}, '#f46a00', '#f49800', true, false, 0.0));
  GameState.playerTwo.ship.clockwiseRotationParticleEmitters.push(new ParticleEmitter({x: -0.80, y: -0.38}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, Math.PI, {width: 1.5, height: 1.5}, '#f46a00', '#f49800', true, false, 0.0));
  GameState.playerTwo.ship.counterClockwiseRotationParticleEmitters.push(new ParticleEmitter({x: -0.80, y: 0.38}, GameState.engineParticleSpeed, GameState.engineParticleLifetime, Math.PI, {width: 1.5, height: 1.5}, '#f46a00', '#f49800', true, false, 0.0));
  GameState.playerTwo.ship.cannonParticleEmitters.push(new ParticleEmitter({x: 0.6, y: 0.95}, GameState.cannonShotSpeed, GameState.cannonShotLifetime, 0.0, {width: 25.0, height: 1.5}, '#761a00', '#cd6600', false, true, GameState.cannonShotDamage));
  GameState.playerTwo.ship.cannonParticleEmitters.push(new ParticleEmitter({x: 0.6, y: -0.95}, GameState.cannonShotSpeed, GameState.cannonShotLifetime, 0.0, {width: 25.0, height: 1.5}, '#761a00', '#cd6600', false, true, GameState.cannonShotDamage));
  GameState.playerTwo.ship.cannonFiringSounds.push(new ChanneledAudio('sounds/x-wing-cannon-1.mp3'));
  GameState.playerTwo.ship.cannonFiringSounds.push(new ChanneledAudio('sounds/x-wing-cannon-2.mp3'));
  GameState.playerTwo.ship.cannonFiringSounds.push(new ChanneledAudio('sounds/x-wing-cannon-3.mp3'));
  GameState.playerTwo.ship.cannonFiringSounds.push(new ChanneledAudio('sounds/x-wing-cannon-4.mp3'));
};

GameState.updateState = function() {
  ParticlesManager.frameUpdate();

  GameState.activePlayers.forEach((player) => {
    GameState.updatePlayer(player);
  });
}

GameState.updatePlayer = function(player) {
  player.ship.angle += player.ship.rotation * GameState.frameInterval;

  player.ship.x += player.ship.velocity.x * GameState.frameInterval;
  player.ship.y += player.ship.velocity.y * GameState.frameInterval;

  player.ship.checkBorderCollision();
  player.regenerate();
};
