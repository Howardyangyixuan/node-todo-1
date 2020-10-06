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
  const exit = {name: "退出", value: "-1"}
  const create = {name: "创建任务", value: "-2"}
  let showList = list.map((item, index) => {
    return {name: `${index} - ${item.title} : ${item.done?'已完成':'未完成'}`, value: index.toString()}
  })
  if (list.length === 0) {
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
      choices: [exit, ...showList, create]
    })
    .then((answer) => {
        const index = parseInt(answer.index)
        if (index >= 0) {
          inquirer.prompt({
            type: "list",
            name: "action",
            message: "请选择操作",
            choices: [
              {name: "退出", value: "quit"},
              {name: "已完成", value: "done"},
              {name: "未完成", value: "undone"},
              {name: "改标题", value: "updateTitle"},
              {name: "退出", value: "remove"},
            ]
          })
            .then((answer) => {
              const questions = {
                type: "input",
                name: "title",
                message: "新标题",
                default: list[index].title
              }
              switch (answer.action) {
                case "quit":
                  break
                case "done":
                  list[index].done = true
                  db.write(list)
                  break
                case "undone":
                  list[index].done = false
                  db.write(list)
                  break
                case "updateTitle":
                  inquirer.prompt(questions).then((answers) => {
                    list[index].title = answers.title
                    db.write(list)
                  })
                  break
                case "remove":
                  list.splice(index, 1)
                  db.write(list)
                  break
              }

            })

        } else if (index === -2) {
          const questions = {
            type: "input",
            name: "title",
            message: "请输入标题",
          }
          inquirer.prompt(questions).then((answers) => {
            list.push({
              name:answers.title,
              done:false
            })
            db.write(list)
          })
        }
      }
    )
}
