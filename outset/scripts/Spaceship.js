function Spaceship(x, y, angle, imageUrl) {
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.velocity = {x: 0, y: 0};
  this.rotation = 0;
  this.loaded = false;
  this.image = new Image();
  this.image.onload = this.imageLoaded(this);
  this.image.src = imageUrl;
  this.engineParticleSpawnPont = {x: 0, y: 0};
  this.accelerationParticleEmitters = [];
  this.decelerationParticleEmitters = [];
  this.clockwiseRotationParticleEmitters = [];
  this.counterClockwiseRotationParticleEmitters = [];
  this.cannonParticleEmitters = [];
  this.player = null;
  this.cannonFiringSounds = [];
};

Spaceship.prototype.imageLoaded = function(ship) {
  ship.loaded = true;
};

Spaceship.prototype.changeRotation = function(rotationChange) {
  let absoluteAffordedRotation = Math.min(Math.abs(rotationChange), Math.abs(rotationChange) * this.player.energy * GameState.rotationEnergyCost);
  this.rotation += Math.sign(rotationChange) * absoluteAffordedRotation;
  this.player.modifyEnergy(-1.0 * absoluteAffordedRotation * GameState.rotationEnergyCost);

  const particleEmitters = rotationChange > 0.0 ? this.clockwiseRotationParticleEmitters : this.counterClockwiseRotationParticleEmitters;
  particleEmitters.forEach((emitter) => {
    emitter.emitParticle(this);
  });
};

Spaceship.prototype.accelerate = function(acceleration) {
  let absoluteAffordedAcceleration = Math.min(Math.abs(acceleration), Math.abs(acceleration) * this.player.energy * GameState.accelerationEnergyCost);
  this.velocity.x += Math.sign(acceleration) * absoluteAffordedAcceleration * Math.cos(this.angle);
  this.velocity.y += Math.sign(acceleration) * absoluteAffordedAcceleration * Math.sin(this.angle);
  this.player.modifyEnergy(-1.0 * absoluteAffordedAcceleration * GameState.accelerationEnergyCost);

  const particleEmitters = acceleration > 0.0 ? this.accelerationParticleEmitters : this.decelerationParticleEmitters;
  particleEmitters.forEach((emitter) => {
    emitter.emitParticle(this);
  });
};

Spaceship.prototype.checkBorderCollision = function() {
};

Spaceship.prototype.takeDamage = function(damage, pointOfImpact) {
  let shieldDamage = Math.min(damage, this.player.shield);
  if(shieldDamage > 0.0) {
    this.player.modifyShield(-shieldDamage);
  }
  let healthDamage = Math.min(damage - shieldDamage, this.player.health);
  if(healthDamage > 0.0) {
    this.player.modifyHealth(-healthDamage);
  }
};

Spaceship.prototype.emitDamageParticles = function(numberOfParticles, origin) {
};

Spaceship.prototype.fireCannons = function() {
  if(this.player.energy >= GameState.cannonShotEnergyCost) {
    this.player.modifyEnergy(-GameState.cannonShotEnergyCost);
    this.cannonParticleEmitters.forEach((emitter) => {
      emitter.emitParticle(this);
    });
  }
};
