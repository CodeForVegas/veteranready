To create the database:

tar -zxvf mongo.tgz
mongorestore --db veteran-ready veteranMongo/

To run:

npm install
node keystone

Or use nodemon to pick up changes in hbs files and js files:

npm install -g nodemon
nodemon keystone -e hbs,js

Then go to the homepage.  Username and password should be user@keystone.js/admin
