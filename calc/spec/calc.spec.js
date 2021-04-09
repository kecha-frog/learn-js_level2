const {CalcClass} = require('../calc');
test = new CalcClass

describe('Калькулятор:', () => {
    it('проверка действий', () => {
        expect(test.plus(3, 3)).toBe(6)
        expect(test.minus(3, 3)).toBe(0)
        expect(test.multiplication(3, 3)).toBe(9)
        expect(test.divided(3, 3)).toBe(1)
    })

    it('Проверка на не число и деление ноль ', () => {
        expect(test.multiplication(4, 0)).toBeNull()
        expect(test.plus('a', 2)).toBeNull()
        expect(test.minus(2, 'a')).toBeNull()
        expect(test.multiplication('a', 'a')).toBeNull()
        expect(test.divided(null, 2)).toBeNull()
        expect(test.plus(2, null)).toBeNull()
        expect(test.multiplication(null, null)).toBeNull()
        expect(test.minus(2, undefined)).toBeNull()
        expect(test.plus(undefined, 2)).toBeNull()
        expect(test.multiplication(undefined, undefined)).toBeNull()
    })

})