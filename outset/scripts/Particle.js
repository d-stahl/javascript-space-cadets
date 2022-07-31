function Particle(position, velocity, size, angle, rotation, strokeStyle, fillStyle, fading, lifeSpan, canCollide, collisionDamage) {
  this.position = position;
  this.velocity = velocity;
  this.size = size;
  this.angle = angle;
  this.rotation = rotation;
  this.strokeStyle = strokeStyle;
  this.fillStyle = fillStyle;
  this.fading = fading;
  this.birthTime = GameState.lastTimestamp;
  this.lifeSpan = lifeSpan;
  this.opacity = 1.0;
  this.canCollide = canCollide;
  this.collisionDamage = collisionDamage;
};
