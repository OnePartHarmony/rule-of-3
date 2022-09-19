const mat = document.getElementById("mat")
const startGame = document.getElementById("start-game")
const deck = document.getElementById("deck")



// empty array for arrays which will each hold a unique combination of property variations
let possibleCards = []
//constructor for an object to hold properties, so easy-hard modes can create cards with 3-4 properties
class PropertyObject {
    constructor(shapes, colors, fill, numbers) {
        this.shapes = shapes
        this.colors = colors        
        this.fill = fill
        this.numbers = numbers
    }
}

const shapes = ["triangle", "circle", "square"]
const colors = ["red", "green", "blue"]
const fill = ["solid", "hollow", "stripe"]
const numbers = [1,2,3]

const testObject = new PropertyObject(shapes, colors, fill, numbers)



//Here should be a function that exactly sorts the properties into propertyArrays, with no two alike

const arrayOfUniqueArrays = (propertyObject) => {
    propertyObject.shapes.forEach(shape => {
        for (i=0; i < ((Object.keys(propertyObject).length - 1) ** 3); i++) {
            possibleCards.push([shape])
        }
    })
    let index = 0
    for(i=0; i < possibleCards.length; i + (possibleCards.length / 3) ) {
        propertyObject.colors.forEach(color => {
            for (i=0; i < (possibleCards.length / 9); i++) {
                possibleCards[index].push(color)
                index++
            }
        })
    }
    index = 0
    for(i=0; i <= possibleCards.length; i + (possibleCards.length / 9) ) {
        propertyObject.colors.forEach(fill => {
            for (i=0; i < (possibleCards.length / 27); i++) {
                possibleCards[index].push(fill)
                index++
            }
        })
    }

}
arrayOfUniqueArrays(testObject)






// this function creates cards

// possibleCards.forEach((uniquePropertyArray, index) => {
//         card = document.createElement("div")
//         card.setAttribute("id", `${index}`)
//         card.classList.add("card")
//         //This assigns classes based on properties
//         for (word of uniquePropertyArray) {
//             card.classList.add(word)
//         }
//         deck.appendChild(card)
//         //This assigns the div to a variable that uses the index in the name
//         window[`card${index}`] = card
// })






//fill array with 81 unique shapes

// button fills 12 divs



//SHUFFLE THE DECK

//click shape highlights
//click 3 shapes removes or alerts if not set
//if removed, auto-refill with delay

//other button checks for possible set and adds 3 or alerts



