// mixin.js
// 保存原生的 Page 函数
const originPage = Page
// 定义小程序内置的属性/方法
const prop = ['data', 'properties', 'options']
const methods = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onTabItemTap']

Page = (options) => {
  if (Array.isArray(options.mixins)) {
    const mixins = options.mixins
    delete options.mixins
    mixins.forEach((mixin) => {
      for (let [key, value] of Object.entries(mixin)) {
        if (prop.includes(key)) {
          // 混入属性
          options[key] = {
            ...value,
            ...options[key]
          }
        } else if (methods.includes(key)) {
          // 混入原生方法
          const originFunc = options[key]
          options[key] = function (...args) {
            value.call(this, ...args)
            return originFunc && originFunc.call(this, ...args)
          }
        } else {
          // 混入普通方法
          options = {
            ...mixin,
            ...options
          }
        }
      }
    })
  }
  originPage(options)
}
