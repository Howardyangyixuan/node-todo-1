const db = require("./db")
module.exports.add = async (title) => {
  console.log("add")
  //读取
  const list = await db.read()
  //添加任务
  const task = {
    title: title,
    done: false
  }
  list.push(task)
  //存储任务
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}
module.exports.showAll = async () => {
  const list = await db.read()
  let showList = []
  list.forEach((item,index)=>{
    showList.push(`${index} - ${item.title} : ${item.done}`)
  })
  if(list.length===0) {
    console.log("还没有任务哦～请添加任务")
    return
  }
  "use strict"
  let inquirer = require("inquirer")
  inquirer
    .prompt({
      type: "list",
      name: "index",
      message: "请选择任务",
      choices: showList
    })
    .then((answer) => {
      console.log(JSON.stringify(answer, null, "  "))
    })
}
