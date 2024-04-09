// component/item/item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
    },
    type: {
      type: String,
      value: 'all'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showList: [],
  },
  observers: {
    'type, list'(type) {
      const name = `filter${type[0].toUpperCase()}${type.slice(1)}`
      this[name]?.()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setRawIndex() {
      return this.data.list.map((task, rawIndex) => {
        return {
          ...task,
          rawIndex
        }
      })
    },
    filterAll() {
      this.setData({
        showList: this.setRawIndex()
      })
    },
    filterTodo() {
      this.setData({
        showList: this.setRawIndex().filter(task => !task.done)
      })
    },
    filterDone() {
      this.setData({
        showList: this.setRawIndex().filter(task => task.done)
      })
    },
    onTriggerCheck(e) {
      const { currentTarget: { dataset: { index, item } } } = e
      this.triggerEvent('onTriggerCheck', {
        index,
        item
      })
    },
    // 删除任务
    onDelete(e) {
      const { currentTarget: { dataset: { index } } } = e
      this.triggerEvent('onDelete', index)
    }
  }
})