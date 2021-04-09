(()=>{"use strict";Vue.component("cart",{template:'<div>\n    <button class="cart-button" @click="openCartHandler" type="button">Корзина</button>\n    <div v-if="isVisibleCart" v-on:click="removeHandler">\n      <slot></slot>\n    </div>\n  </div>',data:()=>({isVisibleCart:!1}),methods:{openCartHandler(){this.isVisibleCart=!this.isVisibleCart},removeHandler(t){this.$emit("remove",t)}}}),Vue.component("goods_item",{template:'<div :data-id="id" class="goods_item"><h3>{{ title }}</h3><p>{{ price }}</p></div>',props:["title","price","id"]}),Vue.component("search",{template:'<div><input id="search" v-model="search" v-on:input="searchHandler"></div>',data:()=>({search:"",filteredGoods:[]}),methods:{searchHandler(){const t=new RegExp(this.search,"gi");this.filteredGoods=this.goodsapp.filter((e=>t.test(e.title))),this.$emit("filtered",this.filteredGoods)}},props:{goodsapp:Array}});const t="http://127.0.0.1:3000/data";new Vue({el:"#app",data:{cart:[],goods:[],filteredGoods:[]},components:{id1:"cart",id2:"goods_item",id3:"search"},methods:{addToCartHandler(t){const e=t.target.closest(".goods_item").dataset.id,s=this.goods.find((t=>t.id==e));fetch("/cart",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),this.cart.push(s)},removeFromCartHandler(t){console.log(t);const e=t.target.closest(".goods_item").dataset.id,s=this.cart.findIndex((t=>t.id==e));this.cart.splice(s,1),fetch("/cart",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e})})},viewFiltered(t){this.filteredGoods=t},fetch(e,s){let i;window.XMLHttpRequest?i=new XMLHttpRequest:window.ActiveXObject&&(i=new ActiveXObject("Microsoft.XMLHTTP")),i.onreadystatechange=function(){4===i.readyState&&(200===i.status?s(JSON.parse(i.responseText)):i.status>400&&e("все пропало"))},i.open("GET",t,!0),i.send()},fetchPost(e,s){let i;window.XMLHttpRequest?i=new XMLHttpRequest:window.ActiveXObject&&(i=new ActiveXObject("Microsoft.XMLHTTP")),i.onreadystatechange=function(){4===i.readyState&&(200===i.status?s(JSON.parse(i.responseText)):i.status>400&&e("все пропало"))},i.open("POST",t,!0),i.setRequestHeader("Content-type","application/json"),i.send(JSON.stringify({title:"data",price:200}))},fetchPromise(){return new Promise(((t,e)=>{this.fetch(e,t)}))}},mounted(){this.fetchPromise().then((t=>{this.goods=t,this.filteredGoods=t})).catch((t=>{console.log(t)})),this.fetchPost((()=>{}),(()=>{}))}})})();