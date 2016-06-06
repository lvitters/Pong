var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    
    game.load.image('ball', 'assets/ball.png');
    game.load.image('paddleLeft', 'assets/paddle.png');
    game.load.image('paddleRight', 'assets/paddle.png');
}


var ball;
var paddleLeft;
var paddleRight;
var cursors;
var Wkey;
var Akey;

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    
    
    ball = game.add.sprite(380, 280, 'ball');
    
    
    paddleLeft = game.add.sprite(20, 300, 'paddleLeft');
    
    
    paddleRight = game.add.sprite(980, 300, 'paddleRight');
    
    
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.velocity.setTo(200,200);
    ball.body.bounce.set(1);
    
    game.physics.arcade.enable(paddleLeft);
    paddleLeft.body.collideWorldBounds = true;
    
    game.physics.arcade.enable(paddleRight);
    paddleRight.body.collideWorldBounds = true;
    
    cursors = game.input.keyboard.createCursorKeys();

    Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    Skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        
}

function update() {
    
    game.physics.arcade.collide(ball, paddleLeft, collisionHandlerPaddleLeft, null, this);
    game.physics.arcade.collide(ball, paddleRight, collisionHandlerPaddleRight, null, this);
    
    paddleLeft.body.velocity.setTo(0, 0);
    paddleRight.body.velocity.setTo(0, 0);
    
    if (Wkey.isDown)
        {
            paddleLeft.body.velocity.y = -200;
        }
        else if (Skey.isDown)
        {
            paddleLeft.body.velocity.y = 200;
        }
    
    paddleRight.body.velocity.setTo(0, 0);
    
    if (cursors.up.isDown)
        {
            paddleRight.body.velocity.y = -200;
        }
        else if (cursors.down.isDown)
        {
            paddleRight.body.velocity.y = 200;
        }
}

function collisionHandlerPaddleLeft (ball, paddleLeft) {
    var diff = 0;

    if (ball.x < paddleLeft.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = paddleLeft.x - ball.x;
        ball.body.velocity.x = (-3 * diff);
    }
    else if (ball.x > paddleLeft.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = ball.x -paddleLeft.x;
        ball.body.velocity.x = (3 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        ball.body.velocity.x = 2 + Math.random() * 8;
    }
}

function collisionHandlerPaddleRight (ball, paddleRight) {
    var diff2 = 0;

    if (ball.x < paddleRight.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff2 = paddleRight.x - ball.x;
        ball.body.velocity.x = (-3 * diff2);
    }
    else if (ball.x > paddleRight.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff2 = ball.x -paddleRight.x;
        ball.body.velocity.x = (3 * diff2);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        ball.body.velocity.x = 2 + Math.random() * 8;
    }
}