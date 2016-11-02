# CPSC 473 Assignment 4

# Javier Torres & Deshawn Dana

##server.js, app.js, and index.html located in shared folder

##Must install npm and install dependencies
    sudo apt-get install npm
    npm install 
##Note
    For testing we did not use vagrant.  We tested on Mac but thought it more fitting to use vagrant.
##Vagrant
    Use these commands in the terminal to get vagrant up and getting ssh working
        sudo vagrant up
        sudo vagrant ssh
    Use these commands in the terminal to halt the ssh and vagrant
        sudo halt
        sudo vagrant halt
        
##Starting redis
    Use this command to start redis
        $HOME/redis/src/redis-server

##Starting mongodb 
    Use the following command to make the data directory 
        mkdir -p $HOME/mongodb/data

    Use the following command to start up mongodb
        $HOME/mongodb/bin/mongod --dbpath=$HOME/mongodb/data

##mongo
    The following command starts mongo
        mongo

    The database name we used is my_dee_bee
    Our collection name is "questions" 


##Run server.js
    node server.js

##Route names
    /getQuestion
    /postQuestion
    /postAnswer
    /getScore

##Get Question
    Retrieves most recent question posted to the database as well as its ID

##Post Answer
    User submits answer to a question along with the question's ID
    The server notifies the user if they are correct or incorrect

##Post New Question
    User submits a new question along with the answer to the question

##Get Score
    Server notifies the user of the number of "right" and "wrong" answers the user has submitted
