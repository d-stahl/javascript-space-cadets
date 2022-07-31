const CanvasManager = {
  backgroundImageRatio: 3035 / 1707,
  minimumWidth: 640,
  minimumHeight: 480,
  currentWidth: 0,
  currentHeight: 0
};


CanvasManager.init = function(canvasElement) {
    CanvasManager.canvasElement = canvasElement;
    CanvasManager.canvas = CanvasManager.canvasElement[0];
    CanvasManager.context = CanvasManager.canvas.getContext('2d');
    CanvasManager.makeFullscreen(canvas);

    $(window).on('resize', function() {
      CanvasManager.makeFullscreen();
    });
};

CanvasManager.makeFullscreen = function() {
  if(document.body) {
    CanvasManager.canvas.width = Math.max(window.innerWidth, CanvasManager.minimumWidth);
    CanvasManager.canvas.height = Math.max(window.innerHeight, CanvasManager.minimumHeight);

    CanvasManager.adjustBackgroundImageSize();
    if(GameState.playerOne && GameState.playerOne.statusBar) {
      GameState.playerOne.statusBar.adaptToCanvasSize();
    }
    if(GameState.playerTwo && GameState.playerTwo.statusBar) {
      GameState.playerTwo.statusBar.adaptToCanvasSize();
    }
  }
};

CanvasManager.adjustBackgroundImageSize = function() {
  const canvasRatio = CanvasManager.canvas.width / CanvasManager.canvas.height;

  var backgroundImageWidth = CanvasManager.canvas.width;
  var backgroundImageHeight = backgroundImageWidth / CanvasManager.backgroundImageRatio;

  if( canvasRatio < CanvasManager.backgroundImageRatio ) {
    backgroundImageHeight = CanvasManager.canvas.height;
    backgroundImageWidth = backgroundImageHeight * CanvasManager.backgroundImageRatio;

  }

  $('body').css('background-size', '' + backgroundImageWidth + 'px ' + backgroundImageHeight + 'px');
};
