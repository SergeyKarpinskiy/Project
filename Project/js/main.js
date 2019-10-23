'use strict';

let Buttons = document.getElementsByTagName("button"),
AllItems = Buttons[0],
DelTabl = Buttons[1],
AddItem = Buttons[2],
EditItem = Buttons[3],
DelItem = Buttons[4],
TBody = document.getElementsByTagName("Tbody")[0],
TR = document.getElementsByTagName("tr")[1],
IDValue = document.getElementsByClassName("ID")[0],
NameValue = document.getElementsByClassName("Name")[0],
CostValue = document.getElementsByClassName("Cost")[0];



var cryptoStor = new Uint16Array(1);
let ID;
let Name;
let Cost;



let massitem = [];
AddElemnts(massitem);

AllItems.addEventListener('click',function()
{
    if(document.getElementsByTagName('tr')[1]==null)
    {
        for ( let i = 0; i<massitem.length; i++)
        {
            let Tr = document.createElement("tr");
            var Th = document.createElement('th');
            var Td = document.createElement('td');
            var Td1 = document.createElement('td');
            TBody.appendChild(Tr);
            var script = document.getElementsByTagName('tr')[i+1];
            script.appendChild(Th); Th.textContent = massitem[i].id; Th.scope = "row";
            script.appendChild(Td);Td.textContent = massitem[i].name;
            script.appendChild(Td1); Td1.textContent = massitem[i].cost;
        }
    }
    else 
    {
    }
    AllItems.hidden = true;
});
DelTabl.addEventListener ('click', function()
{
    for(let i = 0; i<=massitem.length; i++)
    { 
        let a = document.getElementsByTagName('tr')[1];
        if (a!=null) 
        {
            a.remove();
        }
    else {}
    }
    AllItems.hidden = false;
    DelItem.hidden = false; 
});
function AddElemnts(massitem)
{
    for (var i=0; i < localStorage.length; i++) 
    {
        let item = new Object();
        item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        massitem.unshift(item);
    }
};
function getRandomInt() 
{
    return Math.random();
};
function Validation(name, cost)
{
    if(!/[0-9]/.test(name) && !/[a-zA-Z]/.test(cost)) 
    {
        for (let key of massitem)
        {
            if (name==key.name)
            {
                alert("Такое имя уже занято!");
                return false;
            }
        }
        return true;
    }
    alert("Некоректно заполненны поля!");
};
AddItem.addEventListener('click', function()
{
    let Ans =  supports_html5_storage();
    if (Ans==true)
    {
        if(NameValue.value == "" || CostValue.value == "")
        {
            alert("Пожалуйста, заполните поле Name и Cost!");
        }
        else 
        {
            if ( Validation(NameValue.value, CostValue.value))
            {
            window.crypto.getRandomValues(cryptoStor);
            for (let i = 0; i<massitem.length; i++)
            {
                do
                {
                    window.crypto.getRandomValues(cryptoStor);
                }
                    while(cryptoStor[0] == massitem[i].id)
            }
            Name = NameValue.value;
            Cost = CostValue.value;
            ID = cryptoStor[0];
            let item = new Object();
            item.id = ID;
            item.name = Name,
            item.cost = Cost;
            massitem.unshift(item);
            localStorage.setItem(Name, JSON.stringify(item));
            }
        }
    }
    else
    {
        alert("Ваш браузер не поддерживает локальное сохранение данных!");
    }
});
EditItem.addEventListener('click', function()
{
   if (IDValue.value == "")
    {
        alert("Пожалуйста, заполните поле ID!");
    }
    else {
        for (let i = 0; i<massitem.length; i++)
        {
            if (IDValue.value == massitem[i].id)
            {
                let item = new Object();
                for (let key of massitem)
                {
                    if (key.id == IDValue.value)
                    {
                        item = JSON.parse(localStorage.getItem(key.name));
                    }
                }
                localStorage.removeItem(item.name);
                item.name = NameValue.value;
                item.cost = CostValue.value;
                localStorage.setItem(item.name, JSON.stringify(item));
                massitem[i].name = NameValue.value;
                massitem[i].cost = CostValue.value;
            }
            else 
            {
                
            }
        }
    }
});
DelItem.addEventListener ('click', function()
{
    if (IDValue.value == "")
    {
        alert("Пожалуйста, заполните поле ID!");
    }
    else 
    {
        for (let key of massitem)
        {
            if (key.id == IDValue.value) 
            {
               localStorage.removeItem(key.name);
               massitem.splice(massitem.indexOf(key,0),1);
            } 
            else 
            {}
        }
        DelItem.hidden = true;        
    }
});
function supports_html5_storage() 
{
    try 
    {
      return 'localStorage' in window && window['localStorage'] !== null;
    } 
    catch (e) 
    {
      return false;
    }
}

let Item = {
    id : ID,
    name: Name,
    cost: Cost
};


