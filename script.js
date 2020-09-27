const buttonsClear = document.querySelectorAll(".btn-clear")
const buttonsOperation = document.querySelectorAll(".operation")
const buttonsNumber = document.querySelectorAll(".btn-number")

const display = document.getElementById("display")
let memoryCurrentNumber = '0'
let memoryNewNumber = false
let memoryPendingOperation = ''

const decimalPoint = document.querySelector(".decimalPoint")
const negativeNumber = document.getElementById("minus")
const rootOfNumber = document.getElementById("sqrt")

function pressButton(e) {
    let valueButton = e.target.textContent
    display.value = valueButton
}


for (let i = 0; i < buttonsNumber.length; i++) {
    let numberButton = buttonsNumber[i]
    numberButton.addEventListener('click', function(e) {
        let valueButton = e.target.textContent
        numbersPress(valueButton)
    })
}

for (let i = 0; i < buttonsOperation.length; i++) {
    let operationButton = buttonsOperation[i]
    operationButton.addEventListener('click', function(e) {
        let valueButton = e.target.textContent
        operation(valueButton)
    })
}

for (let i = 0; i < buttonsClear.length; i++) {
    let clearButton = buttonsClear[i]
    clearButton.addEventListener('click', function(e) {
        clear(e.srcElement.id)
    })
}

decimalPoint.addEventListener('click', function(e) {
    let valueButton = e.target.textContent
    decimal(valueButton)
})

negativeNumber.addEventListener('click', function(e) {
    console.log(e);
    let valueButton = e.target.textContent
    negative(valueButton)
})

rootOfNumber.addEventListener('click', function(e) {
    console.log(e);
    let valueButton = e.target.textContent
    root(valueButton)
})


function numbersPress(value) {
    let currentNumber = value

    if (memoryNewNumber) {
        display.value = currentNumber
        memoryNewNumber = false
    } else {
        if (display.value === '0') {
            display.value = currentNumber
        } else {
            display.value += currentNumber
        }
    }

}

function operation(operation) {

    let localValue = display.value
    if (localValue === "ERROR") {
        localValue = 0
    }
    localValue = parseFloat(localValue)
    console.log('localValue: ', localValue);
    console.log('localOperation: ', memoryPendingOperation);
    if (memoryNewNumber && memoryPendingOperation != '=') {
        display.value = memoryCurrentNumber
    } else {
        memoryNewNumber = true
        if (memoryPendingOperation === '+') {
            memoryCurrentNumber += localValue
            memoryCurrentNumber = +memoryCurrentNumber.toFixed(8)
        } else if (memoryPendingOperation === '-') {
            memoryCurrentNumber -= localValue
            memoryCurrentNumber = +memoryCurrentNumber.toFixed(8)
        } else if (memoryPendingOperation === '*') {
            memoryCurrentNumber *= localValue
            memoryCurrentNumber = +memoryCurrentNumber.toFixed(8)
        } else if (memoryPendingOperation === '/') {
            memoryCurrentNumber /= localValue
            memoryCurrentNumber = +memoryCurrentNumber.toFixed(8)
        } else if (memoryPendingOperation === 'xy') {
            memoryCurrentNumber **= localValue
            memoryCurrentNumber = +memoryCurrentNumber.toFixed(8)
        } else {
            memoryCurrentNumber = localValue
        }
        display.value = memoryCurrentNumber
        memoryPendingOperation = operation
    }
}

function negative(value) {

    let localNegativeValue = display.value

    if (localNegativeValue === '0') {
        display.value = localNegativeValue
    } else if (localNegativeValue.indexOf('-') === -1) {
        localNegativeValue = `-${localNegativeValue}`
        display.value = localNegativeValue
    }

}


function decimal(value) {
    let localDecimalValue = display.value

    if (memoryNewNumber) {
        localDecimalValue = '0.'
        memoryNewNumber = false
    } else {
        if (localDecimalValue.indexOf('.') === -1) {
            localDecimalValue += '.'
        }
    }

    display.value = localDecimalValue
}

function root(value) {
    let localRootValue = display.value

    if (localRootValue < 0) {
        display.value = "ERROR"
        memoryCurrentNumber = '0'
        return
    } else {
        localRootValue = Math.sqrt(localRootValue)
        localRootValue = +localRootValue.toFixed(8)
    }

    display.value = localRootValue
}


function clear(id) {
    if (id === "CE") {
        memoryNewNumber = true
        display.value = '0'
    } else {
        display.value = '0'
        memoryCurrentNumber = '0'
        memoryNewNumber = true
        memoryPendingOperation = ''
    }
}