
let startButton = document.querySelector(".contro-button button");
let durtion = 1000;
let mainContainer = document.querySelector(".container.boxs");
let boxs = Array.from(mainContainer.children);

startButton.onclick = function () {
    this.parentElement.classList.add("visually-hidden")

    let name = prompt("Type Your Name");

    if (name == "" || name==null) {
        document.querySelector(".name span").innerHTML = "Unknown";
    }
    else {
        document.querySelector(".name span").innerHTML = name;
        
    }
}


let orderRange = [...Array(boxs.length).keys()];

shuffle(orderRange);

boxs.forEach((boxs, index) => {
    boxs.style.order = orderRange[index];

    boxs.onclick = function () {
        // toggleRotate();
        flipBlock(boxs)
    }
})


function flipBlock(block) {
    // Add Is fliped class
    block.classList.add("rotate-deg")
    // Collect all fliped cards

    
    let allFlippedBlocks = boxs.filter(flippedBlock => flippedBlock.classList.contains('rotate-deg'));
    // If two blocks

    if (allFlippedBlocks.length == 2) {
        
        // Stop Clicking Fun
        stopClicking();
        // match fun
        matchBoxFunction(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
    
}



function shuffle(array) {
    let current = array.length,
        temp,
        random;
    for (let i = array.length; i > 0; i--){
        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;
    }
    return array;
}




function stopClicking() {
    mainContainer.classList.add("stop-clicking");

    setTimeout(() => {
        mainContainer.classList.remove("stop-clicking");
    },durtion)
}

function matchBoxFunction(firstBlock,secondBlock) {
    let triesElement = document.querySelector(".info .tries span");

    if (firstBlock.dataset.name === secondBlock.dataset.name) {
        console.log("ehelle")
        // remove rotate
        firstBlock.classList.remove("rotate-deg");
        secondBlock.classList.remove("rotate-deg");

        // Add Class match
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        let allMatchedBoxs = boxs.filter(flippedBlock => flippedBlock.classList.contains('has-match'));
    console.log(allMatchedBoxs)
    if (allMatchedBoxs.length == 20) {
    document.getElementById("full-success").play();
        }
        
        document.getElementById("success").play();

    }
    else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("rotate-deg");
            secondBlock.classList.remove("rotate-deg");
        }, durtion);

        document.getElementById("fail").play();

    }
}

