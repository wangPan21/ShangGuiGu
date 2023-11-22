node_modules  项目依赖文件夹
public        一般放置静态资源（图片）
src           源码文件夹
    assrts       一般放置全部静态资源（图片）
    components   一般放置非路由组件（全局组件）
    App.vue      唯一的根组件   
      
babel.config.js  配置文件
package.json     认为是项目的身份证，项目叫什么、有哪些依赖、怎么运行
package-lock.json  缓存文件
README.md         说明文件

开发一个产品的详情页面？
1.静态组件：注册为路由组件,添加滚动行为
2.请求API接口，发请求
3.vuex获取服务器数据
4.动态展示组件


Vue点击事件里传参命名首字母不可以大写，否则可能会Undefined，读取不到
KV一致可以只写一个
context小仓库，commit:提交mutataions修改state, getters:(计算属性)，dispatch:派发action, state:当前仓库的数据

全局路由守卫： 触发路由就会触发这些钩子函数。钩子函数按执行顺序包括beforeEach、beforeResolve、afterEach三个
组件路由守卫：在组件内执行的钩子函数，类似于组件内的生命周期钩子函数按执行顺序为beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave三个。
路由独享守卫：目前它只有一个钩子函数beforeEnter

to: 即将要进入的目标   from: 当前导航正要离开的路由   next：它是最重要的一个参数，调用该方法后，才能进入下一个钩子函数。
p105