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
        name: "start1",
        nextProcess: {
          name: "inputPayload"
        }
      },
      {
        id: "node_bpzzau",
        type: "payload",
        name: "inputPayload",
        data: {
          username: {
            type: "string"
          },
          password: {
            type: "password"
          }
        },
        nextProcess: {
          name: "validateInput"
        }
      },
      {
        id: "node_h4n86s",
        type: "decision",
        name: "validateInput",
        logic: `inputPayload.username !== "" && inputPayload.password !== ""`,
        availableSteps: ["checkLogin", "invalidPayload"],
        nextProcess: {}
      },
      {
        id: "node_process001",
        type: "process",
        name: "checkLogin",
        steps: [
          {
            type: "query",
            action: "query MyQuery { ....... }"
          },
          {
            type: "mapping",
            action: "..."
          },
          {
            type: "return",
            return: {
              status: [200, 403, 401, 500],
              message: "xxxxx"
            }
          }
        ],
        nextProcess: {
          name: "responseEnd"
        }
      },
      {
        id: "node_process002",
        type: "process",
        name: "invalidPayload",
        steps: [
          {
            type: "return",
            return: {
              status: 500,
              message: "Username or password not empty !!!"
            }
          }
        ],
        nextProcess: {
          name: "responseEnd"
        }
      },
      {
        id: "node_response001",
        type: "response",
        name: "responseEnd",
        nextProcess: {
          name: "end9"
        }
      },
      {
        id: "node_rend001",
        type: "end",
        name: "end9"
      }
    ]
  }
]

function executeLogic(logic, object) {
  if (object.username !== "" && object.password !== "") {
    return "checkLogin"
  }
  return "invalidPayload"
}

for (let i = 0; i < routerConfig.length; i++) {
  const config = routerConfig[i]
  console.log("app02=>init POST")

  // router configuration
  router.post(config.uri, (req, res) => {
    let apiLogger = {
      input: {},
      output: {},
      process: [],
      error: [],
      nextProcess: {}
    }

    let apiResponse = {}

    let countStep = 0
    for (let j = 0; j < config.steps.length; j++) {
      const steps = config.steps[j]
      console.log(j + 1, steps.type)

      if (steps.type === "start") {
        apiLogger.process.push({ [steps.name]: "pass" })

        countStep = countStep + 1
        apiLogger.nextProcess = steps.nextProcess
        continue
      }

      if (countStep === 0) {
        continue
      }

      if (steps.name === apiLogger.nextProcess.name) {
        // payload case
        if (steps.type === "payload") {
          apiLogger.process.push({ [steps.name]: "pass" })

          steps.data = req.body
          apiLogger.input = steps.data
          apiLogger.nextProcess = steps.nextProcess
          continue
        }

        // decision case
        if (steps.type === "decision") {
          apiLogger.process.push({ [steps.name]: "pass" })

          const nextProcessName = executeLogic(
            steps.logic,
            apiLogger.input
          )
          console.log("nextProcessName: " + nextProcessName)
          apiLogger.nextProcess = {
            name: nextProcessName
          }
          continue
        }

        // process case
        if (steps.type === "process") {
          apiLogger.process.push({ [steps.name]: "pass" })

          let sumResponse = {}
          for (let a = 0; a < steps.steps.length; a++) {
            switch (steps.steps[a].type) {
              case "query":
                sumResponse = {}
                break
              case "mapping":
                sumResponse = {}
                break
              case "return":
                sumResponse = {}
                break
              default:
                break
            }
          }
          apiLogger.nextProcess = steps.nextProcess
        }

        // response case
        if (steps.type === "response") {
          apiLogger.process.push({ [steps.name]: "pass" })

          apiLogger.nextProcess = steps.nextProcess
        }
      }

      // end or finish logic
      if (steps.type === "end") {
        apiLogger.process.push({ [steps.name]: "pass" })

        apiResponse = {
          payload: apiLogger.input,
          response: apiLogger.output,
          error: apiLogger.error
        }
      }
    }
    res.json(apiResponse)
  })
}

module.exports = router
