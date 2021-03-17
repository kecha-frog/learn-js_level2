class ApiMock {
    constructor() {

    }

    fetch() {
        return [
            {title: 'Shirt', price: 150},
            {title: 'Socks', price: 50},
            {title: 'Jacket', price: 350},
            {title: 'Shoes', price: 250},
            {title: 'Shirt', price: 150},
            {title: 'Socks', price: 50},
            {title: 'Jacket', price: 350},
            {title: 'Shoes', price: 250},
        ];
    }
}

/* //Задание 1. Будет у наследован класс отображение товара, удалено изображение и изменен стилями
class Basket  extends GoodsItem{
    constructor(title, price) {
        super(title, price);
        this.basket = []; //Добавлен массив корзина, в которой по нажимание кнопки будет добавлен товар в массив
    }

    render(){
        //Будет отображаться список товар по нажатию на корзину
    }

}
*/


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
        this.api = new ApiMock();
        this.container = document.querySelector('.goods-list');
        this.goods = [];
        this.sumGoods = 0;
    }

    fetchGoods() {
        this.goods = this.api.fetch().map(({title, price}) => new GoodsItem(title, price));
    }

    render() {
        this.goods.forEach(
            item => this.container.append(item.getHtml())
        )
    }

    sumAllGoods() { // Задание 2.Метод, определяющий суммарную стоимость всех товаров выведенных на страницу.
        this.goods.map(({price}) => this.sumGoods += price);
        console.log(`Сумма всех товаров в базе: ${this.sumGoods} рублей`)
    }

}

const goodsList = new GoodsList();


goodsList.fetchGoods();
goodsList.render();
goodsList.sumAllGoods();