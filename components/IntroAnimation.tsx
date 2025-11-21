import React, { useEffect, useRef, useState } from 'react';

interface Props {
  onComplete: () => void;
}

type AnimationType = 
  | 'collapse' | 'explode' | 'binary' | 'constellation' | 'wormhole'
  | 'meteors' | 'aurora' | 'saturn' | 'eclipse' | 'pulsar';

const IntroAnimation: React.FC<Props> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(1);
  
  const handleSkip = () => {
    setOpacity(0);
    setTimeout(onComplete, 500);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    // --- SELECTION LOGIC ---
    const types: AnimationType[] = [
        'collapse', 'explode', 'binary', 'constellation', 'wormhole',
        'meteors', 'aurora', 'saturn', 'eclipse', 'pulsar'
    ];
    
    const lastAnim = localStorage.getItem('nothing_portfolio_last_anim');
    const availableTypes = types.filter(t => t !== lastAnim);
    const selectedType = availableTypes[Math.floor(Math.random() * availableTypes.length)] || types[0];
    
    localStorage.setItem('nothing_portfolio_last_anim', selectedType);

    // --- QUOTES ---
    const QUOTES: Record<AnimationType, { text: string; author: string }> = {
      collapse: { text: "Black holes ain't so black.", author: "Stephen Hawking" },
      explode: { text: "We are made of starstuff.", author: "Carl Sagan" },
      binary: { text: "Gravity explains the motions of the planets.", author: "Isaac Newton" },
      constellation: { text: "Look up at the stars, not down at your feet.", author: "Stephen Hawking" },
      wormhole: { text: "Space and time are one.", author: "Albert Einstein" },
      meteors: { text: "I would rather be a superb meteor.", author: "Jack London" },
      aurora: { text: "The sky is the daily bread of the eyes.", author: "Ralph Waldo Emerson" },
      saturn: { text: "Nature is an infinite sphere.", author: "Blaise Pascal" },
      eclipse: { text: "Three things cannot be long hidden: the sun, the moon, and the truth.", author: "Buddha" },
      pulsar: { text: "Listening to the heartbeat of the universe.", author: "Jocelyn Bell Burnell" }
    };

    const quote = QUOTES[selectedType];

    // Configuration
    let frameCount = 0;
    const maxFrames = 180; // 3 seconds @ 60fps
    let animationId: number;
    
    interface Particle {
        type: string;
        x?: number; y?: number;
        vx?: number; vy?: number;
        size?: number;
        angle?: number;
        speed?: number;
        life?: number;
        dist?: number;
        z?: number;
        length?: number;
        side?: number;
        width?: number;
    }
    const particles: Particle[] = [];
    
    ctx.lineCap = 'round';

    // --- INITIALIZATION ---
    const init = () => {
      // Background static stars for all scenes
      for(let i=0; i<50; i++) {
          particles.push({ type: 'bg_star', x: Math.random()*width, y: Math.random()*height, size: Math.random()*1.5 });
      }

      switch (selectedType) {
        case 'collapse':
          for (let i = 0; i < 120; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.max(width, height) * (0.3 + Math.random() * 0.6);
            particles.push({
              type: 'matter',
              x: centerX + Math.cos(angle) * dist,
              y: centerY + Math.sin(angle) * dist,
              speed: 0.02 + Math.random() * 0.03,
              angle: angle
            });
          }
          break;

        case 'explode':
          // Initial state empty, explodes at specific frame
          break;

        case 'binary':
          for (let i = 0; i < 80; i++) {
             particles.push({
                 type: 'dust',
                 angle: Math.random() * Math.PI * 2,
                 dist: 40 + Math.random() * 200,
                 size: Math.random() * 1.5
             });
          }
          break;

        case 'constellation':
          for (let i = 0; i < 40; i++) {
            particles.push({
              type: 'node',
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              size: Math.random() * 2 + 1
            });
          }
          break;

        case 'wormhole':
          for (let i = 0; i < 80; i++) {
            particles.push({
              type: 'tunnel',
              z: Math.random() * 2000,
              angle: Math.random() * Math.PI * 2,
              speed: 10 + Math.random() * 15
            });
          }
          break;
        
        case 'meteors':
           // Spawns dynamically
          break;
        
        case 'saturn':
          for (let i = 0; i < 400; i++) {
             const angle = Math.random() * Math.PI * 2;
             const dist = 90 + Math.random() * 80;
             particles.push({ type: 'ring', angle, dist, speed: (200/dist) * 0.03 });
          }
          break;

        case 'pulsar':
          // Procedural
          break;
      }
    };

    init();

    // --- RENDERERS ---
    
    const drawGlobalEffects = () => {
        // Scanlines
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        for (let y = 0; y < height; y += 4) {
            if ((y + frameCount) % 8 === 0) {
                ctx.fillRect(0, y, width, 2);
            }
        }
        
        // Scanline Bar (Moving)
        const barY = (frameCount * 8) % (height + 200) - 100;
        ctx.fillStyle = 'rgba(215, 25, 33, 0.05)'; // Subtle Red Tint
        ctx.fillRect(0, barY, width, 40);

        // Digital Noise
        const noiseSize = 2;
        for (let i = 0; i < 100; i++) {
            const x = Math.floor(Math.random() * width / noiseSize) * noiseSize;
            const y = Math.floor(Math.random() * height / noiseSize) * noiseSize;
            ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)';
            ctx.fillRect(x, y, noiseSize, noiseSize);
        }
    };

    const render = () => {
        // Clear
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, width, height);

        // Draw Background Stars
        ctx.fillStyle = 'rgba(255,255,255, 0.4)';
        particles.forEach(p => {
             if(p.type === 'bg_star' && p.x && p.y && p.size) {
                 ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
             }
        });

        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ffffff';

        if (selectedType === 'collapse') {
            // Event Horizon
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            const horizonR = 20 + Math.sin(frameCount * 0.1) * 2;
            ctx.beginPath(); ctx.arc(centerX, centerY, horizonR, 0, Math.PI*2); ctx.stroke();

            particles.forEach(p => {
                if (p.type !== 'matter' || !p.x || !p.y) return;
                const dx = centerX - p.x;
                const dy = centerY - p.y;
                const distToCenter = Math.hypot(dx, dy);
                const speedMult = Math.max(1, 600 / (distToCenter + 1));
                
                p.x += dx * (p.speed||0) * speedMult * 0.05;
                p.y += dy * (p.speed||0) * speedMult * 0.05;
                // Swirl
                p.x += Math.sin(frameCount * 0.1) * 3;
                p.y += Math.cos(frameCount * 0.1) * 3;

                ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); ctx.fill();
            });
        } 
        else if (selectedType === 'explode') {
             if (frameCount < 30) { 
                const jitter = (Math.random()-0.5) * (frameCount * 0.2);
                ctx.beginPath(); ctx.arc(centerX + jitter, centerY + jitter, 4 + frameCount/5, 0, Math.PI*2); ctx.fill();
             } else if (frameCount === 30) {
                for(let i=0; i<300; i++) {
                   particles.push({ type: 'debris', x: centerX, y: centerY, angle: Math.random() * Math.PI * 2, speed: Math.random() * 20 + 2, life: 1 });
                }
             } else {
                const waveR = (frameCount - 30) * 12; 
                ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, 1 - waveR/800)})`;
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(centerX, centerY, waveR, 0, Math.PI*2); ctx.stroke();
                particles.forEach(p => {
                   if (p.type === 'debris' && p.x && p.y && p.angle && p.speed) {
                       p.x += Math.cos(p.angle) * p.speed;
                       p.y += Math.sin(p.angle) * p.speed;
                       p.speed *= 0.95; 
                       ctx.fillStyle = `rgba(255,255,255,${p.life})`;
                       ctx.fillRect(p.x, p.y, 2, 2);
                   }
                });
             }
        }
        else if (selectedType === 'binary') {
            const angle = frameCount * 0.15; 
            const separation = 60;
            const x1 = centerX + Math.cos(angle) * separation;
            const y1 = centerY + Math.sin(angle) * separation;
            const x2 = centerX + Math.cos(angle + Math.PI) * separation;
            const y2 = centerY + Math.sin(angle + Math.PI) * separation;

            // Stream
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.beginPath(); ctx.moveTo(x1, y1); 
            ctx.bezierCurveTo(centerX, centerY, centerX, centerY, x2, y2); ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.arc(x1, y1, 15, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(x2, y2, 12, 0, Math.PI*2); ctx.fill();
            
            particles.forEach(p => {
                if (p.type === 'dust' && p.dist && p.angle) {
                    const a = p.angle + angle * 0.3;
                    const px = centerX + Math.cos(a) * p.dist;
                    const py = centerY + Math.sin(a) * p.dist;
                    ctx.fillStyle = 'rgba(255,255,255,0.5)';
                    ctx.fillRect(px, py, p.size || 1, p.size || 1);
                }
            });
        }
        else if (selectedType === 'constellation') {
             particles.forEach(p => {
                if (p.type !== 'node' || !p.x || !p.y) return;
                p.x += (p.vx||0) * 1.5; p.y += (p.vy||0) * 1.5; 
                if (p.x < 0 || p.x > width) p.vx = -(p.vx||0);
                if (p.y < 0 || p.y > height) p.vy = -(p.vy||0);
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size||1, 0, Math.PI*2); ctx.fill();
             });
             // Connections
             ctx.strokeStyle = 'rgba(255,255,255,0.2)';
             ctx.lineWidth = 1;
             for(let i=0; i<particles.length; i++) {
                for(let j=i+1; j<particles.length; j++) {
                   const p1 = particles[i]; const p2 = particles[j];
                   if(p1.type === 'node' && p2.type === 'node' && p1.x && p2.x && p1.y && p2.y) {
                      const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                      if(d < 150) {
                         ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
                      }
                   }
                }
             }
        }
        else if (selectedType === 'wormhole') {
             particles.forEach(p => {
                if (p.type !== 'tunnel') return;
                p.z = (p.z||0) - (p.speed||10);
                if ((p.z||0) <= 1) { p.z = 2000; p.angle = Math.random() * Math.PI * 2; }
                const k = 600 / (p.z||1);
                const x = centerX + Math.cos(p.angle||0) * width * k * 0.5;
                const y = centerY + Math.sin(p.angle||0) * height * k * 0.5;
                const len = (2000 - (p.z||0))/50;
                ctx.strokeStyle = `rgba(255,255,255,${1 - (p.z||0)/2000})`;
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(x, y); 
                ctx.lineTo(x + Math.cos(p.angle||0)*len, y + Math.sin(p.angle||0)*len); ctx.stroke();
             });
        }
        else if (selectedType === 'meteors') {
            if (frameCount % 10 === 0) {
                 particles.push({ type: 'meteor', x: Math.random() * width * 1.2, y: -50, speed: 30 + Math.random()*10, length: 50 + Math.random()*100 });
            }
            particles.forEach(p => {
                if(p.type !== 'meteor' || !p.x || !p.y) return;
                p.x -= (p.speed||10); p.y += (p.speed||10)*0.6;
                ctx.strokeStyle = 'rgba(255,255,255,0.9)';
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + (p.length||50), p.y - (p.length||50)*0.6); ctx.stroke();
            });
            // Planet Surface
            ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(centerX, height*4, height*3.2, 0, Math.PI*2); ctx.fill();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
        }
        else if (selectedType === 'aurora') {
            for(let i=0; i<5; i++) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255,255,255,0.15)`;
                for(let x=0; x<=width; x+=20) {
                    const y = centerY + Math.sin(x*0.005 + frameCount*0.02 + i)*150 + Math.sin(x*0.02 - frameCount*0.03)*50;
                    if(x===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        }
        else if (selectedType === 'saturn') {
             particles.forEach(p => {
                 if(p.type !== 'ring' || !p.angle || !p.dist) return;
                 const a = p.angle + frameCount*0.01;
                 const rx = p.dist * Math.cos(a);
                 const ry = p.dist * Math.sin(a) * 0.3;
                 const rot = -0.4;
                 const x = rx * Math.cos(rot) - ry * Math.sin(rot) + centerX;
                 const y = rx * Math.sin(rot) + ry * Math.cos(rot) + centerY;
                 ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillRect(x, y, 2, 2);
             });
             ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(centerX, centerY, 60, 0, Math.PI*2); ctx.fill();
             ctx.strokeStyle = '#fff'; ctx.stroke();
        }
        else if (selectedType === 'eclipse') {
             // Rays
             ctx.strokeStyle = 'rgba(255,255,255,0.3)';
             for(let i=0; i<24; i++) {
                 const a = (i/24)*Math.PI*2 + frameCount*0.005;
                 const r = 120 + Math.sin(frameCount*0.1 + i)*20;
                 ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(centerX+Math.cos(a)*r, centerY+Math.sin(a)*r); ctx.stroke();
             }
             ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(centerX, centerY, 80, 0, Math.PI*2); ctx.fill();
             ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
        }
        else if (selectedType === 'pulsar') {
             const a = frameCount * 0.5;
             ctx.strokeStyle = '#fff';
             ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(centerX + Math.cos(a)*width, centerY + Math.sin(a)*width); ctx.stroke();
             ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(centerX - Math.cos(a)*width, centerY - Math.sin(a)*width); ctx.stroke();
             ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(centerX, centerY, 15, 0, Math.PI*2); ctx.fill();
             // Magnetic lines
             ctx.strokeStyle = 'rgba(255,255,255,0.1)';
             ctx.beginPath(); ctx.ellipse(centerX, centerY, 100, 300, a, 0, Math.PI*2); ctx.stroke();
             ctx.beginPath(); ctx.ellipse(centerX, centerY, 100, 300, a+Math.PI, 0, Math.PI*2); ctx.stroke();
        }

        // --- POST PROCESSING ---
        drawGlobalEffects();

        // --- UI OVERLAY ---
        const progress = Math.min(1, frameCount / maxFrames);
        
        // Progress Bar
        ctx.fillStyle = '#333';
        ctx.fillRect(centerX - 150, height - 80, 300, 3);
        ctx.fillStyle = '#D71921';
        ctx.fillRect(centerX - 150, height - 80, 300 * progress, 3);

        // Text Info
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.font = '16px "Space Mono", monospace'; // Non-italic
        ctx.fillText(`"${quote.text}"`, centerX, height - 50);
        
        ctx.fillStyle = '#D71921';
        ctx.font = 'bold 14px "Space Mono", monospace';
        ctx.fillText(`- ${quote.author}`, centerX, height - 25);

        frameCount++;
        if (frameCount < maxFrames) {
            animationId = requestAnimationFrame(render);
        } else {
            handleSkip();
        }
    };

    animationId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        onClick={handleSkip}
        className={`fixed inset-0 z-[100] bg-nothing-black transition-opacity duration-500 cursor-pointer`}
        style={{ opacity: opacity, pointerEvents: opacity === 0 ? 'none' : 'auto' }}
    />
  );
};

export default IntroAnimation;