"use-strict"
let a = 0;
let todoList = [];
let madeList = [];
let text = '';

function showTasks() {
    document.getElementById('todoTask').innerHTML = ' ';
    let visibleText = document.getElementById('todoTask');
    todoList = JSON.parse(localStorage.getItem('tasks'));   //nacitavanie uloh z localStorage
    console.log(todoList)
    i=0;
    if (todoList !== null)  {
        for (let todo of todoList){
            let lbl = document.createElement('li');
            lbl.setAttribute('onclick', "deleteTask(this)"); //vložím do elementu <li> funkicu onclick na mazanie hotovej ulohy
            let P = document.createElement('p');
            let icon = document.createElement('i');
            icon.setAttribute('class','far fa-check-square');
            lbl.setAttribute('id', i);
            let txt  = document.createTextNode(todo); //vypisuje spolu do zoznamu uloh
            lbl.appendChild(icon);
            lbl.appendChild(txt);
            visibleText.appendChild(lbl);
            i++;
        }
        a = todoList.length;
        a === 1 ? document.getElementById('todoAmount').innerHTML = a + ' ' + 'úloha ostáva':
        a > 1 && a <= 4 ? document.getElementById('todoAmount').innerHTML = a + ' ' + 'úlohy ostávajú':
        a >= 5 ? document.getElementById('todoAmount').innerHTML = a + ' ' + 'úloh ostáva':
        a.className += "amount";
    }
    if (a === 0) {
        document.getElementById('todoTask').innerHTML = '';
        document.getElementById('todoAmount').innerHTML = '';
    }
    let text = '';
}

function addTask(){
    todoList = JSON.parse(localStorage.getItem('tasks')); 
    console.log(todoList);
    let text = document.getElementById('inputText').value;
    console.log(text);  
    if (text === ''){
        alert("Je potrebné vložiť úlohu");
    } else {
        if (todoList === null){
            todoList = [];
        }
        todoList.push(text); 
    }  
    console.log(todoList);
    localStorage.setItem('tasks',JSON.stringify(todoList));//ukladanie uloh do localStorage
    document.getElementById("inputText").value = "";
    showTasks();
}

function deleteTask(e) {
    let m = e.getAttribute("id");
    // console.log(`klikol som na ulohu s indexom ${m}`);
    let todoList = JSON.parse(localStorage.getItem('tasks'));
    console.log(`klik bol na ulohu "${todoList[m]}" s indexom ${m}`);
    madeList = madeList.concat(todoList[m]) //k madeListu pridam list
    todoList.splice(m,1);
    console.log('vypisujem todoList po kliknuti na vymaz', todoList);
    localStorage.setItem('tasks',JSON.stringify(todoList));
    localStorage.setItem('made',JSON.stringify(madeList));
    showTasks();
    showDone();
}

function moveTasks() {
    madeList = JSON.parse(localStorage.getItem('made')); 
    if (madeList === null){
        madeList = [];
    }
    if (madeList !== null ){
        madeList = madeList.concat(todoList) //k madeListu pridam list
        console.log('pripocitalo tieto hotove ulohy' ,madeList);
        localStorage.removeItem('tasks');
        console.log(todoList);
        todoList = [];
        localStorage.setItem('tasks',JSON.stringify(todoList));//ukladanie uloh do localStorage  
        localStorage.setItem('made',JSON.stringify(madeList));//ukladanie uloh do localStorage   
    }
    showTasks();
    showDone();
}

function showDone() {
    document.getElementById('doneTask').innerHTML = '';
    let complete = document.getElementById('doneTask');
    madeList = JSON.parse(localStorage.getItem('made')); 
    i=0;
    if (madeList !== null){ 
        for(let made of madeList) {
            let madeLbl = document.createElement('li');
            let madeP = document.createElement('p');
            // madeLbl.setAttribute('value', made);
            madeLbl.setAttribute('onclick', "deleteDone(this)"); //vložím do elementu <li> funkicu onclick na mazanie hotovej ulohy
            let icon = document.createElement('i');
            icon.setAttribute('class','fas fa-trash-alt');      
            madeLbl.setAttribute('id', i);
            // icon.setAttribute('onclick',`deleteDone(${i})`); 
            madeP.appendChild(document.createTextNode(made));
            // madeLbl.appendChild(document.createTextNode(made)); //vypisuje spolu ale do hotovych uloh
            complete.appendChild(madeLbl);
            madeLbl.appendChild(madeP);
            madeLbl.appendChild(icon);  
            i++;
            // console.log('vypisujem hotova' , made);
        } 
    }
    else {
        document.getElementById('doneTask').innerHTML = ''; 
    }    
}  
function deleteDone(e) {
    // let mList = [];
    let m = e.getAttribute("id");
    // console.log(`klikol som na ulohu s indexom ${m}`);
    let madeList = JSON.parse(localStorage.getItem('made'));
    console.log(`klik bol na ulohu "${madeList[m]}" s indexom ${m}`);
    madeList.splice(m,1);
    console.log('vypisujem madeList po kliknuti na vymaz', madeList);
    localStorage.setItem('made',JSON.stringify(madeList));
    showDone();
}

function removeDone() {
    if (madeList === null){
        madeList = [];
    }
    if (madeList !== null ){
        localStorage.removeItem('made');
        madeList = [];
        console.log(madeList);
        localStorage.setItem('made',JSON.stringify(madeList));//ukladanie uloh do localStorage   
    }
    showTasks();
    showDone();
}

showTasks();
showDone();
