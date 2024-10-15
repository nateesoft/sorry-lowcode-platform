CREATE TABLE sorry_development.system_users (
	id serial4 NOT NULL,
	username varchar(50) NULL,
	password varchar(20) NULL,
	active char(1) NULL,
	CONSTRAINT system_users_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.system_profile (
	id serial4 NOT NULL,
	username varchar(50) NULL,
	first_name varchar(150) NULL,
	last_name varchar(250) NULL,
	email varchar(250) NULL,
	CONSTRAINT system_profile_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.company (
	id serial4 NOT NULL,
	code varchar(13) NULL,
	name varchar(250) NULL,
	CONSTRAINT company_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.company_users (
	id serial4 NOT NULL,
	company_code varchar(13) NULL,
	username varchar(50) NULL,
	password varchar(20) NULL,
	CONSTRAINT company_users_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.company_users_profile (
	id serial4 NOT NULL,
	username varchar(50) NULL,
	password varchar(20) NULL,
	CONSTRAINT company_users_profile_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.webapps_dashboard (
	id serial4 NOT NULL,
	company_code varchar(13) NULL,
	project_count int NULL,
	userapp_count int NULL,
	workflow_count int NULL,
	serviceflow_count int NULL,
	datasource_count int NULL,
	datasource_table_count int NULL,
	CONSTRAINT webapps_dashboard_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.webapps_users (
	id serial4 NOT NULL,
	first_name varchar(150) NULL,
	last_name varchar(250) NULL,
	usergroup_code varchar(20) NULL,
	status char(1) NULL,
	CONSTRAINT webapps_users_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.webapps_usergroups (
	id serial4 NOT NULL,
	code varchar(150) NULL,
	status char(1) NULL,
	CONSTRAINT webapps_usergroups_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.webapps_architecture (
	id serial4 NOT NULL,
	schema json NULL,
	status char(1) NULL,
	CONSTRAINT webapps_architecture_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.webapps_workflow (
	id serial4 NOT NULL,
	schema json NULL,
	status char(1) NULL,
	CONSTRAINT webapps_workflow_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.webapps_serviceflow (
	id serial4 NOT NULL,
	schema json NULL,
	status char(1) NULL,
	CONSTRAINT webapps_serviceflow_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.webapps_datasources (
	id serial4 NOT NULL,
	schema json NULL,
	status char(1) NULL,
	CONSTRAINT webapps_datasources_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.webapps_datasource_tables (
	id serial4 NOT NULL,
	schema json NULL,
	status char(1) NULL,
	CONSTRAINT webapps_datasource_tables_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.webapps_users_role (
	id serial4 NOT NULL,
	schema json NULL,
	status char(1) NULL,
	CONSTRAINT webapps_users_role_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.webapps_external_services (
	id serial4 NOT NULL,
	schema json NULL,
	status char(1) NULL,
	CONSTRAINT webapps_external_services_pkey PRIMARY KEY (id)
);

CREATE TABLE sorry_development.webapps_company (
	id serial4 NOT NULL,
	schema json NULL,
	status char(1) NULL,
	CONSTRAINT webapps_company_tables_pkey PRIMARY KEY (id)
);
CREATE TABLE sorry_development.webapps_branch (
	id serial4 NOT NULL,
	schema json NULL,
	status char(1) NULL,
	CONSTRAINT webapps_branch_tables_pkey PRIMARY KEY (id)
);
CREATE TABLE sorry_development.webapps_shop (
	id serial4 NOT NULL,
	schema json NULL,
	status char(1) NULL,
	CONSTRAINT webapps_shop_tables_pkey PRIMARY KEY (id)
);
