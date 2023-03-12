export default {
  title: '我的帐号',
  nav: {
    title: '我的帐号',
    addresses: '地址薄',
    cards: '银行卡',
    certifies: '认证信息',
    password: '密码'
  },
  actions: {
    goToLogin: '去登录',
    create: '创建帐号',
    alreadyHaveAnAccount: '已有帐号？',
    forgotPassword: '忘记密码？',
    login: '登录',
    needAccount: '没有帐号？',
    register: '注册',
    go_back: '返回',
    submit: '提交',
    save: '保存'
  },
  feedbacks: {
    updateSuccess: {
      title: '更新成功'
    },
    updateError: {
      title: '更新失败'
    },
    not_found: {
      title: '用户不存在, 将返回登录页面'
    }
  },
  basic: {
    title: '基本信息'
  },
  job: {
    title: '职务信息'
  },
  addresses: {
    title: '地址薄'
  },
  cards: {
    title: '银行卡'
  },
  certifies: {
    title: '认证信息'
  },
  password: {
    title: '密码',
    feedbacks: {
      updateSuccess: {
        title: '密码更新成功'
      },
      updateError: {
        title: '密码更新失败'
      }
    },
    actions: {
      changePassword: '更改密码'
    }
  },
  resetPassword: {
    title: '重置密码',
    actions: {
      cancel: '后退',
      send: '发送',
      goToLogin: '去登录',
      reset: '重置密码'
    },
    feedbacks: {
      initSuccess: {
        title: '重置密码电子邮件发送成功！',
        description: '如果存在 <strong>{{email}}</strong> 的帐户，您应该已经收到一封电子邮件。'
      },
      initError: {
        title: '重置密码失败'
      },
      confirmSuccess: {
        title: '您的密码已重置',
        description: '您现在可以去登录'
      },
      confirmError: {
        title: '重置密码失败'
      }
    }
  },
  activate: {
    feedbacks: {
      activationLoading: {
        title: '帐号激活...'
      },
      activationSuccess: {
        title: '账户激活成功'
      },
      activationError: {
        title: '无法激活账户'
      }
    }
  },
  data: {
    firstname: {
      label: '名字',
      required: '请输入名字'
    },
    lastname: {
      label: '姓氏',
      required: '请输入姓氏'
    },
    email: {
      label: '邮箱',
      required: '请输入邮箱',
      invalid: '邮箱无效',
      resetHelper: '输入您注册时使用的邮箱地址',
      alreadyUsed: '邮箱已使用',
      tooShort: '邮箱太短（最少 {{min}} 个字符）',
      tooLong: '邮箱太长（最多 {{max}} 个字符）'
    },
    language: {
      label: '语言'
    },
    password: {
      label: '密码',
      tooShort: '密码太短（最少 {{min}} 个字符）',
      tooLong: '密码太长（最多 {{max}} 个字符）',
      required: '请输入密码'
    },
    currentPassword: {
      label: '当前密码',
      incorrect: '当前密码无效',
      required: '请输入当前密码'
    },
    newPassword: {
      label: '新密码',
      required: '请输入新密码'
    },
    confirmNewPassword: {
      label: '确认新密码',
      required: '请输入确认新密码',
      notEqual: '新密码不匹配'
    },
    username: {
      alreadyUsed: '用户名已使用',
      label: '用户名',
      required: '请输入用户名',
      tooShort: '用户名太短（最少 {{min}} 个字符）',
      tooLong: '用户名太长（最多 {{max}} 个字符）',
      invalid: '用户名无效，请勿使用特殊字符。'
    }
  },
  register: {
    feedbacks: {
      registrationError: {
        title: '注册失败'
      },
      registrationSuccess: {
        title: '成功创建帐户！',
        description: '请检查您的电子邮件 <strong>{{email}}</strong> 收件箱以激活您的帐户。'
      }
    },
    title: '注册'
  },
  login: {
    title: '登录',
    feedbacks: {
      loginError: {
        title: '登录失败'
      }
    }
  },
  logout: {
    title: '退出登录'
  },
  interceptor: {
    title: '需要登录',
    description: '请登录后继续...'
  },
  fields: {
    username: {
      label: '用户名',
      required: '请输入用户名'
    },
    email: {
      label: '邮箱',
      required: '请输入邮箱',
      rule_error: '邮箱无效'
    },
    username_or_email: {
      label: '用户名 / 邮箱',
      required: '请输入用户名 / 邮箱'
    },
    password: {
      label: '密码',
      required: '请输入密码',
      rule_error: '密码应至少包含 6 个字符'
    },
    confirm_password: {
      label: '确认密码',
      required: '请输入确认密码',
      rule_error: '密码不一致，请检查'
    },
    remember: {
      label: '记住登录'
    },
    terms: {
      label: '我接受条款和条件',
      required: '请勾选注册条款和条件'
    }
  }
};
