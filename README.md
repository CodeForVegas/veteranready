#### The database has already been built, but just for reference...
#### To create the database, open a terminal, cd to the project directory, and type:

1. tar -zxvf mongo.tgz (You don't need to do this if the veteranMongo directory already exists.)
2. mongorestore --db veteran-ready veteranMongo/

#### To run, open a terminal, cd to the project directory, and type:

1. npm install
2. node keystone

#### Or use nodemon to pick up changes in hbs files and js files:

1. npm install -g nodemon
2. nodemon keystone -e hbs,js

#### Then go to the homepage.  Username is user@keystonejs.com and password is admin.

#### Notes

1. This project is built using Keystone.js, which is a Node.js Content Management System and Web Application Platform. You can find out more at http://keystonejs.com/.

2. You may need to have MongoDB running in a separate terminal for the application to start. You can find instructions for installing and running MongoDB on OSX at https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/. If you are using Linux or Windows, find the appropriate link on the left side of the page. I'm building this site with a Mac, so Windows or Linux users may have to jump through some hoops to get the project up and running on their machine.
