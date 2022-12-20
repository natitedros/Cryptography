function encrypt(key, plaintext, algorithm) {
    let output = "";

    switch (algorithm.value) {
        case "AES":
            output = CryptoJS.AES.encrypt(plaintext, key)
            break
        case "3DES":
            output = CryptoJS.TripleDES.encrypt(plaintext, key)
            break
        case "OTP":
            output = otp(plaintext, key, "encrypt", true);
            
            break
        default:
            console.log("No crypto selected")
            output = "No crypto selected"
    }
    

    document.getElementById("result").innerHTML = output
}

function decrypt(key, cyphertext, algorithm) {
    let output = "";

    switch (algorithm.value) {
        case "AES":
            output = CryptoJS.AES.decrypt(cyphertext, key).toString(CryptoJS.enc.Utf8)
            break
        case "3DES":
            output = CryptoJS.TripleDES.decrypt(cyphertext, key).toString(CryptoJS.enc.Utf8)
            break
        case "OTP":
            output = otp(cyphertext, key, "decrypt", true);
            break
        default:
            console.log("No crypt option selected")
            output = "No crypt option selected"
    }
    
    if (output === "")
        output = "Wrong key"

    document.getElementById("result").innerHTML = output
}

let copyOutput = document.getElementById("copy")

copyOutput.addEventListener("click", () => {
    let copyText = document.getElementById('result')
    navigator.clipboard.writeText(copyText.innerHTML)
    
    copyOutput.innerHTML = "Copied!"
    copyOutput.disabled = true
})

let paste = document.getElementById("paste")
paste.addEventListener("click", async () => {
    let pasteText = await navigator.clipboard.readText()
    document.getElementById("text").value = pasteText
})

let submitButton = document.getElementById("submit")

let crypt = document.getElementById("crypt")

//Change event that detects change and uses the 
//new choice of encrypt or decrypt as a label of the button
crypt.addEventListener("change", function(event) {
    let newLabel = document.getElementById("crypt").value
    submitButton.innerText = newLabel
})

let cryptForm = document.getElementById('cryptForm')

cryptForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    let key = document.getElementById("key").value
    let text = document.getElementById("text").value
    let algorithm = document.getElementById("algorithm")

    if (crypt.value == 'Encrypt'){
        encrypt(key, text, algorithm)
    }
    else if (crypt.value == "Decrypt"){
        decrypt(key, text, algorithm)
    }

    copyOutput.innerHTML = 'Copy'
    copyOutput.disabled = false
})