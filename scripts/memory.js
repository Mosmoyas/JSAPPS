let gameBlocks=document.querySelector('.memory-game-blocks')

function getCards() {
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.onreadystatechange = () => {
        if (xhrRequest.readyState === 4 && xhrRequest.status === 200) {
            let images = JSON.parse(xhrRequest.responseText);

            console.log(images)
            let count = images.length;


            for (let i = 0; i < count; i++) {
                let items = images[i];
                console.log(items)
                for (const key in items) {

                    gameBlocks.innerHTML += `
                       <div class="game-block" data-technology='${key}'>
                        <div class="face front"></div>
                        <div class="face back">  <img src="${items[key]}" alt=""></div>
                       </div>
                       <div class="game-block" data-technology='${key}'>
                       <div class="face front"></div>
                       <div class="face back">  <img src="${items[key]}" alt=""></div>
                      </div>

                        `
                    console.log(` ${items[key]}`);
                }
                
           

                // behlater.innerHTML = `
                // <div class=" face front">
                // <img src="$${images}" alt="">

                // </div>
                // <div class=" face back">
                // </div>

                // `


                
            }
        }
}
    xhrRequest.open("GET", "/data/memory.json", true)
    xhrRequest.send();
}
getCards();