Vue.component('goods-item', {
    template: '<div :data-id="id" class="goods-item"><h3>{{ title }}</h3><p>{{ price }}</p></div>',
    props: ['title', 'price', 'id']
})

Vue.component('search', {
    template: '<div><input id="search" v-model="search" v-on:input="searchHandler"></div>',
    data() {
        return {
            search: '',
            filteredGoods: []
        }
    },
    methods: {
        searchHandler() {
            const regexp = new RegExp(this.search, 'gi');
            this.filteredGoods = this.goodsapp.filter((good) => regexp.test(good.title))
            this.$emit('filtered', this.filteredGoods)
        }
    },
    props: {
        goodsapp: Array
    }
})


Vue.component('cart', {
    template: `<div>
    <button class="cart-button" @click="openCartHandler" type="button">Корзина</button>
    <div v-if="isVisibleCart" v-on:click="removeHandler">
      <slot></slot>
    </div>
  </div>`,
    data() {
        return {
            isVisibleCart: false
        }
    },
    methods: {
        openCartHandler() {
            this.isVisibleCart = !this.isVisibleCart;
        },

        removeHandler(e) {
            this.$emit('remove', e)
        }
    }
})


const API_URL = 'http://127.0.0.1:3000/data';

const vue = new Vue({
    el: "#app",
    data: {
        cart: [],
        goods: [],
        filteredGoods: []
    },

    methods: {
        addToCartHandler(e) {
            const id = e.target.closest('.goods-item').dataset.id;
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
            const id = e.target.closest('.goods-item').dataset.id;
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