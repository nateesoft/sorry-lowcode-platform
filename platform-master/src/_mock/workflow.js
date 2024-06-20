
// ----------------------------------------------------------------------
export const workflows = [...Array(2)].map((_, index) => ({
  id: "id-workflow-00" + (index+1),
  projectName: "POS Resturant",
  workFlowName: "WorkFlow-0" + (index+1),
  createdDate: "18/01/2024",
  updatedDate: "18/06/2024",
  version: "0.0.1",
  manager: "Nathee Phuwong",
  status: "active",
  projectUrl: "/assets/icons/navbar/ic_project.svg",
  workFlowUrl: "/assets/icons/navbar/ic_workflow.svg",
}));
