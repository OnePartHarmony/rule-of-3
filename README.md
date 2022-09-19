 # Set of Things Project Plan

## Project links
<https://github.com/OnePartHarmony/set-game>

## Overview
A card game where you have to find sets of cards that follow a rule of threes.
![set game](/wireframes/wire2.png)


## Technologies Used
HTML
CSS
JavaScript


## User Stories

### - As a user I want the ability to know if I'm searching for a set that isn't there.
-Clicking the deck will deal more cards if no sets are available.
### - As a user I want to see my average speed at the end of the game.
- The normal moode will track average time.
### - As a user, I want the ability to race the clock.
-A timed mode will redeal if time limit is reached, and be scored by sets found.
### - As a user, I want the ability to choose one or two player mode.
-This capability will depend on time this week


## Wireframes
Opening screen:
![opening of set](/wireframes/gameStart.png)
After Start Game:
![set game](/wireframes/wire1.png)
After deal:
![set game](/wireframes/wire2.png)
After player clicks three cards that make a set:
![set game](/wireframes/wire3.png)
When player chooses wrong three cards:
![set game](/wireframes/wire4.png)
When player clicks deck, but there are sets in the 12 cards:
![set game](/wireframes/wire5.png)
When player clicks deck and there were no sets available:
![set game](/wireframes/wire6.png)
When deck is empty but game isn't over and player clicks deck:
![set game](/wireframes/wire7.png)
when player finds all sets:
![set game](/wireframes/wire8.png)

I'm currently planning for at least a one-player mode.  When that is working, this will be updated for wireframes for 2-player.


## Entity relationships
```
const numbers = [1,2,3]
const shapes = ["triangle", "circle", "square"]
const colors = ["red", "green", "blue"]
const fill = ["solid", "hollow", "gradient"]

```
I will use js to sort through 4 arrays of 3 values to create 81 unique objects cards with one value from each category.
I will use js to create 81 card divs and assign them shapes that coorispond to those values.
I will use Math.random() to shuffle the deck.
When a player clicks 3 cards, I will use a function checkWin() to decide if they are a set.
When a player clicks check set, a function checkSet() will check if there are possible sets and if not, draw three more cards.


## Schedule for the week
Monday: setup general layout of objects in Html, work on basic functions and css styling of card shapes.
Tuesday: work on js in day, work on some of the visual side in the evening
Wednesday: work on js during the day, in the evening reassess how far I've gotten, and add or reduce details, plan for next two days
Thursday-Saturday: execute new plan
Sunday: finishing details / submit project.