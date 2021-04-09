export default Vue.component('goods_item', {
    template: '<div :data-id="id" class="goods_item"><h3>{{ title }}</h3><p>{{ price }}</p></div>',
    props: ['title', 'price', 'id']
})