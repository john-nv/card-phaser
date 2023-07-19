import Phaser from 'phaser';

export default class MainGame extends Phaser.Scene {
  private deck: string[];
  private hand: string[][];
  private cardsOnTable: Phaser.GameObjects.Image[];

  constructor(
    private cardPositions: { x: number; y: number }[] = [],
  ) {
    super('game');
    this.deck = [];
    this.hand = [];
    this.cardsOnTable = [];
  }

  preload() {
    this.load.image('background', '/assets/image/background/bg2.jpg');
    const suits = ['h', 'd', 'c', 's'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

    for (const suit of suits) {
      for (const rank of ranks) {
        const cardKey = `${suit}${rank}`;
        console.log(cardKey)
        this.load.image(cardKey, `/assets/image/card/${cardKey}.png`);
      }
    }
    this.load.image('hidden', `/assets/image/card/hidden.png`);
  }

  // tao bai
  createDeck() {
    const suits = ['h', 'd', 'c', 's'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

    for (const suit of suits) {
      for (const rank of ranks) {
        const cardKey = `${suit}${rank}`;
        this.deck.push(cardKey);
      }
    }

    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  // chia bai
  dealCards() {
    const numPlayers = 4;
    const numCardsPerPlayer = this.deck.length / numPlayers;
    for (let i = 0; i < numPlayers; i++) {
      const playerHand = this.deck.splice(0, numCardsPerPlayer);
      this.hand.push(playerHand);
    }
  }

  showPlayerHands() {
    const padding = 80;
    const delta = 40;
    const cardWith = 70;
    const cardHeight = 100;

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const positions = [
      { x: padding, y: centerY / 2.5 },
      { x: width / 3.8, y: padding },
      { x: width - padding, y: centerY / 2.5 },
      { x: width / 3.8, y: height - padding },
    ];

    this.hand.forEach((playerHand, playerIndex) => {
      playerHand.forEach((cardKey, cardIndex) => {
        const card = this.add.image(centerX, centerY, cardKey);
        card.setDisplaySize(cardWith, cardHeight);

        const tweenTargets = {
          x: playerIndex % 2 === 0 ? positions[playerIndex].x : positions[playerIndex].x + cardIndex * delta,
          y: playerIndex % 2 === 0 ? positions[playerIndex].y + cardIndex * delta : positions[playerIndex].y,
        };

        this.tweens.add({
          targets: card,
          x: tweenTargets.x,
          y: tweenTargets.y,
          duration: 700,
          ease: 'Power2',
          delay: cardIndex * 100,
        });

        this.cardsOnTable.push(card);


        card.setInteractive();
        card.on('pointerdown', () => {
          card.setY(card.y - 20);
          this.cardPositions.push({ x: card.x, y: card.y });
        });
      });
    });
  }

  clearCardsOnTable() {
    this.cardsOnTable.forEach((card) => {
      card.destroy();
    });
    this.cardsOnTable = [];
  }

  create() {
    // Thêm ảnh nền vào khung hình
    const tableBackground = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
    tableBackground.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    this.createDeck();

    const btnClearCard = this.button(this.cameras.main.width - 112, 15, 'Chơi lại');
    const btnStart = this.button(this.cameras.main.width - 112, 15, 'Phát bài');
    btnClearCard.visible = false;

    btnClearCard.on('pointerdown', () => {
      this.clearCardsOnTable()

      btnStart.visible = true;
      btnClearCard.visible = false;
    });

    btnStart.on('pointerdown', () => {
      this.dealCards();
      this.showPlayerHands();

      btnStart.visible = false;
      btnClearCard.visible = true;
    });
  }

  private button(X: any, Y: any, name: any) {
    return this.add.text(X, Y, name, {
      backgroundColor: '#fff',
      color: '#000',
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
      },
    }).setInteractive();
  }

}