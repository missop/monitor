import { behaviorTypes } from "./constants";

// 存储用户行为的结构
export interface behaviorRecordsOptions {
    maxBehaviorRecords: number;
  }
  
  // 用户行为结构
  // 用户行为：点击、跳转、ajax请求
  // 点击行为需要判断点击的哪个元素
  // 跳转，from，to
  // ajax请求，接口地址
  export interface behaviorStack {
    type: behaviorTypes;
    timestamp: number | string;
    pageUrl: string;
    value: Object;
  }
  
  // 暂存用户的行为记录追踪
  export  class BehaviorStore {
    // 数组形式的 stack
    private state: Array<behaviorStack>;
  
    // 记录的最大数量
    private maxBehaviorRecords: number;
  
    // 外部传入 options 初始化，
    constructor(options: behaviorRecordsOptions) {
      const { maxBehaviorRecords } = options;
      this.maxBehaviorRecords = maxBehaviorRecords;
      this.state = [];
    }
  
    // 从底部插入一个元素，且不超过 maxBehaviorRecords 限制数量
    push(value: behaviorStack) {
      if (this.length() === this.maxBehaviorRecords) {
        this.shift();
      }
      this.state.push(value);
    }
  
    // 从顶部删除一个元素，返回删除的元素
    shift() {
      return this.state.shift();
    }
  
    length() {
      return this.state.length;
    }
  
    get() {
      return this.state;
    }
  
    clear() {
      this.state = [];
    }
  }