const { exec } = require("node:child_process")
const express = require("express")
const fs = require("fs"); 
const router = express.Router()

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
  appConfig.application[projectId].page[pageId1] = {
    uri: "/login"
  }
  appConfig.application[projectId].page[pageId1].schema = {
    "type": "object",
    "properties": {
        "username": {
            "type": "string"
        },
        "password": {
            "type": "string",
            "options": {
                "format": "password"
            }
        }
    },
    "required": [
        "username",
        "password"
    ]
}
  appConfig.application[projectId].page[pageId1].uischema = {
    "type": "Group",
    "label": "Login Form",
    "elements": [
        {
            "type": "Control",
            "scope": "#/properties/username"
        },
        {
            "type": "Control",
            "scope": "#/properties/password",
            "options": {
                "format": "password"
            }
        },
        {
            "type": "GridLayout",
            "options": {
                "style": {
                    "direction": "row",
                    "spacing": 1,
                    "justifyContent": "flex-end"
                }
            },
            "elements": [
                {
                    "type": "ActionButton",
                    "label": "Reset"
                },
                {
                    "type": "ActionButton",
                    "label": "Login",
                    "action": "#LoginService",
                    "options": {
                        "style": {
                            "variant": "contained"
                        }
                    }
                }
            ]
        }
    ]
}
  appConfig.application[projectId].page[pageId1].data = {
    "username": "admin",
    "password": 12345
}

  // add page2
  const pageId2 = "main"
  appConfig.application[projectId].page[pageId2] = {
    uri: "/main"
  }
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
