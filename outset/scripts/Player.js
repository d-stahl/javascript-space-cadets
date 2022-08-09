function Player(ship, statusBar) {
  this.ship = ship;
  this.ship.player = this;
  this.statusBar = statusBar;
  this.health = 1.0;
  this.shield = 1.0;
  this.energy = 1.0;
  this.defeated = false;
};

Player.prototype.modifyHealth = function(delta) {
  const originalHealth = this.health;
  this.health = Math.max(0, Math.min(1.0, this.health + delta));
  this.statusBar.healthMeter.value = this.health;

  if( originalHealth > this.health ) {
    const lostHealth = originalHealth - this.health;
    const particleSpawnX = this.statusBar.healthMeter.absoluteLeft + (this.statusBar.healthMeter.value + lostHealth * 0.5) * this.statusBar.healthMeter.absoluteWidth;
    const particleSpawnY = this.statusBar.healthMeter.absoluteTop + 0.5 * this.statusBar.healthMeter.absoluteHeight;
    ParticlesManager.addParticle(new Particle(
      {x: particleSpawnX, y: particleSpawnY},
      {x: 0.0, y: 0.03},
      {width: lostHealth * this.statusBar.healthMeter.absoluteWidth, height: this.statusBar.healthMeter.absoluteHeight},
      0.0, (0.5 - Math.random()) * 0.005, this.statusBar.healthMeter.shadeColor, this.statusBar.healthMeter.baseColor, true, 500));
  }

  if( this.health == 0 ) {
    this.defeated = true;
    this.ship.emitDamageParticles(500, {x: this.ship.x, y: this.ship.y});
    GameState.activePlayers = GameState.activePlayers.filter((player) => {
      return player != this;
    });
  }
};

Player.prototype.modifyShield = function(delta) {
  const originalShield = this.shield;
  this.shield = Math.max(0, Math.min(1.0, this.shield + delta));
  this.statusBar.shieldMeter.value = this.shield;


  if( originalShield > this.shield ) {
    const lostShield = originalShield - this.shield;
    const particleSpawnX = this.statusBar.shieldMeter.absoluteLeft + (this.statusBar.shieldMeter.value + lostShield * 0.5) * this.statusBar.shieldMeter.absoluteWidth;
    const particleSpawnY = this.statusBar.shieldMeter.absoluteTop + 0.5 * this.statusBar.shieldMeter.absoluteHeight;
    ParticlesManager.addParticle(new Particle(
      {x: particleSpawnX, y: particleSpawnY},
      {x: 0.0, y: 0.03},
      {width: lostShield * this.statusBar.shieldMeter.absoluteWidth, height: this.statusBar.shieldMeter.absoluteHeight},
      0.0, (0.5 - Math.random()) * 0.005, this.statusBar.shieldMeter.shadeColor, this.statusBar.shieldMeter.baseColor, true, 500));
  }
};

Player.prototype.modifyEnergy = function(delta) {
  this.energy = this.energy + delta;
  this.statusBar.energyMeter.value = this.energy;
};

Player.prototype.regenerate = function() {
  if(this.shield < 1.0 && this.energy > GameState.shieldRegenerationEnergyThreshold) {
    let shieldRegenerationAmount = Math.min(GameState.frameInterval * GameState.shieldRegenerationRate, 1.0 - this.shield);
    shieldRegenerationAmount = Math.min(shieldRegenerationAmount, this.energy / GameState.shieldRegenerationEnergyCost);
    this.modifyShield(shieldRegenerationAmount);
    this.modifyEnergy(-shieldRegenerationAmount * GameState.shieldRegenerationEnergyCost);
  }
};
