import "./sha1.js";

let submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', checkBreach);

function checkBreach() {
    let pass = document.getElementById("password").value;
    
    if (pass == "" || pass[0] == " ") {
        document.getElementById("result").innerHTML = "Please enter a proper password (Value must not be empty or begin with a space).";
    }
    else{
        document.getElementById("result").innerHTML = "";
        document.getElementById('loading').style.display = "block";
        let sha = sha1(pass).toUpperCase();
        let prefix = sha.substring(0, 5);
        var suffix = sha.substring(5, sha.length);
        
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            document.getElementById('loading').style.display = "none";
        var hashes = this.responseText.split('\n');
        var breached = false;
        for (let i = 0; i < hashes.length; i++) {
            var hash = hashes[i];
            var h = hash.split(':');

            if (h[0] === suffix) {
                document.getElementById("result").innerHTML = "The password has been breached " + h[1] + " times.";
                breached = true;
                break;
            }
        }
        if (!breached) {
            document.getElementById("result").innerHTML = "The password entered is secure!";

        }
    }
    xhttp.open("GET", 'https://api.pwnedpasswords.com/range/' + prefix, true);
    xhttp.send();
}
        
}
