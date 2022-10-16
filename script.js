setInterval(inputIsempty, 500)


const textContainer = document.getElementById('text-container');
const inputText =  document.getElementById('expression');
const inputAfter = document.getElementById('input-after');
const letters = document.getElementsByClassName("lt");
const matches = document.getElementById("matches")
var exp = inputText.value;
var flags = []
var regex;

for (var i = 0; i < letters.length; i++) {
    letters[i].addEventListener('click', toggleDropdown, false);
}


inputText.addEventListener('input', function(event){    
        highlightText();
});

inputText.addEventListener('keypress', function(e){    
    if (e.key === 'Enter') 
        highlightText();
});

function inputIsempty()
{
    if(inputText.value == '')
        matches.innerHTML = `No match`;
}

textContainer.addEventListener('click', function(){
    removeElementsByClass('rainbow');
    matches.innerHTML = `No match`;

});

document.querySelector('[contenteditable]').addEventListener('paste', function (e) {
    e.preventDefault();
    var text = '';
    if (e.clipboardData || e.originalEvent.clipboardData) {
      text = (e.originalEvent || e).clipboardData.getData('text/plain');
    } else if (window.clipboardData) {
      text = window.clipboardData.getData('Text');
    }
    if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, text);
    } else {
      document.execCommand('paste', false, text);
    }
});

inputText.addEventListener('input', function(){
 resizeInput();
});

function resizeInput(){
    exp = inputText.value;
    if(exp.length >=1  )
        inputText.style.width = `${exp.length       + 0.5}ch`;
    else
        inputText.style.width = `${1}ch`;
}

resizeInput();
highlightText();

function toggleDropdown(){
    if (itemsCkBox.classList.contains('visible'))
    itemsCkBox.classList.remove('visible');
else
    itemsCkBox.classList.add('visible');
}
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].classList.remove(className)
    }
}

function highlightText(){
    removeElementsByClass('rainbow');
    exp = inputText.value;
    if(exp != '')
    {
    exp = '(' + exp + ')' ;
    try {
        regex = new RegExp(exp, flags.join('').replace(/\s+/g, ''));
        replaceText(document.body);
      }
      catch(err) {
        console.log("Invalid Regex")
      }
    }

}
function replaceText()
{   let textMatch = ((textContainer || '').textContent.match(regex) || []), lg;
    lg = textMatch.length;
    if(document.getElementById("global").checked === false)
    {   
        lg--;
    }
    if(textMatch.length)
        {  
         textContainer.innerHTML = textContainer.innerText.replace(regex, '<span class="rainbow">$1</span>').replace(/(?:\r\n|\r|\n)/g, '<br>'); 
         console.log(textContainer.innerText)
         if(lg > 1)
            matches.innerHTML = `${lg} matches`;
         else
            matches.innerHTML = `1 match`;
        }
    else 
        matches.innerHTML = `No match`;
}

var globalCkBox = document.getElementById('global')

globalCkBox.addEventListener( 'change', function() {
    if(this.checked) {
        flags[0] ='g';
        document.getElementById('g').style.display = "block";
    } else {
        flags[0] = ' ';
        document.getElementById('g').style.display = "none";
    }
    highlightText();    
});

var caseInsensCkBox = document.getElementById('case-insensitive')

caseInsensCkBox.addEventListener( 'change', function() {
    if(this.checked) {
        flags[1] ='i';
        document.getElementById('i').style.display = "block";
    } else {
        flags[1] = ' ';
        document.getElementById('i').style.display = "none";
    }
    highlightText();
});

var multilineCkBox = document.getElementById('multiline')

multilineCkBox.addEventListener( 'change', function() {
    if(this.checked) {
        flags[2] ='m';
        document.getElementById('m').style.display = "block";
    } else {
        flags[2] = ' ';
        document.getElementById('m').style.display = "none";
    }
    highlightText();
});


var singlelineCkBox = document.getElementById('singleline')

singlelineCkBox.addEventListener( 'change', function() {
    if(this.checked) {
        flags[3] ='s';
        document.getElementById('s').style.display = "block";
    } else {
        flags[3] = ' ';
        document.getElementById('s').style.display = "none";
    }
    highlightText();
});

var unicodeCkBox = document.getElementById('unicode')

unicodeCkBox.addEventListener( 'change', function() {
    if(this.checked) {
        flags[4] ='u';
        document.getElementById('u').style.display = "block";
    } else {
        flags[4] = ' ';
        document.getElementById('u').style.display = "none";
    }
    highlightText();
});

var stickyCkBox = document.getElementById('sticky')

stickyCkBox.addEventListener( 'change', function() {
    if(this.checked) {
        flags[5] ='y';
        document.getElementById('y').style.display = "block";
    } else {
        flags[5] = ' ';
        document.getElementById('y').style.display = "none";
    }
    highlightText();
});

const anchorCkBox = document.getElementById('anchor');
const itemsCkBox = document.getElementById('items');

anchorCkBox.addEventListener('click', function(){
   toggleDropdown();
});

var infoBarStart = document.getElementById('info-bar-start');
var infoBarEnd = document.getElementById('info-bar-end');
var infoGlobal = document.getElementById('info-global');
var infoInsensCase = document.getElementById('info-case-insensitive');
var infoMultiline = document.getElementById('info-multiline');
var infoSingleLine = document.getElementById('info-single-line');
var infoUnicode = document.getElementById('info-unicode');
var infoSicky = document.getElementById('info-sticky');

document.getElementById('bar-start').onmousemove = function(e){
    updateInfoPosition(e, infoBarStart);
}

document.getElementById('bar-start').onmouseleave = function(){
    infoBarStart.style.display = 'none';
}

document.getElementById('bar-end').onmousemove = function(e){
    updateInfoPosition(e, infoBarEnd);
}

document.getElementById('bar-end').onmouseleave = function(){
    infoBarEnd.style.display = 'none';
}


document.getElementById('g').onmousemove = function(e){
    updateInfoPosition(e, infoGlobal);
}

document.getElementById('g').onmouseleave = function(){
    infoGlobal.style.display = 'none';
}

document.getElementById('i').onmousemove = function(e){
    updateInfoPosition(e, infoInsensCase);
}

document.getElementById('i').onmouseleave = function(){
    infoInsensCase.style.display = 'none';
}

document.getElementById('m').onmousemove = function(e){
    updateInfoPosition(e, infoMultiline);
}

document.getElementById('m').onmouseleave = function(){
    infoMultiline.style.display = 'none';
}

document.getElementById('s').onmousemove = function(e){
    updateInfoPosition(e, infoSingleLine);
}

document.getElementById('s').onmouseleave = function(){
    infoSingleLine.style.display = 'none';
}

document.getElementById('u').onmousemove = function(e){
    updateInfoPosition(e, infoUnicode);
}

document.getElementById('u').onmouseleave = function(){
    infoUnicode.style.display = 'none';
}

document.getElementById('y').onmousemove = function(e){
    updateInfoPosition(e, infoSicky);
}

document.getElementById('y').onmouseleave = function(){
    infoSicky.style.display = 'none';
}

function updateInfoPosition(e, infoObject)
{
    infoObject.style.display = 'block';
    var x = e.clientX,
    y = e.clientY;
    infoObject.style.top = (y + 20) + 'px';
    infoObject.style.left = (x + 20) + 'px';

}

const cheatSheetButton = document.getElementById('cheatsheet-button');
const cheatSheetContent = document.getElementById('cheatsheet-content');
const cheatExit = document.getElementById('cheatsheet-exit');

cheatSheetButton.addEventListener('click', function(){
    if(cheatSheetContent.style.display != 'none')
        cheatSheetContent.style.display = 'none';
    else 
        {
            cheatSheetContent.style.display = 'flex';
            cheatSheetButton.style.display = 'none';

        }
});

cheatExit.addEventListener('click', function(){

    cheatSheetButton.style.display = 'block';
    cheatSheetContent.style.display = 'none';
});