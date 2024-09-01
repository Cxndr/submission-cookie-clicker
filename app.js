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
    }
    if (localStorage.getItem("cookieCPS") != null) {
        cookieCPS = parseInt(localStorage.getItem("cookieCPS"));
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
        const image = document.createElement('img');
        image.src = `./img/icons/${upgrade.id}.png`;
        image.alt = `${upgrade.name} icon`;
        upgradeDiv.appendChild(image);
        const content = document.createElement('p');
        content.innerHTML = `<b>Cost:</b> ${upgrade.cost} </br><b>CPS:</b> ${upgrade.increase}`;
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
}
function cookieClickAnim(x,y,minSize, maxSize) {
    cookieElem.classList.add("cookie-click-anim");
    setTimeout(function(){
        cookieElem.classList.remove("cookie-click-anim");
    }, 100);
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
cookieElem.addEventListener('mousedown', function(event) {
    cookieCount++;
    setLocalStorage();  
    updateCookiesUI();
    for(let i=0; i<3; i++) {
        cookieClickAnim(event.clientX,event.clientY, 0.15,0.7);
    }
 
    for(let i=0; i<10; i++) {
        cookieClickAnim(event.clientX, event.clientY,0.05,0.25);
    }
})

// run
getShop();
getLocalStorage();
updateCookiesUI();
setInterval(updateCookies, 1000);