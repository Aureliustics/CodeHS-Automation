// ==UserScript==
// @name         CodeHS Automation
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Tampermonkey script that adds some enhancements to CodeHS
// @author       Aureliustics
// @match        https://codehs.com/*
// @icon         https://static1.codehs.com/img/logo.png
// @grant        GM_addStyle
// @grant        GM_addElement
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
   // 'use strict';

const cheatInfo = {
    version: '0.5',
    changelog: '2024-09-24: Added button, active/inactive hover colour, cheat UI prompt.'
};
let resumeButton = document.getElementsByClassName("nav-resume-full");
let youtubeButton = document.getElementsByClassName("btn btn-main-transparent youtubeOption option");
let backgroundScreen = document.getElementsByClassName("dark-screen");
let videoLoaded = document.getElementsByClassName("video-stream html5-main-video");
let getStarted = document.getElementsByClassName("btn btn-main btn-lg start-ex-button js-lets-go");
let navBar = document.getElementsByClassName("collapse navbar-collapse");
let node = navBar[0];

console.log("Cheat Menu Debug: ");
console.log(node);
let btn = Object.assign(document.createElement("button"), { className: 'nav navbar-nav navbar-left'});
if (node !== "undefined" && btn !== "undefined"){ // Fixes the "Cannot read properties of undefined (reading 'insertBefore')" issue.
    node.insertBefore(btn, node.childNodes[0]);
}


function checkForScreen(){
    if (backgroundScreen){
        while(backgroundScreen.length > 0) { // Puts it in a loop so it keeps deleting
            backgroundScreen[0].parentNode.removeChild(backgroundScreen[0]);
        }
    }
}
setInterval(checkForScreen, 1000);

// Styling
btn.innerHTML = "  Cheat Menu";
btn.style = "position: absolute";
btn.style = "margin-left: auto";
btn.style.height = '60px';
btn.style.width = '110px';
btn.style.border = 'none';
btn.style.fontWeight = 'bold';
btn.style.fontSize = '11.5px';
btn.style.background = 'none';

// Mouse active/inactive colour
btn.addEventListener("mouseenter", function( event ) {
    event.target.style.background = "#20a6df";
  }, false);
  btn.addEventListener("mouseleave", function( event ) {
    event.target.style.background = "white";
  }, false);
//
let css = `
    .nav navbar-nav navbar-left {
        position: absolute;
        margin-left: auto;
        height: 60px;
        border: none;
        fontWeight: bold;
        fontSize: 11px;
        background: none;
    }
`;
// Add button styling
function appendCSS(){
if (typeof GM_addStyle !== "undefined") {
  GM_addStyle(css);
} else {
  let styleNode = document.createElement("style");
  styleNode.appendChild(document.createTextNode(css));
  (document.querySelector("head") || document.documentElement).appendChild(styleNode);
}
}

window.addEventListener('load', function() {
    appendCSS();
}, false);

// Cheat functionality
function sleepFunc(milliseconds) { // DIY sleep function
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

window.addEventListener('load', function() {
    var toggleVal = GM_getValue("toggle", false);

    function addTime(){
        var seconds = GM_getValue("time", 0);
        GM_setValue("time", seconds + 1);
        console.log("[Automation]: " + seconds + "s Elapsed");
    }

var welcomeText = 'Welcome to Aureliustics\'s CodeHS cheat | Version: ' + cheatInfo.version + '!\nPlease select an option below:\n1) Autocomplete lesson\n2) Disable autocomplete\n3) Changelogs\n4) Credits';
function initUI(){
    let option = prompt(welcomeText);
    if (option == '1') {
        alert("Press ; to disable automation.");
        Autocomplete();
    ///////////////////////////////////////////////////
    } else if (option == '2') {
        GM_setValue("toggle", false);
        alert("Stopped automation after: " + seconds);
        sleepFunc(2500).then(() => { window.location.reload(); });
    //////////////////////////////////////////////////
    } else if (option == '3') {
        alert(cheatInfo.changelog);
        console.log(cheatInfo.changelog);
    } else if (option == '4') {
        alert("Developed by @Aureliustics");
    }
    //////////////////////////////////////////////////
    if (option === "" || option === null) {
        alert('Invalid option.');
    }
}

btn.onclick = () => {
    initUI();
}

console.log("Automation enabled: " + toggleVal); // For debug purposes
/*
if (toggleVal == true){
    Autocomplete();
}
*/
function Autocomplete(){
    GM_setValue("toggle", true); // Change to true and false to control for now
    alert("Successfully activated! Press enter or \"OK\" to start.");
    setInterval(addTime, 1000);
    if (resumeButton) {
        resumeButton[0].click();
    }
    if (youtubeButton) {
        youtubeButton[0].click();
    }
    if (videoLoaded) {
        var e = $.Event("keypress");
        e.which = 39; // Keycode for right arrow
        for (let i = 0; i < 30; i++){
            $('item').trigger(e);
            console.log("triggered right arrow");
        }
    }
    if (getStarted){
        getStarted[0].click();
    }
} // Func autocomplete
}, false); // Wait for window load

document.onkeydown = function(e){
    e = e || window.event;
    var key = e.which || e.keyCode;
    if(key===186){ // Keycode for semi colon
        GM_setValue("toggle", false);
        alert("Disabled Autocomplete Successfully.")
        sleepFunc(2500).then(() => { window.location.reload(); });
    }
};
})();