const notp = require('notp');
const base32 = require('thirty-two');

/*
var key = "1234567890";
var token = "321";

var totp = notp.totp.gen(key);
console.log(totp);

setInterval(()=>{
    var totp = notp.totp.gen(key);
    console.log(totp);
}, 1000 * 5)
*/

var currentTimeout;
var refreshInterval;

function formSubmit(){
    console.log("Form Submitted");

    var secretInput = document.querySelector('#secretInput');
    var secret = secretInput.value;

    if(secret != ""){
        clearTimeout(currentTimeout);
        timeout(secret);
    }
}

function timeout(secret){
    clearInterval(refreshInterval);

    setToken(secret);

    refreshInterval = setInterval(() => {
        var refreshElement = document.querySelector('#refreshTime');

        refreshElement.innerHTML = getTimeoutTime();
    }, 1000);

    currentTimeout = setTimeout(() => {
        setToken(secret);
        timeout(secret);
    }, 1000 * getTimeoutTime());
}

function setToken(secret){
    var token = notp.totp.gen(secret);
    var tokenElement = document.querySelector('#token');

    token = token.replace(/(\d{3})/g, '$1 ').replace(/(^\s+|\s+$)/,'');

    tokenElement.innerHTML = token;
}

function getTimeoutTime(){
    var d = new Date();
    if(d.getSeconds() >= 30){
        return 60 - d.getSeconds();
    }else{
        return 30 - d.getSeconds();
    }
}

function clearAll(){
    console.log("CLEAR");
    
    clearTimeout(currentTimeout);
    clearInterval(refreshInterval);
    document.querySelector('#secretInput').value = "";
    document.querySelector('#refreshTime').innerHTML = "X";
    document.querySelector('#token').innerHTML = "000 000";
}