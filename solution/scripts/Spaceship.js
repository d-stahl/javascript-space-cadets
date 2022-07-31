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
  if(this.x - GameState.shipRadius < GameState.borderMargin) {
    this.x = GameState.borderMargin + GameState.shipRadius;
    this.takeDamage(GameState.borderCollisionDamage * Math.abs(this.velocity.x) * Math.abs(this.velocity.x), {x: this.x - GameState.shipRadius, y: this.y});
    this.velocity.x = this.velocity.x * -1.0 * GameState.borderBounciness;
  }

  if(this.x + GameState.shipRadius > CanvasManager.canvas.width - GameState.borderMargin) {
    this.x = CanvasManager.canvas.width - GameState.borderMargin - GameState.shipRadius;
    this.takeDamage(GameState.borderCollisionDamage * Math.abs(this.velocity.x) * Math.abs(this.velocity.x), {x: this.x + GameState.shipRadius, y: this.y});
    this.velocity.x = this.velocity.x * -1.0 * GameState.borderBounciness;
  }

  if(this.y - GameState.shipRadius < GameState.borderMargin) {
    this.y = GameState.borderMargin + GameState.shipRadius;
    this.takeDamage(GameState.borderCollisionDamage * Math.abs(this.velocity.y) * Math.abs(this.velocity.y), {x: this.x, y: this.y - GameState.shipRadius});
    this.velocity.y = this.velocity.y * -1.0 * GameState.borderBounciness;
  }

  if(this.y + GameState.shipRadius > CanvasManager.canvas.height - GameState.borderMargin) {
    this.y = CanvasManager.canvas.height - GameState.borderMargin - GameState.shipRadius;
    this.takeDamage(GameState.borderCollisionDamage * Math.abs(this.velocity.y) * Math.abs(this.velocity.y), {x: this.x, y: this.y + GameState.shipRadius});
    this.velocity.y = this.velocity.y * -1.0 * GameState.borderBounciness;
  }
};

Spaceship.prototype.takeDamage = function(damage, pointOfImpact) {
  this.emitDamageParticles(Math.floor(damage * GameState.damageToParticlesRatio), pointOfImpact);
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
  for(let i = 0; i < numberOfParticles; i++) {
    const speed = Math.random() * 0.15 + 0.1;
    const angle = Math.random() * Math.PI * 2;
    const lifeSpan = Math.random() * 1000 + 750;
    const newParticle = new Particle(
      {
        x: origin.x,
        y: origin.y
      },
      {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      },
      {
        width: 1.5,
        height: 1.5,
      },
      0.0,
      0.0,
      '#5c768c',
      '#5f5f5f',
      true,
      lifeSpan,
      false,
      0.0);
    ParticlesManager.addParticle(newParticle);
  }
};

Spaceship.prototype.fireCannons = function() {
  if(this.player.energy >= GameState.cannonShotEnergyCost) {
    this.player.modifyEnergy(-GameState.cannonShotEnergyCost);
    this.cannonParticleEmitters.forEach((emitter) => {
      emitter.emitParticle(this);
    });
    AudioManager.playRandomAudio(this.player.ship.cannonFiringSounds);
  }
};
