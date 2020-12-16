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
            <cube-scroll :data="goodsData" :options="scrollOptions">
              <div class="goods">
                <div class="scroll-nav-wrapper">
                  <cube-scroll-nav
                    :side=true
                    :data="goods"
                    :options="scrollOptions"
                    v-if="goods.length"
                  >
                    <template slot="bar" slot-scope="props">
                      <cube-scroll-nav-bar
                        direction="vertical"
                        :labels="props.labels"
                        :txts="barTxts"
                        :current="props.current"
                      >
                        <template slot-scope="props">
                          <div class="text">
                            <support-ico
                              v-if="props.txt.type>=1"
                              :size=3
                              :type="props.txt.type"
                            ></support-ico>
                            <span>{{props.txt.name}}</span>
                            <span class="num" v-if="props.txt.count">
                              <bubble :num="props.txt.count"></bubble>
                            </span>
                          </div>
                        </template>
                      </cube-scroll-nav-bar>
                    </template>
                    <cube-scroll-nav-panel
                      v-for="good in goods"
                      :key="good.name"
                      :label="good.name"
                      :title="good.name"
                    >
                      <ul>
                        <li
                          @click="selectFood(food)"
                          v-for="food in good.foods"
                          :key="food.name"
                          class="food-item"
                        >
                          <div class="icon">
                            <img width="57" height="57" :src="food.icon">
                          </div>
                          <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="desc">{{food.description}}</p>
                            <div class="extra">
                              <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                              <span class="now">￥{{food.price}}</span>
                              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                            <div class="cart-control-wrapper">
                              <cart-control @add="onAdd" :food="food"></cart-control>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </cube-scroll-nav-panel>
                  </cube-scroll-nav>
                </div>
                <div class="shop-cart-wrapper">
                  <shop-cart
                    ref="shopCart"
                    :select-foods="selectFoods"
                    :delivery-price="seller.deliveryPrice"
                    :min-price="seller.minPrice"></shop-cart>
                </div>
              </div>
              
            </cube-scroll>
          </cube-slide-item>
          <!-- 评论 -->
          <cube-slide-item>
            <cube-scroll :data="commentData" :options="scrollOptions">
              <ul class="list-wrapper">
                <li class="list-item" :key="0">
                  
                </li>
              </ul>
            </cube-scroll>
          </cube-slide-item>
          <!-- 店铺 -->
          <cube-slide-item>
            <cube-scroll :data="shopData" :options="scrollOptions">
              
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
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
      goodsData:{},
      commentData:{},
      shopData:{}
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
    
    }
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
  .tab {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .tab {

  }  
  .tab .cube-tab {
    padding: 10px 0;
  }
  .tab .slide-wrapper {
    flex: 1;
    overflow: hidden;
  }
  
  .goods {
    position: relative;
    text-align: left;
    height: 100%;
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
    font-size: $fontsize-small;
    background: $color-background-ssss;
  }
     
  .cube-scroll-nav-bar-item .text {
    flex: 1;
    position: relative;
  }
      
  .cube-scroll-nav-bar-item .num {
    position: absolute;
    right: -8px;
    top: -10px;
  }
      
  .cube-scroll-nav-bar-item .support-ico {
    display: inline-block;
    vertical-align: top;
    margin-right: 4px;
  }
      
  .cube-scroll-nav-bar-item .cube-scroll-nav-bar-item_active {
    background: $color-white;
    color: $color-dark-grey;
  }
      
  .cube-scroll-nav-bar-item .cube-scroll-nav-panel-title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid $color-col-line;
    font-size: $fontsize-small;
    color: $color-grey;
    background: $color-background-ssss;
  }
      
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      position: relative;
    }
      
    .food-item:last-child {
      border:0;
      margin-bottom: 0;
    }
        
    .food-item  .icon {
      flex: 0 0 57px;
      margin-right: 10px;
    }
        
    .food-item  .icon  img {
      height: auto;
    }
          
    .food-item  .content {
      flex: 1;
    }
        
    .food-item  .content  .name {
      margin: 2px 0 8px 0;
      height: 14px;
      line-height: 14px;
      font-size: $fontsize-medium;
      color: $color-dark-grey;
    }
          
    .food-item  .content  .desc, .food-item  .content  .extra {
      line-height: 10px;
      font-size: $fontsize-small-s;
      color: $color-light-grey;
    }
          
    .food-item  .content  .desc {
      line-height: 12px;
      margin-bottom: 8px;
    }
          
    .food-item  .content .extra .count {
      margin-right: 12px;
    }
    .food-item  .content  .price {
      font-weight: 700;
      line-height: 24px;
    }
          
    .food-item  .content  .price  .now {
      margin-right: 8px;
      font-size: $fontsize-medium;
      color: $color-red;
    }
            
    .food-item  .content .price .old {
      text-decoration: line-through;
      font-size: $fontsize-small-s;
      color: $color-light-grey;
    }
            
    .cart-control-wrapper {
      position: absolute;
      right: 0;
      bottom: 12px;
    }
        
    .shop-cart-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 50;
      width: 100%;
      height: 48px;
    }
      
</style>
