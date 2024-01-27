"use client";

import { useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<any>(null);
  const xRef = useRef<any>(null);
  const yRef = useRef<any>(null);
  const [eccentricity, setEccentricity] = useState<number>(0.01);

  function drawConical(newValue: number) {
    console.log("Entra");
    setEccentricity(newValue);

    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext("2d");
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (eccentricity < 1) {
      const b = 1 + 85 * eccentricity;
      const a = Math.sqrt(-Math.pow(b, 2) / (Math.pow(eccentricity, 2) - 1));
      const scale = 1000;
      console.log(b);
      console.log(a);
      console.log("-------");
      const x = canvasWidth / 2; // Posición X del centro de la elipse
      const y = canvasHeight / 2; // Posición Y del centro de la elipse
      const radioX = Math.sqrt(a * scale); // Radio en la dirección X
      const radioY = Math.sqrt(b * scale); // Radio en la dirección Y

      // Dibuja la elipse
      ctx.beginPath();
      ctx.ellipse(x + radioX, y, radioX, radioY, 0, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    } else if (eccentricity == 1) {
      const startX = canvasWidth; // Posición inicial X
      const startY = 0; // Posición inicial Y
      const controlX = 0; // Posición del punto de control X
      const controlY = canvasHeight / 2; // Posición del punto de control Y
      const endX = canvasWidth; // Posición final X
      const endY = canvasHeight; // Posición final Y

      // Dibuja la parábola
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      ctx.stroke();
      ctx.closePath();
    } else {
      const moveFactor1 = canvasWidth * (eccentricity - 1) * 0.4;
      const startX1 = canvasWidth - moveFactor1; // Posición inicial X
      const startY1 = 0; // Posición inicial Y
      const control1 = 0 + moveFactor1; // Posición del punto de control X
      const controlY1 = canvasHeight / 2; // Posición del punto de control Y
      const endX1 = canvasWidth - moveFactor1; // Posición final X
      const endY1 = canvasHeight; // Posición final Y

      // Dibuja la parábola
      ctx.beginPath();
      ctx.moveTo(startX1, startY1);
      ctx.quadraticCurveTo(control1, controlY1, endX1, endY1);
      ctx.stroke();
      ctx.closePath();

      const securityGap = canvasWidth / 12;
      const moveFactor =
        canvasWidth * (eccentricity - 1) * 0.65 -
        (canvasWidth / 4) * (5 - Math.pow(eccentricity, 2));
      const startX = 0 + moveFactor - securityGap; // Posición inicial X
      const startY = 0; // Posición inicial Y
      const controlX = canvasWidth - moveFactor1 - securityGap; // Posición del punto de control X
      const controlY = canvasHeight / 2; // Posición del punto de control Y
      const endX = 0 + moveFactor - securityGap; // Posición final X
      const endY = canvasHeight; // Posición final Y

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      ctx.stroke();
      ctx.closePath();
    }
  }

  function test() {
    console.log(eccentricity);
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext("2d");
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Define las propiedades de la elipse
    var x = canvasWidth / 2; // Posición X del centro de la elipse
    var y = canvasHeight / 2; // Posición Y del centro de la elipse
    var radioX = Math.sqrt(1000); // Radio en la dirección X
    var radioY = Math.sqrt(150); // Radio en la dirección Y

    // Dibuja la elipse
    ctx.beginPath();
    ctx.ellipse(x, y, radioX, radioY, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }

  return (
    <main className="w-svw max-w-full min-h-svh max-h-svh">
      <button onClick={() => test()}>test</button>
      <label
        htmlFor="default-range"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Default range
      </label>
      <input
        id="default-range"
        type="range"
        min={0.01}
        max={2}
        step={0.01}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        onChange={(e) => drawConical(Number(e.target.value))}
      ></input>
      <section className="w-full h-full overflow-scroll ">
        <canvas
          ref={canvasRef}
          width={1400}
          height={600}
          className="bg-red-400"
        ></canvas>
      </section>
    </main>
  );
}
