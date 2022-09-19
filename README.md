 # Set of Things Project Plan

## Project links
<https://github.com/OnePartHarmony/set-game>

## Overview
A card game where you have to find sets of cards that follow a rule of threes.


## Technologies Used
HTML
CSS
JavaScript


## User Stories
### - As a user, I want the ability to choose one or two player mode.
### - As a user, I want the ability to race the clock.
### - As a user I want the ability to know if I'm searching for a set that isn't there.
### - As a user I want to see my average speed at the end of the game.



## Wireframes
Here's the general setup of the game:
![card game layout](/wireframe.png)



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
Monday: setup general layout of objects in Html, work on js
Tuesday: work on js in day, work on some of the visual side in the evening
Wednesday: work on js during the day, in the evening reassess how far I've gotten, and add or reduce details, plan for next two days
Thursday-Saturday: execute new plan
Sunday: finishing details / submit project.