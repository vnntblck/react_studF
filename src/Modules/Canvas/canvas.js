export default class Canvas {
    constructor({ id, width = 700, height = 700, WIN, callbacks }) {
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.prop = width/height;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "black";

        const { wheel, mouseUp, mouseDown, mouseMove, mouseLeave } = callbacks;
        this.canvas.addEventListener("wheel", wheel);
        this.canvas.addEventListener("mouseup", mouseUp);
        this.canvas.addEventListener("mousedown", mouseDown);
        this.canvas.addEventListener("mousemove", mouseMove);
        this.canvas.addEventListener("mouseleave", mouseLeave);
        this.WIN = WIN;
    }

        sx(x) {
        return x * this.WIN.WIDTH / this.canvas.width;
        }
        
        sy(y) {
        return y * this.WIN.HEIGHT / this.canvas.height;
        }

        xs(x) {
            return (x - this.WIN.LEFT) / this.WIN.WIDTH * this.canvas.width;
        }

        ys(y) {
            return this.canvas.height - (y - this.WIN.BOTTOM) / this.WIN.HEIGHT * this.canvas.height;
        }

        x(xs) {
            return xs * this.WIN.WIDTH / this.canvas.width + this.WIN.LEFT;
        }
    
        y(ys) {
            return -ys * this.WIN.HEIGHT / this.canvas.height + this.WIN.BOTTOM + this.WIN.HEIGHT;
        }

        drawRect(x, y, width, height, color) {
            const heightRect = height * this.canvas.height / this.WIN.HEIGHT;
            const widthRect = width * this.canvas.width / this.WIN.WIDTH;
    
            this.ctx.fillStyle = color;
            this.ctx.fillRect(this.xs(x), this.ys(y), widthRect, heightRect);
        }

        printText(text, x, y, color = "black", size = 12) {
            this.ctx.font = `${size}px serif`;
            this.ctx.fillStyle = color;
            this.ctx.fillText(text, this.xs(x), this.ys(y));
        }


        clear(){
            this.ctx.fillStyle = "#e1e7f0";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        line(x1, y1, x2, y2, linewidth = 2, color = "black") {
            this.ctx.beginPath();
            this.ctx.lineWidth = linewidth;
            this.ctx.strokeStyle = color;
            this.ctx.moveTo(this.xs(x1), this.ys(y1));
            this.ctx.lineTo(this.xs(x2), this.ys(y2));
            this.ctx.stroke();
        }
        
        point(x, y, color = 'red', size = 4) {
            this.ctx.beginPath();
            this.ctx.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
            this.ctx.fillStyle = color;
            this.ctx.fill();
            this.ctx.closePath();
        }

        polygon(points, color) {
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            for (let i = 0; i < points.length; i++) {
                this.ctx.lineTo(this.xs(points[i].x), this.ys(points[i].y));
                
            }
            this.ctx.lineWidth = 4;
            this.ctx.lineTo(this.xs(points[0].x), this.ys(points[0].y));
            this.ctx.closePath();
            this.ctx.fill();
        };

    }

    