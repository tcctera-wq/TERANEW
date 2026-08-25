// wave.js - Animação de Ondas de Partículas 3D (HTML5 Canvas)
const canvas = document.getElementById('wave-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let count = 0;

    // Configurações da malha (grid)
    const SEPARATION = 45; // Espaçamento entre os pontos
    const AMOUNTX = 90;    // Quantidade de pontos no eixo X
    const AMOUNTY = 90;    // Quantidade de pontos no eixo Z (profundidade)

    let particles = [];

    function init() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        particles = [];
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                particles.push({
                    x: ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2),
                    z: iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2),
                    y: 0
                });
            }
        }
    }

    function render() {
        // Limpa a tela com fundo levemente branco ou transparente (o CSS já colore fundo se quiser)
        ctx.clearRect(0, 0, width, height);

        // Posição da câmera (perspectiva)
        const cameraZ = 1300;
        const cameraY = -275;

        // Cor dos pontos (o mesmo azul de #0d6fd3 na imagem de referência)
        ctx.fillStyle = '#0d6fd3';

        const cx = width / 2;
        const cy = height / 2;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Cria o movimento rítmico de onda 3D usando seno
            const wave = (Math.sin((p.x / 250) + count) * 90) + (Math.sin((p.z / 250) + count) * 90);

            const px = p.x;
            const py = wave;
            const pz = p.z + cameraZ; // Desloca para a tela

            // Apenas renderiza pontos que estão à frente da câmera
            if (pz > 0) {
                const scale = 1200 / pz; // Escala ajustada para uma boa profundidade
                const x2d = px * scale + cx;
                // Move a onda um pouco mais para a base da tela
                const y2d = (py + cameraY) * scale + cy + 500;

                // Culling: só renderiza o que está na tela visível
                if (x2d > -10 && x2d < width + 10 && y2d > -10 && y2d < height + 10) {

                    // Suaviza a opacidade na distância (depth fog)
                    let depthAlpha = Math.max(0, 1.2 - (pz / 3000));

                    ctx.globalAlpha = depthAlpha * 0.8;

                    ctx.beginPath();
                    // O tamanho dos pontos diminui com a distância
                    ctx.arc(x2d, y2d, Math.max(0.5, scale * 1.6), 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        count += 0.035; // Velocidade da onda
        requestAnimationFrame(render);
    }

    window.addEventListener('resize', init);
    init();
    render();
}
