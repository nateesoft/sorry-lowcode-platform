const routerConfig = [
  {
    serviceId: "id-swf-001",
    flowName: "Login Service Flow",
    uri: "/:serviceId/api/:serviceVersion",
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
  },
  {
    serviceId: "id-swf-002",
    flowName: "Uplodate Login Service Flow",
    uri: "/:serviceId/api/:serviceVersion/:id",
    method: "put",
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
  },
  {
    serviceId: "id-swf-003",
    flowName: "Patial Update Login Service Flow",
    uri: "/:serviceId/api/:serviceVersion/:id",
    method: "patch",
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
  },
  {
    serviceId: "id-swf-004",
    flowName: "Get Login By Id Service Flow",
    uri: "/:serviceId/api/:serviceVersion/:id",
    method: "get",
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
  },
  {
    serviceId: "id-swf-005",
    flowName: "Get All User Login Service Flow",
    uri: "/:serviceId/api/:serviceVersion",
    method: "get",
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
  },
  {
    serviceId: "id-swf-006",
    flowName: "Delete Login Info Service Flow",
    uri: "/:serviceId/api/:serviceVersion/:id",
    method: "delete",
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

module.exports = routerConfig
