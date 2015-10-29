#### In this branch I'm going to be working on the templates and layouts for the site.

#### To create the database:

1. tar -zxvf mongo.tgz
2. mongorestore --db veteran-ready veteranMongo/

#### To run:

1. npm install
2. node keystone

#### Or use nodemon to pick up changes in hbs files and js files:

1. npm install -g nodemon
2. nodemon keystone -e hbs,js

#### Then go to the homepage.  Username is user@keystonejs.com and password is admin.
