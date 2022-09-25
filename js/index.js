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
const loseText = document.getElementById("lose")
const timer = document.getElementById("timer")
const stats = document.getElementById("stats")
const helpMe = document.getElementById("help")
const setDisplay = document.getElementById("set-display")

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
let helpCount = 0
let cardEventHandlers = []
let foundSet = []

const changeDisplay = (element) => {
    const isDisplayNone = element.style.display === "none"
    element.style.display = isDisplayNone ? "flex" : "none"
}
hideRules.addEventListener("click", function() { changeDisplay(rules)})
showRules1.addEventListener("click", function() { changeDisplay(rules)})
showRules2.addEventListener("click", function() { changeDisplay(rules)})

//arrays of possibilities for each property
const shapes = ["gumdrop", "circle", "square"]
const colors = ["pink", "green", "blue"]
const numbers = [1,2,3]
const fill = ["solid", "hollow", "stripe"]

//this function creates an array of arrays, each with a unique combination of one each of the properties (this is the cartesian product)
const uniqueSort = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
//An easy game uses only three of the properties, while a regular game uses all 4.
//It would be simple in the future to create an even harder mode with a fifth property, though that would be 243 cards.
const possibleCardsEasy = uniqueSort(shapes, colors, numbers)
const possibleCardsRegular = uniqueSort(shapes, colors, numbers, fill)

//this function shuffles unique arrays by iterating through the greater array
//and trading the array at each index with an array at a random index.
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
//this sets a number tied to the index of the top card in the deck, so with each deal, the coorisponding element and properties can be referenced
        dealCount++
    })
}

//this function shuffles the array of unique property combos, makes them into cards, and changes the view from title screen to game board.
const startGame = (arrayOfCards) => {
    shuffleCards(arrayOfCards)
    makeCards(arrayOfCards)
    message.innerText = "Click on the deck to deal."
    titleScreen.style.display = "none"
    deck.addEventListener("click", clickDeck)
    setDisplay.innerText = `Sets Found:\n0`
    newGame.addEventListener("click", resetGame)
}

startEasyGame.addEventListener("click", function() {startGame(possibleCardsEasy)})
startRegularGame.addEventListener("click", function() {startGame(possibleCardsRegular)})

//the new game button removes all the cards, resets variables, and returns to the title screen
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
    setCount = 0    
    helpCount = 0
}


//This function is how the computer can tell the player if there is a set visible
const checkMatForSet = () => {
    foundSet = []
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
                    foundSet = [firstCard, secondCard, thirdCard]
                    containsSet = true
                }
            }
        }
    })
    return containsSet
}

//This function checks if three cards are a set
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

//Circles of random colors appear after a win, a brick wall appears after a lose
const ctx = canvas.getContext("2d")

const makeRandomCircle = () => {
    let randomRed = Math.floor(Math.random() * 255)
    let randomGreen = Math.floor(Math.random() * 255)
    ctx.fillStyle = `rgb(${randomRed}, ${randomGreen}, 175)`
    x = Math.floor(Math.random() * canvas.width)
    y = Math.floor(Math.random() * canvas.height)
    radius = Math.floor(Math.random() * 100)
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
}

const makeBrick = (x,y) => {
    let randomBlue = Math.floor(Math.random() * 100)
    let randomGreen = Math.floor(Math.random() * 175)
    ctx.fillStyle = `rgb(200, ${randomGreen}, ${randomBlue})`
    ctx.fillRect(x, canvas.height - y, ((canvas.height/5.35)-(canvas.height/91)), ((canvas.height/16)-(canvas.height/96)))
}

const fillWithBricks = () => {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    let brickCount = 1 
    for (let y= ((canvas.height/16)-(canvas.height/80)); y <= canvas.height; y+=canvas.height/8) {
        for (let x=0; x < canvas.width; x+=(canvas.height/5.35)) {
            setTimeout(()=>{                
                makeBrick(x,y)
            }, brickCount*50)
            brickCount++
        }        
        for (let x=-85; x<canvas.width; x+=(canvas.height/5.35)) {
            setTimeout (()=> {
                makeBrick(x,(y+(canvas.height/16)))
            }, brickCount*50)
            brickCount++
        }    
    }
}

//This function adds the stats from the end of the game to the title screen
const logStats = (wonOrLost) => {
    if (gameTimes.length < 2){
        stats.innerText = `${stats.innerText}\nYou lost game ${gameCount} and were helped ${helpCount} times.  Did you even try?`
    } else {
        let gameSum = gameTimes.reduce((a, b) => a + b)
        let gameAverageSeconds = Math.floor( gameSum / gameTimes.length)
        gameAverageMinutes = Math.floor(gameAverageSeconds / 60)
        readableSeconds = Math.floor(gameAverageSeconds - (gameAverageMinutes * 60))
        if (readableSeconds < 10) {
            readableSeconds = `0${readableSeconds}`
        } 
        stats.innerText = `${stats.innerText}\nGame ${gameCount} ${wonOrLost} with ${setCount} sets and an average time of ${gameAverageMinutes}:${readableSeconds}`
    }
}

//After a win or loss, the canvas animation and text appears, with the ability to be clicked to reset the game
const winGame = () => {
    helpMe.removeEventListener("click", getHelp)
    newGame.removeEventListener("click", resetGame)
    canvas.style.display = "flex"
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    let confetti = setInterval(makeRandomCircle, 10)
    setTimeout(() => {winText.style.display = "block"}, 2000)
    gameCount++
    logStats("won")
    setTimeout(()=>{
        canvas.addEventListener("click", () => {
            clearInterval(confetti)
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.style.display = "none"
            winText.style.display = "none"
            resetGame()
        })
    }, 2500)
}

const loseGame = () => {
    helpMe.removeEventListener("click", getHelp)
    newGame.removeEventListener("click", resetGame)
    clearInterval(timerInterval)
    canvas.style.display = "flex"
    fillWithBricks()
    setTimeout(() => {loseText.style.display = "block"}, 4000)
    gameCount++
    logStats("lost")
    setTimeout(()=>{
        canvas.addEventListener("click", () => {
            ctx.clearRect(0,0,canvas.width,canvas.height)
            canvas.style.display = "none"
            loseText.style.display = "none"
            resetGame()
        })
    }, 4500)
}

//For keeping track of time and updating the timer
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

//sets a timer that starts after a chosen amount of time and updates each second, but can be
//cleared more cleanly than with setInterval
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

//pulls the top card from deck and appends it to mat, one by one flipping by
//adding ".showFront" after a unique time set by drawCount
const drawCard = () => {
    if (dealCount < 0) {return}
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

//Event listeners on cards have to be handled in this special way in order to
//remove each specific event listener to prevent a fourth card being clicked and removed with a set
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

//After a set has been found by the player or the computer, the cards need 
//to be removed from the mat with new cards drawn in their place
const removeAndReplace = () => {
    let clickedCards =  document.getElementsByClassName("clicked")
    setTimeout(() => {
        while (clickedCards.length > 0) {
            clickedCards[0].remove()
        }        
    }, 1000)
    if (dealCount < 0) {
        setTimeout (() => {
            let oneLastSet = checkMatForSet()        
            if (oneLastSet == true){              
                message.innerText = "No more cards in deck.\nFind the last sets to win!"
                addCardEvent()
                helpMe.addEventListener("click", getHelp)                
            } else if (setCount >= helpCount) { 
                winGame() 
            } else if (helpCount > setCount) {
                loseGame()
            }
        },1200)    
     } else {
        setTimeout(() => {
            while (cardMat.children.length < 12 && dealCount >= 0) {        
                drawCard()
            }
        }, 1700)
        setTimeout(() => {
            deck.addEventListener("click", clickDeck)
            addCardEvent()
            helpMe.addEventListener("click", getHelp)
            message.innerText = ""
        },1750)                    
        setTimer(2000)
        drawCount = 0  
    }
}

//when a card is clicked, this toggles the clicked class and if 3 cards are clicked, 
//this checks for a set + updates card mat, timer, and message accordingly
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
            helpMe.removeEventListener("click", getHelp)
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
                helpMe.addEventListener("click", getHelp)
            } else if (isASet == true) {
                setCount++
                setDisplay.innerText = `Sets Found:\n${setCount}`
                removeCardEvent()
                clearInterval(timerInterval)
                gameTimes.push(totalSecondsElapsed)
                message.innerText = `It's a set!\nKeep up the good work.\nYour time: ${minutesElapsed}:${secondsElapsed}`
                removeAndReplace()
            }
        }
    }
}

//if the computer determines there is no set available, new cards need to be added, 
//but the maximum number of cards on the mat at a time is 15
const noSetOnMat = () => {
    if (cardMat.children.length == 12) {
        clearInterval(timerInterval)
        message.innerText = "You were right; there was no set.\nHave three more cards!"
        while (cardMat.children.length < 15) {drawCard()}
        setTimer(300)
    } else if (cardMat.children.length == 15) {
        clearInterval(timerInterval)
        message.innerText = "Wow, the odds were 2500:1 that\nthere would be a set in 15 cards.\nThis set's on me."
        while (cardMat.children.length > 12) { cardMat.firstChild.remove() }
        while (cardMat.children.length < 15) {drawCard()}
        setTimer(300)
        setCount++
        setDisplay.innerText = `Sets Found:\n${setCount}`
    }
    setTimeout(() => { helpMe.addEventListener("click", getHelp)}, 300)
}

//When the player clicks "Help Me," essentially the computer takes a turn
const getHelp = () => {
    helpMe.removeEventListener("click", getHelp)
    clearInterval(timerInterval)
    removeCardEvent()    
    unclickCards()
    deck.removeEventListener("click", clickDeck)    
    let hasASet = checkMatForSet()
    if (hasASet == false) {
        noSetOnMat() 
    } else if (hasASet == true) {
        helpCount++
        foundSet.forEach(array => {
            for (let i=0; i<cardMat.children.length; i++){
                let frontOfCard = cardMat.children[i].firstChild.firstChild
                if (array.every(property => frontOfCard.classList.contains(property))) {
                    cardMat.children[i].classList.add("clicked")
                }                
            }
        })
        message.innerText = "Here's one possible set"
        setTimeout (()=>{
            removeAndReplace()
        }, 350)
    }
}

//At first clicking the deck draws the first twelve cards.
//After that, clicking the deck will draw three cards only if no set is already available
const clickDeck = () => {
    helpMe.removeEventListener("click", getHelp)
    removeCardEvent()    
    unclickCards()
    message.innerText = ""
    if (cardMat.children.length >= 12) {
        let hasASet = checkMatForSet()
        if (hasASet == true) {
            message.innerText = "There's a set here.  Keep looking!"
            helpMe.addEventListener("click", getHelp)
        } else { noSetOnMat() }
    }
    if (cardMat.children.length < 12) {
        while (cardMat.children.length < 12) {
            drawCard()
        }
        setTimer(1200)
        setTimeout(() => { helpMe.addEventListener("click", getHelp) }, 1200)
    }
    drawCount = 0
    addCardEvent()
}
deck.addEventListener("click", clickDeck)











