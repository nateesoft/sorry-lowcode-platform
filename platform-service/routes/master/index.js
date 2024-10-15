const express = require('express');
const router = express.Router();

const systemsConfig = require('./systems');
const systemsProfile = require('./systems/profile');
const systemsUser = require('./systems/users');

const company = require('./company');
const companyProfile = require('./company/profile');
const companyUser = require('./company/users');

const architecture = require('./webapps/architecture')
const branch = require('./webapps/branch')
const webAppsCompany = require('./webapps/company')
const dashboard = require('./webapps/dashboard')
const datasource = require('./webapps/datasource')
const datasourceTable = require('./webapps/datasourceTable')
const externalServices = require('./webapps/externalServices')
const serviceflow = require('./webapps/serviceflow')
const shop = require('./webapps/shop')
const usergroups = require('./webapps/usergroups')
const users = require('./webapps/users')
const usersRole = require('./webapps/usersRole')
const workflow = require('./webapps/workflow')

router.get("/", (req, res)=> {
    res.send("Platform Service APIs")
})

/* ###################### SYSTEMS ########################## */
/* for system config routes */
router.get("/systems/config", systemsConfig.getData);
router.get("/systems/config/:id", systemsConfig.getDataById);
router.put("/systems/config/:id", systemsConfig.updateData);
router.post("/systems/config", systemsConfig.createData);
router.delete("/systems/config/:id", systemsConfig.deleteData);
/* for system profile routes */
router.get("/systems/profile", systemsProfile.getData);
router.get("/systems/profile/:id", systemsProfile.getDataById);
router.put("/systems/profile/:id", systemsProfile.updateData);
router.post("/systems/profile", systemsProfile.createData);
router.delete("/systems/profile/:id", systemsProfile.deleteData);
/* for system users routes */
router.get("/systems/users", systemsUser.getData);
router.get("/systems/users/:id", systemsUser.getDataById);
router.put("/systems/users/:id", systemsUser.updateData);
router.post("/systems/users", systemsUser.createData);
router.delete("/systems/users/:id", systemsUser.deleteData);
/* ###################### SYSTEMS ########################## */

/* ###################### COMPANY ########################## */
/* for company routes */
router.get("/company/config", company.getData);
router.get("/company/config/:id", company.getDataById);
router.put("/company/config/:id", company.updateData);
router.post("/company/config", company.createData);
router.delete("/company/config/:id", company.deleteData);
/* for company users routes */
router.get("/company/users", companyUser.getData);
router.get("/company/users/:id", companyUser.getDataById);
router.put("/company/users/:id", companyUser.updateData);
router.post("/company/users", companyUser.createData);
router.delete("/company/users/:id", companyUser.deleteData);
/* for company profile routes */
router.get("/company/profile", companyProfile.getData);
router.get("/company/profile/:id", companyProfile.getDataById);
router.put("/company/profile/:id", companyProfile.updateData);
router.post("/company/profile", companyProfile.createData);
router.delete("/company/profile/:id", companyProfile.deleteData);
/* ###################### COMPANY ########################## */

/* ###################### WEB APPLICATION ########################## */
/* for webapps architecture routes */
router.get("/webapps/architecture", architecture.getData);
router.get("/webapps/architecture/:id", architecture.getDataById);
router.put("/webapps/architecture/:id", architecture.updateData);
router.post("/webapps/architecture", architecture.createData);
router.delete("/webapps/architecture/:id", architecture.deleteData);
/* for webapps branch routes */
router.get("/webapps/branch", branch.getData);
router.get("/webapps/branch/:id", branch.getDataById);
router.put("/webapps/branch/:id", branch.updateData);
router.post("/webapps/branch", branch.createData);
router.delete("/webapps/branch/:id", branch.deleteData);
/* for webapps company routes */
router.get("/webapps/company", webAppsCompany.getData);
router.get("/webapps/company/:id", webAppsCompany.getDataById);
router.put("/webapps/company/:id", webAppsCompany.updateData);
router.post("/webapps/company", webAppsCompany.createData);
router.delete("/webapps/company/:id", webAppsCompany.deleteData);
/* for webapps dashboard routes routes */
router.get("/webapps/dashboard", dashboard.getData);
router.get("/webapps/dashboard/:id", dashboard.getDataById);
router.put("/webapps/dashboard/:id", dashboard.updateData);
router.post("/webapps/dashboard", dashboard.createData);
router.delete("/webapps/dashboard/:id", dashboard.deleteData);
/* for webapps datasource routes routes */
router.get("/webapps/datasource", datasource.getData);
router.get("/webapps/datasource/:id", datasource.getDataById);
router.put("/webapps/datasource/:id", datasource.updateData);
router.post("/webapps/datasource", datasource.createData);
router.delete("/webapps/datasource/:id", datasource.deleteData);
/* for webapps datasourceTable routes routes */
router.get("/webapps/datasourceTable", datasourceTable.getData);
router.get("/webapps/datasourceTable/:id", datasourceTable.getDataById);
router.put("/webapps/datasourceTable/:id", datasourceTable.updateData);
router.post("/webapps/datasourceTable", datasourceTable.createData);
router.delete("/webapps/datasourceTable/:id", datasourceTable.deleteData);
/* for webapps externalServices routes routes */
router.get("/webapps/externalServices", externalServices.getData);
router.get("/webapps/externalServices/:id", externalServices.getDataById);
router.put("/webapps/externalServices/:id", externalServices.updateData);
router.post("/webapps/externalServices", externalServices.createData);
router.delete("/webapps/externalServices/:id", externalServices.deleteData);
/* for webapps serviceflow routes routes */
router.get("/webapps/serviceflow", serviceflow.getData);
router.get("/webapps/serviceflow/:id", serviceflow.getDataById);
router.put("/webapps/serviceflow/:id", serviceflow.updateData);
router.post("/webapps/serviceflow", serviceflow.createData);
router.delete("/webapps/serviceflow/:id", serviceflow.deleteData);
/* for webapps shop routes routes */
router.get("/webapps/shop", shop.getData);
router.get("/webapps/shop/:id", shop.getDataById);
router.put("/webapps/shop/:id", shop.updateData);
router.post("/webapps/shop", shop.createData);
router.delete("/webapps/shop/:id", shop.deleteData);
/* for webapps usergroups routes routes */
router.get("/webapps/usergroups", usergroups.getData);
router.get("/webapps/usergroups/:id", usergroups.getDataById);
router.put("/webapps/usergroups/:id", usergroups.updateData);
router.post("/webapps/usergroups", usergroups.createData);
router.delete("/webapps/usergroups/:id", usergroups.deleteData);
/* for webapps users routes routes */
router.get("/webapps/users", users.getData);
router.get("/webapps/users/:id", users.getDataById);
router.put("/webapps/users/:id", users.updateData);
router.post("/webapps/users", users.createData);
router.delete("/webapps/users/:id", users.deleteData);
/* for webapps usersRole routes routes */
router.get("/webapps/usersRole", usersRole.getData);
router.get("/webapps/usersRole/:id", usersRole.getDataById);
router.put("/webapps/usersRole/:id", usersRole.updateData);
router.post("/webapps/usersRole", usersRole.createData);
router.delete("/webapps/usersRole/:id", usersRole.deleteData);
/* for webapps workflow routes routes */
router.get("/webapps/workflow", workflow.getData);
router.get("/webapps/workflow/:id", workflow.getDataById);
router.put("/webapps/workflow/:id", workflow.updateData);
router.post("/webapps/workflow", workflow.createData);
router.delete("/webapps/workflow/:id", workflow.deleteData);

/* ###################### WEB APPLICATION ########################## */

module.exports = router
