// Enable the passage of the 'this' object through the JavaScript timers
var __nativeST__ = window.setTimeout, __nativeSI__ = window.setInterval;

window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
  var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeST__(vCallback instanceof Function ? function () {
    vCallback.apply(oThis, aArgs);
  } : vCallback, nDelay);
};

window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
  var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeSI__(vCallback instanceof Function ? function () {
    vCallback.apply(oThis, aArgs);
  } : vCallback, nDelay);
};


function Spring() {
  this.speed = 1.0;
  this.startingY;
  this.x = 0;
  this.y = 0;
  this.steps = 100;
  this.element = $("#box");
  this.timer = 0;
  this.visible = false;
  
  this.initialize = function() {
    this.startingY = parseInt(this.element.css("top"));
    this.y = this.appearFunction();
    this.element.css("top", this.y);
  }
  
  this.appearFunction = function() {
    return (100*Math.pow(Math.E, -0.055 * this.x) * Math.cos(0.08 * this.x)) + this.startingY;
  }
  
  this.disappearFunction = function() {
    return (-(100*Math.pow(Math.E, -0.055 * this.x) * Math.cos(0.08 * this.x)) +this.startingY+parseInt(this.element.css("height"))); //+ this.startingY);
  }
  
  this.appear = function() {
    if (this.timer == 0) {
      this.timer = window.setInterval.call(this, this.appearAnimation, 10);
    }
  }
  
  this.appearAnimation = function() {
    this.y = this.appearFunction();
    this.element.css("top", this.y);
    this.x += this.speed;
    this.visible = true;
    
    if (this.x > this.steps) {
      window.clearInterval(this.timer);
      this.timer = 0;
      this.x = 0;
    }
  }
  
  this.disappear = function() {
    if (this.timer == 0) {
      this.timer = window.setInterval.call(this, this.disappearAnimation, 10);
    }
  }
  
  this.disappearAnimation = function() {
    this.y = this.disappearFunction();
    this.element.css("top", this.y);
    this.x += this.speed;
    this.visible = false;
    
    if (this.x > this.steps) {
      window.clearInterval(this.timer);
      this.timer = 0;
      this.x = 0;
    }
  }
}


$(function() {
  spring = new Spring();
  spring.initialize();
  
  $("#toggle").on("click", function() {
    if (spring.visible) {
      spring.disappear();
    } else {
      spring.appear();
    }
    
    return false;
  });
});
