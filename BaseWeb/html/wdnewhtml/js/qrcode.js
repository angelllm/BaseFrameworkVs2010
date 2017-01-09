var demo = document.getElementById("demo");
var gg = demo.getElementsByTagName("img");
var ei = document.getElementById("enlarge_images");
for (i = 0; i < gg.length; i++) {
    var ts = gg[i];
    ts.onmousemove = function (event) {
        event = event || window.event;
        ei.style.display = "block";
		ei.style.position = "absolute";
        ei.innerHTML = '<img src="../webimage/qrcod.jpg"  />';
        ei.style.top = document.body.scrollTop + event.clientY + 20 + "px";
        ei.style.left = document.body.scrollLeft + event.clientX + -180 + "px";
    }
    ts.onmouseout = function () {
        ei.innerHTML = "";
        ei.style.display = "none";
    }
    ts.onclick = function () {
        window.open(this.src);
    }
}