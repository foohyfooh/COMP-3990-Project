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
- [business](/business) - Business Application for checking sales and other business functions.
- [cashier](/cashier) - Checkout Application for Cashier.
- [kitchen](/kitchen) - Kitchen Application to update order statuses.
- [frontend](/frontend) - Group the non-customer applications into one.

## Environment Specification
- Node 8.9.0
- npm 5.5.1
- cordova 8.0.0
- ionic 3.20.0
- MySQL 5.6

## Setup
-  Import the [restaurant_automation.sql](/database/restaurant_automation.sql) into MySQL
- Add a config.json file in [db](/db) with the following fields:
  - host
  - database
  - user
  - password

## Running
```
> bash run.sh
```
