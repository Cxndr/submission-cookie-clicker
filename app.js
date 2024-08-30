let shopData; // array of objects (each upgrade)
let cookieCount = 0;
const cookieCountElem = document.getElementById('cookie-count');
let cookieCPS = 0;
const cookieCPSElem = document.getElementById('cookie-cps');


async function getShop() {
    const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
    const json = await response.json();
    shopData = json;
    
    // create html objects from array
    const shopSection = document.getElementById('shop');
    shopData.forEach(function(upgrade) {
        const upgradeDiv = document.createElement('div');
        upgradeDiv.class = 'upgrade-container';
        upgradeDiv.id = `upgrade-container-${upgrade.id}`
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
        upgradeButton.addEventListener('click', function() { buyUpgrade(upgrade); });
    })
}

function buyUpgrade(upgrade) {
    console.log("buying upgrade", upgrade);
    cookieCount -= upgrade.cost;
    cookieCPS += upgrade.increase;
    updateCookiesUI();
}

function updateCookiesUI() {
    // update elements
    cookieCountElem.textContent = cookieCount;
    cookieCPSElem.textContent = cookieCPS;
}
function updateCookies() {
    // increment cookies by cps
    cookieCount += cookieCPS;
    updateCookiesUI();
}

const cookieElem = document.getElementById('cookie');
cookieElem.addEventListener('click', function() {
    cookieCount ++;
    updateCookiesUI();
})

// run
getShop();
setInterval(updateCookies, 1000);