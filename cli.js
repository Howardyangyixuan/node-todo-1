const api = require("./index")
const {program} = require("commander")
program
  .command("add")
  .description("add a task")
  .action((...args) => {
    let words
    if (args.length > 1) {
      words = args[1].join(" ")
    } else {
      words = ""
    }
    api.add(words).then(() => {
      console.log("添加成功")
    }, () => {
      console.log("添加失败")
    })
  })
program
  .command("clear")
  .description("clear all tasks")
  .action(() => {
      api.clear().then(
        () => {
          console.log("清除成功")
        },
        () => {
          console.log("清除失败")
        }
      )
    }
  )

if (process.argv.length === 2) {
  void api.showAll()
} else {
  program.parse(process.argv)
}