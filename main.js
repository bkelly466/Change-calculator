// Write your JavaScript here
let change = [
    { name: 'twenties-output', value: 2000, count: 0, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/US_%2420_Series_2006_Obverse.jpg" },
    { name: 'tens-output',     value: 1000, count: 0, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/US_%2410_1934_Note_Front.jpg" },
    { name: 'fives-output',    value: 500,  count: 0, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/New_five_dollar_bill.jpg" },
 //   { name: 'twos-output',     value: 200,  count: 0, imageUrl: "" },
    { name: 'dollars-output',  value: 100,  count: 0, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/23/US_one_dollar_bill%2C_obverse%2C_series_2009.jpg" },
    { name: 'quarters-output', value: 25,   count: 0, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f3/America_the_Beautiful_quarter_obverse_%28Philadeplhia%29.jpg?_=20240605225234" },
    { name: 'dimes-output',    value: 10,   count: 0, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/63/1996-S_dime_obverse.jpg?_=20240125163522" },
    { name: 'nickels-output',  value: 5,    count: 0, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Jefferson-Nickel-Unc-Obv.jpg/1280px-Jefferson-Nickel-Unc-Obv.jpg?_=20070713102620" },
    { name: 'pennies-output',  value: 1,    count: 0, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Penny_crop.jpg" }
];


function calculateChange(Due, Received) {
    let cc = Math.round((Received - Due) * 100);
    for (let i = 0; i < change.length; i++){
        change[i].count = Math.floor(cc / change[i].value);
        cc = cc % change[i].value;
    }
}

function updateTotals(u){
    const visualContainer = document.getElementById("visual-change-container")
    visualContainer.innerHTML ="";
    for (let i = 0; i < change.length; i++) {
        const denomination = change[i];
        document.getElementById(denomination.name).innerText = denomination.count;
        if (denomination.count > 0 && denomination.imageUrl) {
            const row = document.createElement("div");
            row.className = "visual-row"; 
            for (let n = 0; n < denomination.count; n++) {
                const img = document.createElement("img");
                img.src = denomination.imageUrl;
                img.alt = denomination.name;
                if (denomination.value >= 100) {
                    img.className = "visual-bill";
                    } else if (denomination.value == 25){
                        img.className = "visual-quarter";
                    } else if (denomination.value == 10){
                        img.className = "visual-dime";
                    } else if (denomination.value == 5){
                        img.className = "visual-nickel";
                    } else if (denomination.value == 1){
                        img.className = "visual-penny";
                    };
                console.log(img.className)
                row.appendChild(img);
            }
            visualContainer.appendChild(row);
        }
    }
}
const amountDueInput = document.getElementById("amount-due");
const amountReceivedInput = document.getElementById("amount-received");

function formatToDecimal(f){
    const value = parseFloat(f.target.value)
    if (!isNaN(value)){
        f.target.value = value.toFixed(2)
    }
}
amountDueInput.addEventListener("change", formatToDecimal);
amountReceivedInput.addEventListener("change", formatToDecimal)

function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    const messageSpan = document.getElementById("alert-message");
    messageSpan.innerText = message;
    alertBox.className = "alert-visible";
    setTimeout(() => {
        alertBox.className = "alert-hidden";
    }, 3000);
}

function handleClickEvent(e){
    let Due = document.getElementById("amount-due").value;
    let Received = document.getElementById("amount-received").value;
    if (isNaN(Due) || isNaN(Received) || Received < Due) {
       showAlert("YOU ARE POOR!");
        document.querySelector(".amount-large").innerText = "$0.00";
        document.getElementById("visual-change-container").innerHTML = "";
        return; 
    }
    let totalChange = Received - Due; 
    document.querySelector(".amount-large").innerText = "$" + totalChange.toFixed(2);
    calculateChange(Due, Received)
    updateTotals()
}

function resetForm(a){
    document.getElementById("amount-due").value = "";
    document.getElementById("amount-received").value = "";
    document.querySelector(".amount-large").innerText = "$0.00";
    for (let i = 0; i < change.length; i++) {
        change[i].count = 0; 
        document.getElementById(change[i].name).innerText = "0"; 
    }
}

document.getElementById("calculate-change").onclick = handleClickEvent;

document.getElementById("reset-calculator").onclick = resetForm;