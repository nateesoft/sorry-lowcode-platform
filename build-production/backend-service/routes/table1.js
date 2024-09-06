var express = require("express")
var router = express.Router()

/* GET table1 listing. */
router.get("/", function (req, res, next) {
  res.json([
    {
      id: 1,
      name: "Frozen yoghurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0
    },
    {
      id: 2,
      name: "Eclair",
      calories: 262,
      fat: 16.0,
      carbs: 24,
      protein: 6.0
    },
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
    {
      id: 5,
      name: "Test",
      calories: 111,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  ])
})

module.exports = router
