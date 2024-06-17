const { exec } = require("node:child_process")
const express = require("express")
const fs = require("fs"); 
const router = express.Router()

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" })
})

router.get("/genapp", function (req, res, next) {
  // console.log("test service")
  // exec('sh gen_source.sh', (err, output) => {
  //   console.log(output)
  // })

  const projectId = "app1"

  const appConfig = { application: {[projectId]: {}}}
  appConfig.application[projectId].page = {}

  // add page1
  const pageId1 = "login" 
  appConfig.application[projectId].page[pageId1] = {}
  appConfig.application[projectId].page[pageId1].schema = {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 3,
        description: "Please enter your name"
      },
      vegetarian: {
        type: "boolean"
      },
      birthDate: {
        type: "string",
        format: "date"
      },
      nationality: {
        type: "string",
        enum: ["DE", "IT", "JP", "US", "RU", "Other"]
      },
      personalData: {
        type: "object",
        properties: {
          age: {
            type: "integer",
            description: "Please enter your age."
          },
          height: {
            type: "number"
          },
          drivingSkill: {
            type: "number",
            maximum: 10,
            minimum: 1,
            default: 7
          }
        },
        required: ["age", "height"]
      },
      occupation: {
        type: "string"
      },
      postalCode: {
        type: "string",
        maxLength: 5
      }
    },
    required: ["occupation", "nationality"]
  }
  appConfig.application[projectId].page[pageId1].uischema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "HorizontalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/name"
          },
          {
            type: "Control",
            scope: "#/properties/personalData/properties/age"
          },
          {
            type: "Control",
            scope: "#/properties/birthDate"
          }
        ]
      },
      {
        type: "Label",
        text: "Additional Information"
      },
      {
        type: "HorizontalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/personalData/properties/height"
          },
          {
            type: "Control",
            scope: "#/properties/nationality"
          },
          {
            type: "Control",
            scope: "#/properties/occupation",
            suggestion: [
              "Accountant",
              "Engineer",
              "Freelancer",
              "Journalism",
              "Physician",
              "Student",
              "Teacher",
              "Other"
            ]
          }
        ]
      }
    ]
  }
  appConfig.application[projectId].page[pageId1].data = {
    name: "John Doe",
    vegetarian: false,
    birthDate: "1985-06-02",
    personalData: {
      age: 34
    },
    postalCode: "12345"
  }

  // add page2
  const pageId2 = "main"
  appConfig.application[projectId].page[pageId2] = {}
  appConfig.application[projectId].page[pageId2].schema = {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 3,
        description: "Please enter your name"
      },
      occupation: {
        type: "string"
      },
      postalCode: {
        type: "string",
        maxLength: 5
      }
    },
    required: ["occupation"]
  }
  appConfig.application[projectId].page[pageId2].uischema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "HorizontalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/name"
          }
        ]
      },
      {
        type: "Label",
        text: "Additional Information"
      },
      {
        type: "HorizontalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/occupation",
            suggestion: [
              "Accountant",
              "Engineer",
              "Freelancer",
              "Journalism",
              "Physician",
              "Student",
              "Teacher",
              "Other"
            ]
          }
        ]
      }
    ]
  }
  appConfig.application[projectId].page[pageId2].data = {
    name: "John Doe"
  }

  fs.writeFile("generators/frontend/appConfig.json", JSON.stringify(appConfig), err => {
    if (err) throw err;
    console.log("Done writing");
  });

  res.send("Generate Application")
})

module.exports = router
