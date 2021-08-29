import { request } from "./request";

export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
        iid
    }
  })
}
// 获取推荐信息数据
export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

// // 商家信息太乱，定义一个类来保存
export class Goods {
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    // this.discountBgColor = itemInfo.discountBgColor
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
    // this.nowPrice = itemInfo.highNowPrice;
  }
}

export class GoodsParam {
  constructor(info,rule){
    this.image = info.image ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
} 
// 店铺信息太乱，定义一个类来保存
export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}