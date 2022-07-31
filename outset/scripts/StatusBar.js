function StatusBar(imageUrl, alignment) {
  this.alignment = alignment;
  this.image = new Image();
  this.image.onload = this.imageLoaded(this);
  this.image.src = imageUrl;

  const healthShieldMeterLeft = this.alignment == 'left' ? 0.0640 : 0.5188;
  const energyMeterLeft = this.alignment == 'left' ? 0.5341 : 0.0487;
  const verticalMeterPadding = 0.04;

  this.healthMeter = new StatusBarMeter('#5b0000', '#940404', '#3a0000', healthShieldMeterLeft, 0.1552 - verticalMeterPadding, 0.4172, 0.2759 + verticalMeterPadding * 2, this);
  this.shieldMeter = new StatusBarMeter('#000788', '#1b7ea8', '#000455', healthShieldMeterLeft, 0.5776 - verticalMeterPadding, 0.4172, 0.2759 + verticalMeterPadding * 2, this);
  this.energyMeter = new StatusBarMeter('#c69400', '#c6bf00', '#816100', energyMeterLeft, 0.1552 - verticalMeterPadding, 0.4172, 0.2759 + verticalMeterPadding * 2, this);

  this.meters = [this.healthMeter, this.shieldMeter, this.energyMeter];

  this.adaptToCanvasSize();
};

StatusBar.maxWidth = 719;
StatusBar.widthHeightRatio = 719.0 / 116.0;

StatusBar.prototype.imageLoaded = function(statusBar) {
  statusBar.loaded = true;
};

StatusBar.prototype.adaptToCanvasSize = function() {
  this.width = StatusBar.maxWidth;
  if(this.width > CanvasManager.canvas.width * 0.4) {
    this.width = CanvasManager.canvas.width * 0.4;
  }
  this.height = this.width / StatusBar.widthHeightRatio;

  if(this.alignment == 'left') {
    this.left = 0;
  }
  else {
    this.left = CanvasManager.canvas.width - this.width;
  }
  this.top = 0;

  this.meters.forEach(function(meter) {
    meter.absoluteLeft = meter.containingStatusBar.left + meter.containingStatusBar.width * meter.relativeLeft;
    meter.absoluteTop = meter.containingStatusBar.top + meter.containingStatusBar.height * meter.relativeTop;
    meter.absoluteWidth = meter.containingStatusBar.width * meter.relativeWidth;
    meter.absoluteHeight = meter.containingStatusBar.height * meter.relativeHeight;
  });
}
