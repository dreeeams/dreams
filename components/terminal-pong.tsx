'use client';

import { useEffect, useRef, useState } from 'react';

export default function TerminalPong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const gameStateRef = useRef({
    ball: { x: 0, y: 0, dx: 3, dy: 3, size: 8 },
    player: { y: 0, height: 80, width: 8 },
    ai: { y: 0, height: 80, width: 8 },
    keys: { up: false, down: false },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = Math.min(400, parent.clientHeight);

        // Initialize positions
        const state = gameStateRef.current;
        state.ball.x = canvas.width / 2;
        state.ball.y = canvas.height / 2;
        state.player.y = canvas.height / 2 - state.player.height / 2;
        state.ai.y = canvas.height / 2 - state.ai.height / 2;
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        state.keys.up = true;
        e.preventDefault();
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        state.keys.down = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const state = gameStateRef.current;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        state.keys.up = false;
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        state.keys.down = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Game loop
    let animationId: number;

    const gameLoop = () => {
      const state = gameStateRef.current;
      const { ball, player, ai, keys } = state;

      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw center line
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Move player paddle
      if (keys.up && player.y > 0) {
        player.y -= 6;
      }
      if (keys.down && player.y < canvas.height - player.height) {
        player.y += 6;
      }

      // AI movement (simple follow ball)
      const aiCenter = ai.y + ai.height / 2;
      const ballCenter = ball.y;
      const aiSpeed = 3.5;

      if (ballCenter < aiCenter - 10 && ai.y > 0) {
        ai.y -= aiSpeed;
      } else if (ballCenter > aiCenter + 10 && ai.y < canvas.height - ai.height) {
        ai.y += aiSpeed;
      }

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Ball collision with top/bottom
      if (ball.y - ball.size <= 0 || ball.y + ball.size >= canvas.height) {
        ball.dy *= -1;
      }

      // Ball collision with player paddle
      if (
        ball.x - ball.size <= player.width &&
        ball.y >= player.y &&
        ball.y <= player.y + player.height
      ) {
        ball.dx = Math.abs(ball.dx);
        // Add spin based on where it hits the paddle
        const hitPos = (ball.y - player.y) / player.height;
        ball.dy = (hitPos - 0.5) * 8;
      }

      // Ball collision with AI paddle
      if (
        ball.x + ball.size >= canvas.width - ai.width &&
        ball.y >= ai.y &&
        ball.y <= ai.y + ai.height
      ) {
        ball.dx = -Math.abs(ball.dx);
        const hitPos = (ball.y - ai.y) / ai.height;
        ball.dy = (hitPos - 0.5) * 8;
      }

      // Score points
      if (ball.x - ball.size <= 0) {
        setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
        // Reset ball
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 3;
        ball.dy = 3;
      }

      if (ball.x + ball.size >= canvas.width) {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
        // Reset ball
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -3;
        ball.dy = 3;
      }

      // Draw player paddle
      ctx.fillStyle = '#00FF00';
      ctx.fillRect(0, player.y, player.width, player.height);

      // Draw AI paddle
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(canvas.width - ai.width, ai.y, ai.width, ai.height);

      // Draw ball
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between items-center text-xs font-mono">
        <span className="text-green-400">PLAYER: {score.player}</span>
        <span className="text-gray-500">USE ↑↓ OR W/S TO MOVE</span>
        <span className="text-red-400">AI: {score.ai}</span>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full border-t-4 border-gray-800"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}
