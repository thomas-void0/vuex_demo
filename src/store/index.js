import Vue from 'vue';
import Vuex from 'vuex';
import {ADD_STUDENT_INFO} from '../constant';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        count:1000,
        students:[
            {id:1,name:"张学友",age:20},
            {id:2,name:"刘德华",age:21},
            {id:3,name:"郭富城",age:30},
            {id:4,name:"黎明",age:32}
        ],
        count2:2000 //新增一条数据
    },
    mutations: {
        //mutations中函数的三种使用方式：
        //1，有传参，传参是一个基本类型数据
        addNum(state,payload){
            state.count += payload;
        },
        //2，没有传参
        subNum(state){
            state.count -= 100;
        },
        //3，有传参，传参是一个引用类型数据
        addStudents(state,payload){ 
            state.students.push(payload.info)
        },
        //4,使用常量的方式定义方法
        [ADD_STUDENT_INFO](state,payload){
            state.students.push(payload.info)
        }
    },
    actions: {
        changeCount(context){
            setTimeout(()=>{
                //context就是我们当前的store实例
                console.log("context==>",context) //如果console.log出错，请在package.json中配置'rules:{"on-console":"off"}'
                context.commit("subNum") //点击1s后数字减少100
            },1000)
        },
        changeCount2(context,num){
            setTimeout(()=>{
                context.commit("addNum",num) //点击1s后数字增加num
            },1000)
        }
    },
    getters: {
        getMore30(state){
            return  state.students.filter(s=>s.age>30); //返回大于30岁的学生
        },
        getMore30Len(state,getters){
            return getters.getMore30.length; //返回大于30岁的学生的个数
        }
    },
    modules: {
        
    }
})

