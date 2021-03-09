const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];


const $goodsList = document.querySelector('.goods-list');

const renderGoodsItem = ({title, price}) => {
    const titleH3 = document.createElement("h3");
    titleH3.innerText = title;

    const priceP = document.createElement("p");
    priceP.innerText = price;

    const divGoods = document.createElement("div");
    divGoods.className = "goods-item";
    divGoods.append(titleH3);
    divGoods.append(priceP);

    return divGoods
};

const renderGoodsList = (list = goods) => {
    for (item of list) {
        $goodsList.append(renderGoodsItem(item))
    }
}

renderGoodsList();


// //3 задание( добавить  join чтоб пропала запятая
// const renderGoodsList = (list = goods) => {
//     let goodsList = list.map(
//         item => renderGoodsItem(item)
//     ).join('');
//
//     $goodsList.insertAdjacentHTML('beforeend', goodsList);
// }
