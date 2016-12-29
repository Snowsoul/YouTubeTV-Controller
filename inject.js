var YouTubeApp = {
    controllers: [],
    controllerConnected: false,
    gameLoopRunning: false,
    fps: 60,
    // W3C Controller mapping https://w3c.github.io/gamepad/#remapping
    mapping: {
        A: 0,
        B: 1,
        right: 15,
        left: 14
    },
    canMoveRight: true,
    canMoveLeft: true,
    canMoveInside: true,
    canMoveBack: true
};

YouTubeApp.controllerConnected = function(e) {
    this.controllerConnected = true;
};

YouTubeApp.controllerDisconnected = function(e) {
    this.controllerConnected = false;
};

YouTubeApp.setEvents = function() {
    window.addEventListener("gamepadconnected", YouTubeApp.controllerConnected.bind(this));
    window.addEventListener("gamepaddisconnected", YouTubeApp.controllerDisconnected.bind(this));
};

YouTubeApp.OnButtonPress = function(e) {
    if (e.button.index === YouTubeApp.mapping.right) {
        YouTubeApp.navigateRight();
    }

    if (e.button.index === YouTubeApp.mapping.left) {
        YouTubeApp.navigateLeft();
    }

    if (e.button.index === YouTubeApp.mapping.A) {
        YouTubeApp.navigateInside();
    }

    if (e.button.index === YouTubeApp.mapping.B) {
        YouTubeApp.navigateBack();
    }
};

YouTubeApp.scanControllers = function() {
    var controllers = navigator.getGamepads();

    for (var i = 0; i < controllers.length; i++) {
        var controller = controllers[i];
        
        if (controller !== null && controller.buttons.length && controller.axes && controller.connected) {
            this.controllers.push(controller);
            controllerConnected = true;
        }
    }
};

YouTubeApp.buttonHandler = function(button, index) {
    if (button.pressed) {
        button.index = index;
        YouTubeApp.OnButtonPress({ controller: this, button: button });
    }
};


YouTubeApp.axisHandler = function(axis) {
    if (axis) {
    }
};

YouTubeApp.setListeners = function() {
    for (var i = 0; i < this.controllers.length; i++) {
        var controller = this.controllers[i];

        controller.buttons.forEach(this.buttonHandler.bind(controller));
        controller.axes.forEach(this.axisHandler.bind(controller));
    }
};

YouTubeApp.update = function() {
    if (this.controllerConnected) {
        
        this.controllers = [];
        this.scanControllers();
        this.setListeners();

    }
};

YouTubeApp.gameLoop = function() {
    this.update();
};

YouTubeApp.startGameLoop = function() {
    this.gameLoopInterval = setInterval(YouTubeApp.gameLoop.bind(this), YouTubeApp.fps);    
    this.gameLoopRunning = true;
};

YouTubeApp.stopGameLoop = function() {
    clearInterval(this.gameLoopInterval);
    this.gameLoopInterval = undefined;
    this.gameLoopRunning = false;    
};

YouTubeApp.initialize = function() {
    YouTubeApp.setEvents();
    YouTubeApp.scanControllers();
    YouTubeApp.startGameLoop();
};

YouTubeApp.generateEvent = function(key, keyCode, eventType, elExtra) {
    
    var e = new Event(eventType);
    var el;
    if (typeof elExtra === "undefined") {
        el = document.querySelector("#shelves > div.focused.carousel > div.focused.first.selected.shelf > div.content-container > div > div.content > div.focused.carousel");
    } else {
        if (typeof elExtra === "string") {
            el = document.querySelector(elExtra);
        } else {
            el = elExtra;
        }
    }
    e.key = key;
    e.keyCode = keyCode;
    e.which = e.keyCode;
    e.altKey = false;
    e.ctrlKey = true;
    e.shiftKey = false;
    e.metaKey = false;
    e.bubbles = true;

    if (el !== null) {
        el.dispatchEvent(e);
    }
};

YouTubeApp.navigateRight = function() {
    var timeOut = null;

    if (YouTubeApp.canMoveRight) {
        YouTubeApp.generateEvent("ArrowRight", 39, "keydown");
        YouTubeApp.canMoveRight = false;
    } else {
        if (timeOut === null) {
            timeOut = setTimeout(function() {
                YouTubeApp.canMoveRight = true;
                timeOut = null;
            }, 50);
        }
    }
};

YouTubeApp.navigateLeft = function() {
    var timeOut = null;
    
    if (YouTubeApp.canMoveLeft) {
        YouTubeApp.generateEvent("ArrowLeft", 37, "keydown");
        YouTubeApp.canMoveLeft = false;
    } else {
        if (timeOut === null) {
            timeOut = setTimeout(function() {
                YouTubeApp.canMoveLeft = true;
                timeOut = null;
            }, 50);
        }
    }
};


YouTubeApp.navigateInside = function() {
    var timeOut = null;
    
    if (YouTubeApp.canMoveInside) {
        YouTubeApp.generateEvent("Enter", 13, "keyup", "#shelves > div.carousel > div.first.selected.shelf > div.content-container > div > div.content > div.carousel > div.item.tile.selected.hd-badge.video-tile");
        YouTubeApp.canMoveInside = false;
    } else {
        if (timeOut === null) {
            timeOut = setTimeout(function() {
                YouTubeApp.canMoveInside = true;
                timeOut = null;
            }, 50);
        }
    }
};

YouTubeApp.navigateBack = function() {
    var timeOut = null;
    
    if (YouTubeApp.canMoveBack) {
        YouTubeApp.generateEvent("Escape", 8, "keyup", "#watch");
        YouTubeApp.canMoveBack = false;
    } else {
        if (timeOut === null) {
            timeOut = setTimeout(function() {
                YouTubeApp.canMoveBack = true;
                timeOut = null;
            }, 50);
        }
    }
};

window.onload = YouTubeApp.initialize;
