//grab elements from the document
const titleScreen = document.querySelector("header")
const startEasyGame = document.getElementById("start-ez-game")
const startRegularGame = document.getElementById("start-regular-game")
const rules = document.getElementById("rules")
const showRules1 = document.getElementById("rules-show1")
const showRules2 = document.getElementById("rules-show2")
const hideRules = document.getElementById("rules-close")
const cardMat = document.getElementById("card-mat")
const deck = document.getElementById("deck")
const message = document.getElementById("message")
const newGame = document.getElementById("new-game")
const canvas = document.querySelector("canvas")
const winText = document.getElementById("win")
const timer = document.getElementById("timer")
const stats = document.getElementById("stats")
const helpMe = document.getElementById("help")



//This function changes an element's display between flex and none
const changeDisplay = (element) => {
    const isDisplayNone = element.style.display === "none"
    element.style.display = isDisplayNone ? "flex" : "none"
}
//The show and hide rules buttons change the display of the rules page
hideRules.addEventListener("click", function() { changeDisplay(rules)})
showRules1.addEventListener("click", function() { changeDisplay(rules)})
showRules2.addEventListener("click", function() { changeDisplay(rules)})

//Global variable declarations
let dealCount = -1
let startTime = ""
let gameTimes = []
let possibleCardsCurrentGame = []
let totalSecondsElapsed = ""
let minutesElapsed = ""
let secondsElapsed = ""
let timerInterval = ""
let gameCount = 0
let drawCount = 0
let setCount = 0
let cardEventHandlers = []

//arrays of possibilities for each property
const shapes = ["triangle", "circle", "square"]
const colors = ["red", "green", "blue"]
const numbers = [1,2,3]
const fill = ["solid", "hollow", "stripe"]


//this function creates an array of arrays, each with a unique combination of one each of the properties (this is the cartesian product)
const uniqueSort = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
//An easy game uses only three of the properties, while a regular game uses all 4.
const possibleCardsEasy = uniqueSort(shapes, colors, numbers)
const possibleCardsRegular = uniqueSort(shapes, colors, numbers, fill)


//this function shuffles unique arrays by iterating through the greater array and trading the array at each index
//with an array at a random index.
const shuffleCards = (arrayOfCards) => {
    for (let i = (arrayOfCards.length - 1); i>0; i--) {
        let randomIndex = Math.floor(Math.random() * (i+1))
        let currentArray = arrayOfCards[i]
        arrayOfCards[i] = arrayOfCards[randomIndex]
        arrayOfCards[randomIndex] = currentArray
    }

}

// this function creates cards based on the regular array of 81 or the easy array of 27
const makeCards = (arrayOfCards) => {
    dealCount= -1
    arrayOfCards.forEach((uniqueCardArray, index) => {
        //fill an identical array to work from during this game
        possibleCardsCurrentGame.push(uniqueCardArray)
        //create a li with a unique id, filled with an inner, front, and back
        const card = document.createElement("li")
        const inner = document.createElement("div")
        inner.classList.add("innerCard")
        card.appendChild(inner)
        const front = document.createElement("div")
        front.classList.add("cardFront")
        inner.appendChild(front)
        const back = document.createElement("div")
        back.classList.add("cardBack")
        inner.appendChild(back)
        //create shapes on the front, quantity depending on number property
        let intNumber = parseInt(uniqueCardArray[2])
        for (let i=1; i <= intNumber; i++ ) {
            let cardShape = document.createElement("div")
            front.appendChild(cardShape)
        }
        card.setAttribute("id", `${index}`)
        card.classList.add("card", "deckCard")
        //This assigns classes based on properties
        for (const word of uniqueCardArray) {
            front.classList.add(word)
        }
        deck.appendChild(card)
        //this sets a number tied to the index of the top card in the deck.
        dealCount++
    })
}

//this function shuffles the array of unique property combos, makes them into cards, and changes the view from title screen to game board.
const startGame = (arrayOfCards) => {
    shuffleCards(arrayOfCards)
    makeCards(arrayOfCards)
    message.innerText = "Click on the deck to deal."
    titleScreen.style.display = "none"
}

startEasyGame.addEventListener("click", function() {startGame(possibleCardsEasy)})
startRegularGame.addEventListener("click", function() {startGame(possibleCardsRegular)})

//the new game button removes all the cards and returns to the title screen
const resetGame = () => {
    while (cardMat.firstChild) {
        cardMat.removeChild(cardMat.firstChild)
    }
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild)
    }
    titleScreen.style.display = "grid"
    deck.style.border = ""
    clearInterval(timerInterval)
    timer.innerText = "0:00"
    possibleCardsCurrentGame = []
    gameTimes = []
}
newGame.addEventListener("click", function() {resetGame()})

const checkMatForSet = () => {
        //for each element on the mat, find the matching array and push it to a new array
        let cardsInPlay = Array.from(cardMat.children)
        let idsInPlay = cardsInPlay.map(card => {return card.id})
        let propertiesInPlay = []
        idsInPlay.forEach(stringId => {
            let intId = parseInt(stringId)
            propertiesInPlay.push(possibleCardsCurrentGame[intId])
        })
        //find if within that array, there are three arrays that for each index they either all match or all don't
            //for each pair of arrays I want to check for a third that for each index that completes the set
        let containsSet = false
        propertiesInPlay.forEach((firstCard, index) => {
            for (let secondCardIndex = index + 1; secondCardIndex < propertiesInPlay.length; secondCardIndex++) {
                let secondCard = propertiesInPlay[secondCardIndex]
                for (let thirdCardIndex = secondCardIndex + 1; thirdCardIndex < propertiesInPlay.length; thirdCardIndex++) {
                    let thirdCard = propertiesInPlay[thirdCardIndex]
                    let trueCount = 0
                    for(let propertyIndex = 0; propertyIndex < firstCard.length; propertyIndex++) {
                        if (firstCard[propertyIndex] == secondCard[propertyIndex]) {
                            if (firstCard[propertyIndex] == thirdCard[propertyIndex]) {
                                trueCount++
                            }
                        } else if (firstCard[propertyIndex] != secondCard[propertyIndex]) {
                            if ((firstCard[propertyIndex] != thirdCard[propertyIndex]) && (secondCard[propertyIndex] != thirdCard[propertyIndex])){
                                trueCount++
                            }
                        }
                    }
                    if (trueCount == firstCard.length) {
                        containsSet = true
                    }
                }
            }
        })
        return containsSet
}


//This function checks if three cards are a set
//if not a set, alert player
//if it is a set, remove cards and alert player
const checkSet = (threeCardArray) => {
    let trueCount = 0
    let card1 = threeCardArray[0]
    let card2 = threeCardArray[1]
    let card3 = threeCardArray[2]
    for(let propertyIndex = 0; propertyIndex < card1.length; propertyIndex++) {
        if ((card1[propertyIndex] == card2[propertyIndex]) && (card1[propertyIndex] == card3[propertyIndex])) {
                trueCount++
        } else if ((card1[propertyIndex] != card2[propertyIndex]) && ((card1[propertyIndex] != card3[propertyIndex]) && (card2[propertyIndex] != card3[propertyIndex]))) {
                trueCount++
        }
    }
    if (trueCount == card1.length) {
        return true
    }
}

const unclickCards = () => {
    let clickedCards = document.getElementsByClassName("clicked")
    while (clickedCards.length > 0) {
        clickedCards[0].classList.remove("clicked")
    }
}

//Circles of random colors appear after a win
const ctx = canvas.getContext("2d")
const makeRandomCircle = () => {
    let randomRed = Math.floor(Math.random() * 255)
    let randomGreen = Math.floor(Math.random() * 255)
    ctx.fillStyle = `rgb(${randomRed}, ${randomGreen}, 175)`
    x = Math.floor(Math.random() * 1400)
    y = Math.floor(Math.random() * 1000)
    radius = Math.floor(Math.random() * 100)
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
}

const logStats = () => {
    let gameSum = gameTimes.reduce((a, b) => a + b)
    let gameAverageSeconds = Math.floor( gameSum / gameTimes.length)
    gameAverageMinutes = Math.floor(gameAverageSeconds / 60)
    readableSeconds = Math.floor(gameAverageSeconds - (gameAverageMinutes * 60))
    if (readableSeconds < 10) {
        readableSeconds = `0${readableSeconds}`
    } 
    stats.innerText += `Game ${gameCount} average time: ${gameAverageMinutes}:${readableSeconds}`
}


const winGame = () => {
    canvas.style.display = "flex"
    let confetti = setInterval(makeRandomCircle, 10)
    setTimeout(() => {winText.style.display = "block"}, 2000)
    gameCount++
    logStats()
    canvas.addEventListener("click", () => {
        clearInterval(confetti)
        ctx.clearRect(0,0,1100,750)
        canvas.style.display = "none"
        winText.style.display = "none"
        resetGame()
    })
}

const getTimeElapsed = () => {
    let currentTime = Date.now()
    let currentTimeElapsed = currentTime - startTime
    totalSecondsElapsed = Math.floor(currentTimeElapsed / 1000)
    minutesElapsed = Math.floor(totalSecondsElapsed / 60)
    secondsElapsed = Math.floor(totalSecondsElapsed - (minutesElapsed * 60))
    if (secondsElapsed < 10) {
        secondsElapsed = `0${secondsElapsed}`
    } 
}

const setTimer = (firstInterval) => {
    timer.innerText = "0:00"
    setTimeout(()=> {
        startTime = Date.now()
    }, firstInterval)    
    timerInterval = setTimeout(function addToTimer() {            
            getTimeElapsed()
            timer.innerText = `${minutesElapsed}:${secondsElapsed}`
            timerInterval = setTimeout(addToTimer, 1000)
    }, firstInterval)
}

//pulls the top 3 cards from deck and appends them to mat, one by one flipping by adding ".showFront"
const drawCard = () => {
    if (dealCount < 0) {return}
    message.innerText = ""
    let elementCard = document.getElementById(`${dealCount}`)
    cardMat.appendChild(elementCard)        
    elementCard.classList.remove("deckCard")
    drawCount++
    setTimeout(() => {
        elementCard.classList.add("showFront")
    }, (drawCount*100))  
    if (dealCount == 0) {
        deck.style.border = "2px solid black"
        dealCount--
        return
    }
    dealCount--
}


//Event listeners on cards have to be handled in a special way in order to remove the event listener to prevent a fourth card being clicked and removed with a set
const addCardEvent = () => {
    const children = cardMat.children
    for (let i=0; i<children.length; i++){
        let clickFunction = clickCard.bind(this, children[i])
        cardEventHandlers.push(clickFunction)
        children[i].firstChild.firstChild.addEventListener("click", clickFunction)
    }
}

const removeCardEvent = () => {
    const children = cardMat.children
    for (let i=0; i<children.length; i++){        
        if (!children[i].classList.contains("clicked")){
          children[i].firstChild.firstChild.removeEventListener("click", cardEventHandlers[i])  
        }
    }
    cardEventHandlers = []
}

//when a card is clicked, this toggles the clicked class and if 3 cards are clicked, checks for a set + updates card mat, timer, and message accordingly
const clickCard = (card) => {
    card.classList.toggle("clicked")
    if (card.classList.contains("clicked")) {        
        //check if three cards are clicked, if not, just clear the message board
        let clickedCards =  document.getElementsByClassName("clicked")          
        if (clickedCards.length < 3){            
            message.innerText = ""
            return
            //if three cards clicked, compare properties
        } else if (clickedCards.length == 3) {
            deck.removeEventListener("click", clickDeck)
            let cardsToCheck = []
            for (let i=0; i < 3; i++) {
                let id = parseInt(clickedCards[i].id)
                let uniqueArray = possibleCardsCurrentGame[id]
                cardsToCheck.push(uniqueArray)
            }
            let isASet = checkSet(cardsToCheck)
            if (isASet != true){                
                message.innerText = "That's not a set.\nYour timer is still running.\nTry Again."
                unclickCards()
                deck.addEventListener("click", clickDeck)
            } else if (isASet == true) {
                removeCardEvent()
                clearInterval(timerInterval)
                gameTimes.push(totalSecondsElapsed)
                message.innerText = `It's a set!\nKeep up the good work.\nYour time: ${minutesElapsed}:${secondsElapsed}`
                setTimeout(() => {
                    while (clickedCards.length > 0) {
                        clickedCards[0].remove()
                    }
                }, 800)
                if (dealCount < 0) {
                    setTimeout (() => {
                        let oneLastSet = checkMatForSet()
                        if (oneLastSet == true){
                            message.innerText = "No more cards in deck.\nFind the last sets to win!"
                            addCardEvent() 
                        } else { 
                            winGame() 
                        }  
                    },1000)
                } else {
                    setTimeout(() => {
                        while (cardMat.children.length < 12 && dealCount >= 0) {        
                            drawCard()
                        }
                    }, 1500)
                    setTimeout(() => { 
                        deck.addEventListener("click", clickDeck)
                        addCardEvent() 
                    },1550)                    
                    setTimer(1800)
                    drawCount = 0  
                }
            }
        }
    }
}
     
//when the deck is clicked
const clickDeck = () => {
    removeCardEvent()    
    unclickCards()
    if (cardMat.children.length >= 12) {
        let hasASet = checkMatForSet()
        if (hasASet == true) {
            message.innerText = "There's a set here.  Keep looking!"
        } else if (cardMat.children.length == 12) {
            clearInterval(timerInterval)
            message.innerText = "You were right; there was no set.\nHave three more cards!"
            while (cardMat.children.length < 15) {drawCard()}
            setTimer(300)
        } else if (cardMat.children.length == 15) {
            clearInterval(timerInterval)
            message.innerText = "Wow, the odds were 2500:1 against this.\nThis set's on me."
            while (cardMat.children.length > 12) { cardMat.firstChild.remove() }
            while (cardMat.children.length < 15) {drawCard()}
            setTimer(300)
            setCount++
        }
    }
    if (cardMat.children.length < 12) {
        while (cardMat.children.length < 12) {        
            drawCard()
        }
        setTimer(1200)
    }
    drawCount = 0
    addCardEvent()
}

deck.addEventListener("click", clickDeck)






//when helpMe is clicked
//check the mat for a set, if none in 12, grab three more cards
//if none in 






