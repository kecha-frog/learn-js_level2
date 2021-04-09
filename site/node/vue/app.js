import cart from "./cart";
import good_item from "./good_item";
import search from "./search";

const API_URL = 'http://127.0.0.1:3000/data';

const vue = new Vue({
    el: "#app",
    data: {
        cart: [],
        goods: [],
        filteredGoods: []
    },

    components: {
        id1: 'cart',
        id2: 'goods_item',
        id3: 'search'
    },

    methods: {
        addToCartHandler(e) {
            const id = e.target.closest('.goods_item').dataset.id;
            const good = this.goods.find((item) => item.id == id);

            fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(good)
            })

            this.cart.push(good);
        },

        removeFromCartHandler(e) {
            console.log(e)
            const id = e.target.closest('.goods_item').dataset.id;
            const goodIndex = this.cart.findIndex((item) => item.id == id);

            this.cart.splice(goodIndex, 1);

            fetch('/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id})
            })
        },

        viewFiltered(filteredItem) {
            this.filteredGoods = filteredItem
        },

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
                        error('все пропало');
                    }
                }
            }

            xhr.open('GET', API_URL, true);
            xhr.send();
        },

        fetchPost(error, success) {
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
                        error('все пропало');
                    }
                }
            }

            xhr.open('POST', API_URL, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify({title: "data", price: 200}))
        },

        fetchPromise() {
            return new Promise((resolve, reject) => {
                this.fetch(reject, resolve)
            })
        }
    },

    mounted() {
        this.fetchPromise()
            .then(data => {
                this.goods = data;
                this.filteredGoods = data;
            })
            .catch(err => {
                console.log(err);
            })
        this.fetchPost(() => {
        }, () => {
        })
    }
})