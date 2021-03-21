class Api {
    constructor() {
        this.url = 'goods.json';
    }

    fetch(error, success) {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    success(JSON.parse(xhr.responseText));
                } else if (xhr.status > 400) {
                    error('Всё пропало')
                }
            }
        }
        xhr.open('GET', this.url, true)
        xhr.send()
    }

    fromJSON(data) {
        return new Promise((resolve) => {
            resolve(JSON.parse(data));
        })
    }

    fetchPromise() {
        return new Promise((resolve, reject) => {
            this.fetch(reject, resolve)
        })
    }
}

class Basket {


}


class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    getHtml() {
        const picGood = document.createElement("div");
        picGood.className = "good-pic";
        const titleH3 = document.createElement("h3");
        titleH3.innerText = this.title;
        const priceP = document.createElement("p");
        priceP.innerText = this.price;
        const divGoodsPriceButton = document.createElement("div");
        divGoodsPriceButton.className = "divPriceButton";
        const buttonGood = document.createElement("button")
        buttonGood.type = "button";
        buttonGood.innerText = "добавить"
        buttonGood.className = "good-button"
        const divGoods = document.createElement("div");
        divGoods.className = "goods-item";

        divGoods.append(picGood);
        divGoods.append(titleH3);
        divGoodsPriceButton.append(priceP);
        divGoodsPriceButton.append(buttonGood);
        divGoods.append(divGoodsPriceButton);

        return divGoods;
    }
}

class GoodsList {
    constructor() {
        this.api = new Api();
        this.$container = document.querySelector('.goods-list');
        this.goods = [];
        this.sumGoods = 0;


        this.api.fetchPromise()
            .then((data) => {
                this.onFetchSuccess(data)
            })
            .catch((err) => {
                this.onFetchError(err)
            });
    }

    onFetchSuccess(data) {
        this.goods = data.map(({title, price}) => new GoodsItem(title, price));
        this.render();
    }

    onFetchError(err) {
        this.$container.insertAdjacentHTML('beforeend', `<h3>${err}</h3>`);
    }


    render() {
        this.goods.forEach(
            item => this.$container.append(item.getHtml())
        )
    }

    /*    sumAllGoods() { // Задание 2.Метод, определяющий суммарную стоимость всех товаров выведенных на страницу.
            this.goods.map(({price}) => this.sumGoods += price);
            console.log(`Сумма всех товаров в базе: ${this.sumGoods} рублей`)
        }*/

}

const goodsList = new GoodsList();


/*class Header{
    constructor() {
        this.$header = document.querySelector('header');
        this.$button = this.$header.querySelector('.cart-button');
    }

    setButtonHandler(callback){
        this.$button.addEventListener('click',callback)
    }
}

const header = new Header();
header.setButtonHandler(openCart)

function openCart(){
    console.log('cart')
}

*/

/*
goodsList.sumAllGoods();*/
