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

module.exports.clear = async ()=>{
  await db.write([])
}
module.exports.showAll = async ()=>{
  const list = await db.read()
  list.forEach((item)=>{
    console.log("任务名："+item.title + " 是否完成: "+item.done)
  })
}