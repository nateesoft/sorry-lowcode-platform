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

    const appPath =
      "cd /Users/nateesun/Documents/new-company/sorry-lowcode-platform/frontend-app"
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

router.get("/table1", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Frozen yoghurt",
      calories: 159,
      fat: 6,
      carbs: 24,
      protein: 4
    },
    { id: 2, name: "Eclair", calories: 262, fat: 16, carbs: 24, protein: 6 },
    {
      id: 3,
      name: "Cupcake",
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3
    },
    {
      id: 4,
      name: "Gingerbread",
      calories: 356,
      fat: 4.8,
      carbs: 49,
      protein: 3.9
    },
    { id: 5, name: "Test", calories: 111, fat: 0, carbs: 0, protein: 0 }
  ])
})

module.exports = router
