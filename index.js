const homedir = require("os").homedir()
const fs = require('fs')
const home = process.env.HOME || homedir
const p = require('path')
const dbPath = p.join(home,'.todo')
module.exports.add = (title) => {
  console.log("add")
  console.log(homedir)
  //读取
  fs.readFile(dbPath,{flag:'a+'},(error,data)=>{
    if(error){
      console.log(error)
    }else{
      let list
       try{
         list= JSON.parse(data.toString())
       }catch (e) {
         list = []
       }
      const task = {
        title:title,
        done:false
      }
      list.push(task)
      console.log(list)
      const string = JSON.stringify(list)+'\n'
      fs.writeFile(dbPath,string,(error)=>{ console.log(error)}) }
  })
  //添加任务
  //存储任务
}
