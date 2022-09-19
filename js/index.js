const firstTwelve = document.getElementById("first-twelve")
const startGame = document.getElementById("start-game")
const deck = document.getElementById("deck")

//arrays of possibilities for each property
const shapes = ["triangle", "circle", "square"]
const colors = ["red", "green", "blue"]
const numbers = [1,2,3]
const fill = ["solid", "hollow", "stripe"]


//this function creates an array of arrays, each with a unique combination of one each of the properties
const uniqueSort = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
possibleCardsEasy = uniqueSort(shapes, colors, numbers)
possibleCardsRegular = uniqueSort(shapes, colors, numbers, fill)
// console.log(possibleCards)



// this function creates cards based on the regular array of 81 or the easy array of 27
const makeCards = (arrayOfCards) => {
    arrayOfCards.forEach((uniqueCardArray, index) => {
        //create a div with a unique id
        const card = document.createElement("div")
        //create shapes inside the div, quantity depending on number property
        let intNumber = parseInt(uniqueCardArray[2])
        for (let i=1; i <= intNumber; i++ ) {
            let cardShape = document.createElement("div")
            card.appendChild(cardShape)
        }
        card.setAttribute("id", `${index}`)
        card.classList.add("card")
        //This assigns classes based on properties
        for (const word of uniqueCardArray) {
            card.classList.add(word)
        }
        firstTwelve.appendChild(card)
        //This assigns the div to a variable that uses the index in the name
        window[`card${index}`] = card
    })
}

makeCards(possibleCardsRegular)



//fill array with 81 unique shapes

// button fills 12 divs



//SHUFFLE THE DECK

//click shape highlights
//click 3 shapes removes or alerts if not set
//if removed, auto-refill with delay

//other button checks for possible set and adds 3 or alerts



