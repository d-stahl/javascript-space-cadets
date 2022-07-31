const AudioManager = {
}

AudioManager.playRandomAudio = function(array) {
  if(array.length > 0) {
    let audio = array[Math.floor(Math.random() * array.length)];
    audio.play();
  };
};

function ChanneledAudio(uri) {
	this.channels = [];
	this.index = 0;

	for (var i = 0; i < GameState.numberOfAudioChannels; i++) {
		this.channels.push(new Audio(uri));
	}
}

ChanneledAudio.prototype.play = function() {
	this.channels[this.index++].play();
	this.index = this.index < GameState.numberOfAudioChannels ? this.index : 0;
}
