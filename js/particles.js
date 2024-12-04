class Particle {
    constructor(x, y, color, velocity, lifetime) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.lifetime = lifetime;
        this.alpha = 1;
        this.size = 4;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.lifetime--;
        this.alpha = this.lifetime / 60; // Fade out over time
        this.size *= 0.95; // Shrink over time
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    createLineClearEffect(y, width) {
        for (let i = 0; i < 30; i++) {
            const particle = new Particle(
                Math.random() * width,
                y,
                '#FFFFFF',
                {
                    x: (Math.random() - 0.5) * 6,
                    y: (Math.random() - 1) * 4
                },
                60
            );
            this.particles.push(particle);
        }
    }

    createComboEffect(x, y, comboCount) {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
        for (let i = 0; i < 20 * comboCount; i++) {
            const particle = new Particle(
                x,
                y,
                colors[Math.floor(Math.random() * colors.length)],
                {
                    x: (Math.random() - 0.5) * 8,
                    y: (Math.random() - 0.5) * 8
                },
                90
            );
            this.particles.push(particle);
        }
    }

    createLevelUpEffect(width, height) {
        for (let i = 0; i < 100; i++) {
            const particle = new Particle(
                Math.random() * width,
                Math.random() * height,
                '#FFD700',
                {
                    x: (Math.random() - 0.5) * 10,
                    y: (Math.random() - 0.5) * 10
                },
                120
            );
            this.particles.push(particle);
        }
    }

    update() {
        this.particles = this.particles.filter(particle => particle.lifetime > 0);
        this.particles.forEach(particle => particle.update());
    }

    draw(ctx) {
        this.particles.forEach(particle => particle.draw(ctx));
    }
} 