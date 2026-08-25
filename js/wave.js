/* js/wave.js - Constellation Network Wave */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return; 
    const ctx = canvas.getContext('2d');

    // ESPACIALIZADOR DE REDE NEURAL (CONSTELLATION) - A ANTEPENÚLTIMA ONDA COMO PEDIU
    const NUM_PARTICLES = 130;  
    
    let particles = [];

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 
        initParticles();
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < NUM_PARTICLES; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: window.innerHeight * 0.75 + (Math.random() - 0.5) * 350,
                vx: (Math.random() - 0.5) * 1.0, 
                vy: (Math.random() - 0.5) * 1.0, 
                radius: Math.random() * 2.5 + 1.0,
                sineTracker: Math.random() * Math.PI * 2 
            });
        }
    }

    function animate(timestamp) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        const time = timestamp * 0.001; 
        const w = window.innerWidth;
        const h = window.innerHeight;

        const currentTheme = document.documentElement.getAttribute('data-theme');
        const R = currentTheme === 'dark' ? 58 : 14;
        const G = currentTheme === 'dark' ? 176 : 112;
        const B = currentTheme === 'dark' ? 255 : 182;

        ctx.globalCompositeOperation = currentTheme === 'dark' ? 'lighter' : 'source-over';

        for (let i = 0; i < NUM_PARTICLES; i++) {
            let p1 = particles[i];
            
            p1.x += p1.vx;
            p1.y += p1.vy + Math.sin(time + p1.sineTracker) * 0.8;

            if (p1.x < 0) p1.x = w;
            if (p1.x > w) p1.x = 0;
            if (p1.y < 0) p1.y = h;
            if (p1.y > h) p1.y = 0;

            ctx.beginPath();
            ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${R}, ${G}, ${B}, 0.8)`;
            ctx.fill();

            for (let j = i + 1; j < NUM_PARTICLES; j++) {
                let p2 = particles[j];
                let dx = p1.x - p2.x;
                let dy = p1.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    
                    let lineOpacity = 1 - (dist / 130);
                    ctx.strokeStyle = `rgba(${R}, ${G}, ${B}, ${lineOpacity * 0.6})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        ctx.globalCompositeOperation = "source-over";
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(animate);
});
