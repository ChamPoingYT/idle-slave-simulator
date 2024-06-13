document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const coinsDisplay = document.getElementById('coins');
    const upgradeButton = document.getElementById('upgradeButton');

    const WIDTH = 400;
    const HEIGHT = 800;

    // Charger les images
    const barreHautImg = new Image();
    barreHautImg.src = 'barre_haut.png';
    const boutonEchapImg = new Image();
    boutonEchapImg.src = 'bouton_echap.png';
    const fondImg = new Image();
    fondImg.src = 'fond.png';
    const extImg = new Image();
    extImg.src = 'ext.png';
    const trucAmeliorerImg = new Image();
    trucAmeliorerImg.src = 'truc_ameliorer.png';

    // Variables du jeu
    let coins = 0;
    let lastUpdate = Date.now();

    const ext = {
        x: WIDTH / 2,
        y: HEIGHT / 2,
        level: 1,
        mineSpeed: 2000,
        upgradeCost: 10,
        productionRate: 1,
        upgrade: function () {
            if (coins >= this.upgradeCost) {
                coins -= this.upgradeCost;
                this.level++;
                this.productionRate++;
                this.mineSpeed = Math.max(500, this.mineSpeed * 0.9);  // Limite de vitesse minimale
                this.upgradeCost = Math.floor(this.upgradeCost * 1.2);
                updateUpgradeButton();
            }
        }
    };

    function updateUpgradeButton() {
        upgradeButton.textContent = `Améliorer (Coût: ${ext.upgradeCost} pièces)`;
    }

    function updateCoinsDisplay() {
        coinsDisplay.textContent = `Pièces : ${coins}`;
    }

    function gameLoop() {
        const now = Date.now();
        const elapsedTime = now - lastUpdate;

        if (elapsedTime >= ext.mineSpeed) {
            coins += ext.productionRate;
            lastUpdate = now;
            updateCoinsDisplay();
        }

        // Effacer l'écran
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        // Dessiner les images
        ctx.drawImage(fondImg, 0, 24);
        ctx.drawImage(barreHautImg, 0, 0);
        ctx.drawImage(boutonEchapImg, 4, 4);
        ctx.drawImage(extImg, ext.x - extImg.width / 2, ext.y - extImg.height / 2);
        ctx.drawImage(trucAmeliorerImg, 0, HEIGHT - trucAmeliorerImg.height - 10);

        // Afficher le nombre de pièces
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(coins, WIDTH - 50, 20);

        requestAnimationFrame(gameLoop);
    }

    upgradeButton.addEventListener('click', () => {
        ext.upgrade();
    });

    updateUpgradeButton();
    updateCoinsDisplay();
    gameLoop();
});

