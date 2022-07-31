const ParticlesManager = {
  particles: []
}

ParticlesManager.frameUpdate = function() {
  var deadParticles = [];

  ParticlesManager.particles.forEach((particle, index) => {
    if( GameState.lastTimestamp > particle.lifeSpan + particle.birthTime ) {
      deadParticles.push(particle);
    }
    else {
      if(particle.fading) {
        particle.opacity = 1.0 - (GameState.lastTimestamp - particle.birthTime) / particle.lifeSpan;
      }

      particle.angle += particle.rotation * GameState.frameInterval;
      particle.position.x += particle.velocity.x * GameState.frameInterval;
      particle.position.y += particle.velocity.y * GameState.frameInterval;
    }

    if( particle.canCollide ) {
      let particleTip = {
        x: particle.position.x + particle.size.width * 0.5 * Math.cos(particle.angle),
        y: particle.position.y + particle.size.width * 0.5 * Math.sin(particle.angle),
      };
      let collidedShip = ParticlesManager.getCollidedShipIfAny(particleTip);
      if( collidedShip != null ) {
        deadParticles.push(particle);
        collidedShip.takeDamage(particle.collisionDamage, particleTip);
      }
    }
  });

  ParticlesManager.particles = ParticlesManager.particles.filter((particle) => {
    return deadParticles.indexOf(particle) == -1;
  });
  deadParticles = [];
};

ParticlesManager.addParticle = function(particle) {
  ParticlesManager.particles.push(particle);
};

ParticlesManager.getCollidedShipIfAny = function(particleTip) {
  let collidedShip = null;
  GameState.activePlayers.forEach((player) => {
    let distanceToShipCenter = Math.sqrt(
      Math.pow(player.ship.x - particleTip.x, 2) +
      Math.pow(player.ship.y - particleTip.y, 2)
    );
    if(distanceToShipCenter <= GameState.shipRadius) {
      collidedShip = player.ship;
    }
  });

  return collidedShip;
};
