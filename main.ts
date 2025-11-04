let whichValue = 0
let value1 = 0
let value2 = 0
let result = 0
/**
 * A simple addition calculator on the Calliope mini
 */
/**
 * Buttons: A increases current number, B decreases current number
 */
/**
 * Press A + B simultaneously to move from first number input to second,
 */
/**
 * then again to compute and display the result.
 */
/**
 * Variables
 */
/**
 * whichValue: 0 = entering first number, 1 = entering second number, 2 = show result
 */
// Event: Button A clicked
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (whichValue == 0) {
        // increment first number
        value1 += 1
    } else if (whichValue == 1) {
        // increment second number
        value2 += 1
    }
})
// Event: Buttons A + B clicked together
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    if (whichValue == 0) {
        // finish entering first number, move to second
        whichValue = 1
    } else if (whichValue == 1) {
        // finish entering second number, compute result
        result = calculate()
        whichValue = 2
    } else {
        // If already in result state, pressing A+B resets calculator
        resetCalculator()
    }
})
// Event: Button B clicked
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (whichValue == 0) {
        // decrement first number
        value1 += -1
    } else if (whichValue == 1) {
        // decrement second number
        value2 += -1
    }
})
// Function: reset calculator to initial state
function resetCalculator () {
    value1 = 0
    value2 = 0
    result = 0
    whichValue = 0
}
// Function: show result on display
function showResult () {
    basic.showNumber(result)
}
// Function: perform addition
function calculate () {
    return value1 + value2
}
// Main loop (runs continuously)
basic.forever(function () {
    if (whichValue == 0) {
        // Display first value being entered
        basic.showNumber(value1, 150)
    } else if (whichValue == 1) {
        // Display second value being entered
        basic.showNumber(value2, 150)
    } else if (whichValue == 2) {
        // Display result
        showResult()
    }
})
