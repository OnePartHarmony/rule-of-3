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



//This function changes an element's display between flex and none
const changeDisplay = (element) => {
    const isDisplayNone = element.style.display === "none"
    element.style.display = isDisplayNone ? "flex" : "none"
}
//The show and hide rules buttons change the display of the rules page
hideRules.addEventListener("click", function() { changeDisplay(rules)})
showRules1.addEventListener("click", function() { changeDisplay(rules)})
showRules2.addEventListener("click", function() { changeDisplay(rules)})


//arrays of possibilities for each property
const shapes = ["triangle", "circle", "square"]
const colors = ["red", "green", "blue"]
const numbers = [1,2,3]
const fill = ["solid", "hollow", "stripe"]


//this function creates an array of arrays, each with a unique combination of one each of the properties
const uniqueSort = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
//An easy game uses only three of the properties, while a regular game uses all 4.
possibleCardsEasy = uniqueSort(shapes, colors, numbers)
possibleCardsRegular = uniqueSort(shapes, colors, numbers, fill)

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
    arrayOfCards.forEach((uniqueCardArray, index) => {
        //create a li with a unique id
        const card = document.createElement("li")
        //create shapes inside the li, quantity depending on number property
        let intNumber = parseInt(uniqueCardArray[2])
        for (let i=1; i <= intNumber; i++ ) {
            let cardShape = document.createElement("div")
            card.appendChild(cardShape)
        }
        card.setAttribute("id", `${index}`)
        card.classList.add("card")
        card.classList.add("back")
        //This assigns classes based on properties
        for (const word of uniqueCardArray) {
            card.classList.add(word)
        }
        deck.appendChild(card)
        //This assigns the li to a variable that uses the index in the name
        window[`card${index}`] = card
    })
}

//this function shuffles the array of unique property combos, makes them into cards, and changes the view from title screen to game board.
const startGame = (arrayOfCards) => {
    shuffleCards(arrayOfCards)
    makeCards(arrayOfCards)
     message.innerText = "Click on the deck to deal."
    changeDisplay(titleScreen)
}

startEasyGame.addEventListener("click", function() {startGame(possibleCardsEasy)})
startRegularGame.addEventListener("click", function() {startGame(possibleCardsRegular)})

//the new game button removes all the cards and returns to the title screen
newGame.addEventListener("click", function() {
    while (cardMat.firstChild) {
        cardMat.removeChild(cardMat.firstChild)
    }
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild)
    }
    changeDisplay(titleScreen)
})











//click card highlights
//click 3 cards removes or alerts if not set
//if removed, auto-refill with delay

//other button checks for possible set and adds 3 or alerts



