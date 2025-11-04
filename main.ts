// Simple calculator for Calliope mini V2
// -----------------------------------------------------------
// Buttons:
// A → decrease current value
// B → increase current value
// A+B → confirm current input and move to next step
//
// Steps:
// 1. Enter first number
// 2. Choose operator (+, -, ×, ÷)
// 3. Enter second number
// 4. Show result
// Press A+B again after showing result to reset.
//
// Sound feedback is played on each major step for confirmation.
// -----------------------------------------------------------

// Variables
let value1 = 0
let value2 = 0
let result = 0
let operator = 0 // 0 = +, 1 = -, 2 = ×, 3 = ÷
let whichStep = 0 // 0 = first value, 1 = operator, 2 = second value, 3 = result

// Function: calculate based on operator
function calculate(): number {
    if (operator == 0) {
        return value1 + value2
    } else if (operator == 1) {
        return value1 - value2
    } else if (operator == 2) {
        return value1 * value2
    } else if (operator == 3) {
        if (value2 == 0) {
            // Avoid division by zero
            basic.showString("Err")
            music.playTone(Note.C, music.beat(BeatFraction.Half))
            return 0
        }
        return value1 / value2
    }
    return 0
}

// Function: reset calculator
function resetCalculator(): void {
    value1 = 0
    value2 = 0
    result = 0
    operator = 0
    whichStep = 0
    basic.clearScreen()
}

// Function: show current operator
function showOperator(): void {
    if (operator == 0) {
        basic.showString("+")
    } else if (operator == 1) {
        basic.showString("-")
    } else if (operator == 2) {
        basic.showString("x")
    } else if (operator == 3) {
        basic.showString("/")
    }
}

// BUTTON A → decrease current value
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (whichStep == 0) {
        // Decrease first number
        value1 -= 1
    } else if (whichStep == 1) {
        // Change operator backwards
        operator = (operator + 3) % 4
        showOperator()
    } else if (whichStep == 2) {
        // Decrease second number
        value2 -= 1
    }
})

// BUTTON B → increase current value
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (whichStep == 0) {
        // Increase first number
        value1 += 1
    } else if (whichStep == 1) {
        // Change operator forward
        operator = (operator + 1) % 4
        showOperator()
    } else if (whichStep == 2) {
        // Increase second number
        value2 += 1
    }
})

// BUTTONS A+B → confirm and move to next step
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    music.playTone(Note.G, music.beat(BeatFraction.Sixteenth))
    if (whichStep == 0) {
        // Move from first number to operator selection
        whichStep = 1
        showOperator()
    } else if (whichStep == 1) {
        // Move from operator to second number
        whichStep = 2
    } else if (whichStep == 2) {
        // Calculate and show result
        result = calculate()
        whichStep = 3
        basic.showNumber(result)
        music.playTone(Note.C, music.beat(BeatFraction.Quarter))
    } else {
        // Reset calculator
        resetCalculator()
    }
})

// MAIN LOOP
basic.forever(function () {
    if (whichStep == 0) {
        basic.showNumber(value1)
    } else if (whichStep == 2) {
        basic.showNumber(value2)
    }
})
