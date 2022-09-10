import { useEffect, useState } from 'react';

export function Canvas(props) {
    const { canvasRef, canvasWidth, canvasHeight, pixelSize, selectedColor, resetCanvas, handleZoom } = props;

    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [isHover, setIsHover] = useState(false);
    const [context, setContext] = useState();
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        setWidth(canvasWidth * pixelSize);
        setHeight(canvasHeight * pixelSize);
        setContext(canvasRef.current.getContext('2d'));
    }, [canvasHeight, canvasWidth]);

    useEffect(() => {
        if (resetCanvas) {
            context.fillStyle = '#fff'
            context.fillRect(0, 0, width, height);
        }
    }, [resetCanvas]);

    const fillPixel = (e) => {
        const canvasBoundary = e.target.getBoundingClientRect();
        const x = Math.floor((e.clientX - canvasBoundary.left) / pixelSize) * pixelSize;
        const y = Math.floor((e.clientY - canvasBoundary.top) / pixelSize) * pixelSize;
        context.fillStyle = selectedColor;
        context.fillRect(x, y, pixelSize, pixelSize);
    }

    const draw = (e) => {
        if (drawing) {
            fillPixel(e);
        }
    }

    const canvasStyles = {
        border: '1pt solid black',
        cursor: isHover ? 'pointer' : null
    }

    return <canvas ref={canvasRef} style={canvasStyles} width={width} height={height}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={fillPixel}
        onMouseDown={() => setDrawing(true)}
        onMouseUp={() => setDrawing(false)}
        onMouseMove={draw}></canvas>;
}

export default Canvas;
