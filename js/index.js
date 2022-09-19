// const mat = document.getElementById("mat")
// const startGame = document.getElementById("start-game")
// const deck = document.getElementById("deck")



// // empty array for arrays which will each hold a unique combination of property variations
// let possibleCards = []

// //constructor for an object to hold properties, so easy or hard modes can create cards with 3 or 4 properties
// class PropertyObject {
//     constructor(shapes, colors, fill, numbers) {
//         this.shapes = shapes
//         this.colors = colors        
//         this.fill = fill
//         this.numbers = numbers
//     }
// }

//arrays of possibilities for each property
const shapes = ["triangle", "circle", "square"]
const colors = ["red", "green", "blue"]
const fill = ["solid", "hollow", "stripe"]
const numbers = [1,2,3]

//this function creates an array of arrays, each with a unique combination of one each of the properties
const uniqueSort = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
let possibleCards = uniqueSort(shapes, colors, fill, numbers)
console.log(possibleCards)


//Here should be a function that exactly sorts the property possibilities into propertyArrays, with no two alike

// const arrayOfUniqueArrays = (propertyObject) => {
//     propertyObject.shapes.forEach(shape => {
//         let exponent = (Object.keys(propertyObject).length - 1)
//         for (i=0; i < (3 ** exponent); i++) {
//             possibleCards.push([shape])
//         }
//     })
//     let index = 0
//     for(i=0; i < possibleCards.length; i + (possibleCards.length / 3) ) {
//         propertyObject.colors.forEach(color => {
//             for (i=0; i < (possibleCards.length / 9); i++) {
//                 possibleCards[index].push(color)

//                 console.log( `after index ${i} has been updated, the array of unique arrays is`, possibleCards)
//                 index++
//             }
//         })
    // }
    // index = 0
    // for(i=0; i < possibleCards.length; i + (possibleCards.length / 9) ) {
    //     propertyObject.colors.forEach(fill => {
    //         for (i=0; i < (possibleCards.length / 27); i++) {
    //             possibleCards[index].push(fill)
    //             index++
    //         }
    //     })
    // }
    // index = 0
    // if (propertyObject.numbers) {
    // //since the most properties we can have is 4, we know this array is 81 long
    //     for(i=0; i < 81; i + 3) {
    //         propertyObject.colors.forEach(fill => {
    //                 possibleCards[index].push(fill)
    //                 index++
    //         })
    //     }
    // }
// }


// const testObject = new PropertyObject(shapes, colors, fill, numbers)
// arrayOfUniqueArrays(testObject)
// console.log(possibleCards)















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



