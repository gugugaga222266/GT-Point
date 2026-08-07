let points = Number(localStorage.getItem("gt_points")) || 0;
let history = JSON.parse(localStorage.getItem("gt_history")) || [];

function levelFromPoints(p){
    return Math.floor(p / 100) + 1;
}

function updateScreen(){

    document.getElementById("points").textContent = points + " GT";

    let level = levelFromPoints(points);

    document.getElementById("level").textContent = level;

    document.getElementById("xpBar").value = points % 100;

    document.getElementById("nextLevel").textContent =
        "次のレベルまで " + (100 - (points % 100)) + " GT";

    const list = document.getElementById("history");
    list.innerHTML="";

    history.slice().reverse().forEach(item=>{
        let li=document.createElement("li");
        li.textContent=item;
        list.appendChild(li);
    });

    localStorage.setItem("gt_points",points);
    localStorage.setItem("gt_history",JSON.stringify(history));
}

function addPoint(value,name){

    points += value;

    history.push("✅ "+name+"　+"+value+"GT");

    alert("+"+value+"GT 獲得！");

    updateScreen();

}

function buyReward(cost,name){

    if(points<cost){

        alert("GTポイントが足りません");

        return;

    }

    points -= cost;

    history.push("🎁 "+name+" と交換 (-"+cost+"GT)");

    alert(name+"を交換しました！");

    updateScreen();

}

updateScreen();
