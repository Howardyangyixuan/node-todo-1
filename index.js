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
