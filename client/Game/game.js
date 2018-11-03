//EXPLOSIONS NOT DELETED PROPERLY!
import "./style.css"
import $ from "jquery"
import Player from "./Player/player.js"
import BasicEnemy from "./Enemy/BasicEnemy.js";
import AdvanceEnemy from "./Enemy/advanceEnemy.js"
import Boss from "./Enemy/Boss.js"
import bg from "./Assets/Background/galaxy.jpg"
import meteorEnemy from "./Enemy/MeteorEnemy.js";
import "bootstrap"
import coin from "./Assets/coin-sprite-animation.png"
import boss from "./Assets/boss.png"
import CustomBindedControl from "./bindedDomElement.js"
import {getAllScores} from "./highscore.js"
getAllScores()
const progress = {
    1: 50,
    2: 100,
    3: 200,
    4: 400,
    5: 800,
    6: 1200,
}
const gunUpgrades = {
    1: 800,
    2: 1600
}
let fireRateUpgradeLvl = 1, lifeUpgradeLvl = 1, gunBarrelUpgradeLvl = 1
const obj = new CustomBindedControl(document.getElementById("currGold"), "20");
const fireRateCostObj = new CustomBindedControl(document.getElementById("fireRateCost"), progress[fireRateUpgradeLvl]);
const lifeCostObj = new CustomBindedControl(document.getElementById("lifeCost"), progress[lifeUpgradeLvl]);
const gunBarrelCostObj = new CustomBindedControl(document.getElementById("gunBarrelCost"), gunUpgrades[gunBarrelUpgradeLvl])
const scoreObj = new CustomBindedControl(document.getElementById("score"), 0)
const sendScoreResponseObj = new CustomBindedControl(document.getElementById("sendScoreResponse"), "")


const gameCanvas = $("#canvas")[0].getContext("2d")
let canvasHeight = $(window).height() - 10
let canvasWidth = $(window).width() / 1.5
$("#canvas").height(canvasHeight)
$("#canvas").width(canvasWidth)
let player = new Player("./player.png")
let bullets = [], enemies = [], explosions = [], driftingObjects = [], enemiesBullets = []
let enemyIndex = 0, bulletIndex = 0, explosionIndex = 0, driftingObjectsIndex = 0, enemiesBulletsIndex = 0
let nexFireTime = player.getCurrentGun()[0].getRate() + 1;
let spawnInterval = 2000, bossInterval = 30000
let nextSpawnTime = spawnInterval, nextBossTime = bossInterval
let score = 0, gold = 0
let pause = false


//get DPI
let dpi = window.devicePixelRatio;
function fix_dpi() {
    gameCanvas.canvas.setAttribute('height', canvasHeight * dpi);
    gameCanvas.canvas.setAttribute('width', canvasWidth * dpi);
}
let coinFrameIndex = 0;
let tickCount = 0, tickPerFrame = 4

const bgImage = new Image(), coinImage = new Image(), scoreImage = new Image();
bgImage.src = bg
coinImage.src = coin;
scoreImage.src = boss;

function drawIcons() {
    tickCount++
    if (tickCount > tickPerFrame) {
        tickCount = 0;
        coinFrameIndex < 9 ? coinFrameIndex++ : coinFrameIndex = 0
    }
    gameCanvas.drawImage(coinImage, 100 * coinFrameIndex, 0, 100, 100, 30, 70, 40, 40)
    gameCanvas.drawImage(scoreImage, 30, 20, 40, 40);
}
function drawScore() {
    gameCanvas.font = '30px arial';
    gameCanvas.fillStyle = '#fff';
    gameCanvas.fillText('Score: ' + score, 80, 60);
    gameCanvas.fillText('Gold: ' + gold, 80, 105);
    gameCanvas.fillText('Life: ' + player.getLife(), 40, canvasHeight - 30);
    gameCanvas.fillText('Life: ' + player.getLife(), 40, canvasHeight - 30);
   
    gameCanvas.font = '20px arial';
    gameCanvas.fillStyle = '#fff';
    gameCanvas.fillText('Enemy Hp: ' + basicEnemyLife, canvasWidth - 150, 60);
    gameCanvas.fillText('Boss Hp: ' + 10 * basicEnemyLife, canvasWidth - 145, 105);
    gameCanvas.fillText("Tap mouse to access shop", canvasWidth - 250, canvasHeight - 30);
}
let basicEnemyLife
let draw = (currentTime) => {
    //need to change
    basicEnemyLife = Math.ceil(currentTime * 0.000015)
    fix_dpi()


    gameCanvas.clearRect(0, 0, canvasWidth, canvasHeight)
    drawBackground()
    drawScore()

    drawIcons()
    if (currentTime < player.getNonInvulnerableTime()) {
        if (player.getFlicker()) {
            gameCanvas.drawImage(player.getImage(), player.getPosX(), player.getPosY(), player.getWidth(), player.getHeight())
        }
    } else {
        player.setDraw()
        gameCanvas.drawImage(player.getImage(), player.getPosX(), player.getPosY(), player.getWidth(), player.getHeight())
    }

    if (currentTime > nextSpawnTime) {
        enemies[enemyIndex] = new BasicEnemy(canvasWidth, enemyIndex, basicEnemyLife)
        enemyIndex++

        if (Math.random() > 0.5) {

            driftingObjects[driftingObjectsIndex] = new meteorEnemy(canvasWidth, driftingObjectsIndex, basicEnemyLife)
            driftingObjectsIndex++
        } else {
            enemies[enemyIndex] = new AdvanceEnemy(canvasWidth, enemyIndex, basicEnemyLife)
            enemyIndex++
        }
        nextSpawnTime = currentTime + spawnInterval
    }
    if (currentTime > nextBossTime) {
        enemies[enemyIndex] = new Boss(canvasWidth, enemyIndex, 10 * basicEnemyLife)
        enemyIndex++
        if (basicEnemyLife > 5) {
            enemies[enemyIndex] = new Boss(canvasWidth, enemyIndex, 10 * basicEnemyLife)
            enemyIndex++
        }
        nextBossTime = currentTime + bossInterval
    }
    drawDrifting(currentTime)
    drawEnemies(currentTime)
    drawBullets(currentTime)
    drawEnemyBullets(currentTime)
    handleHitEnemy(enemies)
    handleHitEnemy(driftingObjects)
    drawExplosions()

    if (player.getLife() > 0 && !pause) {
        //do explosion here
        requestAnimationFrame(draw)
    } else if (player.getLife() < 1) {
        handleGameOver()
    }

}
requestAnimationFrame(draw)

gameCanvas.canvas.addEventListener("mousemove", function (evt) {
    let pos = getMousePos(evt)
    player.setPos(pos)
})
let bgY = 0
function drawBackground() {
    let speed = Math.min(basicEnemyLife, 6) // Redefine speed of the background for panning
    // let speed = 6
    bgY += speed;
    gameCanvas.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height,     // source rectangle
        0, bgY, canvas.width, canvas.height);
    gameCanvas.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height,     // source rectangle
        0, bgY - canvasHeight, canvas.width, canvas.height);
    if (bgY >= canvasHeight)
        bgY = 0;

}
function drawDrifting(currentTime) {
    driftingObjects.forEach(function (single) {
        single.move(gameCanvas, currentTime)
        changeDirOnCollideSides(single)
        destroyObjectsWhenOOS(single, driftingObjects)
        if (isCollide(single, player)) {
            player.decreaseLife(currentTime)
        }
    })
}
function drawEnemies(currentTime) {
    
    enemies.forEach(function (single) {
       
        single.move(currentTime)
        gameCanvas.drawImage(single.getImage(), single.getPosX(), single.getPosY(), single.getWidth(), single.getHeight())
        changeDirOnCollideSides(single)
        destroyObjectsWhenOOS(single, enemies)
        if (isCollide(single, player)) {
            player.decreaseLife(currentTime)
        }
    })
}
function drawBullets(currentTime) {
  
    let interval = player.getCurrentGun()[0].getRate();
    if (currentTime > nexFireTime) {
      
        let firedBullets = player.getCurrentGun(bulletIndex)
        firedBullets.forEach(function (singleFiredBullet) {
            bullets[bulletIndex] = singleFiredBullet
            bulletIndex++
        })
        nexFireTime = currentTime + interval
    }
    
    if(bullets.length >10000) {
        bullets=[]
        bulletIndex = 0
    }
    bullets.forEach(function (single) {
        gameCanvas.drawImage(single.getImage(), single.getPosX(), single.getPosY(), single.getWidth(), single.getHeight())
        // single.setPosY(single.getPosY() - player.getCurrentGun().getSpeed())// change to bullet speed
        single.move()
        destroyBulletsWhenOOS(single)
    })
}
function drawEnemyBullets(currentTime) {
    enemies.forEach(function (single) {
        let bullets = single.shoot(currentTime, enemiesBulletsIndex)
        if (bullets) {
            bullets.forEach(function (bullet) {
                enemiesBullets[enemiesBulletsIndex] = bullet
                enemiesBulletsIndex++
            })

        }
    })
   
    enemiesBullets.forEach(function (single) {
       
        gameCanvas.drawImage(single.getImage(), single.getPosX(), single.getPosY(), single.getWidth(), single.getHeight())
        single.move()
        destroyObjectsWhenOOS(single, enemiesBullets)
        if (isCollide(single, player)) {
            player.decreaseLife(currentTime)
            // life--
        }
    })
}
function drawExplosions() {

    explosions.forEach(function (single) {
        single.incrementTickCount()

        gameCanvas.drawImage(single.getImage(), single.getFrameIndexCol() * single.getWidth(), single.getFrameIndexRow() * single.getHeight(), single.getWidth(), single.getHeight(), single.getPosX(), single.getPosY(), single.getWidth(), single.getHeight())
        if(single.getFrameIndexCol()===4 && single.getFrameIndexRow() === 4)
            delete explosions[single.getIndex()]
    })
}
function getMousePos(evt) {
    var rect = gameCanvas.canvas.getBoundingClientRect();
    let position = {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * gameCanvas.canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * gameCanvas.canvas.height
    };

    return position
}
function handleHitEnemy(array) {
    bullets.forEach(function (bullet) {
        array.forEach(function (enemy) {
            if (isCollide(bullet, enemy)) {
                enemy.setLife(enemy.getLife() - 1)//bullet damage?
                delete bullets[bullet.getIndex()]

                if (enemy.getLife() < 1) {
                    delete array[enemy.getIndex()]
                    score += enemy.getScore()
                    gold += enemy.getScore()
                    explosions[explosionIndex] = enemy.getExplosion(enemy.getPosX(), enemy.getPosY(), explosionIndex)
                    explosionIndex++
                }

            }
        })
    })
}
function changeDirOnCollideSides(enemy) {
    if (enemy.getPosX() + enemy.getWidth() >= canvasWidth) {
        enemy.setDirX(-1);
    } else if (enemy.getPosX() <= 0) {
        enemy.setDirX(1);
    }
    if (enemy.getPosY() > canvasHeight + enemy.getHeight()) {
        delete enemies[enemy.getIndex()]
    }
}
function destroyBulletsWhenOOS(bullet) {
    if (bullet.getPosY() + bullet.getHeight() < 0) {
        delete bullets[bullet.getIndex()]
    }
}
//destroy all enemies when they reach bottom and beyond
function destroyObjectsWhenOOS(object, array) {
    if (object.getPosY() > canvasHeight) {
        delete array[object.getIndex()]
    }
    if (object.getPosX() > canvasWidth || object.getPosX() + object.getWidth() < 0) {
        delete array[object.getIndex()]
    }
}

function isCollide(a, b) {
    return !(
        ((a.getPosY() + a.getHeight()) < (b.getPosY())) ||
        (a.getPosY() > (b.getPosY() + b.getHeight())) ||
        ((a.getPosX() + a.getWidth()) < b.getPosX()) ||
        (a.getPosX() > (b.getPosX() + b.getWidth()))
    );
}
let lastPlayerRect
$("#canvas")[0].addEventListener('click', function (evt) {
    let rect = pause ? lastPlayerRect : {
        x: player.getPosX(),
        y: player.getPosY(),
        width: player.getWidth(),
        height: player.getHeight()
    }
    if (player.getLife() < 1)
        $("#Gameover").modal()
    if (isInside(getMousePos(evt), rect)) {

        pause = !pause
        if (!pause) {
            requestAnimationFrame(draw)
        }
        else {
            lastPlayerRect = rect
            player.getLife() < 1 ? $("#Gameover").modal() : $("#Shop").modal()
        }

    }

}, false);
$('#Shop').on('show.bs.modal', function (event) {
    obj.change(gold)
    pause = true
})
function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}
$("#buyRate")[0].addEventListener("click", function () {
    if (gold - progress[fireRateUpgradeLvl] < 0) {
        alert("too poor")
        return
    }
    gold -= progress[fireRateUpgradeLvl]
    fireRateUpgradeLvl += 1
    updateShopUI()
    player.buyFireRate()
})
$("#buyLife")[0].addEventListener("click", function () {
    if (gold - progress[lifeUpgradeLvl] < 0) {
        alert("too poor")
        return
    }
    gold -= progress[lifeUpgradeLvl]
    lifeUpgradeLvl += 1
    updateShopUI()
    player.setLife(player.getLife() + 5)
})
$("#buydoublebarrels")[0].addEventListener("click", function () {
    if (gold - gunUpgrades[gunBarrelUpgradeLvl] < 0) {
        alert("too poor")
        return
    }
    gold -= gunUpgrades[gunBarrelUpgradeLvl]
    gunBarrelUpgradeLvl += 1
    updateShopUI()
    player.increaseGunLevel()
})
$("#SendScore")[0].addEventListener("click", function () {
    let payload = {
        username: $("#usernameTextbox")[0].value,
        score: score,
        recurringPlayer: true
    }
    if (localStorage.getItem("username") === undefined || localStorage.getItem("username") === null) {
        payload.recurringPlayer = false
    }

    fetch("/api/sendScore", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(payload)
    }).then(
        function (response) {
            if (response.status !== 200) {
                return;
            }
            // Examine the text in the response
            response.json().then(function (data) {
                if (data.success) {
                    localStorage.setItem("username", $("#usernameTextbox")[0].value)
                    sendScoreResponseObj.change("Your score has been submitted! View it on the highscores panel!")
                    setTimeout(function () {
                        $('#Gameover').modal('hide')
                        getAllScores()
                    }, 3000)
                } else {
                    sendScoreResponseObj.change(data.reason)
                    // alert()
                }


            });
        }
    ).catch(function (err) {
        
    });
})
function handleGameOver() {
    $('#Gameover').modal({
        backdrop: false,
        keyboard: false
    })
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.

        if (localStorage.getItem("username")) {
            $("#usernameTextbox")[0].value = localStorage.getItem("username")
            $("#usernameTextbox").attr("disabled", "disabled");
        }
        scoreObj.change(score)
    } else {
        // Sorry! No Web Storage support..
    }
}
function updateShopUI() {
    if (!progress[fireRateUpgradeLvl]) {
        $("#buyRate").attr("disabled", "disabled");
    }
    if (!progress[lifeUpgradeLvl]) {
        $("#buyLife").attr("disabled", "disabled");
    }
    if (!gunUpgrades[gunBarrelUpgradeLvl]) {
        $("#buydoublebarrels").attr("disabled", "disabled");
    }
    obj.change(gold)
    progress[fireRateUpgradeLvl] ? fireRateCostObj.change(progress[fireRateUpgradeLvl]) : fireRateCostObj.change("MAXED")
    progress[lifeUpgradeLvl] ? lifeCostObj.change(progress[lifeUpgradeLvl]) : lifeCostObj.change("MAXED")
    gunUpgrades[gunBarrelUpgradeLvl] ? gunBarrelCostObj.change(gunUpgrades[gunBarrelUpgradeLvl]) : gunBarrelCostObj.change("MAXED")
    // lifeCostObj.change(progress[lifeUpgradeLvl])

}
export default gameCanvas