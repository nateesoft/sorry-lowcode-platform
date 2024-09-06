const express = require("express")
const router = express.Router()

router.get("/:uiId/ui/:uiVersion", (req, res) => {
    const uiId = req.params.uiId
    const uiVersion = req.params.uiVersion
  res.redirect(`http://localhost:3000/${uiId}/ui/${uiVersion}`)
})

module.exports = router
