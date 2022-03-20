var calories = 0;

function $(id) {
    return document.getElementById(id);
}

function calculate() {
    var name = $("name").value;
    var age = $("age").value;
    var sex = $("sex").value;
    var weight = $("weight").value;
    var height = $("height").value;
    var activity = $("activity").value;

    var result = " ";
    var detail = " ";
    result += name + ", <br>" + "Age: " + age + "<br>Height: " + height + "<br>Weight: " + weight + "<br>Activity: " + activity;

    if (weight > 0 && height > 0 && age > 0) {
        var bmi = weight / (height / 100 * height / 100);
        bmi = parseFloat(bmi).toFixed(2);

        if (bmi < 18.5) {
            detail = "You are too thin.";
            //slider position based on BMI result
            $("range").value = "0.25";
            console.log($("theTitle").classList);
            //to easily change to a new class
            $("theTitle").className = "alert";
            console.log($("theTitle").classList);
            $("theTitle").innerHTML = "DANGEROUS! YOU ARE UNDERWEIGHT.";
            $("theImage").src = "images/underweight-pic.jpg";
            $("theInfo").innerHTML = "<p class = 'alert'>You are severely underweight. You are most likely not getting enough calories to fuel your body. You are at high risk for various health issues.</p><p class = 'w3-center'>Contact your GP to seek for help or advice.</p><p class = 'w3-center'>In the meantime, <a href = 'https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/advice-for-underweight-adults/' target = '_blank'>CLICK HERE</a> to find out more about being under weight.</p>";
            $("theInfo").innerHTML += "<div class = 'alert warning'>DON'T WAIT. IT MIGHT BE TOO LATE.</div>";
        }

        else if (bmi >= 18.5 && bmi < 24.9) {
            detail = "You are healthy.";
            $("range").value = "0";
            $("theTitle").className = "alert healthy";
            $("theTitle").innerHTML = "You are healthy!";
            $("theImage").src = "images/perfectbmi-pic.jpg";
            $("theImage").height = "376";
            $("theImage").width = "600";
            $("theInfo").className = "alert healthy";
            $("theInfo").innerHTML = "Well done, your BMI is perfect. Keep it up and stay healthy!";

        }
        else if (bmi >= 24.9 && bmi < 29.9) {
            detail = "You are overweight.";
            $("range").value = "-0.25";
            $("theTitle").className = "alert warning";
            $("theTitle").innerHTML = "You are overweight!";
            $("theImage").src = "images/overweight-pic.jpg";
            $("theInfo").innerHTML = "<p class = 'alert warning'>Your BMI is in the overweight category. This increases the risk of heart disease. The good news is that you can turn this around by losing some weight.</p><p><a href = 'https://www2.hse.ie/wellbeing/how-to-eat-well.html' target = '_blank'>CLICK HERE</a> to read how to eat well</p><p><a href = 'https://www.nhs.uk/live-well/eat-well/eight-tips-for-healthy-eating/' target = '_blank'>CLICK HERE</a> for 8 tips for healthy eating</p><p><a href = 'https://www.healthline.com/nutrition/healthy-eating-tips' target = '_blank'>CLICK HERE</a> for 25 tips how to make your diet healthier.</p>";
        }

        else if (bmi >= 29.9 && bmi < 34.9) {
            detail = "You are obese.";
            $("range").value = "-0.3";
            $("theTitle").className = "alert";
            $("theTitle").innerHTML = "DANGEROUS. You are obese!";
            $("theImage").src = "images/obese-pic.jpg";
            $("theInfo").innerHTML = "<p class = 'alert'>Your BMI is in the obese category. This increases the risk of heart disease, diabetes type 2 and some cancers. You should contact your GP about loosing weight.</p><p>Not too sure how to speak to your doctor about your weight? <a href = 'https://www.safefood.net/Weigh-To-Live/Tips-for-discussing-weight-with-your-doctor' target = '_blank'>CLICK HERE</a> for some tips.</p><p class = 'alert'>Contact your GP to make sure the diet is safe to use!</p>";

        }

        else if (bmi >= 34.9) {
            detail = "You are severly obese.";
            $("range").value = "-0.35";
            $("theTitle").className = "alert";
            $("theTitle").innerHTML = "EXTREMLY DANGEROUS! YOU ARE SEVERLY OBESE!";
            $("theImage").src = "images/extremlyobese-pic.jpg";
            $("theInfo").innerHTML = "<p class = 'alert'>Your BMI is in the extreme obese category. You are in high risk of type 2 diabetes, cardiovascular disease, respiratory disease, several types of cancer, pain and musculoskeletal disorders.</p><p class = 'alert'>TAKE ACTION BEFORE IT IS TOO LATE</p><p>Not too sure how to speak to your doctor about your weight? <a href = 'https://www.safefood.net/Weigh-To-Live/Tips-for-discussing-weight-with-your-doctor' target = '_blank'>CLICK HERE</a> for some tips.</p><p class = 'alert'>Contact your GP. DO NOT WAIT!</p>";
        }

        $("bmiresult").innerHTML = "<div class='alert'> <strong>" + name + "!</strong> Your BMI is " + bmi + ". " + detail + "</div>";
        $("links").className = "alert info";
        $("links").innerHTML = "<p><a href = 'https://www.eatthis.com/easy-exercises-boost-health/' target = '_blank'>Exercises That Will Make You Feel Better</p><p><a href = 'https://www.delish.com/cooking/recipe-ideas/g3733/healthy-dinner-recipes/' target = '_blank'>Healthy Dinner Ideas</a></p><p><a href = 'https://www.theguardian.com/lifeandstyle/2008/jul/13/observerhealth.observerhealth4' target = '_blank'>All You Need To Know About Healthy Life</a></p>";

        //Basal Metabolic Rate (BMR) - SOURCE https://www.bmi-calculator.net/bmr-calculator/bmr-formula.php
        var bmr = 0;
        var lbsweight = weight * 2.205;
        var inchheight = height / 2.54;

        //Adult male: 66 + (6.3 * body weight in lbs.) + (12.9 * height in inches) - (6.8 * age in years) = BMR
        //Adult female: 655 + (4.3 * weight in lbs.) + (4.7 * height in inches) - (4.7 * age in years) = BMR
        if (sex == "male") {
            bmr = 66 + (6.3 * lbsweight) + (12.9 * inchheight) - (6.8 * age);
        }
        if (sex == "female") {
            bmr = 655 + (4.3 * lbsweight) + (4.7 * inchheight) - (4.7 * age);
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
        $("bmr").innerHTML = "<div class= 'alert info'>The total number of calories you need in order to maintain your current weight: " + calories + "kcal.</div>";
        updateSlider();

        $("extrainfo").style.visibility = "visible";

        console.log("Name: " + name + "\nAge: " + age + "\nSex: " + sex + "\nWeight: " + weight + "\tHeight: " + height + "\nActivity: " + activity);
        console.log("BMI: " + bmi);
    }
    else {
        alert("Incorrect details. Fill in all fields");
        console.log("Erorr");
    }

}

function updateSlider() {
    var value1 = $("range").value;

    var goal = $("range").value;
    var lbsgoal = goal * 2.205;
    var kcaldiff = lbsgoal * 1000;
    var final = parseFloat(calories) + parseFloat(kcaldiff);

    //if calories < 1000, show warning and dont show kg value
    if (final < 1000) {
        $('resultinfo').style = "background-color: #ff9800";
        $('resultinfo').innerHTML = "It is dangerous to eat less than 1000 kcal per day!";
    }
    else {
        $('resultinfo').style = "background-color: #2196F3";
        $('resultinfo').innerHTML = "In order to loose/gain " + value1 + " kg weekly, you must eat " + final.toFixed(0) + " kcal per day.";
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
    $("theImage").src = "images/bmi-pic.jpg";
    $("theInfo").innerHTML = "A normal BMI score falls between 18.5 and 24.9 in a range. This indicates that a person is within the normal weight range for his or her height. A BMI chart is used to categorize a person as underweight, normal, overweight, obese or extremly obese.";
    $("theTitle").className = "alert healthy";
    $("theTitle").innerHTML = "Body Mass Index";
    console.log("Fields reset.");
}