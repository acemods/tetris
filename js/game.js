class Game {
    constructor() {
        // ... existing initialization code ...
        this.particleSystem = new ParticleSystem();
    }

    update() {
        // ... existing update code ...
        this.particleSystem.update();
    }

    draw() {
        // ... existing draw code ...
        this.particleSystem.draw(this.ctx);
    }

    clearLines() {
        const linesCleared = // your existing line clear logic
        
        if (linesCleared.length > 0) {
            linesCleared.forEach(lineY => {
                const screenY = // convert grid Y to screen Y
                this.particleSystem.createLineClearEffect(screenY, this.canvas.width);
            });

            if (linesCleared.length >= 4) {
                // Tetris!
                this.particleSystem.createComboEffect(
                    this.canvas.width / 2,
                    this.canvas.height / 2,
                    linesCleared.length
                );
            }
        }
    }

    levelUp() {
        // ... existing level up code ...
        this.particleSystem.createLevelUpEffect(this.canvas.width, this.canvas.height);
    }

    gameOver() {
        // ... existing game over code ...
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.particleSystem.createComboEffect(
                    this.canvas.width / 2,
                    this.canvas.height / 2,
                    3
                );
            }, i * 200);
        }
    }
} 