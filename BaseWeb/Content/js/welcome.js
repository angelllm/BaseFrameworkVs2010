var canvas = document.getElementById("cas"),
			ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.RAF = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
})();

var time = 0, stopTotop = false;
var stage = {
    init: function () {
        time = new Date();
        part_1.init();
    },

    update: function () {
        var nt = new Date();
        part_1.update(nt - time);
        time = nt;
    },

    loop: function () {
        var _this = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.update();
        RAF(function () {
            _this.loop();
        })
    }
}
stage.init();
stage.loop();



var t_img; // 定时器
var isLoad = true; // 控制变量



// 判断图片加载的函数
function isImgLoad(callback) {
    // 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
    // 查找所有封面图，迭代处理
    $('#door-reload img').each(function () {
        // 找到为0就将isLoad设为false，并退出each
        if (this.height === 0) {
            isLoad = false;
            return false;
        }
    });
    // 为true，没有发现为0的。加载完毕
    if (isLoad) {
        clearTimeout(t_img); // 清除定时器
        // 回调函数
        callback();
        // 为false，因为找到了没有加载完成的图，将调用定时器递归
    } else {
        isLoad = true;
        t_img = setTimeout(function () {
            isImgLoad(callback); // 递归扫描
        }, 500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
    }
}