export const taskMixin = {
  /**
   * 页面的初始数据
   */
  data: {
    list: wx.getStorageSync({
      key: 'taskList',
    }) || []
  },
  // 任务勾选状态改变
  onTriggerCheck(e) {
    const { item, index } = e.detail
    const list = [...this.data.list]
    list[index].done = !list[index].done
    this.setTaskListStorage(list)
    this.setData({
      list
    })
  },
  setTaskListStorage(taskList, count = 0) {
    // 保存数据至 localStorage 如果出错尝试3次
    if (count > 3) return
    wx.setStorage({
      key: 'taskList',
      data: JSON.stringify(taskList),
      fail() {
        this.setTaskListStorage(taskList, count + 1)
      }
    })
  },
  handleDel(e) {
    const { index } = e.detail
    const list = [...this.data.list]
    list.splice(index, 1)
    this.setTaskListStorage(list)
    this.setData({
      list
    })
  },
  // 删除任务
  onDelete(e) {
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success: (res) => {
        if (res.confirm) {
          this.handleDel(e)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    wx.getStorage({
      key: 'taskList',
      success: ({ errMsg, data }) => {
        if (data) {
          const list = JSON.parse(data)
          Array.isArray(list) && this.setData({
            list
          })
        }
      },
      fail() {
        console.log('获取缓存失败')
        this.setData({
          list: []
        })
      }
    })
  }
}