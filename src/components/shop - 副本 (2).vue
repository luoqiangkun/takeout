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
      <div class="tab-wrapper">
        <div class="tab">
          <cube-tab-bar v-model="selectedLabel"
            show-slider
            :use-transition="disabled"
            ref="tabNav"
            :data="tabLabels">
          </cube-tab-bar>

          <div class="tab-slide-container">
            <cube-slide
              ref="slide"
              :loop="loop"
              :initial-index="initialIndex"
              :auto-play="autoPlay"
              :show-dots="showDots"
              :options="slideOptions"
              @scroll="scroll"
              @change="changePage"
            >
              <!-- 商品 -->
              <cube-slide-item>
                <div class="goods">
               
                  <div class="scroll-nav-wrapper">
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

                                  <span class="line-through">￥{{food.item_price}}</span>

                                </div>

                                <div class="price" v-else>￥{{food.item_price}}</div>
                              </div>
                              
                            </div>
                          </li>
                        </ul>
                      </cube-scroll-nav-panel>
                    </cube-scroll-nav>
                  </div>
                 
                </div>
              </cube-slide-item>
              <!-- 评论 -->
              <cube-slide-item>
                <cube-scroll :options="scrollOptions">
                  <ul class="list-wrapper">
                    <li class="list-item" :key="0">
                      
                    </li>
                  </ul>
                </cube-scroll>
              </cube-slide-item>
              <!-- 店铺 -->
              <cube-slide-item>
          </cube-slide-item>
        </cube-slide>
      </div>
        </div>
      </div>
      
    </div>

    <div class="shop-cart"></div>
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
      group:[],
      cart:{}
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

              console.log( this.group );
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
          }
          resolve(res);
        })
      });
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
<style scoped>
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
    margin-top:40px;
  }
  .shop-cart {

  }
  .tab-wrapper {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 175px;
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
    position: relative;
    text-align: left;
    height: 100%;
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

</style>
