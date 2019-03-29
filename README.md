> ### 英语文档请见 [README.en.md](https://gitee.com/TDoraX/Vue-CMS/blob/master/README.en.md)
> ### For English: Please refer to [README.en.md](https://gitee.com/TDoraX/Vue-CMS/blob/master/README.en.md)

# Vue - CMS后台管理系统 - 项目开发规范

> ### 开发人员注意：
> #### 除README以外的其他**代码**文本文档的结尾换行符一律以Linux系统为标准，即**LF (\n)**模式，使用Windows或低版本OS X系统的开发人员，务必在编辑器或IDE里将Line Separator更改为**LF (\n)**

## 项目成员
- ### 组长：[张哲](https://github.com/TDoraX)
- ### 组员：[陈斌](https://github.com/wza62692371)、[闰平心](https://gitee.com/pinxin)、[刘泽鹏](https://gitee.com/liuzepeng0814)、[李嘉伟](https://gitee.com/lijiaweilaoda)

## 项目周期
- ### 预计4天（每个模块1天）

## 技术选型
- ### 开发环境（后台）
  - Node.JS
    - Express
      - JSON Web Token
      - multiparty
  - 数据库：MongoDB
    - mongoose
    - mongoose-pagination
    - mongoose-materialized
  - API规范
    - RESTful API

- ### 开发环境（前台）
  - 脚手架
    - Vue CLI 3.X
  - 功能框架
    - Vue.JS 2.X
  - 路由
    - Vue-Router 
  - 状态管理
    - Vuex
  - UI框架
    - iView
  - 调试工具
    - Vue CLI 3.X
    
- ### 公用
  - 操作系统
    - Windows 7+
    - Ubuntu 18.04
  - Git
    - 开发人员一律使用**Git命令**操作，提交到自己的所属分支，提交时注释中英文皆可，所有注释应清晰地对本次提交做出描述（tag在项目上线时才进行提交）
  - 调试
    - Postman
    - MongoDB Compass Community
    - Robo 3T
  - Node.JS
    - Package Manager: Yarn
    
- ### 项目上线要求
  - 项目部署在腾讯云服务器上
  - 服务器系统采用Linux内核
    > 若选择Windows Server系列操作系统，请保证机器配置足够
    - 主选操作系统（推荐）：RHEL 7+/CentOS 7.0+
    - 备选操作系统（不推荐）：Ubuntu Server 18.04+/Debian

## API
- ### 用户管理模块（User）【管理员Token登录】
  - 用户名 name
  - 密码 password
  - 性别 gender
  - 电话号码 phone
  - 姓名 name
  - 邮箱 email
  - 年龄 age
  - 权限 access
  - 职位 job
  - 等级 level
  - 头像 avatar

- ### 新闻管理模块（News）
  - 时间 time
  - 类别 category
  - 标题 title
  - 内容 content
  - 来源 source
  - 地点 place


- ### 分类管理模块

- ### 评论管理模块（Comment）
  - 用户名 username
  - 内容 content
  - 时间 time

- ### 产品管理模块（Product）【暂未上线】
  - 产品名 name
  - 价格 price
  - 生产地 place
  - 生产商 producer
  - 图片 image

# Vue - CMS后台管理系统 - 项目概述（用户及开发者阅读）

- ### 主要功能
- #### 主模块：
  - 所有请求必须有对应的管理员Token进行加密验证，否则请求将被拒绝。
  - 管理员点击分类管理模块（副模块）的功能后，进入相应模块的管理页面。
  - 进入相应模块即获得（POST）相应模块的资源，系统自动调用接口，这个页面的资源是列表化的。
  - 可以对进入的模块进行操作（调用接口并处理数据）
 > - 主模块功能及其操作
 >  - 用户模块：该模块为用户信息列表化后的可操作界面，各字段均具有“添加内容，删除内容，多条删除，修改内容”的功能，搜索功能仅对**用户名**字段有效。
 >  - 新闻模块：该模块为新闻资讯列表化后的可操作界面，各字段均具有“添加内容，删除内容，多条删除，修改内容”的功能。<br/>
 >  - 有复选框的字段可以通过钩选复选框来进行**删除多条数据**的操作<br/>
 > （仅针对开发人员）以上的删除，修改等操作按钮，应该排列在每条资源的后面，可根据开发情况进行调整。

 
 - #### 副模块（分类模块）：
   - 分类管理模块为**树形文件结构**，点击模块文字即可进入对应模块。
   - 主模块的**左侧**操作区也有树型分类模块，用于管理模块子栏目及其内容。
   - **请注意这个模块是进入数据库资源的修改功能，并不是资源的展示页。**
   
 
### （以下内容仅对开发者阅读）
- #### 项目难点
  1. 模块的搜索功能
  2. 模块的修改功能
  3. 无限级分类模块的树型结构
  4. 无限级分类模块的内容展示，删除多级操作
  5. 登录功能的实现
  
- #### 解决方案
  1. 通过使用动态路由来获取地址的params对象，实现搜索功能
  2. 对于单条数据，在点击时使用另一个输入框来获取数据库中对应数据的唯一_id值，这样即可做到修改和新增功能完全分开互不影响
  3. 采用递归，反复调用自身来获取子分类
  4. 不采用递归，而直接使用MongoDB中的find()方法，并使用$in选择器来实现查找删除
  5. 采用jsonwebtoken模块，用特定的方式进行Token加密，之后只需要验证加密后的信息与数据库中的Token是否一致即可，信息传输方式更加安全



