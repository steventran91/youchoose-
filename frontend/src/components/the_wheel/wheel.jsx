import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';


const Wheel = props => {

    const canvasRef = useRef(null)

    // const draw = (ctx, frameCount) => {
    //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    //     ctx.fillStyle = '#000000'
    //     ctx.beginPath()
    //     ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
    //     ctx.fill()
    // }

    var options = ["Chinese", "Japanese","Vietnamese", "Indian", "Korean", "Mexican", "Italian", "American", "Vegan", "Mediterranean", "Thai", "Vegetarian", "French", "Irish", "Filipino"];
    
    var startAngle = 0;
    var arc = Math.PI / (options.length / 2);
    var spinTimeout = null;

    var spinArcStart = 10;
    var spinTime = 0;
    var spinTimeTotal = 0;

    var ctx;

    //document.getElementById("spin").addEventListener("click", spin);

    function byte2Hex(n) {
        var nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
    }

    function RGB2Color(r, g, b) {
        return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
    }

    function getColor(item, maxitem) {
        var phase = 0;
        var center = 128;
        var width = 127;
        var frequency = Math.PI * 2 / maxitem;

        let red = Math.sin(frequency * item + 2 + phase) * width + center;
        let green = Math.sin(frequency * item + 0 + phase) * width + center;
        let blue = Math.sin(frequency * item + 4 + phase) * width + center;

        return RGB2Color(red, green, blue);
    }

    function drawRouletteWheel(canvas) {
        if (canvas.getContext) {
            var outsideRadius = 200;
            var textRadius = 160;
            var insideRadius = 125;

            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 500, 500);

            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;

            ctx.font = 'bold 12px Didot, serif';

            for (var i = 0; i < options.length; i++) {
                var angle = startAngle + i * arc;
                //ctx.fillStyle = colors[i];
                ctx.fillStyle = getColor(i, options.length);

                ctx.beginPath();
                ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
                ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();

                ctx.save();
                ctx.shadowOffsetX = -1;
                ctx.shadowOffsetY = -1;
                ctx.shadowBlur = 0;
                ctx.shadowColor = "rgb(220,220,220)";
                ctx.fillStyle = "black";
                ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                    250 + Math.sin(angle + arc / 2) * textRadius);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                var text = options[i];
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();
            }

            //Arrow
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
            ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
            ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
            ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
            ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
            ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
            ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
            ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
            ctx.fill();

        }
    }

    let spinAngleStart;
    function spin() {
        spinAngleStart = Math.random() * 10 + 10;
        spinTime = 0;
        spinTimeTotal = Math.random() * 3 + 4 * 1000;
        rotateWheel();
    }

    function rotateWheel() {
        // let canvas = canvasRef.current
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI / 180);
        //drawRouletteWheel(canvas);
        // let rotateWheel = rotateWheel.bindt(this);
        spinTimeout = setTimeout(rotateWheel, 30);
    }

    function stopRotateWheel() {
        //let canvas = canvasRef.current;
        // let ctx = canvas.getContext("2d");
        clearTimeout(spinTimeout);
        var degrees = startAngle * 180 / Math.PI + 90;
        var arcd = arc * 180 / Math.PI;
        var index = Math.floor((360 - degrees % 360) / arcd);
        ctx.save();
        ctx.font = 'bold 30px Didot, serif';
        var text = options[index];
        props.receiveCuisine(text);
        console.log(text);
        ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
        ctx.restore();
        props.history.push("/restaurants/");
    }

    function easeOut(t, b, c, d) {
        var ts = (t /= d) * t;
        var tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }

    function drawRouletteWheel(canvas) {
        if (canvas.getContext) {
            var outsideRadius = 200;
            var textRadius = 160;
            var insideRadius = 125;

            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 500, 500);

            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;

            ctx.font = 'bold 12px Didot, serif';

            for (var i = 0; i < options.length; i++) {
                var angle = startAngle + i * arc;
                //ctx.fillStyle = colors[i];
                ctx.fillStyle = getColor(i, options.length);

                ctx.beginPath();
                ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
                ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();

                ctx.save();
                ctx.shadowOffsetX = -1;
                ctx.shadowOffsetY = -1;
                ctx.shadowBlur = 0;
                ctx.shadowColor = "rgb(220,220,220)";
                ctx.fillStyle = "black";
                ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                    250 + Math.sin(angle + arc / 2) * textRadius);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                var text = options[i];
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();
            }

            //Arrow
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
            ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
            ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
            ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
            ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
            ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
            ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
            ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
            ctx.fill();

            var degrees = startAngle * 180 / Math.PI + 90;
            var arcd = arc * 180 / Math.PI;
            var index = Math.floor((360 - degrees % 360) / arcd);
            ctx.save();
            // font - family: ;
            ctx.font = 'bold 30px Didot, serif';
            var text = options[index];
            ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
            ctx.restore();
        }
    }

    useEffect(() => {

        const canvas = canvasRef.current
        // const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId

        //Our draw came here
        const render = () => {
            frameCount++
            drawRouletteWheel(canvas, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [drawRouletteWheel])

    return (
        <div className={`modal${props.active ? " active" : ""}`}>
            <div className="modal-screen" onClick={props.modalSwitch}></div>
            <div className="wheel-container">
                <canvas ref={canvasRef} {...props} width="500" height="500" />
                <input onClick={spin} type="button" value="You Choose" id='spin' />
                <strong className="close-modal" onClick={props.modalSwitch}>❌</strong>
            </div>
        </div>
    )
}

export default Wheel;