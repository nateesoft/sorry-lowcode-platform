const express = require("express")
const router = express.Router()
const { exec } = require("node:child_process")

router.get("/", function (req, res, next) {
  exec("pm2 pid react-app", (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }

    const appPath = "cd /Users/nateesun/Documents/new-company/sorry-lowcode-platform/frontend-app"
    const pm2Start = "pm2 start --name react-app npm -- start"

    // generate application config file
    

    if (!stdout.trim()) {
      console.log("not found application running")
      exec(`${appPath};${pm2Start}`, (error2, stdout2, stderr2) => {
        if (error2) {
          console.error(`error2: ${error2.message}`)
          return
        }
        if (stderr2) {
          console.error(`stderr2: ${stderr2}`)
          return
        }

        console.log("Application started: ", stdout2)
        res.json({
          status: 200,
          redirectUrl: "http://localhost:3000/app1"
        })
      })
    } else {
      console.log("Now application is running")
      res.json({
        status: 200,
        redirectUrl: "http://localhost:3000/app1"
      })
    }
  })
})

module.exports = router
