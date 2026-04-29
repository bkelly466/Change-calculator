// Write your JavaScript here
let change = [
   /* { name: 'twenties-output', value: 2000, count: 0 },
    { name: 'tens-output',     value: 1000, count: 0 },
    { name: 'fives-output',    value: 500,  count: 0 },
    { name: 'twos-output',     value: 200,  count: 0 },*/
    { name: 'dollars-output',  value: 100,  count: 0 },
    { name: 'quarters-output', value: 25,   count: 0 },
    { name: 'dimes-output',    value: 10,   count: 0 },
    { name: 'nickels-output',  value: 5,    count: 0 },
    { name: 'pennies-output',  value: 1,    count: 0 }
];


function calculateChange(Due, Received) {
    let cc = Math.round((Received - Due) * 100);
    for (let i = 0; i < change.length; i++){
        change[i].count = Math.floor(cc / change[i].value);
        cc = cc % change[i].value;
    }
}

function updateTotals(u){
    for (let i = 0; i < change.length; i++){
        document.getElementById(`${change[i].name}`).innerText = change[i].count;
    }
}

function handleClickEvent(e){
    let Due = document.getElementById("amount-due").value;
    let Received = document.getElementById("amount-received").value;
    let totalChange = Received - Due; 
    document.querySelector(".amount-large").innerText = "$" + totalChange.toFixed(2);
    calculateChange(Due, Received)
    updateTotals()
}

document.getElementById("calculate-change").onclick = handleClickEvent;