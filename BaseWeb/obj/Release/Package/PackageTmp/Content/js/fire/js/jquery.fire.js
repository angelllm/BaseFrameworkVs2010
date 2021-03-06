
function fire(options) {
    // Set canvas drawing surface
    
    var defaults = {
        obj: null,
        width: 100,
        height: 150,
        left:0,
        top:0
    }
    var options = $.extend(defaults, options);
    var obj = options.obj;

    var space = document.getElementById(obj);
    var surface = space.getContext("2d");
    surface.scale(1, 1);

    // Set Particles
    var particles = [];
    var particle_count = 150;
    for (var i = 0; i < particle_count; i++) {
        particles.push(new particle());
    }
    var time = 0;
    // Set wrapper and canvas items size
    var canvasWidth = options.width;
    var canvasHeight = options.height;
    var canvasTop = options.top;
    var canvasLeft = options.left;

    $("#" + options.obj).css({ width: canvasWidth, height: canvasHeight, left: canvasLeft, top: canvasTop });

    // shim layer with setTimeout fallback from Paul Irish
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 6000 / 60);
            };
    })();

    function particle() {

        this.speed = { x: -1 + Math.random() * 2, y: -5 + Math.random() * 5 };
        canvasWidth = (document.getElementById(obj).width);
        canvasHeight = (document.getElementById(obj).height);
        this.location = { x: canvasWidth / 2, y: (canvasHeight / 2) + 35 };

        this.radius = .5 + Math.random() * 1;

        this.life = 10 + Math.random() * 10;
        this.death = this.life;

        this.r = 255;
        this.g = Math.round(Math.random() * 155);
        this.b = 0;
    }

    function ParticleAnimation() {
        surface.globalCompositeOperation = "source-over";
        //surface.globalAlpha = 0.2;
        //        var img = document.getElementById("lamp")
        //        var pat = surface.createPattern(img, "repeat");
        //        surface.fillStyle = pat;
        //surface.fill();

        surface.fillStyle = "#000";
        //surface.globalAlpha = 0.2;
        surface.fillRect(0, 0, canvasWidth, canvasHeight);
        surface.globalCompositeOperation = "source-over";

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];

            surface.beginPath();

            p.opacity = Math.round(p.death / p.life * 100) / 100
            var gradient = surface.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
            gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
            gradient.addColorStop(0.5, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
            gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
            surface.fillStyle = gradient;
            surface.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
            surface.fill();
            p.death--;
            p.radius++;
            p.location.x += (p.speed.x);
            p.location.y += (p.speed.y);

            //regenerate particles
            if (p.death < 0 || p.radius < 0) {
                //a brand new particle replacing the dead one
                particles[i] = new particle();
            }
        }



        requestAnimFrame(ParticleAnimation);

    }

    ParticleAnimation();

}