/**
 * Idea:
 * 
 * A calculator where i can dd my first number by increasing it ith button A and B and go tto next step by clicking A nd B simultaneously.
 */
// Variable "whichValue":
// 0 = Still Entering first Value
// 1 = Already entering the second Value to add
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    // Else show result!
    if (whichValue == 0) {
        whichValue = 1
    } else {
    	
    }
})
let whichValue = 0
whichValue = 0
while (whichValue == 0) {
    let value_1 = 0
    basic.showNumber(value_1, 150)
}
