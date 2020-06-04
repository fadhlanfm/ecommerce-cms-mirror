require('dotenv').config();
module.exports = {
  "development": {
    "username": "postgres",
    "password": "hacktiv",
    "database": "e-commerce-cms",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "hacktiv",
    "database": "e-commerce-cms-test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "xbfgceusipokan",
    "password": "9dd1026c364dd0ad2f814b30889f829e9684dcebe295dc6b673069032ee3b215",
    "database": "d7br2ln43v3l80",
    "host": "ec2-3-91-139-25.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
