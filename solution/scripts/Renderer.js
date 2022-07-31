const Renderer = {
};


Renderer.render = function() {
  const width = CanvasManager.canvas.getBoundingClientRect().width;
  const height = CanvasManager.canvas.getBoundingClientRect().height;
  const ctx = CanvasManager.context;

  ctx.clearRect(0, 0, width, height);

  Renderer.drawBorderLines();
  Renderer.drawStatusBar(GameState.playerOne);
  Renderer.drawStatusBar(GameState.playerTwo);

  if(!GameState.playerOne.defeated) {
    Renderer.drawShip(GameState.playerOne.ship);
  }
  if(!GameState.playerTwo.defeated) {
    Renderer.drawShip(GameState.playerTwo.ship);
  }
  Renderer.drawParticles();
  if(GameState.debugInfoShown) {
    Renderer.printDebugInfo();
  }
};

Renderer.drawBorderLines = function() {
  const ctx = CanvasManager.context;

  ctx.beginPath();
  ctx.lineWidth = '2';
  ctx.strokeStyle = 'red';
  ctx.rect(GameState.borderMargin, GameState.borderMargin, CanvasManager.canvas.width - 3 - 1, CanvasManager.canvas.height - 3 - 1);
  ctx.stroke();
}

Renderer.printDebugInfo = function() {
  const ctx = CanvasManager.context;
  var linePos = 5;
  const lineHeight = 18;
  ctx.font = '14px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('Canvas size: ' + CanvasManager.canvas.getBoundingClientRect().width + 'x' + CanvasManager.canvas.getBoundingClientRect().height, 5, linePos += lineHeight);
  ctx.fillText('Framerate: ' + Math.round(1000 / GameState.frameInterval), 5, linePos += lineHeight);
};

Renderer.drawShip = function(ship) {
  if(!ship.imageLoaded) {
    return;
  }

  const ctx = CanvasManager.context;
  ctx.save();
  ctx.translate(ship.x, ship.y);
  ctx.rotate(ship.angle);
  ctx.drawImage(ship.image, - GameState.shipRadius, - GameState.shipRadius, GameState.shipRadius * 2, GameState.shipRadius * 2);
  ctx.restore();
};

Renderer.drawStatusBar = function(player) {
  if(!player.statusBar.loaded) {
    return;
  }

  const ctx = CanvasManager.context;

  player.statusBar.meters.forEach(function(meter)  {
    ctx.fillStyle = 'black';
    ctx.fillRect(meter.absoluteLeft, meter.absoluteTop, meter.absoluteWidth, meter.absoluteHeight);
    const gradient = ctx.createLinearGradient(meter.absoluteLeft, meter.absoluteTop, meter.absoluteLeft + meter.absoluteWidth, meter.absoluteTop + meter.absoluteHeight);
    gradient.addColorStop(0.0, meter.baseColor);
    gradient.addColorStop(0.5, meter.highlightColor);
    gradient.addColorStop(1.0, meter.baseColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(meter.absoluteLeft, meter.absoluteTop, meter.absoluteWidth * meter.value, meter.absoluteHeight);

    if(meter.loaded) {
      ctx.drawImage(meter.edgeImage, meter.absoluteLeft + meter.absoluteWidth * meter.value - 3, meter.absoluteTop, 5, meter.absoluteHeight);
    }
  });

  ctx.drawImage(player.statusBar.image, player.statusBar.left, player.statusBar.top, player.statusBar.width, player.statusBar.height);
};

Renderer.drawParticles = function() {
  const ctx = CanvasManager.context;
  ParticlesManager.particles.forEach((particle, index) => {
    ctx.save();
    ctx.translate(particle.position.x, particle.position.y);
    ctx.rotate(particle.angle);
    ctx.strokeStyle = particle.strokeStyle;
    ctx.fillStyle = particle.fillStyle;
    ctx.globalAlpha = particle.opacity;
    ctx.strokeRect(-0.5 * particle.size.width, -0.5 * particle.size.height, particle.size.width, particle.size.height);
    ctx.fillRect(-0.5 * particle.size.width, -0.5 * particle.size.height, particle.size.width, particle.size.height);
    ctx.restore();
  });
}
