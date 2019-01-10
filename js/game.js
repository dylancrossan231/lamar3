
var menuScene = new Phaser.Scene('Menu');
var gameScene = new Phaser.Scene('game');
var gameOver1 = new Phaser.Scene('gameover12');
menuScene.preload= function(){
    this.load.image('menubackground', 'assets/menubackground.png');
    this.load.image('button', 'assets/hero.png');
    this.load.image('arrow', 'assets/arrow.png');

}
menuScene.create = function() {

    var backgroundMenu = this.add.image(0, 0, 'menubackground');
    var button = this.add.sprite(265, 110, 'button');
    var  arrow = this.add.image(225,175,'arrow');
    button.setScale(1.5);


    backgroundMenu.setOrigin(0, 0);
    mainmenuText = this.add.text(215,75 , 'START GAME LAMA', {fontFamily: 'Roboto', fontSize: '20px', fill: '#ffffff'});

    button.setOrigin(0, 0);
    button.setInteractive();
    button.on('pointerdown', function () {
        this.scene.start(gameScene);

    }, this);
}


// create a new game, pass the configuration

//GAME CONFIG
var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    pixelArt:true,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    //putting all of my scenes in a array so i can call them
    scene: [menuScene,gameScene,gameOver1]



}












         //creating new game scene
         var game = new Phaser.Game(config);

         //declaring all my variables
         var bg, bg2, bush;
         var hero;
         var cursors;
         var speed = 0;
         var score = 0;
         var scoreText;

         //game pre load function
         gameScene.preload = function () {

        // loading my images so i can display in the create function
        this.load.image('background2', 'assets/background2.png');
        this.load.image('pixelartbottom', 'assets/platforms.png');
        this.load.image('hero', 'assets/hero.png');
        this.load.image('bush', 'assets/bush.png');
        };


        // CREATE FUNCTION

        gameScene.create = function () {
/*           var music = this.sound.add('fortnitefestive');
           music.play();*/


        //adding the speed to bushed e.g subtracting their x value
        speed = 2.2;

        //reseting the score to 0 every time the create function is called as when this is not here the score will continue on from the previous score in the game before e.g you score 20 in a game
        // then start a new game and  score will show 0 then the second you jump over a bush sucessfully it would go to 20
        score =0;

        //adding my background images to the game
        bg = this.add.image(0, 0, 'background2');
        bg2 = this.add.image(0, 0, 'background2');

        //adding my score text in with a specific font family font size color and position
        scoreText = this.add.text(280,75 , 'SCORE: 0', {fontFamily: 'Roboto', fontSize: '20px', fill: '#ffffff'});

        //adding my bottom in as a physics sprite
        var bottom = this.physics.add.image(320, 313, 'pixelartbottom');

        //not allowing gravity
        bottom.body.allowGravity = false;

        //making my bottom immovable due to a bug where when my lama landed on the ground it would inherit gravity from the lama so this stops it completely
        bottom.body.immovable = true;

        //adding all my bushes in so that i can use physics
        bush1 = this.physics.add.sprite(300, 250, 'bush');
        bush2 = this.physics.add.sprite(600, 250, 'bush');
        bush3 = this.physics.add.sprite(900, 250, 'bush');
        bush4 = this.physics.add.sprite(1500, 250, 'bush');
        bush5 = this.physics.add.sprite(1200, 250, 'bush');

        //i dont want my bushes to fall off the screen so im disabling gravity on them i only want them to move left (-x) and have collision properties
        bush1.body.allowGravity = false;
        bush2.body.allowGravity = false;
        bush3.body.allowGravity = false;
            bush4.body.allowGravity = false;
            bush5.body.allowGravity = false;

            //setting the scale of the bushes
            bush1.setScale(1.75);
            bush2.setScale(1.75);
            bush3.setScale(1.75);
            bush4.setScale(1.75);
            bush5.setScale(1.75);

            //adding my hero into the game with physics and setting his position
            hero = this.physics.add.sprite(38, 100, 'hero');

            //setting scale of my hero
            hero.setScale(1.5);

            //allowing gravity on my hero sprite so that he can jump
            hero.body.allowGravity = true;

            //creating binded keys on my keyboard to control jumping
            cursors = this.input.keyboard.createCursorKeys();

            // change the origin to the top-left corner
             bg.setOrigin(0, 0);
             bg2.setOrigin(0, 0);
             bg2.setPosition(640, 0);



            //this is the collision detection i used for my hero and platforms at the bottom
            this.physics.add.collider(hero, bottom);


    }


            //UPDATE FUNCTION for game scene
            gameScene.update = function () {



            //this is what i used to activate collision on my bushes with hero and also load the game over scene
            if (Phaser.Geom.Intersects.RectangleToRectangle(hero.getBounds(),bush1.getBounds()))
            {

            this.scene.start(gameOver1);
            }



            if (Phaser.Geom.Intersects.RectangleToRectangle(hero.getBounds(),bush3.getBounds()))
            {
                console.log("hitttttt");
            this.scene.start(gameOver1);
            }

            if (Phaser.Geom.Intersects.RectangleToRectangle(hero.getBounds(),bush2.getBounds()))
            {
            this.scene.start(gameOver1);
            }
                if (Phaser.Geom.Intersects.RectangleToRectangle(hero.getBounds(),bush4.getBounds()))
                {
                    this.scene.start(gameOver1);
                }
                if (Phaser.Geom.Intersects.RectangleToRectangle(hero.getBounds(),bush5.getBounds()))
                {
                    this.scene.start(gameOver1);
                }



                //this is the if statement i used for jumping if my up arrow key is down and my hero body is touching the ground set the Y velocity to -450
            if (cursors.up.isDown && hero.body.touching.down) {
                hero.setVelocityY(-450);
            }

            //console.log(hero.body.touching.down);

            if (game.input.activePointer.isDown && hero.body.touching.down){
                hero.setVelocityY(-450);
            }

            //this if statement allowed me to loop my background so that i could have the effect of infinite backgrounds
            if (bg.x < -640)
            {
                bg.x = 0;
                bg2.x = 640;
            }
            else
            {
                bg.x = bg.x - speed;
                bg2.x = bg2.x - speed;
            }

            //subtracting the x value from the bushes to give them the effect of moving backwards
            bush1.x -= speed;
            bush2.x -= speed;
            bush3.x -= speed;
            bush4.x -= speed;
            bush5.x -= speed;

            //calling the resetbush fuction in order to reposition the bush
            if (bush1.x < 20)
{

    resetBush(bush1);
}
//calling the resetbush fuction in order to reposition the bush
if (bush2.x < 20)
{

    resetBush(bush2);
}
//calling the resetbush fuction in order to reposition the bush
if (bush3.x < 20)
{

    resetBush(bush3);

}
if (bush4.x < 20)
{

    resetBush(bush4);
}
if (bush5.x < 20)
{

    resetBush(bush5);
}
}
//calling the resetbush fuction in order to reposition the bush




        //i created this function in order to reset my bushes everytime their x value would get to 20 so i could have the effect of infinite bushes
        function resetBush(bush) {
            speed += 0.1;
            bush.x = innerWidth;
            score += 1;
            scoreText.setText('SCORE: ' + score)
        }




            //preload function for game over screen loading in all my assets so i can add them at the end
            gameOver1.preload = function () {
            this.load.image('menubackground', 'assets/menubackground.png');
            this.load.image('button', 'assets/hero.png');
            this.load.image('arrow', 'assets/arrow.png');
            this.load.image('button2', 'assets/hero.png');

        }
            //game over create function
            gameOver1.create = function () {
            /*music.stop();*/

            //adding sprites and backgrounds in after they have been loaded
            var backgroundMenu = this.add.image(0, 0, 'menubackground');
            var button = this.add.sprite(425, 110, 'button');
            var arrow = this.add.image(375, 175, 'arrow');

            //making my button bigger 150% of original scale
            button.setScale(1.5);


            //setting origin of background and button to 0 x ,0 y because phaser three the origin is as the center of each sprite
            backgroundMenu.setOrigin(0, 0);
            button.setOrigin(0, 0);
                mainmenuText = this.add.text(25,75 , 'MAIN MENU LAMA', {fontFamily: 'Roboto', fontSize: '20px', fill: '#ffffff'});
                restartText = this.add.text(400,75 , 'RESTART LAMA', {fontFamily: 'Roboto', fontSize: '20px', fill: '#ffffff'});
            //allowing my button to be interactive e.g to be clicked and then allow a function to call the start of my game scene
            button.setInteractive();
            button.on('pointerdown', function () {

            //starting my game scene
                this.scene.start(gameScene);
            }, this);

            //just making another button this time taking me to my menuScene so it will display a restart button and a menu button
                var button2 = this.add.sprite(50,110, 'button2');
                button2.setOrigin(0, 0);
                button2.setScale(1.5);
                button2.setInteractive();
                button2.on('pointerdown', function () {
                    this.scene.start(menuScene);

            }, this);
        }





