# Unit Of Work Pattern

    - Why we need Unit Of Work Pattern
        I. Why we use Unit Of Work Pattern
            - We need to use Unit Of Work Pattern when we need to do some complex logic with a lot of tables in a transaction.
            - We need to ensure that all data in database is consistent after the transaction.
            - We need to make sure that all the changes are saved to the database in a single transaction.
            - We need to make sure that if any of the changes fail, then all the changes are rolled back.
            - We need to make sure that we don't have any duplicate data in the database.
            - Separate the business logic from the data access logic.
                - Easy for testing.
                - Easy for maintain like change the database or change the data access logic.
                - Easy for trace the error.

        II. Problem
            - Firstly, I don't negavtive the fact that we can use the repository pattern to do the same thing.
            But in some case we need to use the Unit Of Work Pattern.
            For example, we have a project that has a lot of tables and we need to do some complex logic with them at one transaction.
            But each respository has its own memory and take responsibility for its own table and in a transaction we need to do some logic with a lot of tables.
            And some tables need to be updated and some tables need to be inserted, during that time some data maybe broken or fail to do something at some repository lead to the bad result in database (data inconsistency).
            So we need to use the Unit Of Work Pattern to solve this problem.

        III. Solution
            - We need to create a Unit Of Work class that has a list of repositories and a method to save all changes in all repositories to the database in a single transaction. So we can use the Unit Of Work class to do the complex logic with a lot of tables in a transaction by using the generic repository.

        IV. Reference
            - https://dotnettutorials.net/lesson/unit-of-work-csharp-mvc/
            - https://coding4food.net/2018/07/10/repository-va-unit-of-work-pattern/

## Trust Https

    Do following steps to trust https

> - Install Chocolatey : https://chocolatey.org/install
> - Install mkcert : choco install mkcert
> - Install mkcert root certificate : mkcert -install
> - Create a certificate for localhost : mkcert localhost
> - Configure the certificate in angular.json file:
>   <br/>
><pre>
>   "serve": { 
>       "builder": "@angular-devkit/build-angular:dev-server",
>       "options": {
>           "browserTarget": "client:build",
>           "sslCert": "ssl/localhost.pem",
>           "sslKey": "ssl/localhost-key.pem",
>           "ssl": true
>       },
>       "configurations": {
>           "production": {
>               "browserTarget": "client:build:production",
>               "sslKey": "ssl/localhost-key.pem",
>               "sslCert": "ssl/localhost.pem",
>               "ssl": true
>           },
>           "development": {
>               "browserTarget": "client:build:development",
>               "sslKey": "ssl/localhost-key.pem",
>               "sslCert": "ssl/localhost.pem",
>               "ssl": true
>           }
>       },
>       "defaultConfiguration": "development"
>   }
></pre>
> - Run the client project with https : ng serve

### Error

> Sometimes machince has some port using docker's port in configuration file so just change the port in configuration file and run the project again.

### If you want to run the project in docker then just run the following command

    - docker-compose up -d

### See redis keys

    - Open new page with localhost:{redis-commander-port}/
    - Login with username and password configured in docker-compose.yml file

# Will do in future
    - Now Payment using Stripe
    - Will payment using Paypal
    - Will payment using Braintree if available
    - Will payment using Momo if available
