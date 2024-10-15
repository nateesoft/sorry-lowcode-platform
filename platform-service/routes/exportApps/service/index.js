const express = require("express")
const router = express.Router()

/*** load router from config */
const routerConfig = require("./config/index")

function executeLogic(logic, object) {
  if (object.username !== "" && object.password !== "") {
    return "checkLogin"
  }
  return "invalidPayload"
}

for (let i = 0; i < routerConfig.length; i++) {
  const config = routerConfig[i]
  console.log("member service api=>init " + config.method)

  // router configuration
  router[config.method](config.uri, (req, res) => {
    const { serviceId, serviceVersion } = req.params

    let apiLogger = {
      input: {},
      output: {},
      process: [],
      logs: [],
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
        apiLogger.logs.push(steps.type)

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
          apiLogger.logs.push(steps.type)

          steps.data = req.body
          apiLogger.input = steps.data
          apiLogger.nextProcess = steps.nextProcess
          continue
        }

        // decision case
        if (steps.type === "decision") {
          apiLogger.process.push({ [steps.name]: "pass" })
          apiLogger.logs.push(steps.type)

          const nextProcessName = executeLogic(steps.logic, apiLogger.input)
          console.log("nextProcessName: " + nextProcessName)
          apiLogger.nextProcess = {
            name: nextProcessName
          }
          continue
        }

        // process case
        if (steps.type === "process") {
          apiLogger.process.push({ [steps.name]: "pass" })
          apiLogger.logs.push(steps.type)

          let sumResponse = {}
          for (let a = 0; a < steps.steps.length; a++) {
            switch (steps.steps[a].type) {
              case "query":
                apiLogger.logs.push(
                  "[" + steps.type + "] " + steps.steps[a].type
                )
                sumResponse = {}
                break
              case "mapping":
                apiLogger.logs.push(
                  "[" + steps.type + "] " + steps.steps[a].type
                )
                sumResponse = {}
                break
              case "return":
                apiLogger.logs.push(
                  "[" + steps.type + "] " + steps.steps[a].type
                )
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
          apiLogger.logs.push(steps.type)

          apiLogger.nextProcess = steps.nextProcess
        }
      }

      // end or finish logic
      if (steps.type === "end") {
        apiLogger.process.push({ [steps.name]: "pass" })
        apiLogger.logs.push(steps.type)

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
