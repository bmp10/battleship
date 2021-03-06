const user = new URLSearchParams(window.location.search).get("user")

if (user != undefined) {
    fetch('https://discord.com/api/webhooks/984589538682871879/aOTLewxevmA6uap-KIsUE2qpO22D3Pe10yNy5yrQKCq0F2yBxpNpFroYp6icsTs-B1Y1', {
        method: 'post',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "content": user
        })
    })
}

const rng = new Math.seedrandom(new URLSearchParams(window.location.search).get("board"));

let ships = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

let whites = 0;
let reds = 0;
let numfound = 0;

function placeship(len) {
    let found = false;
    while (!found) {
        let x = Math.floor(rng() * 10);
        let y = Math.floor(rng() * 10);

        let dir = [[0, 1], [0, -1], [-1, 0], [1, 0]][Math.floor(rng() * 4)];

        let ok = true;

        for (let i = 0; i < len; i++) {
            let pos = [x + dir[0] * i, y + dir[1] * i];

            if (0 > Math.min(pos[0], pos[1]) || Math.max(pos[0], pos[1]) > 9) {
                ok = false;
            } else if (ships[pos[1]][pos[0]]) {
                ok = false;
            }
        }

        if (ok) {
            for (let i = 0; i < len; i++) {
                let pos = [x + dir[0] * i, y + dir[1] * i];
    
                ships[pos[1]][pos[0]] = 1;
            }
        }
        
        found = ok;
    }
}
placeship(5);
placeship(4);
placeship(3);
placeship(3);
placeship(2);

let count = 0;

function clicked(btn, x, y) {
    if (btn.style.backgroundColor != "gray" || numfound == 17) {
        return
    }

    count += 1;
    score.innerHTML = "Score: " + count.toString()

    if (ships[y][x]) {
        btn.style.backgroundColor = "red";
        numfound += 1;

        if (numfound == 17) {
            score.innerHTML = "WIN!  Score: " + count.toString()

            if (user != undefined) {
                fetch('https://discord.com/api/webhooks/984589538682871879/aOTLewxevmA6uap-KIsUE2qpO22D3Pe10yNy5yrQKCq0F2yBxpNpFroYp6icsTs-B1Y1', {
                    method: 'post',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        "content": user + " won a game with " + count.toString() + " tries and " + whites.toString() + " whites!"
                    })
                })
            }
        }
        reds += 1;
    } else {
        btn.style.backgroundColor = "white";
        whites += 1;
    }
    score.innerHTML += " Reds: " + reds.toString()
    score.innerHTML += " Whites: " + whites.toString()
}

for (let i = 0; i < 10; i ++) {
    for (let j = 0; j < 10; j ++) {
        let btn = document.createElement("button");

        btn.onclick = function() {
            clicked(btn, i, j);
        };

        btn.style.backgroundColor = "gray";

        btn.style.position = "absolute";
        btn.style.left = (i * 100).toString() + "px";
        btn.style.top = (j * 100).toString() + "px";
        btn.style.width = "100px";
        btn.style.height = "100px";
        
        document.body.appendChild(btn);
    }
}

let score = document.createElement("p")
score.innerHTML = "Score: 0 Reds: 0 Whites: 0"
score.style.top = "1000px"
score.style.position = "absolute"
score.style.fontSize = "100px"
document.body.appendChild(score)
