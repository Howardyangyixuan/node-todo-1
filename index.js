const db = require("./db")
const inquirer = require("inquirer")
module.exports.add = async (title) => {
  // console.log("add")
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
function markAsUndone(list, index) {
  list[index].done = false
  db.write(list)
}
function markAsDone(list, index) {
  list[index].done = true
  db.write(list)
}
function updateTitle(list,index) {
  const questions = {
    type: "input",
    name: "title",
    message: "新标题",
    default: list[index].title
  }
  inquirer.prompt(questions).then((answers) => {
    list[index].title = answers.title
    db.write(list)
  })
}
function remove(list,index) {
  list.splice(index, 1)
  db.write(list)
}
function askForAction(list,index) {
  inquirer.prompt({
    type: "list",
    name: "action",
    message: "请选择操作",
    choices: [
      {name: "退出", value: "quit"},
      {name: "已完成", value: "markAsDone"},
      {name: "未完成", value: "markAsUndone"},
      {name: "改标题", value: "updateTitle"},
      {name: "删除", value: "remove"},
    ]
  })
    .then((answer) => {
      const actions = { markAsUndone, markAsDone, remove, updateTitle
      }
      const action = actions[answer.action]
      action && action(list,index)
    })

}
function askForCreateTask(list) {
  const questions = {
    type: "input",
    name: "title",
    message: "请输入标题",
  }
  inquirer.prompt(questions).then((answers) => {
    list.push({
      title:answers.title,
      done:false
    })
    db.write(list)
  })

}
function printTasks(list){
  const exit = {name: "退出", value: "-1"}
  const create = {name: "创建任务", value: "-2"}
  let showList = list.map((item, index) => {
    return {name: `${index} - ${item.title} : ${item.done?'已完成':'未完成'}`, value: index.toString()}
  })
  // if (list.length === 0) {
  //   console.log("还没有任务哦～请添加任务")
  //   return
  // }
  inquirer
    .prompt({
      type: "list",
      name: "index",
      message: "请选择任务",
      choices: [exit, ...showList, create]
    })
    .then((answer) => {
        const index = parseInt(answer.index)
        if (index >= 0) {
          //选中一个任务
          //askForAction
          askForAction(list,index)

        } else if (index === -2) {
          //创建任务
          //createTask
          askForCreateTask(list)
        }
      }
    )
}
module.exports.showAll = async () => {
  const list = await db.read()
  //打印任务
  //printTasks
  printTasks(list)
}
