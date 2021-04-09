class Quotes {
    constructor(text) {
        this.body = document.body

        this.regExpAll = /'/g;
        this.regExp = /\B'|'\B/g;

        this.textP = document.createElement("p");
        this.textP.textContent = text

        this.textReplaceAll = document.createElement("p")
        this.textReplacePart = document.createElement("p")

    }

    raplaceText(value = this.textP.textContent) {
        this.textReplaceAll.innerHTML = '<b>Replace All (1 3адание = заменяет все одинарные кавычки на двойные) </b><br><br>' + value.replace(this.regExpAll, '"');
        this.textReplacePart.innerHTML = '<b>Replace Part (2 3адание = в конструкциях типа aren\'t одинарная кавычка не заменяется на двойную)</b><br><br>' + value.replace(this.regExp, '"')
    }

    render() {
        this.raplaceText()
        this.body.append(this.textP)
        this.textP.after(this.textReplaceAll)
        this.textReplaceAll.after(this.textReplacePart)
    }
}

class FormReg {
    constructor() {
        this.body = document.body
        this.form = document.createElement("form")
        this.formText = document.createElement("p")
        this.formText.innerHTML = '<b> 3 задание </b><br>'
        this.inputName = document.createElement("input")
        this.inputName.type = 'text'
        this.inputName.placeholder = 'Name'
        this.inputPhone = document.createElement("input")
        this.inputPhone.type = 'tel'
        this.inputPhone.placeholder = 'Формат+7(999)999-9999'
        this.inputMail = document.createElement("input")
        this.inputMail.type = 'pochta' // Специально так назвал, так как не дает писать c ошибкой во время теста
        this.inputMail.placeholder = 'EMail @mail.ru'
        this.textArea = document.createElement("textarea")
        this.textArea.placeholder = 'Произвольный текст'
        this.button = document.createElement("button")
        this.button.type = "submit"
        this.button.innerText = "Отправить"
        this.buttonWrong = document.createElement("button")
        this.buttonWrong.innerText = "Вставить неверные данные"
        this.buttonOk = document.createElement("button")
        this.buttonOk.innerText = "Вставить верные данные"
    }

    addEventListener() {
        const regexpName = /^[a-zA-Z]+$/i
        const regexpMail = /[a-z0-9]+(?:[._-]([a-z0-9]+))*@mail.ru/i
        const regexpPhone = /(\+7)(\(\d{3}\))(\d{3})(-\d{4})/

        this.form.addEventListener('submit', (e) => {
            e.preventDefault()

            if (regexpName.test(this.inputName.value)) {
                this.inputName.style.border = ""
            } else if (!regexpMail.test(this.inputMail.value)) {
                this.inputName.style.border = "1px solid red";
                this.inputName.value = 'ОШИБКА'
            }

            if (regexpMail.test(this.inputMail.value)) {
                this.inputMail.style.border = ""
            } else if (!regexpMail.test(this.inputMail.value)) {
                this.inputMail.style.border = "1px solid red";
                this.inputMail.value = 'ОШИБКА'
            }

            if (regexpPhone.test(this.inputPhone.value)) {
                this.inputPhone.style.border = ""
            } else if (!regexpPhone.test(this.inputMail.value)) {
                this.inputPhone.style.border = "1px solid red";
                this.inputPhone.value = 'ОШИБКА'
            }

        })

        this.buttonWrong.addEventListener("click", (e) => {
            this.inputName.value = 'Ivan12'
            this.inputPhone.value = '+79999999999'
            this.inputMail.value = 'Mail--@mail.com'
            this.textArea.value = 'When a person first applies'

        })

        this.buttonOk.addEventListener("click", (e) => {
            this.inputName.value = 'Ivan'
            this.inputPhone.value = '+7(999)999-9999'
            this.inputMail.value = 'Mail@mail.ru'
            this.textArea.value = 'When a person first applies'
        })
    }


    render() {
        this.body.append(this.form)
        this.form.append(this.formText)
        this.form.append(this.inputName)
        this.form.append(this.inputPhone)
        this.form.append(this.inputMail)
        this.form.append(this.textArea)
        this.form.append(this.button)
        this.body.append(this.buttonWrong)
        this.body.append(this.buttonOk)
        this.form.style.display = 'table-caption'
        this.addEventListener()
    }
}

const text = "'When a person first applies for a credit card with little or no credit history, the interest rate will not be as low as it is for a person who has a well-established credit history. However, don't become discouraged. Everyone has to start somewhere. A new credit card holder will probably be limited to a $500 credit line. This is a figure that many banks use for new credit card customers. This limit is in place until the cardholder shows that he or she is a responsible person by making the monthly payments on time. If the credit card payment is due on the 25th day of each month, it will be a good idea to pay it a day or two before that date. With that done, the credit line will increase giving the user more freedom to use his or her card.'"

const replaceText = new Quotes(text) // 1 и 2 задание
replaceText.render();

const test2 = new FormReg() // 3 задание
test2.render()

