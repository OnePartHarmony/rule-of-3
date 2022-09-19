const container = document.getElementById("container")



// empty array for objects which will each be {shape:,color:,background:,nuumber}
//array of shapes
// array of colors
// array of backgrounds
// array of numbers
let cardDivArray = []
// start game first creates cards
const createBlankCards = () => {
    for (i=0; i<=81; i++) {
        const card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute("id", `${i}`)
        container.appendChild(card)
        cardDivArray.push(i)
    }
}
createBlankCards()


//fill array with 81 unique shapes

// button fills 12 divs



//SHUFFLE THE DECK

//click shape highlights
//click 3 shapes removes or alerts if not set
//if removed, auto-refill with delay

//other button checks for possible set and adds 3 or alerts



