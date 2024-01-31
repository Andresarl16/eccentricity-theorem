"use client";

import { montserrat, roboto } from "@/constants/fonts";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<any>(null);
  const canvasAxisRef = useRef<any>(null);
  const xRef = useRef<any>(null);
  const yRef = useRef<any>(null);
  const [eccentricity, setEccentricity] = useState<number>(0.01);
  const [currentCanvasWidth, setCurrentCanvasWidth] = useState<number>(0);
  const [currentCanvasHeight, setCurrentCanvasHeight] = useState<number>(0);

  function drawAxis() {
    console.log("No dibuja");
    const ctx: CanvasRenderingContext2D =
      canvasAxisRef.current.getContext("2d");
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);

    // Draw the Path
    ctx.stroke();

    let yCoordinateIncrease = canvasHeight / 2 + 20;
    let yCoordinateDecrease = canvasHeight / 2 - 20;
    while (yCoordinateIncrease < canvasHeight && yCoordinateDecrease > 0) {
      console.log("Se supone que dibuja");
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2 - 10, yCoordinateIncrease);
      ctx.lineTo(canvasWidth / 2 + 10, yCoordinateIncrease);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2 - 10, yCoordinateDecrease);
      ctx.lineTo(canvasWidth / 2 + 10, yCoordinateDecrease);
      ctx.stroke();

      yCoordinateIncrease += 20;
      yCoordinateDecrease -= 20;
    }

    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);

    // Draw the Path
    ctx.stroke();

    let xCoordinateIncrease = canvasWidth / 2 + 20;
    let xCoordinateDecrease = canvasWidth / 2 - 20;
    while (xCoordinateIncrease < canvasWidth && xCoordinateDecrease > 0) {
      ctx.beginPath();
      ctx.moveTo(xCoordinateIncrease, canvasHeight / 2 - 10);
      ctx.lineTo(xCoordinateIncrease, canvasHeight / 2 + 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xCoordinateDecrease, canvasHeight / 2 - 10);
      ctx.lineTo(xCoordinateDecrease, canvasHeight / 2 + 10);
      ctx.stroke();

      xCoordinateIncrease += 20;
      xCoordinateDecrease -= 20;
    }
  }

  function drawConical(newValue: number) {
    setEccentricity(newValue);
    console.log(newValue);

    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext("2d");
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const securityGap = canvasWidth / 12 / 2;
    ctx.strokeStyle = "#0284c7";
    ctx.lineWidth = 2;

    if (newValue < 1) {
      const b = (canvasHeight / 6) * newValue; //87
      const a = Math.sqrt(-Math.pow(b, 2) / (Math.pow(newValue, 2) - 1));
      const scale = 1000;
      const x = canvasWidth / 2; // Posición X del centro de la elipse
      const y = canvasHeight / 2; // Posición Y del centro de la elipse
      const radioX = Math.sqrt(a * scale); // Radio en la dirección X
      const radioY = Math.sqrt(b * scale); // Radio en la dirección Y

      // Dibuja la elipse
      ctx.beginPath();
      ctx.ellipse(
        x + radioX + securityGap,
        y,
        radioX,
        radioY,
        0,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.closePath();
    } else if (newValue == 1) {
      console.log("Es parabola");
      const startX = canvasWidth + securityGap; // Posición inicial X
      const startY = 0; // Posición inicial Y
      const controlX = 0 + securityGap; // Posición del punto de control X
      const controlY = canvasHeight / 2; // Posición del punto de control Y
      const endX = canvasWidth + securityGap; // Posición final X
      const endY = canvasHeight; // Posición final Y

      // Dibuja la parábola
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      ctx.stroke();
      ctx.closePath();
    } else {
      const moveFactor1 = canvasWidth * (newValue - 1) * 0.4;
      const startX1 = canvasWidth - moveFactor1 + securityGap; // Posición inicial X
      const startY1 = 0; // Posición inicial Y
      const controlX1 = 0 + moveFactor1 + securityGap; // Posición del punto de control X
      const controlY1 = canvasHeight / 2; // Posición del punto de control Y
      const endX1 = canvasWidth - moveFactor1 + securityGap; // Posición final X
      const endY1 = canvasHeight; // Posición final Y

      // Dibuja la parábola
      ctx.beginPath();
      ctx.moveTo(startX1, startY1);
      ctx.quadraticCurveTo(controlX1, controlY1, endX1, endY1);
      ctx.stroke();
      ctx.closePath();

      const moveFactor = canvasWidth * (newValue - 1) * 0.4;
      const moveFactor2 = false ? (canvasWidth / 2) * (2 - newValue) : 0;
      const securityGapAdd = canvasWidth / 5000;
      const startX =
        0 + moveFactor - securityGap + securityGapAdd - moveFactor2; // Posición inicial X
      const startY = 0; // Posición inicial Y
      const controlX =
        canvasWidth - moveFactor - securityGap + securityGapAdd - moveFactor2; // Posición del punto de control X
      const controlY = canvasHeight / 2; // Posición del punto de control Y
      const endX = 0 + moveFactor - securityGap + securityGapAdd - moveFactor2; // Posición final X
      const endY = canvasHeight; // Posición final Y

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      ctx.stroke();
      ctx.closePath();
    }
  }

  function start() {
    const dpr = window.devicePixelRatio || 1;
    canvasRef.current.width = (window.innerWidth / 12) * 9 * dpr;
    canvasRef.current.height = window.innerHeight * dpr;
    canvasRef.current.style.width = (window.innerWidth / 12) * 9 + "px";
    canvasRef.current.style.height = window.innerHeight + "px";

    canvasAxisRef.current.width = (window.innerWidth / 12) * 9 * dpr;
    canvasAxisRef.current.height = window.innerHeight * dpr;
    canvasAxisRef.current.style.width = (window.innerWidth / 12) * 9 + "px";
    canvasAxisRef.current.style.height = window.innerHeight + "px";
    drawAxis();
    drawConical(eccentricity); // Ejecuta la función si miRef ya no es nulo
  }

  useEffect(() => {
    // Verifica si miRef ya no es nulo
  }, []); // Asegúrate de incluir miRef.current en las dependencias

  return (
    <main className="w-svw max-w-full min-h-svh max-h-svh grid grid-cols-12">
      <nav className="py-4   px-3 col-span-3 bg-neutral-50 border-r-2 border-slate-600">
        <h1 className={`${montserrat.className} text-2xl font-semibold`}>
          Teorema de Excentricidad
        </h1>
        <h2 className={`${roboto.className} text-xl font-medium mb-4`}>
          Control de Representación
        </h2>
        <label
          htmlFor="eccentricity-input"
          className={`${roboto.className} mr-3 text-lg`}
        >
          Valor de la Excentricidad
        </label>
        <input
          className="w-20 px-1.5 border-2 border-neutral-200 bg-neutral-100 rounded-lg"
          id="eccentricity-input"
          type="number"
          value={eccentricity}
          onChange={(e) => drawConical(Number(e.target.value))}
          min={0.01}
          max={2}
          step={0.01}
          onKeyDown={(e) => e.preventDefault()}
          onKeyUp={(e) => e.preventDefault()}
        />
        <input
          id="default-range"
          type="range"
          min={0.01}
          max={2}
          step={0.01}
          value={eccentricity}
          className="slider w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
          onChange={(e) => drawConical(Number(e.target.value))}
        ></input>
        <div className="flex justify-center">
          <button
            onClick={() => start()}
            className="mt-3 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg text-md px-3 py-1"
          >
            Empezar
          </button>
        </div>
      </nav>

      <section className="col-span-9 h-full relative">
        <canvas
          ref={canvasAxisRef}
          className="w-full h-full bg-neutral-50 absolute top-0 left-0"
        ></canvas>
        <canvas
          ref={canvasRef}
          className="w-full h-full bg-transparent absolute top-0 left-0"
        ></canvas>
      </section>
    </main>
  );
}
