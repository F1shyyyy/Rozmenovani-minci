let deposit = 0;
let pozadovanominci = [0, 0, 0, 0, 0, 0];
let vydanominci = [0, 0, 0, 0, 0, 0];
const mince = [50, 20, 10, 5, 2, 1];
let pocetminci = [7, 8, 10, 20, 85, 120];
let index = 0;
let soucetminci = 1000;
function submit(){
    deposit = parseInt(document.querySelector('#deposit').value);   
    pozadovanominci[0] = parseInt(document.querySelector('#amount-50kc').value);
    pozadovanominci[1] = parseInt(document.querySelector('#amount-20kc').value);
    pozadovanominci[2] = parseInt(document.querySelector('#amount-10kc').value);
    pozadovanominci[3] = parseInt(document.querySelector('#amount-5kc').value);
    pozadovanominci[4] = parseInt(document.querySelector('#amount-2kc').value);
    pozadovanominci[5] = parseInt(document.querySelector('#amount-1kc').value);

    console.log(deposit)
    if(soucetminci == 0){
        alert("Omlouváme se, ale automatu došly všechny mince.");
        return
    }
    if(deposit == 0 || deposit > soucetminci){
        alert(`Omlouváme se, ale vložte částku od 0 po ${soucetminci} kč.`);
        return;
    }
    pozadovanominci.forEach(function (cislo, index) {
        if(cislo > pocetminci[index]){
            alert(`Omlouváme se, ale automat nemá tolik ${mince[index]} Kč mincí.`);
            return;
        }
        if(deposit < (cislo * mince[index])){
            alert("Omlouváme se, ale částka, kterou jste vložil je menší než požadovaný počet mincí.")
            return;
        }
    });
    soucetminci -= deposit
    console.log(soucetminci)
    vydanominci.forEach((vydano, index) => {
            while (vydano != pozadovanominci[index]) {
                if (deposit >= mince[index] && pocetminci[index] > 0) {
                    vydano++
                    pocetminci[index]--;
                    deposit -= mince[index];
                    vydanominci[index] = vydano;
                } else{break}
            }
    });
    while (deposit > 0) {
         if(deposit %2 != 0 && (pocetminci[5] == 0 || pocetminci[4] == 0) && index == 0){
            index = 1;
            if(deposit >= mince[3] && pocetminci[3] > 0){
                vydanominci[3]++;
                pocetminci[3]--;
                deposit -= mince[3];
            }
        }
        for (let forindex = 0; forindex <= pocetminci.length - 1; forindex++) {
            if(forindex == 3 && deposit % 2 == 0 && index == 1){} else{
                while(deposit >= mince[forindex] && pocetminci[forindex] > 0){
                    vydanominci[forindex]++;
                    pocetminci[forindex]--;
                    deposit -= mince[forindex];
                }
            }
        }
        if(pocetminci[5] == 0 && pocetminci[4] == 0 && deposit > 0){
            alert("Omlouváme se, ale automatu došli mince.");
            return;
        }
    }
    let resultsDiv = document.getElementById("results");
    resultsDiv.style.display = "flex";
    document.querySelector('#result_50kc').innerText = `Počet 50 Kč: ${vydanominci[0]}`;
    document.querySelector('#result_20kc').innerText = `Počet 20 Kč: ${vydanominci[1]}`;
    document.querySelector('#result_10kc').innerText = `Počet 10 Kč: ${vydanominci[2]}`;
    document.querySelector('#result_5kc').innerText = `Počet 5 Kč: ${vydanominci[3]}`;
    document.querySelector('#result_2kc').innerText = `Počet 2 Kč: ${vydanominci[4]}`;
    document.querySelector('#result_1kc').innerText = `Počet 1 Kč: ${vydanominci[5]}`;
}
function reset(){
    document.querySelector('#deposit').value = "0";
    document.querySelector('#amount-50kc').value = "0";
    document.querySelector('#amount-20kc').value = "0";
    document.querySelector('#amount-10kc').value = "0";
    document.querySelector('#amount-5kc').value = "0";
    document.querySelector('#amount-2kc').value = "0";
    document.querySelector('#amount-1kc').value = "0";
}