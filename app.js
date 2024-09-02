let shopData; // array of objects (each upgrade)
let cookieCount = 0;
const cookieCountElem = document.getElementById('cookie-count');
let cookieCPS = 0;
const cookieCPSElem = document.getElementById('cookie-cps');
let sessionStartTime = Date.now();
let statsSessionTime = 0;
let statsTimePlayed = 0;
let statsManualClicks = 0;

const cookieElem = document.getElementById('cookie');
const cookieSection = document.getElementById('cookie-section');

function getLocalStorage() {
    if (localStorage.getItem("cookieCount")) {
        cookieCount = parseInt(localStorage.getItem("cookieCount"));
    }
    if (localStorage.getItem("cookieCPS") != null) {
        cookieCPS = parseInt(localStorage.getItem("cookieCPS"));
    }
    if (localStorage.getItem("statsTimePlayed") != null) {
        statsTimePlayed = parseInt(localStorage.getItem("statsTimePlayed"));
    }
    if (localStorage.getItem("statsManualClicks") != null) {
        statsManualClicks = parseInt(localStorage.getItem("statsManualClicks"));
    }
    
    document.getElementById('stats-manual-clicks').textContent = statsManualClicks;
    document.getElementById('stats-time-played').textContent = statsTimePlayed;

    updateCookiesUI();
}
function setLocalStorage() {
    localStorage.setItem("cookieCount", cookieCount);
    localStorage.setItem("cookieCPS", cookieCPS);
    localStorage.setItem("statsTimePlayed", statsTimePlayed);
    localStorage.setItem("statsManualClicks", statsManualClicks);
}
function clearLocalStorage() {
    cookieCount = 0;
    cookieCPS = 0;
    localStorage.clear();
}


let upgradeDivArray = [];
async function getShop() {
    upgradeDivArray = [];
    const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
    const json = await response.json();
    shopData = json;
    
    // create html objects from array
    const shopSection = document.getElementById('shop');
    shopData.forEach(function(upgrade) {
        const upgradeDiv = document.createElement('div');
        upgradeDiv.id = `upgrade-container-${upgrade.id}`
        upgradeDiv.classList = 'upgrade-container';
        shopSection.appendChild(upgradeDiv);
        upgradeDivArray.push(upgradeDiv);

        const heading = document.createElement('h3');
        heading.textContent = `${upgrade.name}`
        upgradeDiv.appendChild(heading);
        const image = document.createElement('img');
        image.src = `./img/icons/${upgrade.id}.png`;
        image.alt = `${upgrade.name} icon`;
        upgradeDiv.appendChild(image);
        const content = document.createElement('p');
        content.innerHTML = `<b>Cost:</b> 🍪${upgrade.cost} </br><b>Power:</b> ⚡${upgrade.increase}`;
        upgradeDiv.appendChild(content);
        
        const upgradeButton = document.createElement('button');
        upgradeButton.textContent = "buy";
        upgradeButton.id = `buy-upgrade-${upgrade.id}`;
        upgradeDiv.appendChild(upgradeButton);
        upgradeButton.addEventListener('click', function() { buyUpgrade(upgrade);});
    })
}
function buyUpgrade(upgrade) {
    cookieCount -= upgrade.cost;
    cookieCPS += upgrade.increase;
    setLocalStorage();
    updateCookiesUI();
    updateUpgradeUI();
}
function updateUpgradeUI() {
    shopData.forEach(function(upgrade, index) {
        if (cookieCount > upgrade.cost) {
            upgradeDivArray[index].classList.remove('disabled-upgrade');
        }
        else {
            upgradeDivArray[index].classList.add('disabled-upgrade');
        }
    });
}

function cookieClickAnim() {
    cookieElem.classList.add("cookie-click-anim");
    setTimeout(function(){
        cookieElem.classList.remove("cookie-click-anim");
    }, 100);
}
function cookieClickParticle(x,y,minSize, maxSize) {
    const cookieParticle = document.createElement('span');
    cookieParticle.textContent = "🍪";
    let particleSize = Math.random()*(maxSize-minSize)+maxSize;
    cookieParticle.classList.add ("cookie-particle")
    cookieParticle.style.fontSize = particleSize+"rem";
    cookieParticle.style.left = x + "px";
    cookieParticle.style.top = y + "px";
    cookieSection.appendChild(cookieParticle);
    
    // transition to animate random direction
    const distance = 100; // setting for how far to travel
    const angle = Math.random()*2*Math.PI // get angle in radians:-
        // (0 to 1) * 2 * 3.14 = (0 to 6.28 radians) = (0° to 360°)
    const xOffset = Math.floor(Math.cos(angle) * distance);
    const yOffset = Math.floor(Math.sin(angle) * distance);
    setTimeout(function() {
        cookieParticle.style.opacity = "0";
        cookieParticle.style.left = (x + xOffset)+"px";
        console.log("x_loc",x+xOffset);
        cookieParticle.style.top = (y + yOffset)+"px"
        console.log("y_loc:", y+yOffset);
    },50);
    setTimeout(function() {
        cookieParticle.remove();
    },750);
}

function updateCookiesUI() {
    // update elements
    cookieCountElem.textContent = "🍪" + cookieCount.toString();
    cookieCPSElem.textContent = "⚡" + cookieCPS.toString();
}

function msToDHMS(ms) {
    let secs    = Math.floor( (ms / 1000) % 60 );
    let mins    = Math.floor( (ms / (1000 * 60)) % 60 );
    let hours   = Math.floor( (ms / (1000 * 60 * 60)) % 60 );
    let days    = Math.floor( (ms / (1000 * 60 * 60 * 24)) % 60);
    return [days,hours,mins,secs];
}
function msToTimeString(ms) {
    let days    = msToDHMS(ms)[0];
    let hours   = msToDHMS(ms)[1];
    let mins    = msToDHMS(ms)[2];
    let secs    = msToDHMS(ms)[3];
    return `${days}d ${hours}h ${mins}m ${secs}s`;
}
let lastTickTime = Date.now();
const statsTimePlayedElement = document.getElementById('stats-time-played');
const statsSessionTimeElement = document.getElementById('stats-session-time');
function updateCookies() {

    cookieCount += cookieCPS;

    statsSessionTime = Date.now() - sessionStartTime;
    statsSessionTimeElement.textContent = msToTimeString(statsSessionTime);

    let tickTime = Date.now() - lastTickTime;
    console.log("tickTime",tickTime);
    console.log(statsTimePlayed);
    statsTimePlayed += tickTime;
    lastTickTime = Date.now();
    console.log(statsTimePlayed);
    statsTimePlayedElement.textContent = msToTimeString(statsTimePlayed);

    setLocalStorage();
    updateCookiesUI();
    updateUpgradeUI()
}
cookieElem.addEventListener('mousedown', function(event) {
    cookieCount++;
    statsManualClicks += 1;
    document.getElementById('stats-manual-clicks').textContent = statsManualClicks;
    setLocalStorage();  
    updateCookiesUI();
    updateUpgradeUI()
    cookieClickAnim();
    for(let i=0; i<3; i++) {
        cookieClickParticle(event.clientX,event.clientY, 0.15,0.7);
    }
    for(let i=0; i<10; i++) {
        cookieClickParticle(event.clientX, event.clientY,0.05,0.25);
    }
})


const settingsButton = document.getElementById('settings-button');
let settingsOpen = false;
function openSettings() {
    document.getElementById("sidebar").style.width = "25rem";
    document.getElementsByTagName("main")[0].style.marginLeft = "25rem";
    document.getElementById("sidebar-content").style.transition = "opacity 1.5s";
    document.getElementById("sidebar-content").style.transitionDelay = "0.8s";
    document.getElementById("sidebar-content").style.opacity = "1";
    setTimeout(function() { document.getElementById("sidebar").style.overflow = "auto"; }, 750);
}
function closeSettings() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementsByTagName("main")[0].style.marginLeft = "0";
    document.getElementById("sidebar-content").style.transition = "opacity 0.15s";
    document.getElementById("sidebar-content").style.transitionDelay = "0s";
    document.getElementById("sidebar-content").style.opacity = "0";
    document.getElementById("sidebar").style.overflow = "hidden";
}
settingsButton.addEventListener('click', function() {
    if (settingsOpen === true) {
        settingsOpen = false;
        closeSettings();
    }
    else {
        settingsOpen = true;
        openSettings();
    }
})
const settingsResetButton = document.getElementById('settings-reset');
settingsResetButton.addEventListener('click', clearLocalStorage);

// run
getShop();
getLocalStorage();
updateCookiesUI();
setInterval(updateCookies, 1000);