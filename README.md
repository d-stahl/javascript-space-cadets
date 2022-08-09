# javascript-space-cadets
A simple Javascript game designed to teach programming to young space cadets. The game is intended to provide the opportunity to implement game features one by one within an extant framework, with the support of somebody with some programming skills, who may explain syntax and introduce concepts as necessary.

The project is split into two parts: outset and solution. The outset is the starting point for anyone beginning this journey. Following the steps outlined below, in sequence, will let you evolve that starting point into something resembling an actual game. The solution represents the end state, and is available as a support should you get stuck. Or simply to play around with.

# Steps

## Step 0
Explore the outset directly. For now it is enough to understand that there is an HTML and a CSS file, that the images and sounds directories contain images and sounds, and that scripts is where all the action is.

## Step 1
Make one of the ships move when you press 'w', 'a', 's' or 'd'.
Hint 1: You can use InputManager.isKeyDown() to check whether a key is currently pressed.
Hint 2: In GameLoop.js there's a handleInput function where you can check for input.
Hint 3: GameState.playerOne.ship.x and GameState.playerOne.ship.y determine the ship's position.
Hint 4: Check for input inside the if(!GameState.playerOne.defeated) clause.

## Step 2
Make the ship accelerate instead of just moving directly. This way you make it build up speed.
Hint 1: Instead of setting ship.x and ship.y, use GameState.playerOne.ship.accelerate() and GameState.playerOne.ship.changeRotation().
Hint 2: You can use GameState.accelerationRate and GameState.rotationChangeRate to determine the rate of change, if you want.
Hint 3: Remember to use GameState.frameInterval to keep the change rate steady regardless of how fast the computer is!

## Step 3
Make the second ship move, too!
Hint 1: You want to do the exact same thing, but for GameSTate.playerTwo.ship.
Hint 2: To check arrow keys, try 'ArrowUp', 'ArrowDown', 'ArrowRight' and 'ArrowLeft'.

## Step 4
For each player's ship, make sure the ship doesn't pass across any borders.
Hint 1: In Spaceship.js there is a checkBorderCollision() function that currently doesn't do anything.
Hint 2: There are four borders. Each can be checked separately.
Hint 3: CanvasManager.canvas.width and CanvasManager.canvas.height can help determine how large the game area is.
Hint 4: Use GameState.shipRadius and GameState.borderMargin to help determine when the ship has hit the border.
Hint 5: One way to keep the ship from passing across a border is to simply set its position to being inside the border.

## Step 5
When colliding with a border, make the ship bounce back!
Hint 1: You want to alter the ship's velocity.
Hint 2: How the velocity changes depends on which border the ship collides with.
Hint 3: If you want, you can use GameState.borderBounciness to determine how fast the ship should bounce back.

## Step 6
Make player energy levels increase over time.
Hint 1: There is a regenerate() function in Player.js. This is called from GateState.updatePlayer().
Hint 2: If you use the modifyEnergy() function to set the energy levels you make sure that any additional logic and checks you might need are kept in a single place.
Hint 3: Remember to check GameState.frameInterval, so that energy doesn't regenerate faster or slower just because the computer is fast or slow.

## Step 7
Make sure a player's energy can never exceed 1.0.
Hint 1: Keep all logic related to changing a player's energy in the modifyEnergy() function in Player.js.
Hint 2: There is a Math.min() function that returns the smallest of the parameters it is given.

## Step 8
Play a sound effect when firing the cannons.
Hint 1: Each ship is created with a number of cannon sound effects. They are available in GameState.playerOne.ship.cannonFiringSounds and GameState.playerTwo.ship.cannonFiringSounds.
Hint 2: There is an AudioManager.playRandomAudio() that takes a set of sound effects and randomly chooses one to play.

## Step 9
Make ships emit particles when they are hit.
Hint 1: In Spaceship.js there is an emitDamageParticles() function. It takes the number of particles and their origin as input parameters.
Hint 2: You need to implement the emitDamageParticles() function. Create Particle objects and add them using ParticlesManager.addParticle().
Hint 3: The takeDamage() function takes pointOfImpact as an input variable. Use that to let emitDamageParticles() know where to spawn the particles.

## Step 10
Make the number of particles emitted when taking damage proportional to the amount of damage.
Hint 1: takeDamage() knows how much damage was dealt, and emitDamageParticles() wants to know the number of particles to spawn. This means that takeDamage() can calculate a suitable number that depends on the amount of damage.

## Step 11
Make border collisions cause damage to the colliding ship.
Hint 1: In the checkBorderCollision() function from last step, when a border collision is detected, you can call the takeDamage() function.
Hint 2: You can choose some suitable amount of damage to deal. Try something less than 1.0.

## Step 12
Make the amount of damage caused by a collision depend on the ship's velocity.
Hint 1: Kinetic energy is proportional to the velocity multiplied with itself.
Hint 2: You only need to care about velocity in the direction of the border the ship is colliding with.
