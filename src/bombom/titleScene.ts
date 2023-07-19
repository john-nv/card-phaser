class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' })
    }
    init(data) {
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    reload() {
        console.log('title scene')
    }

    create(data) {

    }

    update(time,data){

    }
}

export default TitleScene