# COMP 3990 Project - Restaurant Automation

## Members
[Jonathan Herbert](https://github.com/foohyfooh) \
[Karunesh Ramdass](https://github.com/KhaosReighn17)

## Sections
- [design](/design) - Designs and Diagrams.
- [database](/database) - MySQL database schema.
- [backend](/backend) - Express server interacting with the MySQL database.
- [db](/db) - Database module for the backend.
- [customer](/customer) - Ionic Application for customer interaction.
- [frontend](/frontend) - Group the non-customer applications into one.
  - [business](/frontend/business) - Business Application for checking sales and other business functions.
  - [cashier](/frontend/cashier) - Checkout Application for Cashier.
  - [kitchen](/frontend/kitchen) - Kitchen Application to update order statuses.
  - [menu](/frontend/menu) - Menu Application to add items. 

## Environment Specification
- Node 8.9.0
- npm 5.5.1
- cordova 8.0.0
- ionic 3.20.0
- MySQL 5.6
  - sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES 

## Setup
- Import the [restaurant_automation.sql](/database/restaurant_automation.sql) into MySQL
- (Optional) Import the [restaurant_automation_data.sql](/database/restaurant_automation_data.sql) 
- Add a config.json file in [db](/db) with the following fields:
  - host
  - database
  - user
  - password
- Run ```npm  install``` in the following directories:
  - [db](/db)
  - [backend](/backend)
  - [customer](/customer)
  - [frontend](/frontend)

## Running
```
> bash run.sh
```

- Backend is on port 8080
- Frontend is on port 8200
- Customer is on port 8100
