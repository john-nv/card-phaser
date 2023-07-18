import Phaser from 'phaser';

export default class HelloWorldScene extends Phaser.Scene {
  private deck: string[];
  private hand: string[][];

  constructor() {
    super('game');
    this.deck = [];
    this.hand = [];
  }

  preload() {
    this.load.image('background', '/assets/image/background/bg2.jpg');
    // Load tất cả các ảnh lá bài vào cache
    const suits = ['h', 'd', 'c', 's'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

    for (const suit of suits) {
      for (const rank of ranks) {
        const cardKey = `${suit}${rank}`;
        this.load.image(cardKey, `/assets/image/card/${cardKey}.png`);
      }
    }
  }

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

  dealCards() {
    const numPlayers = 4;
    const numCardsPerPlayer = this.deck.length / numPlayers;
    for (let i = 0; i < numPlayers; i++) {
      const playerHand = this.deck.splice(0, numCardsPerPlayer);
      console.log(playerHand);
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
    console.log(centerY)
    console.log(centerX)
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
      });
    });
  }

  create() {
    // Thêm ảnh nền vào khung hình
    const tableBackground = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
    tableBackground.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    this.createDeck();

    // Thêm nút button "Phát bài"
    const button = this.add.text(this.cameras.main.width - 112, 15, 'Phát bài', {
      backgroundColor: '#fff',
      color: '#000',
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
      },
    }).setInteractive();
    // Khi click nút "Phát bài", thực hiện hàm dealCards() và showPlayerHands()
    button.on('pointerdown', () => {
      this.dealCards();
      this.showPlayerHands();
    });
  }
}