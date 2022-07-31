function StatusBarMeter(baseColor, highlightColor, shadeColor, relativeLeft, relativeTop, relatideWidth, relativeHeight, containingStatusBar) {
  this.baseColor = baseColor;
  this.highlightColor = highlightColor;
  this.shadeColor = shadeColor;
  this.relativeLeft = relativeLeft;
  this.relativeTop = relativeTop;
  this.relativeWidth = relatideWidth;
  this.relativeHeight = relativeHeight;
  this.containingStatusBar = containingStatusBar;

  this.loaded = false;
  this.edgeImage = new Image();
  this.edgeImage.onload = this.edgeImageLoaded(this);
  this.edgeImage.src = 'images/statusbarmeteredge.png';

  this.absoluteLeft = 0;
  this.absoluteTop = 0;
  this.absoluteWidth = 1;
  this.absoluteHeight = 1;

  this.value = 1.0;
};

StatusBarMeter.prototype.edgeImageLoaded = function(meter) {
  meter.loaded = true;
};
