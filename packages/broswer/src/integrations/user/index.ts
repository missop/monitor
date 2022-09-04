import WebSdk from "../..";
import { getPageInfo, PageInformation } from "./basic";
import { clickHandler } from "./click";
import { initPV } from "./pv";
import { initRouteChange, wrHistory } from "./route";
import { initStayTime } from "./stay";
import { BehaviorStore } from "./store";

export default class UserMonitor {
  // 用户基础信息
    public pageInfo!:PageInformation;
    // 存储用户行为的数据结构
    public breadcrumbs!:BehaviorStore;

    constructor(monitor:WebSdk,options:any){
      // 1.用户基础信息
      this.pageInfo = getPageInfo();

      // 2.用户切换页面行为记录
      this.breadcrumbs = new BehaviorStore({
        maxBehaviorRecords:options.maxBehaviorRecords || 100
      })
      // 重写history事件
      wrHistory()
      // 拦截history和hash
      initRouteChange(this.breadcrumbs);
      // 3.用户点击行为记录
      clickHandler(this.breadcrumbs);

      // 4.记录pv，用户来路信息
      initPV(this);

      // 5.用户停留时间记录
      initStayTime();

      // 6.IP采集，这个sdk侧无法采集需要借助nodejs

    }
}