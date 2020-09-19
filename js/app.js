"use strict"
//values
let value; //значение прибавления
let deg = 0 //начальный угол
let autoPlus = 5
// let autoPlus = localStorage.getItem("autoPlus")
//selectors
const $score = document.querySelector("#score") // табло очков
const $plusTitle = document.querySelector("#plus-title") // количесвто очков прибавляемых за клик(потом будет всплывать)
const $btnMain = document.querySelector("#btn-main") //основная кнопка кликер
const $btnsPlus = document.querySelector(".app__content") // кнопки увеличивающие силу
const $refresh = document.querySelector(".app__btn-refresh") //кнопка для начала игры заново
const $price = document.querySelector(".priceInfo")

//listenrs
$btnMain.addEventListener("click", clicker) //основаня функция игры
$btnsPlus.addEventListener("click", plusser)//усиления
$btnsPlus.addEventListener("mouseover", showPrice)
$refresh.addEventListener("click", refresh) //обнуление всех данных
//functions
function clicker(){
    deg += 90 //анимация прокрутки(потом мб в отдельную функцию)
    this.children[0].style.transform = `rotateZ(${deg}deg)`
    if(deg % 360 == 0 && deg != 0){//только если круг прошел полностью то прибавляется value к очкам
        let score = $score.innerText // в этом фрагменте

        score = +score + value   // изменяется количество очков
        score = addZero(score)
        $score.innerText = score  
        localStorage.setItem("score", score) // и перезаписывается в local storage


        upPlusTitle($plusTitle)        
    }

    if($score.innerText > 100){
        const modal = new Modal({
            header:"Вы выиграли! Поздравляю!",
            text:"<span>Ваши очки: " + $score.innerText + "<span>",
            closable: true,
            id: "win-modal",
            fade: true,
            btnRefr: refresh
        })
        modal.create()
        setTimeout(modal.open.bind(modal), 300)

    }
    
}


function addZero(number){//функция для добавления нулей
    let str = String(number)
    if(str.length < 5){
        while(str.length < 5){
            str = "0" + str
        }
        return str
    }
    return str
}


function plusser(e, retr = false){
    const target = e.target
    const dataPlus = target.getAttribute("data-plus")
    let price;
    switch(dataPlus){
        case "1":
            price = 10
            break
        case "2":
            price = 19
            break
        case "3":
            price = 27
            break
        case "4":
            price = 35
            break
        case "5":
            price = 42
            break
    }
    if(retr) return price
    if(target.classList.contains("app__btn-plus") && canBuy(price)){
        value += +dataPlus
        $plusTitle.innerText = '+' + value
        $score.innerText = +addZero($score.innerText - (price))
        localStorage.setItem("value", value)
    }else{
        console.log("мало бабок");
    }
}

function canBuy(price){
    const bool = +price <= +$score.innerText
    return bool
}

function starter() {
    $score.innerText = localStorage.getItem("score") || "00000"
    value = JSON.parse(localStorage.getItem("value")) || 1
    $plusTitle.innerText = "+" + value
}
starter()

//функция для обнуления результатов
function refresh(){
    localStorage.clear()
    starter()
}

//анимация всплытия plus-title
let flagTitle = false
function upPlusTitle(node) {
    node.classList.remove("hide")
    node.classList.add("plus-show")
    setTimeout(() => {
        node.classList.add("hide")
        node.classList.remove("plus-show")
    }, 500)
    
}

//анимация показа цены
function showPrice(e){
    if(e.target.tagName == "BUTTON"){
        const price = plusser(e, true)
        $price.innerText = "Цена: " + price
    } 
    
    
}

function autoStart(){
    setInterval(function(){
        $score.innerText = addZero(+$score.innerText + +autoPlus) 
    }, 5000)
}