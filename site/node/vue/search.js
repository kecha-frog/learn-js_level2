export default Vue.component('search', {
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