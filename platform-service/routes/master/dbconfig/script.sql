-- sorrydb.company definition

CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(13) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.company_users definition

CREATE TABLE `company_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_code` varchar(13) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.company_users_profile definition

CREATE TABLE `company_users_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.system_profile definition

CREATE TABLE `system_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `first_name` varchar(150) DEFAULT NULL,
  `last_name` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.system_users definition

CREATE TABLE `system_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `active` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_architecture definition

CREATE TABLE `webapps_architecture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `template` varchar(1000) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_branch definition

CREATE TABLE `webapps_branch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `template` varchar(1000) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_company definition

CREATE TABLE `webapps_company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `template` varchar(1000) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_dashboard definition

CREATE TABLE `webapps_dashboard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_code` varchar(13) DEFAULT NULL,
  `project_count` int DEFAULT NULL,
  `userapp_count` int DEFAULT NULL,
  `workflow_count` int DEFAULT NULL,
  `serviceflow_count` int DEFAULT NULL,
  `datasource_count` int DEFAULT NULL,
  `datasource_table_count` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_datasource_tables definition

CREATE TABLE `webapps_datasource_tables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `template` varchar(1000) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_datasources definition

CREATE TABLE `webapps_datasources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `template` varchar(1000) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_external_services definition

CREATE TABLE `webapps_external_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `template` varchar(1000) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_serviceflow definition

CREATE TABLE `webapps_serviceflow` (
  `id` varchar(150) NOT NULL,
  `project_name` varchar(150) DEFAULT NULL,
  `project_icon` varchar(100) DEFAULT NULL,
  `workflow_icon` varchar(100) DEFAULT NULL,
  `serviceflow_name` varchar(150) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `versions` varchar(10) DEFAULT NULL,
  `template` json DEFAULT NULL,
  `mapping_logic` json DEFAULT NULL,
  `uri_path` varchar(100) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_serviceflow_design definition

CREATE TABLE `webapps_serviceflow_design` (
  `id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `serviceflow_id` varchar(150) NOT NULL,
  `folder` varchar(100) DEFAULT NULL,
  `box_name` varchar(255) NOT NULL,
  `box_type` varchar(50) NOT NULL,
  `from_index_box1` varchar(50) DEFAULT NULL,
  `from_index_box2` varchar(50) DEFAULT NULL,
  `from_index_box3` varchar(50) DEFAULT NULL,
  `from_index_box4` varchar(50) DEFAULT NULL,
  `to_index_box1` varchar(50) DEFAULT NULL,
  `to_index_box2` varchar(50) DEFAULT NULL,
  `to_index_box3` varchar(50) DEFAULT NULL,
  `to_index_box4` varchar(50) DEFAULT NULL,
  `next_process` varchar(1000) DEFAULT NULL,
  `editor_logic` varchar(1000) DEFAULT NULL,
  `editor_type` varchar(50) DEFAULT NULL,
  `output_type` varchar(100) NOT NULL,
  `create_at` datetime NOT NULL,
  `create_by` varchar(50) NOT NULL,
  `update_at` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_shop definition

CREATE TABLE `webapps_shop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `template` varchar(1000) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_usergroups definition

CREATE TABLE `webapps_usergroups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(150) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_users definition

CREATE TABLE `webapps_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(150) DEFAULT NULL,
  `last_name` varchar(250) DEFAULT NULL,
  `usergroup_code` varchar(20) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_users_role definition

CREATE TABLE `webapps_users_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `template` varchar(1000) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_workflow definition

CREATE TABLE `webapps_workflow` (
  `id` varchar(150) NOT NULL,
  `project_name` varchar(150) DEFAULT NULL,
  `project_icon` varchar(100) DEFAULT NULL,
  `workflow_icon` varchar(100) DEFAULT NULL,
  `workflow_name` varchar(150) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `versions` varchar(10) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sorrydb.webapps_workflow_design definition

CREATE TABLE `webapps_workflow_design` (
  `id` varchar(150) NOT NULL,
  `name` varchar(255) NOT NULL,
  `versions` int NOT NULL,
  `workflow_id` varchar(150) NOT NULL,
  `template_uischema` json DEFAULT NULL,
  `template_schema` json DEFAULT NULL,
  `template_data` json DEFAULT NULL,
  `mapping_logic` json DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_at` datetime NOT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  `uri_path` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;