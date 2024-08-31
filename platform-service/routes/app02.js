const express = require("express")
const router = express.Router()

/*** load router from config */
const routerConfig = [
  {
    serviceId: "id-swf-001",
    flowName: "Login Service Flow",
    uri: "/v1/login",
    method: "post",
    auth: {},
    steps: [
      {
        id: "node_hvd51h",
        type: "start",
        data: {}
      },
      {
        id: "node_bpzzau",
        type: "payload",
        data: {
          username: {
            type: "string"
          },
          password: {
            type: "password"
          }
        }
      },
      {
        id: "node_h4n86s",
        type: "decision",
        data: {
          logic: "username isNotEmpty && password isNotEmpty",
          valid: {
            steps: [
              {
                id: "node_fiov28",
                type: "process",
                process: `
                  1. query db/ graphql
                  2. mapping result to response
                `
              },
              {
                id: "node_6sjmou",
                type: "response",
                return: {
                  status: 5000,
                  message: "Invalid Payload"
                }
              },
              {
                id: "node_8vy4n1",
                type: "end"
              }
            ]
          },
          invalid: {
            steps: [
              {
                id: "node_6sjmou",
                type: "response",
                return: {
                  status: 5000,
                  message: "Invalid Payload"
                }
              },
              {
                id: "node_8vy4n1",
                type: "end"
              }
            ]
          }
        }
      }
    ]
  }
]

for (let i = 0; i < routerConfig.length; i++) {
  const config = routerConfig[i]
  router.post(config.name, (req, res) => {
    config.payload = req.body
    config.response.total = config.payload.num1 + config.payload.num2
    res.json(config.response.total)
  })
}

module.exports = router
