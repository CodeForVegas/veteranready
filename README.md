#### The database has already been built, but just for reference...
#### To create the database, open a terminal, cd to the project directory, and type:

1. mongorestore --db veteran_ready dump/veteran_ready

#### To dump current data:

1. mongodump -d veteran_ready

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

3. You will need to create a .env file in your main directory. It may contain all of the following:

- COOKIE_SECRET={a random string to encrypt cookies}
- CLOUDINARY_URL={your cloudinary url}
- MANDRILL_APIKEY={your mandrill api key}
- MANDRILL_USERNAME={your mandrill username}
- EMBEDLY_APIKEY={your embedly key}
- APP_ENV=local
- NODE_ENV=development
- MONGO_URL='mongodb://localhost/veteran_ready'
- MONGO_URI={your mongo connection uri} # can also be MONGOLAB_URI
- GA_DOMAIN={your google analytics domain} # optional
- GA_PROPERTY={your google analytics property} # optional
- PORT={the port to listen on} # defaults to 3000, automatically set by paas (e.g. heroku)

I am currently using APP_ENV, NODE-ENV, CLOUDINARY_URL, COOKIE_SECRET, and MONGO_URL.
