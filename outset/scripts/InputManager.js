const InputManager = {
  previousDownKeys: {},
  currentDownKeys: {}
};


InputManager.init = function() {
  $(document).keydown(function(event) {
    InputManager.currentDownKeys[event.key] = true;
  });

  $(document).keyup(function(event) {
    InputManager.currentDownKeys[event.key] = false;
  });
};

InputManager.refreshDownKeys = function() {
  InputManager.previousDownKeys = jQuery.extend({}, InputManager.currentDownKeys);
}

InputManager.isKeyDown = function(key) {
  return InputManager.currentDownKeys[key] != null && InputManager.currentDownKeys[key] == true;
};

InputManager.isKeyPressedThisFrame = function(key) {
  return InputManager.isKeyDown(key) && !InputManager.previousDownKeys[key];
};
