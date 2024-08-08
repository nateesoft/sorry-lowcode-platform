const express = require("express")
const router = express.Router()

router.get("/sayHello", (req, res) => {
  res.send("Hello")
})

/*** load router from config */
const routerConfig = [
  {
    name: "/getNumber",
    method: "get",
    params: {},
    queryParams: {},
    payload: {},
    response: {}
  },
  {
    name: "/calPlus",
    method: "post",
    params: {},
    queryParams: {},
    payload: {
      num1: 0,
      num2: 0
    },
    response: {
      total: 0
    }
  }
]

for (let i = 0; i < routerConfig.length; i++) {
  const config = routerConfig[i]
  if(config.method === 'get'){
    router.get(config.name, (req, res) => {
      res.json({
        message: "Show number: " + 555
      })
    })
  }else if(config.method==='post'){
    router.post(config.name, (req, res) => {
      config.payload = req.body
      config.response.total = config.payload.num1 + config.payload.num2
      res.json(config.response.total)
    })
  }
}

module.exports = router
