var context, canvas;

export { canvas };

function getPosition(mouseEvent, canvas){
  var rect = canvas.getBoundingClientRect();
  return {
    X: mouseEvent.clientX - rect.left,
    Y: mouseEvent.clientY - rect.top
  };
}

initSignature = (selector) => {
  $(document).ready(function() {
    setTimeout(function(){
      canvas = document.getElementById(selector);
      var context = canvas.getContext("2d");

      canvas.width = 600;
      canvas.height = 200;

      context.lineJoin = "round";
      context.lineWidth = 5;

      var isTouchDevice = "ontouchstart" in document.documentElement;
      console.log(isTouchDevice);
      if(isTouchDevice){
        var drawer = {
          isDrawing: false,
          touchstart: function(coors){
            context.beginPath();
            context.moveTo(coors.x, coors.y);
            this.isDrawing = true;
          },
          touchmove: function(coors){
            context.strokeStyle = "#242424";

            if(this.isDrawing){
              context.lineTo(coors.x, coors.y);
              context.stroke();
            }
          },
          touchend: function(coors){
            if(this.isDrawing){
              this.touchmove(coors);
              this.isDrawing = false;
            }
          }
        };

        function draw(event){
          console.log(event.targetTouches[0].pageX);
          var coors = {
            x: event.targetTouches[0].pageX,
            y: event.targetTouches[0].pageY
          };

          var obj = canvas;

          if(obj.offsetParent){
            do {
              coors.x -= obj.offsetLeft;
              coors.y -= obj.offsetTop;
            }
            while ((obj = obj.offsetParent) != null);
          }

          drawer[event.type](coors);
        }

        canvas.addEventListener("touchstart", draw, false);
        canvas.addEventListener("touchmove", draw, false);
        canvas.addEventListener("touchend", draw, false);

        canvas.addEventListener("touchmove", function(event){
          event.preventDefault();
        }, false);
      } else {
        $(canvas).mousedown(function(mouseEvent){
          var position = getPosition(mouseEvent, canvas);
          context.moveTo(position.X, position.Y);
          context.beginPath();

          $(this).mousemove(function(mouseEvent){
            drawLine(mouseEvent, canvas, context);
          }).mouseup(function(mouseEvent){
            finishDrawing(mouseEvent, canvas, context);
          }).mouseout(function(mouseEvent){
            finishDrawing(mouseEvent, canvas, context);
          });
        });
      }
    }, 750);
  });
}

function drawLine(mouseEvent, canvas, context){
  context.strokeStyle = "#000000";
  var position = getPosition(mouseEvent, canvas);
  context.lineTo(position.X, position.Y);
  context.stroke();
}

function finishDrawing(mouseEvent, canvas, context){
  drawLine(mouseEvent, canvas, context);

  context.closePath();

  $(canvas).unbind("mousemove").unbind("mouseup").unbind("mouseout");
}

clearSignature = (selector) => {
  var canvas1 = document.getElementById(selector);
  var context1 = canvas1.getContext("2d");
  context1.clearRect(0, 0, canvas1.width, canvas1.height);
}

saveSignature = () => {
  return canvas.toDataURL();
}
