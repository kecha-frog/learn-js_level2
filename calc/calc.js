class CalcClass {
    proverkaIsNan(num1, num2) {
        if (isNaN(num1) || isNaN(num2) || num1 === null || num2 === null || num2 === 0) {
            return true
        } else {
            return false
        }
    }

    plus(num1, num2) {
        if (this.proverkaIsNan(num1, num2)) {
            return null
        } else {
            return num1 + num2
        }

    }

    minus(num1, num2) {
        if (this.proverkaIsNan(num1, num2)) {
            return null
        } else {
            return num1 - num2
        }
    }

    multiplication(num1, num2) {
        if (this.proverkaIsNan(num1, num2)) {
            return null
        } else {
            return num1 * num2
        }
    }

    divided(num1, num2) {
        if (this.proverkaIsNan(num1, num2)) {
            return null
        } else {
            return num1 / num2
        }
    }

}

module.exports = {
    CalcClass
}
