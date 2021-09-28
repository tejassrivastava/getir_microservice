# Getir Express Rest API | Fetch Record From Mongo

We have developed a simple express based Rest API which has the following features:

### Features
- Filter date by passing startDate & endDate
- Filter date by passing minCount & maxCount

------------


### Install
To install the dependecies simply run

`npm install `

------------


### Usage
To Use the API do the following:

Start the node server

`npm run dev`

Make an API request on 

`http://127.0.0.1:8080/api/records/all`

Request Body

```json
{
"startDate": "2016-01-26",
"endDate": "2018-02-02",
"minCount": 1,
"maxCount": 170
}
```

------------



### Tests

We have created test cases using the follwing:

- Jest
- Supertest

To run tests

`npm run test`


**Current Test Case Result:**


[![](https://github.com/tejassrivastava/getir_microservice/blob/master/TestResult.png)](https://github.com/tejassrivastava/getir_microservice/blob/master/TestResult.png)

**Current Test Coverage Result:**

[![](https://github.com/tejassrivastava/getir_microservice/blob/master/TestCoverage.png)](https://github.com/tejassrivastava/getir_microservice/blob/master/TestCoverage.png)


------------


### Author
**Tejas Srivastava**

### End
