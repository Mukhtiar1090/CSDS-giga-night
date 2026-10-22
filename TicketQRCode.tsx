import React from 'react';

interface TicketQRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export const TicketQRCode: React.FC<TicketQRCodeProps> = ({ value, size = 160, className = '' }) => {
  // Generate deterministic grid pattern based on string value
  const gridSize = 21; // standard version 1 QR size
  const modules: boolean[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  // Function to hash string into pseudorandom generator
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Fill finder patterns in 3 corners (7x7)
  const drawFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 || // Outer ring
          (r >= 2 && r <= 4 && c >= 2 && c <= 4) // Center 3x3 box
        ) {
          modules[startY + r][startX + c] = true;
        } else {
          modules[startY + r][startX + c] = false;
        }
      }
    }
  };

  drawFinder(0, 0); // Top-left
  drawFinder(gridSize - 7, 0); // Top-right
  drawFinder(0, gridSize - 7); // Bottom-left

  // Fill timing patterns
  for (let i = 8; i < gridSize - 8; i++) {
    modules[6][i] = i % 2 === 0;
    modules[i][6] = i % 2 === 0;
  }

  // Populate remainder deterministically based on input value
  let seedCounter = Math.abs(hash);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Don't overwrite finders or timing lines
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= gridSize - 8;
      const inBottomLeft = r >= gridSize - 8 && c < 8;
      const inCenterLogo = r >= 8 && r <= 12 && c >= 8 && c <= 12;

      if (inTopLeft || inTopRight || inBottomLeft) continue;
      if (r === 6 || c === 6) continue;

      if (inCenterLogo) {
        modules[r][c] = false; // leave blank for center badge
      } else {
        seedCounter += 1.337;
        modules[r][c] = seededRandom(seedCounter) > 0.48;
      }
    }
  }

  const cellSize = size / gridSize;

  return (
    <div className={`relative inline-flex items-center justify-center p-2.5 bg-white rounded-xl shadow-inner ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        {modules.map((row, r) =>
          row.map((cell, c) => {
            if (!cell) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize + 0.2}
                height={cellSize + 0.2}
                fill="#0a192f"
              />
            );
          })
        )}
      </svg>
      {/* Central Brand Badge */}
      <div 
        className="absolute flex items-center justify-center rounded-md bg-[#0a192f] border-2 border-[#c89b3c] shadow-sm text-center"
        style={{ width: size * 0.28, height: size * 0.28 }}
      >
        <img 
          src="/assets/aistudio/image_54ce8a19.png" 
          alt="CCS" 
          className="w-full h-full object-contain p-0.5" 
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};
