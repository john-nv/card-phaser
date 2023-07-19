class BomBom extends Phaser.Scene {
    private bombomSceneBackgroundImage: Phaser.GameObjects.Sprite; // Khai báo thuộc tính bombomSceneBackgroundImage

    constructor() {
        super({ key: 'bombomScene' }) // Sửa 'splashScene' thành 'bombomScene' cho key.
    }

    preload() { // Sử dụng preload() thay vì init() để tải tài nguyên.
        this.cameras.main.setBackgroundColor('#ffffff')
        this.load.image('bombomScenebackground', 'public/assets/bombom/assets/splashSceneImage.png') // Loại bỏ / trước public.

        // Chú ý: Tài nguyên sẽ được tải vào preload(), không nên đặt trong init().
    }

    create(data) {
        this.bombomSceneBackgroundImage = this.add.sprite(1920 / 2, 1080 / 2, 'bombomScenebackground') // Sửa "bombomSceneBackgroundImage.Y" thành "bombomSceneBackgroundImage.y" (viết thường 'y').
    }

    update(time, data) {
        console.log(time)
        // this.scene.switch('titleScene')
    }
}

export default BomBom
