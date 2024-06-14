# install mySql on docker
docker run --name=sorrydb -e MYSQL_ROOT_PASSWORD=nathee2024 -e MYSQL_DATABASE=sorrydb -p 3306:3306 -d mysql:8

CREATE TABLE `workflow`
(
  `id`            INT(11) NOT NULL auto_increment ,
  `name`          VARCHAR(255) NOT NULL ,
  `version` INT NOT NULL ,
  `project_id`  INT(11) NOT NULL ,
  `type`     VARCHAR(30) NOT NULL ,
  `template`    JSON NULL ,
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`),
  UNIQUE `idx_name_unique` (`name`(255))
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;

CREATE TABLE `workflow_design`
(
  `id`            INT(11) NOT NULL auto_increment ,
  `name`          VARCHAR(255) NOT NULL ,
  `version` INT NOT NULL ,
  `workflow_id`  INT(11) NOT NULL ,
  `type`     VARCHAR(30) NOT NULL ,
  `template_uischema`    JSON NULL ,
  `template_schema`    JSON NULL ,
  `template_data`    JSON NULL ,
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`),
  UNIQUE `idx_name_unique` (`name`(255))
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;