/*
// Course: WEB222
// Name: Alan Vuong
// Student ID: avuong19
// Student Number: 149004178
// Date: July 18th, 2018
*/

window.onload = function() {
    var inputs = document.getElementsByTagName("input");
    for (var num = 0; num < inputs.length; num++) {
        if (inputs[num].required && inputs[num].type != "password") {
            inputs[num].addEventListener("focus", validateInput);
            inputs[num].addEventListener("input", validateInput);
        }
    }
}

// This function validates the password, as well as the confirm password fields.
// Password must be 8 characters long, must start with a character, 
// must have at least 1 digit and 1 uppercase.
function validatePassword() {
    //localStorage.setItem("FirstName", "asdf");
    //alert(localStorage.getItem("FirstName"));
    // Individual variables holding all requirements for this password
    var valid = false;

    // Initialize boolean values for each check that password needs to pass
    var minLength = 8;
    var boolLength = false;
    var boolCharStart = false;
    var boolDigit = false;
    var boolUpper = false;
    var boolMatch = false;

    // Acquire values in the password fields
    var input = document.signup.Confirm.value;
    var input2 = document.signup.Confirm2.value;
    
    // Set up variables for character checks
    var firstCharUpper = input.charAt(0).toUpperCase();
    var charInc;

    var pass1 = document.querySelector("#sidePanelContent");

    // Length check
    if (input.length >= minLength) { boolLength = true; }

    // First character check
    if (firstCharUpper >= "A" && firstCharUpper <= "Z") { boolCharStart = true; }

    // Number and upper character checks
    for (charPos = 0; charPos <= input.length; charPos++) {
        charInc = input.charAt(charPos);
        // Check if character is a digit
        if (parseInt(charInc) == charInc) { boolDigit = true; }
        // Else, check if character is an uppercase letter
        else if (charInc >= "A" && charInc <= "Z") { boolUpper = true; }
        
        // Stop loop early if digit and uppercase are already confirmed to save on processing time
        if (boolDigit && boolUpper) { break; }
    }

    // Matching passwords check
    if (input === input2) { boolMatch = true; }

    // Print out all password check statuses in side-panel
    pass1.innerHTML = "Password must be at least eight characters long: " + passCheck(boolLength) + "<br />";
    pass1.innerHTML += "Password must start with a character: " + passCheck(boolCharStart) + "<br />";
    pass1.innerHTML += "Password must have at least one digit: " + passCheck(boolDigit) + "<br />";
    pass1.innerHTML += "Password must have at least one uppercase: " + passCheck(boolUpper) + "<br />";
    pass1.innerHTML += "Password and Confirm Password values must be the same: " + passCheck(boolMatch);

    // Password validation is only valid if all five criteria are met
    if (boolLength && boolCharStart && boolDigit && boolUpper && boolMatch) {
        valid = true;
        document.signup.Confirm.style.backgroundColor = "white";
        document.signup.Confirm2.style.backgroundColor = "white";
    }
    else {
        document.signup.Confirm.style.backgroundColor = "#FFCCCC";
        document.signup.Confirm2.style.backgroundColor = "#FFCCCC";
    }

    return valid;
}

// Generic validation function that displays appropriate messages in side panel
function validateInput() {
    var message = document.getElementById("sidePanelContent");

    // Built-in Javascript function to see if input field matches criteria
    if (!this.checkValidity()) {
        message.innerHTML = this.validationMessage;
    }
    else {
        message.innerHTML = "";
    }
}

// Mini helper function that returns a checkmark or X for passing a check
function passCheck(bool) {
    return (bool ? "✔️" : "❌");
}

// Function to automatically fill all fields with valid information
// Used for testing and hopefully to ease marking efforts for the prof
function populateFields() {
    // Create a dictionary with form IDs as keys
    var placeholders = {
        txtFirstName: "Thirst",
        txtLastName: "Laste",
        txtUnit: 420,
        txtStreetNo: 70,
        txtStreetName: "The Pond Rd",
        txtCity: "North York",
        txtProvince: "ON",
        txtPostal: "M3J3M6",
        txtPhone: "416-491-5050",
        txtEmail: "thirstlaste@myseneca.ca",
        txtUsername: "YouzerNeighm",
        txtConfirm: "S3cur1ty",
        txtConfirm2: "S3cur1ty"
    };
    // Iterate through dictionary and place appropriate values in fields
    for (num in placeholders) {
        document.getElementById(num).value = (eval("placeholders." + num));
    }
    validatePassword();
}