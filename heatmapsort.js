function balanceBreaker() {
    var i;
    var j;
    var ampDif;
    var originalAmpdif;
    var oC1 = 0;
    var oC2 = 0;
    var Savings = 0;
    for (i = 0; i < 10; i++) {
        oC1 += document.getElementById("breaker" + i).innerHTML;
        i++;
        oC2 += document.getElementById("breaker" + i).innerHTML;
    }
    originalAmpdif = oC1 - oC2;
    if (originalAmpdif < 0) {
        originalAmpdif *= -1;
    }
    for (i = 0; i < 19; i++) {
        for (j = 0; j < 18; j++) {
            if (document.getElementById("breaker" + i).innerHTML > document.getElementById("breaker" + (i + 1)).innerHTML) {
                var temp = document.getElementById("breaker" + i).innerHTML;
                document.getElementById("breaker" + i).innerHTML = document.getElementById("breaker" + (i + 1)).innerHTML;
                document.getElementById("breaker" + (i + 1)).innerHTML = temp;
            }
        }
    }
    var channel1 = [];
    var channel1Total = 0;
    var channel2 = [];
    var channel2Total = 0;
    var breakers = [];
    for (i = 0; i < 10; i++) {
        breakers[i] = document.getElementById("breaker" + i).innerHTML;
    }
    for (i = 0; i < 20; i++) {
        if (channel1Total < channel2Total) {
            channel1[(channel1.length + 1)] = breakers[i];
            channel1Total += breakers[i];
        }
        else {
            channel2[(channel2.length + 1)] = breakers[i];
            channel2Total += breakers[i];
        }
    }
    ampDif = channel1Total - channel2Total;
    if(ampDif < 0){
        ampDif *= -1;
    }
    Savings = (((ampDif - originalAmpdif) * 120)/1000) * .1320;
    document.getElementById("savings").innerHTML = Savings;
    for(i = 0; i < 20; i++){
        if((i % 2) == 0){
            document.getElementById("breaker" + i).innerHTML = channel1[0];
            channel1.shift();
        }
        else{
            document.getElementById("breaker" + i).innerHTML = channel2[0];
            channel2.shift();
        }
    }
    
}

function colorBox() {
    var i;
    for (i = 0; i < 20; i++){
        if(document.getElementById("breaker" + i).innerHTML < 10){
            document.getElementById("breaker" + i).style.color = "green";
        }
        else if(document.getElementById("breaker" + i).innerHTML < 15 && document.getElementById("breaker" + i) >= 10){
            document.getElementById("breaker" + i).style.color = "yellow";
        }
        else{
            document.getElementById("breaker" + i).style.color = "red";
        }
    }
}

