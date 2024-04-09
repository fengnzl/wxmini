import { taskMixin } from '../../mixins/task'
Page({
  mixins: [taskMixin],
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
  },
  // 新增任务
  onAddTask() {
    const { list, title } = this.data
    const taskList = [...list]
    taskList.push({
      title,
      key: Date.now(),
      done: false
    })
    this.setTaskListStorage(taskList)
    this.setData({
      list: taskList,
      title: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('this is list page on load')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})