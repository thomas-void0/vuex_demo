<template>
  <div id="app">
    <span>存储的数字:</span><h3>{{count}}</h3>
    <hr>
    <span>存储的对象:</span>
    <h3 v-for="(item,index) in myStudents" :key="index">年龄:{{item.age}}---姓名:{{item.name}}</h3>
    <hr>
    <span>存储的数字2：</span>
    <h3>{{count2}}</h3>
    <hr>
    <span>修改数据:</span>
    <button @click="add(50)">count增加</button>
    <button @click="sub">count减少100</button>
    <button @click="addStudent">学生信息增加</button>
    <button @click="addStudent2">学生信息增加方式2</button>
    <hr>
    <span>映射方法:</span>
    <button @click="newSub">减100</button>
    <button @click="addNum(50)">加50</button>
    <hr>
    <button @click="changeMyCount">发起action，数字减少100</button>
    <button @click="changeMyCount2(1000)">发起action，数字增加num</button>
    <hr>
    <button @click="changeCount">action的辅助函数1 -100</button>
    <button @click="changeCount2(1000)">action的辅助函数2 +1000</button>
    <hr>
    <span>getters：</span>
    <h3>超过30岁的学生是：</h3>
    <h4 v-for="(item,index) in $store.getters.getMore30" :key="-(index+1)">年龄:{{item.age}}---姓名:{{item.name}}</h4>
    <h4>个数是:{{$store.getters.getMore30Len}}</h4>
    <hr>
    <span>getters辅助函数:</span>
    <h4 v-for="(item,index) in getMore30" :key="-(index+2)">年龄:{{item.age}}---姓名:{{item.name}}</h4>
    <h4>个数:{{getMore30Len}}</h4>
  </div>
</template>

<script>

import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';
import {ADD_STUDENT_INFO} from "./constant";

export default {
  name: 'app',
  methods: {
    // 增加count
    add(num){
      this.$store.commit("addNum",num); //可以接收2个参数
    },
    // 减少count
    sub(){
      this.$store.commit("subNum");
    },
    // 增加学生信息
    addStudent(){
      const info = {id:5,name:"养了只柯基",age:100};
      // 另外一种提交风格
      this.$store.commit({
        type:"addStudents",
        info
      })
    },
    // 增加学生信息2
    addStudent2(){
      const info = {id:6,name:"web_thomas",age:101};
      this.$store.commit({
        type:ADD_STUDENT_INFO,
        info
      })
    },

    /*mapMutations的用法1*/
    ...mapMutations({
      newSub:"subNum" // 将 `this.newSub()` 映射为 `this.$store.commit('subNum')`
    }),
    /*mapMutations的用法2*/ 
    ...mapMutations([
      'addNum' // 将 `this.addNum(num)` 映射为 `this.$store.commit('addNum',num)` 一样可以正常的传参
    ]),

    /*发起action请求-减少数字*/ 
    changeMyCount(){
      this.$store.dispatch("changeCount");
    },
    /*发起action请求-增加数字*/  
    changeMyCount2(num){
      this.$store.dispatch("changeCount2",num);
    },

    /*action的辅助函数*/ 
    ...mapActions([
        "changeCount"
    ]),
    ...mapActions({
       changeCount2:"changeCount2"
    })

  },
  computed: {
    myStudents(){ //使用计算属性的方式调用在state中的数据
      return this.$store.state.students
    },
    ...mapState({ //mapState写法1
      count:"count"
    }),
    ...mapState([ //mapState 写法2
      "count2"
    ]),

    /*mapGetters*/ 
    ...mapGetters({
      getMore30:"getMore30"
    }),
    ...mapGetters([
      "getMore30Len"
    ])
  }
}
</script>

<style>

</style>
