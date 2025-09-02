import React, { useEffect, useRef } from 'react';

// The main App component that renders the fire particle animation.
export default function FireAnimation() {
  // A ref to the canvas element for direct DOM access.
  const canvasRef = useRef(null);

  useEffect(() => {
    // Get the canvas and its 2D rendering context.
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set the canvas to a fixed size of 100x100 pixels.
    canvas.width = 100;
    canvas.height = 100;

    // A class to represent an individual fire particle.
    class Particle {
      constructor(x, y, size, speedY, color, rotation) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedY = speedY;
        this.color = color;
        this.opacity = 1;
        this.rotation = rotation;
      }

      // Method to draw the particle on the canvas.
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        
        ctx.restore();
      }

      // Method to update the particle's state.
      update() {
        this.y -= this.speedY;
        this.opacity -= 0.005;
        this.size *= 0.99;
        this.rotation += 0.01;
      }
    }

    // Array to hold all the particle objects.
    let particlesArray = [];

    // Function to initialize the particles.
    function init() {
      // The canvas size is now fixed, so we don't use window dimensions.
      particlesArray = [];
      const numberOfParticles = 50; // Adjusted for the smaller canvas.
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 100 + 3; // Smaller particles for the smaller canvas.
        const x = canvas.width / 2 + (Math.random() - 0.5) * 50;
        const y = canvas.height + size;
        const speedY = Math.random() * 0.5 + 0.1;
        const color = ['#ff6600', '#ff9900', '#ffcc00', '#f4a460', '#e9967a'][Math.floor(Math.random() * 5)];
        const rotation = Math.random() * 2 * Math.PI;
        particlesArray.push(new Particle(x, y, size, speedY, color, rotation));
      }
    }

    // Function to handle adding new particles.
    function handleParticles() {
      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i];
        if (particle.opacity <= 0.01 || particle.size <= 1) {
          particlesArray.splice(i, 1);
          // Add a new particle at the bottom center.
          const size = Math.random() * 10 + 3;
          const x = canvas.width / 2 + (Math.random() - 0.5) * 50;
          const y = canvas.height + size;
          const speedY = Math.random() * 0.5 + 0.1;
          const color = ['#ff6600', '#ff9900', '#ffcc00', '#f4a460', '#e9967a'][Math.floor(Math.random() * 5)];
          const rotation = Math.random() * 2 * Math.PI;
          particlesArray.push(new Particle(x, y, size, speedY, color, rotation));
          i--;
        } else {
          particle.update();
          particle.draw();
        }
      }
    }

    // The animation loop function.
    function animate() {
      // Clear the canvas to create a transparent background.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      requestAnimationFrame(animate);
    }

    // Initialize the particles and start the animation loop.
    init();
    animate();

    // No resize listener needed as the canvas is a fixed size.
    return () => {};

  }, []);

  // The component's JSX structure with inline style tags for fixed positioning.
  return (
    <>
      <style>
        {`
          .fire-container {
            width: 400px;
            height: 400px;
            position: fixed;
            bottom: 40px;
            left: 50px;
          }
          .canvas-fire {
            width: 100%;
            height: 100%;
            display: block;
          }
        `}
      </style>
      <div className="fire-container">
        <canvas ref={canvasRef} className="canvas-fire" />
      </div>
    </>
  );
}
