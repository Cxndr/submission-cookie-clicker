let shopData; // array of objects (each upgrade)
let cookieCount = 0;
const cookieCountElem = document.getElementById('cookie-count');
let cookieCPS = 0;
const cookieCPSElem = document.getElementById('cookie-cps');

const cookieElem = document.getElementById('cookie');
const cookieSection = document.getElementById('cookie-section');

function getLocalStorage() {
    if (localStorage.getItem("cookieCount")) {
        cookieCount = parseInt(localStorage.getItem("cookieCount"));
        console.log("fetched: ",cookieCount);
    }
    if (localStorage.getItem("cookieCPS") != null) {
        cookieCPS = parseInt(localStorage.getItem("cookieCPS"));
        console.log("fetched: ", cookieCPS);
    }
    updateCookiesUI();
}
function setLocalStorage() {
    localStorage.setItem("cookieCount", cookieCount);
    localStorage.setItem("cookieCPS", cookieCPS);
}

async function getShop() {
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

        const heading = document.createElement('h3');
        heading.textContent = `${upgrade.name}`
        upgradeDiv.appendChild(heading);
        const content = document.createElement('p');
        content.textContent = `Cost: ${upgrade.cost} CPS: ${upgrade.increase}`;
        upgradeDiv.appendChild(content);

        const upgradeButton = document.createElement('button');
        upgradeButton.textContent = "buy";
        upgradeButton.id = `buy-upgrade-${upgrade.id}`;
        upgradeDiv.appendChild(upgradeButton);
        upgradeButton.addEventListener('click', function() { buyUpgrade(upgrade);});
    })
}

function buyUpgrade(upgrade) {
    console.log("buying upgrade", upgrade);
    cookieCount -= upgrade.cost;
    cookieCPS += upgrade.increase;
    setLocalStorage();
    updateCookiesUI();
}
function cookieClickAnim() {
    cookieElem.classList.add("cookie-click-anim");
    setTimeout(function(){
        cookieElem.classList.remove("cookie-click-anim");
    }, 100);
    const cookieParticle = document.createElement('span');
    cookieParticle.textContent = "🍪";
    const minSize = 0.5;
    const maxSize = 5;
    let particleSize = Math.random()*(maxSize-minSize)+maxSize;
    cookieParticle.classList.add ("cookie-particle")
    cookieParticle.style.fontSize = particleSize;
    cookieSection.appendChild(cookieParticle);
    
    // transition to animate random direction move and opacity
    let randTop = Math.floor(Math.random()*90+5);
    let randLeft = Math.floor(Math.random()*90+5);
    setTimeout(function() {
        cookieParticle.style.opacity = "0";
        cookieParticle.style.top = Math.floor(Math.random()*90+5)+'%';
        cookieParticle.style.left = Math.floor(Math.random()*90+5)+'%';
    },50);
}

function updateCookiesUI() {
    // update elements
    cookieCountElem.textContent = cookieCount.toString();
    cookieCPSElem.textContent = cookieCPS.toString();
}
function updateCookies() {
    // increment cookies by cps
    cookieCount += cookieCPS;
    setLocalStorage();
    updateCookiesUI();
}
cookieElem.addEventListener('mousedown', function() {
    cookieCount++;
    setLocalStorage();  
    updateCookiesUI();
    cookieClickAnim();
})

// run
getShop();
getLocalStorage();
updateCookiesUI();
setInterval(updateCookies, 1000);