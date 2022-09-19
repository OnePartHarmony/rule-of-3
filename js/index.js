const mat = document.getElementById("mat")
const startGame = document.getElementById("start-game")
const deck = document.getElementById("deck")



// empty array for array which will each be [shape, color, background, number]
let possibleCards = []
const fill = ["solid", "hollow", "stripe"]
const numbers = [1,2,3]
const shapes = ["triangle", "circle", "square"]
const colors = ["red", "green", "blue"]

//Here should be a function that exactly sorts the properties into propertyArrays, with no two alike





// this function creates cards

possibleCards.forEach((propertyArray, index) => {
        card = document.createElement("div")
        card.setAttribute("id", `${index}`)
        card.classList.add("card")
        //This assigns classes based on properties
        for (word of propertyArray) {
            card.classList.add(word)
        }
        deck.appendChild(card)
        //This assigns the div to a variable that uses the index in the name
        window[`card${index}`] = card
})






//fill array with 81 unique shapes

// button fills 12 divs



//SHUFFLE THE DECK

//click shape highlights
//click 3 shapes removes or alerts if not set
//if removed, auto-refill with delay

//other button checks for possible set and adds 3 or alerts



