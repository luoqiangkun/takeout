<template>
  <div class="s-wrapper">
    <div class="header">
      <div class="back"></div>
      <div class="top-group">
        <div class="search"></div>
        <div class="cart"></div>
        <div class="share"></div>
      </div>
    </div>

    <div class="shop-banner">
      <div class="image-view">
        <img src="../assets/images/banner.jpg">
      </div>
    </div>

    <div class="shop-info">
      <div class="store-logo">
        <img src="../assets/images/logo.jpg" />
      </div>
      <div class="store-name">
        肯德基上海颛桥点
      </div>
      <div class="store-desc">
        肯德基上海颛桥点
      </div>
      <div class="store-activity">
        
      </div>
    </div>

    <div class="shop-con">
      <div class="goods">         
        <div class="scroll-nav-wrapper" ref="scrollNav">
          <cube-scroll-nav v-if="group[0]" :side="true" :data="group" :current="group[0].store_product_cat_name">
            <cube-scroll-nav-panel
              v-for="(item,i) in group"
              :key="i"
              :label="item.store_product_cat_name"
              :title="item.store_product_cat_name"
            >

              <ul>
                <li v-for="(food,i) in item.items" :key="i" class="rightLi">
                  <div class="rowDiv">
                    <div class="imgWrapper">
                      <img :src="food.product_image" alt class="img" />
                    </div>
                    <div class="info">
                      <h4>{{food.product_name}}</h4>
                      <div class="sell">
                        月售
                        <span>{{8}}</span>
                        
                      </div>

                      <div class="discount" v-if="food.activity_id && food.activity_type_id == 2">
                        <i></i>
                        {{food.activity_discount_rate}}折

                        <span v-if="food.activity_item_buylimit" style="margin-left:10px">限{{food.activity_item_buylimit}}份</span>
                        
                      </div>
                      <div class="price" v-if="food.activity_id && food.activity_type_id == 2">
                        <span>￥{{food.activity_item_price}}</span>

                        <span class="line-through">￥{{food.item_unit_price}}</span>

                      </div>

                      <div class="price" v-else>￥{{food.item_unit_price}}</div>
                    </div>
                    
                    <div class="numbox">
                      <div
                        class="spec"
                        v-if="food.items.length > 1 "
                        @click="showPopup('specPopup');handleSelectSpec(food)"
                      >
                        <a href="javascript:;" class="btn-primary__round">选规格</a>
                        <span
                          class="quantity"
                          v-if="cartMap[food.product_id]"
                        >{{cartMap[food.product_id].quantity}}</span>
                      </div>

                      <div class="stepper" v-else>
                        <template v-if="cartMap[food.product_id]">
                          <transition name="move">
                            <div
                              class="cart-decrease"
                              @click.stop="decreaseItem(food.item_id)"
                              style="padding: 6px"
                            >
                              <img
                                class="inner"
                                style="width:20px; height:20px"
                                src="../assets/images/decrease.png"
                                alt
                              />
                            </div>
                          </transition>
                          <div class="cart-count">{{cartMap[food.product_id].quantity}}</div>
                        </template>

                        <div @click.stop="increaseItem(food.item_id)" style="padding:6px">
                          <img style="width:20px; height:20px" src="../assets/images/add.png" alt />
                        </div>
                      </div>
                    </div>

                  </div>
                </li>
              </ul>
            </cube-scroll-nav-panel>
          </cube-scroll-nav>
        </div>
       
      </div>
      
    </div>

    <div class="shopBarWrapper">
      <div class="shopCar">
        <div class="content">
          <div class="content-left" @click="showCar">
            <div class="logo-wrapper">
              <img
                style="width:30px;margin-left: 3px;margin-right: 9px;margin-top: 6px;"
                src="../assets/images/shopCar.png"
                alt
              />
              <div class="num" v-if="cart.store_item_quantity">{{cart.store_item_quantity}}</div>
            </div>
            <div class="price">合计：</div>
            <div class="desc">{{ cart.order_money_select_items? '￥'+ cart.order_money_select_items :'' }}</div>
          </div>
          <div class="content-right">
            <div class="pay" @click="handleOrderRouter">去下单</div>
          </div>
        </div>
      </div>
    </div>

    <div class="fb_box" :class="[ fshow ? 'show' : '']" @click="removeShow">
      <div class="fb_layer" :class="[ fshow ? 'show' : '']">

        <div class="fb_layer_tip" v-if="cart.store_activity && cart.store_activity.reduction">
          {{cart.store_activity.reduction.label}}
        </div>

        <div class="fb_layer_con">
          <div class="bar">
            <div>已选商品</div>
            <div @click="clearCart">清空</div>
          </div>

          <ul class="ulList">
            <li v-for="(item,i) in cart.items" :key="i" class="liItem">
              <dl class="item_name">
                <dt>{{item.item_name}}</dt>
                <dd>{{item.spec_name}}</dd>
              </dl>
              
              <div class="item_price">{{item.item_unit_price}} ￥</div>

              <div class="stepper">
                <template>
                  <transition name="move">
                    <div
                      class="cart-decrease"
                      @click.stop="decreaseCart(item.cart_id,item.cart_quantity)"
                      style="padding: 6px"
                    >
                      <img
                        class="inner"
                        style="width:20px; height:20px"
                        src="../assets/images/decrease.png"
                        alt
                      />
                    </div>
                  </transition>
                  <div class="cart-count">{{item.cart_quantity}}</div>
                </template>

                <div
                  @click.stop="increaseCart(item.cart_id,item.cart_quantity)"
                  style="padding:6px"
                >
                  <img style="width:20px; height:20px" src="../assets/images/add.png" alt />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <cube-popup type="center-popup" ref="specPopup" position="center" :mask-closable="true">
      <div class="card">
        <div class="card-header">{{food.product_name}}</div>
        <div class="card-body">
          <div class="card-row" v-for="(product_spec,index) in food.product_spec">
            <p>{{product_spec.name}}</p>
            <div class="card-row__flex">
              <a
                href="javascript:;"
                v-for="spec_item in product_spec.item"
                @click="handleSpecChange(spec_item)"
              >{{spec_item.name}}</a>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="total">
            <div class="total-amount">
              总计：
              <span class="mark" style="color:red">￥{{form.item_price}}</span>
            </div>
          </div>

          <div class="numbox">
            <div class="stepper">
              <template
                v-if="cartMap[food.product_id] && cartMap[food.product_id].items && cartMap[food.product_id].items[form.item_id] "
              >
                <transition name="move">
                  <div
                    class="cart-decrease"
                    @click.stop="decreaseItem(form.item_id)"
                    style="padding: 6px"
                  >
                    <img
                      class="inner"
                      style="width:20px; height:20px"
                      src="../assets/images/decrease.png"
                      alt
                    />
                  </div>
                </transition>
                <div class="cart-count">{{cartMap[food.product_id].items[form.item_id].item_quantity}}</div>
              </template>

              <div @click.stop="increaseItem(form.item_id)" style="padding:6px">
                <img style="width:20px; height:20px" src="../assets/images/add.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="close" @click="hideSpecPopup">
        
      </div>
    </cube-popup>


  </div>
</template>

<script>
import { findIndex } from '../helpers/util'
export default {
  name: 'shop',
  data () {
    return {
      selectedLabel: '点菜',
      disabled: false,
      tabLabels: [{
        label: '点菜'
      }, {
        label: '评论'
      }, {
        label: '商家'
      }],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        directionLockThreshold: 0
      },
      goods:[],
      group:[],
      cart:{},
      cartMap:{},
      food : {},
      form:{
        item_id:0,
        item_price:'',
        item_quantity:0,
        item_attribute:[]
      },
      scrollNavHeight:0,
      itemId: 0,
      current: 0,
      fshow: false
    }
  },
  computed: {
    initialIndex () {
      let index = 0
      index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
      return index
    }
  },
  methods: {
    scroll (pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    changePage(){

    },
    getStoreInfo(){
      return new Promise((resolve, reject) => {
        this.$axios.get(ApiUrl + '/index.php?ctl=Store&met=info&typ=json',{params:{store_id:1}}).then((res) => {
          var data = res.data;
          if (data.status === 200) {
              this.store = data.data;
          }
          resolve(res);
        })
      });
    },
    getStoreFood(){
      return new Promise((resolve, reject) => {
        this.$axios.get(ApiUrl + '/index.php?ctl=Store&met=storeProduct&typ=json',{params:{store_id:1}}).then((res) => {
          var data = res.data;
          if (data.status === 200) {
              this.group = data.data;

              let goods = [];
              for( let i in this.group ){
                for( let k in this.group[i].items ){
                  goods.push( this.group[i].items[k] );
                }
              }
              this.goods = goods;
          }
          resolve(res);
        })
      });
    },
    getStoreCart(){
      return new Promise((resolve, reject) => {
        this.$axios.get(ApiUrl + '/index.php?ctl=Store&met=storeCart&typ=json',{params:{store_id:1}}).then((res) => {
          var data = res.data;
          if (data.status === 200) {
              this.cart = data.data;

              this.getCartMap();
          }
          resolve(res);
        })
      });
    },
    getCartMap(){
      let cartMap = {};
      if( this.cart ){
        for( let m in this.cart.items ){
          if( !cartMap[this.cart.items[m].product_id] ){
            cartMap[this.cart.items[m].product_id] = {
              id : this.cart.items[m].product_id,
              name : this.cart.items[m].product_name,
              quantity :0,
              items:{}
            }
          }
        
          cartMap[this.cart.items[m].product_id].items[this.cart.items[m].item_id] = this.cart.items[m]
          cartMap[this.cart.items[m].product_id].quantity += this.cart.items[m].item_quantity
        }
      }
      this.cartMap = cartMap;
    },
    hideSpecPopup(){
       this.$refs.specPopup.hide()
    },
    handleSelectSpec( food ){
      this.food = food
      const item_id =  food.item_id;
      const item_price =  food.item_unit_price;
      this.form.item_id = item_id;
      this.form.item_price = item_price;
    },
    handleSpecChange(item){
      this.form.item_id = item.item_id;
      this.form.item_price = item.item_unit_price;
    },
     //添加购物车 item_id 商品ID item_quantity 商品数量
    handleAddCart(item_id, item_quantity) {
      return new Promise((resolve, reject) => {
        this.$axios.get(ApiUrl + '/index.php?ctl=Cart&met=addCart&typ=json',{params:{store_id:1,item_id:item_id,cart_quantity:item_quantity,cart_type:5}}).then((res) => {
          var data = res.data;
          if (data.status === 200) {
              this.cart = data.data;

              this.getCartMap();
          } else {
              this.toast = this.$createToast({
              txt: '操作失败',
              type: 'txt'
            })
            this.toast.show()
          }
          resolve(res);
        })
      });
    },

    //编辑购物车 cart_id 购物车ID cart_quantity 商品数量
    handleEditCart(cart_id, cart_quantity) {
      return new Promise((resolve, reject) => {
        this.$axios.get(ApiUrl + '/index.php?ctl=Cart&met=editCart&typ=json',{params:{store_id:1,cart_id:cart_id,cart_quantity:item_quantity,cart_type:5}}).then((res) => {
          var data = res.data;
          if (data.status === 200) {
              this.cart = data.data;

              this.getCartMap();
          } else {
              this.toast = this.$createToast({
              txt: '操作失败',
              type: 'txt'
            })
            this.toast.show()
          }
          resolve(res);
        })
      });
    },
    //删除购物车 cart_id 购物车ID
    handleRemoveCart(cart_id) {
      cartDelete({ cart_id: cart_id }).then(res => {
        if (res.status === 200) {
          this.cart = res.data;
          this.initCartMap();
        } else {
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },
    //
    increaseItem(item_id) {
  
      const goods = this.getGoodsByItemId(item_id);
      let item_attribute = [];
     
      if (
        this.cartMap[goods.product_id] &&
        this.cartMap[goods.product_id].items &&
        this.cartMap[goods.product_id].items[item_id]
      ) {
        let item_quantity = this.cartMap[goods.product_id].items[item_id]
          .item_quantity;
        item_quantity++;
        this.handleEditCart(
          this.cartMap[goods.product_id].items[item_id].cart_id,
          item_quantity,
          item_attribute
        );
      } else {
        this.handleAddCart(item_id, 1,item_attribute);
      }
    },
    decreaseItem( item_id ) {
      const goods = this.getGoodsByItemId( item_id );
      let item_quantity = this.cartMap[goods.product_id].items[item_id].item_quantity
      item_quantity--;
      if( item_quantity <= 0 ){
        this.handleRemoveCart(this.cartMap[goods.product_id].items[item_id].cart_id);
      } else {
        this.handleEditCart(this.cartMap[goods.product_id].items[item_id].cart_id,item_quantity);
      }
    },
    increaseCart( cart_id,cart_quantity ){
      cart_quantity++;
      this.handleEditCart(cart_id,cart_quantity);
    },
    decreaseCart( cart_id,cart_quantity){
      cart_quantity--;
      if( cart_quantity <= 0 ){
        this.handleRemoveCart(cart_id);
      } else {
        this.handleEditCart(cart_id,cart_quantity);
      }
    },
    getGoodsByItemId( item_id ){
      for( let i in this.goods ){
        for( let n in this.goods[i].items ){
          if( this.goods[i].items[n].item_id === item_id ){
            return this.goods[i]
          }
        }
      }
    },
    handleOrderRouter(){
      if (this.cart && this.cart.items.length > 0) {
        let cart_id = [];
        for (let i in this.cart.items) {
          cart_id.push(this.cart.items[i].cart_id);
        }

        this.$router.push(`/orderInfo/${cart_id}`);

      } else {
        this.toast = this.$createToast({
            txt: '请选择商品',
            type: 'txt'
          })
        this.toast.show()
      }
    },
    showPopup(refId) {
      const component = this.$refs[refId];
      component.show();
      setTimeout(() => {
        // component.hide();
      }, 1000);
    },
    showCar() {
      if (this.cart.length == 0) {
        return;
      } else {
        this.fshow = !this.fshow;
      }
    },
    removeShow() {
      this.fshow = false;
    },
    clearCart() {
      cartClear({store_id:this.store.store_id}).then( res => {
        if( res.status === 200 ){
          this.cart = {};
        }else{
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      })
    },
    goSearch() {
      this.$router.push(`/search/${this.store_id}`)
    }
  },
  created(){
    this.getStoreInfo();
    this.getStoreFood();
    this.getStoreCart();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .s-wrapper {
    
  }
  .header {
      display:flex;
      background:transparent;
      border-bottom:0;
      align-items: center;
      justify-content: space-between;
  }
  .header .back {
    width:1rem;
    height:1rem;
    background:url('../assets/images/back.png');
    background-report:no-report;
    background-position:50% 50%;
    background-size:100%;
  }
  .header .top-group {
    display:flex;
    align-items: center;
    justify-content: space-between;
  }
  .top-group .search {
    width:1rem;
    height:1rem;
    background:url('../assets/images/search.png');
    background-report:no-report;
    background-position:50% 50%;
    background-size:100%;
    margin-right:.5rem;
  }
  .top-group .cart {
    width:1rem;
    height:1rem;
    background:url('../assets/images/cart.png');
    background-report:no-report;
    background-position:50% 50%;
    background-size:100%;
    margin-right:.5rem;
  }
  .top-group .share {
    width:1rem;
    height:1rem;
    background:url('../assets/images/share.png');
    background-report:no-report;
    background-position:50% 50%;
    background-size:100%;
    margin-right:.5rem;
  }
  .shop-banner {
    width:100%;
    overflow:hidden;
    background: rgba(0,0,0,.55);
  }
  .shop-banner .image-view {

  }
  .shop-banner .image-view img {
      width:100%;
  } 
  .shop-info {
    width:90%;
    margin:-40px auto;
    position:relative;
    border-radius: 5px;
    background:#fff;
    box-shadow: 0 5px 10px #eee;
    padding:15px;
    text-align:left;
    box-sizing:border-box;
  }

  .shop-info .store-logo{
    position:absolute;
    top:-20px;
    right:15px;
    width:65px;
    height:65px;

  }
  .shop-info .store-logo img {
    width:100%;
    border-radius:5px;
  }
  .shop-info .store-name{
    font-size:20px;
    font-weight:bold;
    margin-bottom: 15px;
  }
  .shop-info .store-desc{
    font-size:12px;
    color:#b5b5b5;
  }
  .shop-info .store-activity{

  }

  .shop-con {
    position: relative;
    width: 100%;
    height: 100%;
    margin-top:50px;
  }
  .shop-cart {

  }
  .tab-wrapper {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 185px;
  }
  .tab {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .tab .cube-tab {
    padding: 10px 0;
  }
  .tab .slide-wrapper {
    flex: 1;
    overflow: hidden;
  }
  .tab .tab-slide-container {
    flex: 1;
    overflow: hidden;
  }
  
  .goods {
    position: fixed;
    text-align: left;
    height: 100%;
    width:100%;
  }

  .cube-scroll-nav-panel-title {
    background: #f3f5f7;
    border-left: 2px solid #d9dde1;
    color: #666;
    font-size: 12px;
    height: 26px;
    line-height: 26px;
    padding-left: 14px;
  }
    
  .scroll-nav-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 48px;
  }
     
  .scroll-nav-wrapper .cube-scroll-nav-bar {
    width: 80px;
    white-space: normal;
    overflow: hidden;
  }
      
  .scroll-nav-wrapper .cube-scroll-nav-bar-item {
    padding: 0 10px;
    display: flex;
    align-items: center;
    height: 56px;
    line-height: 14px;
  }
     
  .rightLi .rowDiv {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.7rem 1rem;
  }
  .rowDiv h4 {
    font-size: 14px;
    line-height: 1.2;
    font-weight: bold;
  }

  .rowDiv .imgWrapper {
      
  }

  .rowDiv .imgWrapper .img {
    width: 4rem;
    height: 4rem;
    border-radius: 0.3rem;
  }

  .rowDiv .info {
    margin-left: 0.3rem;
  }
  .rowDiv .info h4 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 8rem;
    margin-bottom: 6px;
  }

  .rowDiv .info .sell {
    color: #b9b9b9;
    font-size: 0.7rem;
    margin-bottom: 6px;
     margin-top:10px;
  }

  .rowDiv .info .price {
    color: #fe7e00;
    font-weight:600;
    margin-top:5px;
  }
  .rowDiv .info .price span {
    margin-right:10px;
  }
  .rowDiv .info .price .line-through {
    color:#999;
    font-size:14px;
    text-decoration: line-through;
  } 
  .rowDiv .info .discount {
    color:#fe7e00;
    margin-top:5px;
    font-size:14px;
    display:flex;
  }
  .rowDiv .info .discount i {
    width:15px;
    height:15px;
    display:inline-block;
    background:url('../assets/images/discount.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin-right:5px;
  }
  .rowDiv .numbox {
    position: absolute;
    right: 0.5rem;
    top: 2.5rem;
  }

  .cube-bottom-popup .cube-popup-content {
  }

  .cube-center-popup .cube-popup-content {
    width: 90%;
    background: #fff;
    border-radius: 8px;
  }

  .cube-scroll-nav-bar-item {
    padding: 20px 15px;
  }

  .cube-scroll-nav-bar-item_active {
    border-left: 2px solid #fc9153;
    font-weight:600;

  }

  .cube-scroll-nav-bar_vertical {
    text-align: left;
  }

  .cube-scroll-nav-bar {
    background: #f8f8f8;
  }

  .cube-scroll-nav-bar-item_active {
    position: relative;
    border: none;
    background: #fff;
  }
  .cube-scroll-nav-bar-item_active:before {
    position: absolute;
    content: '';
    width: 3px;
    height: 54px;
    left: 0;
    background-color: #fc9153;
    top: 0;
  }
  .shopBarWrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 111;
      box-shadow: 0 0 10px #d7d7d7;
}

.uu {
  background: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.cube-btn {
  position: fixed;
  z-index: 9999;
}

.stepper {
  display: flex;
  align-items: center;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    opacity: 1;

    .inner {
      display: inline-block;
      line-height: 24px;
      transition: all 0.3s linear;
      transform: rotate(0);
    }

    &.move-enter-active, &.move-leave-active {
      transition: all 0.3s linear;
    }

    &.move-enter, &.move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);

      .inner {
        transform: rotate(180deg);
      }
    }
  }

  .cart-count {
    width: 16px;
    padding: 2px;
    line-height: 24px;
    overflow: hidden;
    text-align: center;
  }
}

.shopCar {
  height: 100%;
}

.shopCar .content {
  display: flex;
  background: #fff;
  font-size: 0;
  color: #999;
  height: 100%;
}

.shopCar .content .content-left {
  flex: 1;
  display: flex;
}

.logo-wrapper {
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  box-sizing: border-box;
  border-radius: 50%;
}

.logo-wrapper .logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
}

.logo-wrapper .num {
  font-size: 10px;
  line-height: 1.4;
  position: absolute;
  top: 3px;
  left: 84%;
  margin-left: -10px;
  padding: 1px 5px;
  color: #fff;
  background: #FE7E00;
  border-radius: 100px;
}

.price {
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  line-height: 24px;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 16px;
}

.desc {
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  line-height: 24px;
  font-size: 10px;
  color: #FE7E00;
  font-size: 16px;
}
.shopCar .content .content-right {
  width: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-right .pay {
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  background: #FE7E00;
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
}

.cube-popup-container, .cube-popup-mask {
  bottom: 48px;
}

.ulList {
  background-color: #fff;
  padding-top: 30px;
}

.liItem {
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
}

.item_name {
  font-weight: 700;
  width: 70%;
}

.item_price {
  color: #FE7E00;
}

.spec {
  position: relative;
}

.btn-primary__round {
  color: #fff;
  background: #fe7e00;
  border-radius: 1rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
}

.quantity {
  position: absolute;
  top: -10px;
  right: -8px;
  font-size: 12px;
  background-color: rgba(249, 50, 50, 0.859);
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: block;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  line-height: 20px;
}

.card {
}

.card-header {
  padding: 15px 20px 10px;
}

.card-body {
  padding: 5px 20px;
  min-height: 180px;
}

.card-footer {
  padding: 10px 20px 15px;
}

.card-row {
  margin-bottom: 10px;
}

.card-row p {
  color: #999;
  font-size: 12px;
  line-height: 2rem;
}

.card-row .card-row__flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card-row__flex a {
  width: 30%;
  display: inline-block;
  text-align: center;
  padding: 0.5rem 0;
  border: 1px solid #efefef;
  border-radius: 0.25rem;
  box-sizing: border-box;
  margin: 0.25rem 0;
  font-size: 14px;
  color: #333;
}

.card-row__flex a:after {
  content: '';
  width: 30%;
  border: 1px solid transparent;
}

.card-row__flex a.active {
  color: #fe7e00;
  background: #fbf1df;
  border: 1px solid #fe7e00;
}

.card-footer {
  display: flex;
}

.card-footer .total {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
}
.card-footer .total .total-discount {
  font-size: 0.8rem;
  color: #999;
}

.card-footer button {
  color: #fff;
  background: #fe7e00;
  border: 0;
  padding: 0.25rem 0.8rem;
  border-radius: 1rem;
}

.close {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 50%;
  margin-left: -15px;
  margin-top: 20px;
  border: 1px solid #fff;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
}

.close img {
  width: 60%;
  padding: 20%;
}

.mark {
  font-size: 1rem;
  color: #f93232db;
  font-weight: 600;
}

.scrollDv {
  max-height: 300px;
  overflow-y: auto;
}

.show.fb_box {
  top: 0;
}

.fb_box {
  position: fixed;
  top: 100%;
  bottom: 50px;
  left: 0;
  right: 0;
  z-index: 110;
  background-color: rgba(0, 0, 0, 0.7);
}

.show.fb_box .fb_layer {
  position: absolute;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.fb_box .fb_layer {
  position: absolute;
  -webkit-transform: translate3d(0, 495px, 0);
  transform: translate3d(0, 495px, 0);
  -webkit-transition: -webkit-transform 0.2s cubic-bezier(0, 0, 0.25, 1);
  transition: -webkit-transform 0.2s cubic-bezier(0, 0, 0.25, 1);
  transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
  transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1), -webkit-transform 0.2s cubic-bezier(0, 0, 0.25, 1);
  bottom: 0;
  bottom: constant(safe-area-inset-bottom);
  bottom: env(safe-area-inset-bottom);
  width: 100%;
  max-height: 350px;
  background-color: #fff;
}

.fb_layer_tip {
  text-align:center;
  background-color: #fef0f0;
  color: #f56c6c;
  padding:5px;
  font-size:14px;
}

.fb_layer_con {
  max-height: 350px;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.overflowHide {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.bar {
  position: fixed;
  width: 100%;
  display: flex;
  background: #eceff1;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
  color: #666;
}
</style>
