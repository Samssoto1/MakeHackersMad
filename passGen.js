function generatePassword(event){
    event.preventDefault()
    checkboxNums = document.getElementById('checkboxNums').checked
    checkboxChar = document.getElementById('checkboxChar').checked
    checkboxCaps = document.getElementById('checkboxCaps').checked
    includeNums = document.getElementById('includeNums').value
    api="https://passwordinator.herokuapp.com/generate"
// Format = fetch('https://passwordinator.herokuapp.com/generate?num=true&char=true&caps=true&len=14')

    if (includeNums < 20 && includeNums > 1){

        if (checkboxNums == true || checkboxChar == true || checkboxCaps == true || includeNums != "")
        {
            api+='?'
    
            if (checkboxNums){
                //api = addAndSymbolIfNecessary(api)
                api +="num=true"
                console.log(`api = ${api}`)
            }
    
            if (checkboxChar){
                api = addAndSymbolIfNecessary(api)
                api +="char=true"
                console.log(`api = ${api}`)
            }
    
            if (checkboxCaps){
                api = addAndSymbolIfNecessary(api)
                api +="caps=true"
                console.log(`api = ${api}`)
            }
    
            if (includeNums != ""){
                api = addAndSymbolIfNecessary(api)
                api +=`len=${includeNums}`
                console.log(`api = ${api}`)
            }
    
        }
        document.getElementById("passwordBox").style.visibility = "hidden"
        document.getElementById("passwordOutput").style.visibility = "hidden"
        document.getElementById("passwordLabel").style.visibility = 'hidden'
        document.getElementById("passwordLabel").innerText = "Generated Password: "
        document.getElementById("copyBtn").style.visibility = 'hidden'
        document.getElementById('loading').style.display = "block"
        fetchPasswordApi();
    }
    else{
        document.getElementById("passwordBox").style.visibility = "visible"
        //document.getElementById("passwordLabel").style.display = "none"
        document.getElementById("passwordLabel").innerText = "Please specify a password length between 1 and 20"
        document.getElementById("passwordOutput").innerText = ""
    }
}

function addAndSymbolIfNecessary(api){
    // IS THIS REALLY NECESSARY IF IT DOESN'T MATTER IF ONE AND ONLY ONE QUERY STRING IS IN THE API? Example:( /generate?num=true vs /generate?&num=true has the same result)
    if (api.charAt(-1) != '?'){
        api +="&"
        return api
    }
}

function copy(){
    var textToCopy = document.getElementById('passwordOutput').textContent;
    const textArea = document.createElement('textarea');
    textArea.textContent = textToCopy;
    document.body.append(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy")
}

async function fetchPasswordApi() {
    try{
        response = await fetch(api);
        responseJson = await response.json()
        document.getElementById('loading').style.display = "none";
        document.getElementById("passwordOutput").innerText = `${responseJson.data}`
        document.getElementById("passwordOutput").style.visibility = "visible"
        document.getElementById("passwordBox").style.visibility = "visible"
        document.getElementById('passwordBox').classList.add('passwordBox')
        document.getElementById("copyBtn").style.visibility = 'visible'
        document.getElementById("passwordLabel").style.visibility = 'visible'
    }
    catch{
        alert('failed')
    }
}