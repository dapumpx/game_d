var myGold = 0;

function la() {
    var req = {
        userId: "a7e35206-2c3e-4b7a-bafb-33e39b79a68e"
    };
    pomelo.request("laba.mainHandler.la", req, function (data) {
        console.log(data.info);

        var table = document.getElementById("myInfo");
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        for (var i = 0; i < 3; i++) {
            table.insertRow(-1);
            var eleRow = table.rows[table.rows.length - 1];
            for (var j = 0; j < 5; j++) {
                eleRow.insertCell(j).innerHTML = data.info[i + j * 3].name;
            }
        }

        myGold = data.user.gold;
        updateTableInfo();
    });
}

function updateTableInfo() {
    var table = document.getElementById("myInfo");
    var arrRows = table.rows;
    arrRows[0].innerHTML = "My Gold: " + myGold;
    return;
    for (var i = 1; i < arrRows.length; i++) {
        var eleRow = arrRows[i];
        for (var j = 0; j < eleRow.cells.length; j++) {
            eleRow.cells[j].innerHTML = "a" + j.toString();
        }
    }
}

function addGold() {
    var req = {
        userId: "a7e35206-2c3e-4b7a-bafb-33e39b79a68e",
        gold: 10000
    };
    pomelo.request("laba.mainHandler.addGold", req, function (data) {
        myGold = data.user.gold;
        updateTableInfo();
    });
}

function getInfo() {

}

window.onload = function () {
    console.log("FBInstant");
    console.log(FBInstant);
    FBInstant.initializeAsync().then(function () {
        FBInstant.startGameAsync()
            .then(function () {
                console.log(123123)
            });
        FBInstant.setLoadingProgress(100);
    })

}