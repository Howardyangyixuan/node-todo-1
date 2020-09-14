const homedir = require("os").homedir()
const fs = require("fs")
const p = require("path")
const home = process.env.HOME || homedir
const dbPath = p.join(home, ".todo")
const db = {
  read(path = dbPath) {
    //callback 或 promise 实现异步回传，这里用promise
    return new Promise((resolve, reject) => {
      fs.readFile(path, {flags:'a+'}, (error, data) => {
        if (error) {
          // console.log(error)
          reject(error)
        } else {
          let list
          try {
            list = JSON.parse(data.toString())
          } catch (e) {
            list = []
          }
          resolve(list)
        }
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list) + "\n"
      fs.writeFile(path, string, (error) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }
}
module.exports = db