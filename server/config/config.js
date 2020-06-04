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
    "username": "tqnairftnlozig",
    "password": "98501e088142c56d2df66e904c5ea36de1cb74c26b48eee1cfd65af865031b66",
    "database": "dcohc6v107nkp5",
    "host": "ec2-54-86-170-8.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
