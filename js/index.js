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
const possibleCardsEasy = uniqueSort(shapes, colors, numbers)
const possibleCardsRegular = uniqueSort(shapes, colors, numbers, fill)
const possibleCardsCurrentGame = []

//this function shuffles unique arrays by iterating through the greater array and trading the array at each index
//with an array at a random index.
//this is the first of a couple times I use a for statement instead of forEach so I can iterate in reverse
const shuffleCards = (arrayOfCards) => {
    for (let i = (arrayOfCards.length - 1); i>0; i--) {
        let randomIndex = Math.floor(Math.random() * (i+1))
        let currentArray = arrayOfCards[i]
        arrayOfCards[i] = arrayOfCards[randomIndex]
        arrayOfCards[randomIndex] = currentArray
    }

}

let dealCount = -1


// this function creates cards based on the regular array of 81 or the easy array of 27
const makeCards = (arrayOfCards) => {
    dealCount= -1
    arrayOfCards.forEach((uniqueCardArray, index) => {
        //fill an identical array to work from during this game
        possibleCardsCurrentGame.push(uniqueCardArray)
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
        //this sets a number tied to the index of the top card in the deck.
        dealCount++
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



//when the deck is clicked
deck.addEventListener("click", function() {
    //clear message board
    message.innerText = ""

    //if 12, check for set
    //if no set, alert and fill to 15
    //if set, alert
    if (cardMat.children.length == 12) {
        //for each element on the mat, find the matching array and push it to a new array
        let cardsInPlay = Array.from(cardMat.children)
        console.log(cardsInPlay)
        let idsInPlay = cardsInPlay.map(card => {return card.id})
        let propertiesInPlay = []
        idsInPlay.forEach(stringId => {
            let intId = parseInt(stringId)
            propertiesInPlay.push(possibleCardsCurrentGame[intId])
            console.log(propertiesInPlay)
        })
        //find if within that array, there are three arrays that for each index they either all match or all don't
            //for each pair of arrays I want to check for a third that for each index satisfies:
                //if (arrayA[0] === arrayB[0]) => arrayA[0] === arrayC[0]
                //else if (arrayA[0] != arrayB[0]) => (arrayA[0] != arrayC[0]) && (arrayB[0] != arrayC[0])
                //same for index 1-3
        let containsSet = propertiesInPlay.includes((firstCard, index) => {
            for (let secondCardIndex = index + 1; secondCardIndex < 12; secondCardIndex++) {
                let secondCard = propertiesInPlay[secondCardIndex]
                propertiesInPlay.includes(thirdCard => {
                    for(let propertyIndex = 0; propertyIndex < firstCard.length; propertyIndex++) {
                        if (firstCard[propertyIndex] == secondCard[propertyIndex]) {
                            firstCard[propertyIndex] == thirdCard[propertyIndex]
                        } else if (firstCard[propertyIndex] != secondCard[propertyIndex]) {
                            (firstCard[propertyIndex] != thirdCard[propertyIndex]) && (secondCard[propertyIndex] != thirdCard[propertyIndex])
                        }
                    }
                }) 
            }
        })

        if containsSet = true {
            message.innerText = "There's a set here.  Keep looking!"
        } else {
            while (cardMat.children.length < 15) {        
                let realCard = document.getElementById(`${dealCount}`)
                cardMat.appendChild(realCard)
                realCard.classList.remove("back")    
                dealCount--     
            }
        }


    }




    //if fewer than twelve cards are on the mat, fill to twelve
    //remove class "back" so they are face-up
    while (cardMat.children.length < 12) {        
        let realCard = document.getElementById(`${dealCount}`)
        cardMat.appendChild(realCard)
        realCard.classList.remove("back")    
        dealCount--     
    }


})







//when card is clicked
//check if three cards are clicked
//if not, just clear the message board
//if so, compare properties
//if not set, alert
//if yes, remove cards and alert












