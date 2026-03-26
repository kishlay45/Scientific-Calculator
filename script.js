let display = document.getElementById("display");

let displayExp = "";
let actualExp = "";
let memory = 0;

function update(){
display.innerText = displayExp || "0";
}

function calculate(){
try{
let result = eval(actualExp);

// 🔥 FIX FLOATING ERRORS (cos90, sin180, etc.)
if (Math.abs(result) < 1e-10) {
    result = 0;
}

// limit decimal places
if (typeof result === "number" && !Number.isInteger(result)) {
    result = parseFloat(result.toFixed(10));
}

displayExp = String(result);
actualExp = String(result);
update();

}catch{
display.innerText = "Error";
displayExp = "";
actualExp = "";
}
}

function factorial(n){
if(n < 0 || !Number.isInteger(n)) return "Error";
let f = 1;
for(let i = 2; i <= n; i++) f *= i;
return f;
}

document.querySelectorAll("button").forEach(btn=>{
btn.onclick = function(){

let val = this.innerText;

// NUMBERS
if(this.classList.contains("btn-num")){
displayExp += val;
actualExp += val;
}

// OPERATORS
else if(this.classList.contains("btn-op")){

if(val === "^"){
displayExp += "^";
actualExp += "**";
}else{
displayExp += val;
actualExp += val;
}

}

// CLEAR
else if(this.classList.contains("btn-clear")){
if(val === "C"){
displayExp = "";
actualExp = "";
}else{
displayExp = displayExp.slice(0,-1);
actualExp = actualExp.slice(0,-1);
}
}

// EQUAL
else if(this.classList.contains("btn-equal")){
calculate();
return;
}

// FUNCTIONS
else if(this.classList.contains("btn-func")){

switch(val){

// 🔥 DEGREE TRIG
case "sin":
displayExp += "sin(";
actualExp += "Math.sin((Math.PI/180)*";
break;

case "cos":
displayExp += "cos(";
actualExp += "Math.cos((Math.PI/180)*";
break;

case "tan":
displayExp += "tan(";
actualExp += "Math.tan((Math.PI/180)*";
break;

case "log":
displayExp += "log(";
actualExp += "Math.log10(";
break;

case "√":
displayExp += "√(";
actualExp += "Math.sqrt(";
break;

case "(":
case ")":
displayExp += val;
actualExp += val;
break;

case "π":
displayExp += "π";
actualExp += "Math.PI";
break;

case "exp":
displayExp += "exp(";
actualExp += "Math.exp(";
break;

case "x²":
displayExp += "²";
actualExp += "**2";
break;

// FACTORIAL
case "n!":
try{
let v = eval(actualExp);
let f = factorial(v);
displayExp = String(f);
actualExp = String(f);
}catch{
displayExp = "Error";
actualExp = "";
}
break;

// POL (degree)
case "Pol":
let r = parseFloat(prompt("Enter r:"));
let t = parseFloat(prompt("Enter θ (degree):"));
if(!isNaN(r) && !isNaN(t)){
let x = r * Math.cos((Math.PI/180)*t);
displayExp = x.toFixed(4);
actualExp = displayExp;
}
break;

// REC
case "Rec":
let x1 = parseFloat(prompt("Enter x:"));
let y1 = parseFloat(prompt("Enter y:"));
if(!isNaN(x1) && !isNaN(y1)){
let r1 = Math.sqrt(x1*x1 + y1*y1);
displayExp = r1.toFixed(4);
actualExp = displayExp;
}
break;

// MEMORY
case "M+":
try{ memory = eval(actualExp); }catch{}
break;

case "M-":
displayExp = String(memory);
actualExp = String(memory);
break;

}

}

update();
};
});

update();