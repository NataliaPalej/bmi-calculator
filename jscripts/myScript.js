var calories = 0;

function $(id) {
    return document.getElementById(id);
}

function updateSlider() {
    var value1 = $("range").value;

    var goal = $("range").value;
    var lbsgoal = goal * 2.205;
    var kcaldiff = lbsgoal * 1000;
    var fin = +calories + +kcaldiff;

    if (fin < 1000) {
        $('resultinfo').style = "background-color: #ff9800";
        $('resultinfo').innerHTML = "It is dangerous to eat less than 1000 kcal per day!";
    }
    else {
        $('resultinfo').style = "background-color: #2196F3";
        $('resultinfo').innerHTML = "In order to loose/gain " +  value1 + " kg weekly, you must eat " + parseFloat(fin).toFixed(0) + " kcal per day.";
    }
}

function calculate() {
    var name = $("name").value;
    var age = $("age").value;
    var sex = $("sex").value;
    var weight = $("weight").value;
    var height = $("height").value;
    var activity = $("activity").value;
    console.log("Name: " + name + "\nAge: " + age + "\nSex: " + sex + "\nWeight: " + weight + "\tHeight: " + height + "\nActivity: " + activity);

    var result = " ";
    result += name + ", <br>" + "Age: " + age + "<br>Height: " + height + "<br>Weight: " + weight + "<br>Activity: " + activity;

    if (weight > 0 && height > 0 && age > 0) {
        var bmi = weight / (height / 100 * height / 100);
        bmi = parseFloat(bmi).toFixed(2);
        var detail = "";
        
        if (bmi < 18.5) {
            detail = "You are too thin.";
            $("bmiresult").innerHTML = "<div class='alert'> <strong>" + name + "!</strong> Your BMI is " + bmi + ". " + detail + " </div>"
            //slider position based on BMI result
            $("range").value = "0.25";
        }
        if (bmi > 18.5 && bmi < 24.9) {
            detail = "You are healthy.";
            $("bmiresult").innerHTML = "<div class='alert success'> <strong>" + name + "!</strong> Your BMI is " + bmi + ". " + detail + " </div>"
            $("range").value = "0";
        }
        if (bmi >= 25) {
            detail = "You are overweight.";
            $("bmiresult").innerHTML = "<div class='alert'> <strong>" + name + "!</strong> Your BMI is " + bmi + ". " + detail + " </div>"
            $("range").value = "-0.25";
        }

        //Basal Metabolic Rate (BMR) - SOURCE https://www.bmi-calculator.net/bmr-calculator/bmr-formula.php
        var bmr = 0;
        var lbsweight = weight * 2.205;
        var inchheight = height / 2.54;

        //Adult male: 66 + (6.3 * body weight in lbs.) + (12.9 * height in inches) - (6.8 * age in years) = BMR
        //Adult female: 655 + (4.3 * weight in lbs.) + (4.7 * height in inches) - (4.7 * age in years) = BMR
        if (sex == "male") {
            bmr = 66 + (6.3 * lbsweight) + (12.9 * inchheight) - (6.8 * age)
        }
        if (sex == "female") {
            bmr = 655 + (4.3 * lbsweight) + (4.7 * inchheight) - (4.7 * age)
        }

        //using switch statement instead of multiple if/else statements
        //Harris Benedict Formula for activity SOURCE https://www.bmi-calculator.net/bmr-calculator/harris-benedict-equation/
        switch (activity) {
            case "verylight":
                calories = bmr * 1.2;
                break;
            case "light":
                calories = bmr * 1.375;
                break;
            case "moderate":
                calories = bmr * 1.55;
                break;
            case "active":
                calories = bmr * 1.725;
                break;
            case "veryactive":
                calories = bmr * 1.9;
                break;
            default:
                console.log("No such activity");
        }

        calories = parseFloat(calories).toFixed(0);
        $("bmr").innerHTML = "<div class= 'alert info'>The total number of calories you need in order to maintain your current weight: " + calories + "kcal.</div>"
        updateSlider();

        $("extrainfo").style.visibility = "visible";
    }
    else {
        alert("Incorrect details!")
    }
}

function resetFields() {
    $("name").value = "";
    $("age").value = "";
    $("sex").value = "male";
    $("weight").value = "";
    $("height").value = "";
    $("activity").value = "verylight";
    $("bmiresult").innerHTML = "<div id='bmiresult'></div>";
    $("bmr").innerHTML = "<div id='bmr'></div>";
    $("extrainfo").style.visibility = "hidden";
    console.log("Fields reset.")
}