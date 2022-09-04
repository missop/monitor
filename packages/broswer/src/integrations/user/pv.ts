// 记录pv

import { getPageInfo } from "./basic"
import { proxyHash, proxyHistory } from "./route";

export interface OriginInformation {
    referrer: string;
    type: number | string;
  }
  
  // 返回 OI 用户来路信息
  export const getOriginInfo = (): OriginInformation => {
    return {
      referrer: document.referrer,
      type: window.performance?.navigation.type || '',
    };
  };

  export const afterLoad = (callback) => {
    window.onload = () => {
        callback()
    }
  }

export const initPV = (monitor) => {
    const handler = () => {
        const metrics = {
            // 还有一些标识用户身份的信息，由项目使用方传入，任意拓展 eg:userId
           // 创建时间
           timestamp: new Date().getTime(),
           pageInfo:getPageInfo(),
           originInformation:getOriginInfo()
       }
       monitor.userSendHandler(metrics)
    }

    // 页面加载之后进行pv上报
    afterLoad(()=>{
        handler()
    })

    // 当页面切换之后进行pv上报，pv是根据页面维度来统计的
    proxyHash(handler);
    proxyHistory(handler);
}