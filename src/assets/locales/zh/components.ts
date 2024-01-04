export default {
  dateAgo: {
    format: 'dddd, DD MMMM YYYY, hh:mm a'
  },
  actionsButton: {
    label: '执行'
  },
  confirmMenuItem: {
    confirmText: '确认'
  },
  confirmPopover: {
    confirmText: '确认',
    heading: '你确定吗？'
  },
  errorBoundary: {
    title: '发生意外错误。',
    actions: {
      expand: '查看详情'
    }
  },
  errorPage: {
    '403': {
      title: '未授权',
      description: '抱歉，您无法访问此页面。'
    },
    '404': {
      title: '页面未找到',
      description: '该页面不存在或 URL 已变更。'
    },
    errorCode: '{{code}} 错误',
    default: {
      title: '服务器错误',
      description: '出了点问题 😞'
    }
  },
  pagination: {
    showing:
      '<box>显示</box> <strong>{{firstItemOnPage}}</strong> <span>至</span> <strong>{{lastItemOnPage}}</strong> <span>条，共</span> <strong>{{total}}</strong> <box>条记录</box>',
    loading:
      '<spinner></spinner> <box>正在加载</box> <strong>{{firstItemOnPage}}</strong> <span>至</span> <strong>{{lastItemOnPage}}</strong> <span>条，共</span> <strong>{{total}}</strong> <box>条记录</box>',
    firstPage: '第一页',
    prevPage: '上一页',
    lastPage: '最后一页',
    nextPage: '下一页'
  },
  searchInput: {
    placeholder: '搜索...',
    clear: '清除搜索'
  },
  fieldDayPicker: {
    invalidMessage: '无效日期'
  },
  fieldRepeater: {
    invalidMessage: '至少一项元素无效'
  },
  fieldMultiSelect: {
    noOption: '没有选择'
  },
  sort: {
    sortAscending: '升序',
    sortDescending: '降序',
    sortBy: '排序方式',
    order: '排序'
  }
};
