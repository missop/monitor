// 访客来路的统计

// 直接在地址栏中输入地址跳转
// 直接通过浏览器收藏夹打开
// 从https的网站直接进入一个http协议的网站


enum NavigationType {
  "navigate",
  "reload",
  "back_forward",
  "prerender"
};

export interface OriginInformation {
    referrer: string;
    type: number | string;
  }

export const getOriginInfo = (): OriginInformation => {
  const type = (performance.getEntriesByType("navigation")[0] as any).type as NavigationType
  return {
    referrer: document.referrer,
    type,
  };
};