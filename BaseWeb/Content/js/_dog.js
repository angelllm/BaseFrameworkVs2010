(function ($) {

    $.fn.DrawDog = function (options) {

        var dog = this;
        var canvas = dog[0];
        var defaults = {
            imgArr: [],
            linkArr: [],
            speed: 3000
        }
        var options = $.extend(defaults, options);

        var init = function (canvasObj) {
            


            var PI = Math.PI;
            var PI2 = 2 * PI;
            var ctx = canvas.getContext('2d');
            ctx.width = $(canvasObj).width()/2;
            ctx.height = $(canvasObj).height()/2;
            // 头
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#5f0a2b';
            ctx.fillStyle = '#fbdd6d';
            // 身体 左手
            ctx.restore();
            ctx.beginPath();
            ctx.moveTo(310, 400);
            ctx.quadraticCurveTo(300, 540, 310, 550);
            ctx.quadraticCurveTo(355, 580, 410, 550);
            ctx.quadraticCurveTo(390, 490, 410, 442);
            ctx.quadraticCurveTo(386, 442, 310, 400);
            ctx.fill();
            ctx.stroke();
            // 右手
            ctx.save();
            // 利用镜像
            ctx.scale(-1, 1);
            ctx.translate(-1000, 0);
            ctx.beginPath();
            ctx.moveTo(310, 400);
            ctx.quadraticCurveTo(300, 540, 310, 550);
            ctx.quadraticCurveTo(355, 580, 410, 550);
            ctx.quadraticCurveTo(390, 490, 410, 442);
            ctx.quadraticCurveTo(386, 442, 310, 400);
            ctx.fill();
            ctx.stroke();
            // 腹部
            ctx.restore();
            ctx.beginPath();
            ctx.moveTo(410, 442);
            ctx.quadraticCurveTo(390, 490, 410, 550);
            ctx.quadraticCurveTo(400, 560, 380, 562);
            ctx.quadraticCurveTo(380, 610, 410, 650);
            ctx.quadraticCurveTo(500, 680, 590, 650);
            ctx.quadraticCurveTo(620, 620, 618, 560);
            ctx.quadraticCurveTo(603, 560, 588, 550);
            ctx.quadraticCurveTo(610, 500, 590, 442);
            ctx.quadraticCurveTo(500, 460, 410, 442);
            ctx.fill();
            ctx.stroke();
            // 左腿部
            ctx.beginPath();
            ctx.moveTo(410, 650);
            ctx.quadraticCurveTo(405, 710, 440, 770);
            ctx.quadraticCurveTo(480, 780, 495, 750);
            ctx.lineTo(480, 664);
            ctx.quadraticCurveTo(445, 665, 410, 650);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // 右腿部
            // 利用镜像
            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-1000, 0);
            ctx.beginPath();
            ctx.moveTo(410, 650);
            ctx.quadraticCurveTo(405, 710, 440, 770);
            ctx.quadraticCurveTo(480, 780, 495, 750);
            ctx.lineTo(480, 664);
            ctx.quadraticCurveTo(445, 665, 410, 650);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // 腹白
            ctx.restore();
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = '#FFF';
            ctx.scale(0.9, 1.2);
            ctx.arc(554, 440, 96, 0, PI2);
            ctx.closePath();
            ctx.fill();
            // 心
            ctx.restore();
            ctx.beginPath();
            ctx.fillStyle = '#fd4128';
            ctx.moveTo(500, 500);
            ctx.bezierCurveTo(420, 460, 450, 560, 500, 580);
            ctx.closePath();
            ctx.fill();
            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-1000, 0);
            ctx.beginPath();
            ctx.fillStyle = '#fd4128';
            ctx.moveTo(500, 500);
            ctx.bezierCurveTo(420, 460, 450, 560, 500, 580);
            ctx.closePath();
            ctx.fill();





            ctx.restore();
            ctx.fillStyle = '#fbdd6d';
            ctx.save();
            ctx.beginPath();
            ctx.scale(1.2, 0.9);
            ctx.arc(500 / 1.2, 400 / 0.9 - 180, 240, 0, PI2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 左耳朵
            ctx.restore();
            ctx.beginPath();
            ctx.moveTo(280, 100);
            ctx.bezierCurveTo(120, 180, 150, 280, 150, 300);
            ctx.quadraticCurveTo(200, 310, 250, 300);
            ctx.bezierCurveTo(250, 320, 280, 180, 280, 100);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 右耳朵
            ctx.save();
            // 利用镜像
            ctx.scale(-1, 1);
            ctx.translate(-1000, 0);
            ctx.moveTo(280, 100);
            ctx.bezierCurveTo(120, 180, 150, 280, 150, 300);
            ctx.quadraticCurveTo(200, 310, 250, 300);
            ctx.bezierCurveTo(250, 320, 280, 180, 280, 100);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 左眼睛
            ctx.restore();
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = '#5f0a2b';
            ctx.scale(1.2, 0.9);
            ctx.arc(340 / 1.2, 330 / 0.9, 30, 0, PI2);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = '#FFF';
            ctx.arc(330 / 1.2, 336 / 0.9, 12, 0, PI2);
            ctx.fill();

            // 右眼睛
            ctx.restore();
            // 利用镜像

            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-1000, 0);
            ctx.beginPath();
            ctx.fillStyle = '#5f0a2b';
            ctx.scale(1.2, 0.9);
            ctx.arc(340 / 1.2, 330 / 0.9, 30, 0, PI2);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = '#FFF';
            ctx.arc(330 / 1.2, 336 / 0.9, 12, 0, PI2);
            ctx.fill();

            // 嘴
            ctx.restore();
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = '#5f0a2b';
            ctx.moveTo(450, 380);
            ctx.quadraticCurveTo(500, 370, 550, 380);
            ctx.quadraticCurveTo(556, 400, 540, 410);
            ctx.quadraticCurveTo(516, 402, 514, 420);
            ctx.moveTo(450, 380);
            ctx.quadraticCurveTo(446, 400, 456, 410);
            ctx.quadraticCurveTo(486, 402, 484, 420);
            ctx.quadraticCurveTo(495, 426, 514, 420);
            ctx.fill();

            // 嘴上的亮光
            ctx.restore();
            ctx.save();
            ctx.fillStyle = '#FFF';
            ctx.fillRect(500, 382, 18, 6);
            ctx.fillRect(524, 382, 20, 6);
            ctx.moveTo(500, 420);
            ctx.lineTo(500, 456);
            ctx.stroke();


            // 尾部
            ctx.restore();
            ctx.beginPath();
            ctx.fillStyle = '#f6f2e6'
            // ctx.fillRect( 690, 440, 10, 10 );
            ctx.moveTo(690, 440);
            ctx.quadraticCurveTo(790, 470, 696, 520);
            ctx.quadraticCurveTo(696, 440, 690, 440);
            ctx.fill();
            ctx.stroke();

//            var ctx = canvasObj.getContext("2d");
//            ctx.width = $(canvasObj).width();
//            ctx.height = $(canvasObj).height();
//            //arc(定义一个中心点，半径，起始角度，结束角度，和绘图方向：顺时针或逆时针)
//            ctx.beginPath();
//            ctx.arc(250, 250, 200, Math.PI * 1.35, Math.PI * 1.65, false);
//            ctx.arc(272, 220, 150, Math.PI * 1.65, Math.PI * 1.70, false);

//            ctx.strokeStyle = 'rgba(255,255,255,1)';
//            ctx.lineWidth = 1.0;


//            ctx.stroke();
//            ctx.closePath();

           

        }

        var drawDialog = function (canvasObj, backgroundColor, lineColor, chat, chatColor) {

            var ctx = canvasObj.getContext("2d");
            //Dialog
            ctx.beginPath();
            ctx.moveTo(75, 25);
            ctx.quadraticCurveTo(25, 25, 25, 62.5);
            ctx.quadraticCurveTo(25, 100, 50, 100);
            ctx.quadraticCurveTo(50, 120, 30, 125);
            ctx.quadraticCurveTo(60, 120, 65, 100);
            ctx.quadraticCurveTo(125, 100, 125, 62.5);
            ctx.quadraticCurveTo(125, 25, 75, 25);
            //color
            ctx.strokeStyle = lineColor;
            ctx.fillStyle = backgroundColor;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            //chat
            ctx.font = "18px Verdana";
            ctx.fillStyle = chatColor;
            ctx.fillText(chat, 35, 60);
        }

        init(canvas);
        //drawDialog(canvas, "#fff", "#ff0000", "hello","#000");
        return this.each(function () {


        });

    }


})(jQuery);


$("#dog").DrawDog();