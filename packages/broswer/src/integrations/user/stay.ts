const routeList:any[] = [];
const routeTemplate = {
  userId: '', // 用户信息等
  // 除了userId以外，还可以附带一些其余的用户特征到这里面
  url: '',
  startTime: 0,
  dulation: 0,
  endTime: 0,
};
function recordNextPage() {
  // 记录前一个页面的页面停留时间
  const time = new Date().getTime();
  routeList[routeList.length - 1].endTime = time;
  routeList[routeList.length - 1].dulation = time - routeList[routeList.length - 1].startTime;
  // 推一个新的页面停留记录
  routeList.push({
    ...routeTemplate,
    ...{ url: window.location.pathname, startTime: time, dulation: 0, endTime: 0 },
  });
}

export const initStayTime = () => {
    // 第一次进入页面时,记录
    window.addEventListener('load', () => {
        const time = new Date().getTime();
        routeList.push({
        ...routeTemplate,
        ...{ url: window.location.pathname, startTime: time, dulation: 0, endTime: 0 },
        });
    });
    // 单页面应用触发 replaceState 时的上报
    window.addEventListener('replaceState', () => {
        recordNextPage();
    });
    // 单页面应用触发 pushState 时的上报
    window.addEventListener('pushState', () => {
        recordNextPage();
    });
    // 浏览器回退、前进行为触发的 可以自己判断是否要上报
    window.addEventListener('popstate', () => {
        recordNextPage();
    });
    // 关闭浏览器前记录最后的时间并上报
    window.addEventListener('beforeunload', () => {
        const time = new Date().getTime();
        routeList[routeList.length - 1].endTime = time;
        routeList[routeList.length - 1].dulation = time - routeList[routeList.length - 1].startTime;
        // 记录完了离开的时间，就可以上报了
        // eg: report()
    });
}
