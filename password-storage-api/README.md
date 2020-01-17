# Password-storage-api
Password management application API side. This documentation will describe basic usage, running testing, and api documentation.
### Content
1. [Basic Usage](https://github.com/geraldi16/basic-password-storage/tree/master/password-storage-api#basic-usage)
 2. [Running Test](https://github.com/geraldi16/basic-password-storage/tree/master/password-storage-api#running-testing)
3. [API Documentation](https://github.com/geraldi16/basic-password-storage/tree/master/password-storage-api#api-documentation)
    - [Register](https://github.com/geraldi16/basic-password-storage/tree/master/password-storage-api#register)
    - [Login](https://github.com/geraldi16/basic-password-storage/tree/master/password-storage-api#login)
    - [Get List Account](https://github.com/geraldi16/basic-password-storage/tree/master/password-storage-api#get-list-account)
    - [Get Detail Password](https://github.com/geraldi16/basic-password-storage/tree/master/password-storage-api#get-detail-password-data)
    - [Add new Password Data](https://github.com/geraldi16/basic-password-storage/tree/master/password-storage-api#add-new-password-data)
    - [Edit Password Data](https://github.com/geraldi16/basic-password-storage/tree/master/password-storage-api#edit-password-data)
    - [Delete Password Data](https://github.com/geraldi16/basic-password-storage/tree/master/password-storage-api#delete-password-data)
## Basic Usage
After cloning from github repository, go to api directory.
```
$ cd password-storage-api/
```
In this directory, you need to setup several steps after this.

### Install modules
First, you need to install the modules. Type this
```
$ yarn install
```

### Database setup
Second, you need to set up the database. Create database in your postgres:
```
$ createdb password_storage
$ createdb password_storage_test
```
Note that `password_storage` is for development mode and `password_storage_test` is for testing mode

After that, migrate database config with `sequelize-cli` into both of your database
```
$ npx sequelize-cli db:migrate
$ NODE_ENV=test npx sequelize-cli db:migrate
```
You can also fill your database with the seeder we provided. This is optional, but if you wish to, do this.
```
$ npx sequelize-cli db:seed:all
```

### Copy environment variables
Before you run the app, it is important to set the environment variables because some of them are defined outside the code.
```
$ cp .env.example .env.environment
```
and then open the file in your editor to customize the value anyway you like.

### Run the app
Now you all ready to set! Finally you need to run the program: 
```
yarn start
```
and voila! the app is running and you are ready to go!

## Running testing
For running testing, you need to do two steps. First, you run the app in testing mode,
```
yarn start:test
```
Why we need that? In the testing code, we are using `supertest` that needs a running to be accessed by URL.
Secondly, run the test
```
yarn test
```

## API Documentation
### Login and Register
#### Register
Route: `POST /auth/register` \
Input
```
{
	"name": <string>,
	"password": <string>,
	"confirm_password": <string>
}
```
Output
```
{
    "error": false,
    "data": <token string>
}
```
#### Login
Route: `POST /auth/login`\
Input
```
{
	"name": <string>,
	"password": <string>,
}
```
Output
```
{
    "error": false,
    "data": <token string>
}
```
### Password Management
#### Get List Account
Route: `GET /password/list`\
Input: `<none>`
Output: 
```
{
    error: false,
    data: [accountName1, accountName2, ... , accountNameN]
}
```
#### Get Detail Password Data
Route: `POST /password/detail`\
Input
```
{
	"account": <string>,
}
```
Output
```
{
    "error": false,
    "data": {
        "accountName": <string>,
        "username": <string>,
        "password": <string>
    }
}
```
#### Add New Password Data
Route: `POST /password/add`\
Input
```
{
	"account": <string>,
    "username": <string>,
    "password": <string>,
}
```
Output
```
{
    "error": false,
    "data": 'Add new password success!'
}
```
#### Edit Password Data
Route: `PATCH /password/edit`\
Input
```
{
	"account": <string>,
    "new_account": <string | optional>,
    "username": <string | optional>,
	"password": <string | optional>,
}
```
Output
```
{
    "error": false,
    "data":'Data successfully updated.'
}
```
#### Delete Password Data
Route: `DELETE /password/delete`\
Input
```
{
	"account": <string>,
}
```
Output
```
{
    "error": false,
    "data": 'Data successfully deleted.'
}
```