function ParticleEmitter(position, speed, lifeSpan, angle, size, strokeStyle, fillStyle, fading, canCollide, collisionDamage) {
  this.position = position;
  this.speed = speed;
  this.lifeSpan = lifeSpan;
  this.angle = angle;
  this.size = size;
  this.strokeStyle = strokeStyle;
  this.fillStyle = fillStyle;
  this.fading = fading;
  this.canCollide = canCollide;
  this.collisionDamage = collisionDamage;
};

ParticleEmitter.prototype.emitParticle = function(ship) {
  ParticlesManager.addParticle(new Particle(
    {
      x: ship.x + Math.cos(ship.angle) * this.position.x * GameState.shipRadius - Math.sin(ship.angle) * this.position.y * GameState.shipRadius,
      y: ship.y + Math.cos(ship.angle) * this.position.y * GameState.shipRadius + Math.sin(ship.angle) * this.position.x * GameState.shipRadius
    },
    {
      x: Math.cos(this.angle + ship.angle) * this.speed,
      y: Math.sin(this.angle + ship.angle) * this.speed
    },
    this.size,
    ship.angle + this.angle,
    0.0,
    this.strokeStyle,
    this.fillStyle,
    this.fading,
    this.lifeSpan,
    this.canCollide,
    this.collisionDamage));
}
