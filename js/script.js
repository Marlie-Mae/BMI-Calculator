const scriptURL = 'https://script.google.com/macros/s/AKfycbyl47NWyd-GxpCS1Fk6D7ufIqml3dHLnqDjeioOaXZlIUYC-U4IcOtE88tcqFaqWTUD/exec'; // Replace with your Apps Script Deployment URL
const form = document.forms['submit-to-google-sheet'];

function validateForm(event) {
    event.preventDefault(); // Prevent form from reloading the page
    
    var age = document.getElementById("age").value;
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var male = document.getElementById("m").checked;
    var female = document.getElementById("f").checked;
    var name = document.getElementById("name").value;

    if (age == "" || height == "" || weight == "" || (!male && !female) || name == "") {
        alert("All fields are required!");
        return;
    }

    var gender = male ? "Male" : "Female";
    var bmi = Number(weight) / ((Number(height) / 100) ** 2);
    var result = "";

    if (bmi < 18.5) {
        result = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        result = "Normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
        result = "Overweight";
    } else if (bmi >= 30 && bmi <= 39.9) {
        result = "Obesity";
    } else if (bmi >= 40) {
        result = "Extremely Obesity";
    }

    var h1 = document.createElement("h1");
    var h2 = document.createElement("h2");
    var t = document.createTextNode(result);
    var b = document.createTextNode("BMI: ");
    var r = document.createTextNode(parseFloat(bmi).toFixed(2));
    h1.appendChild(t);
    h2.appendChild(b);
    h2.appendChild(r);
    document.body.appendChild(h1);
    document.body.appendChild(h2);

    // Add result and BMI value to the form as hidden fields
    var bmiResult = document.createElement("input");
    bmiResult.type = "hidden";
    bmiResult.name = "bmiResult";
    bmiResult.value = result;

    var bmiValue = document.createElement("input");
    bmiValue.type = "hidden";
    bmiValue.name = "bmiValue";
    bmiValue.value = parseFloat(bmi).toFixed(2);

    form.appendChild(bmiResult);
    form.appendChild(bmiValue);

    // Submit the form data to Google Sheet
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            alert("BMI Submitted Successfully!");
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
}

document.getElementById("form").addEventListener("submit", validateForm);