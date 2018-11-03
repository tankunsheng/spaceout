# SpaceOut
<a href="https://kunsheng-games.herokuapp.com/Pages/Game/Intro.html" target="_blank">SpaceOut</a> is a simple 2d canvas game written in pure javascript (both the client and server). 

It was my first brief attempt at trying out games development with pure vanilla javascript canvas api without any third party javascript library support for developing games such as Phaser.io for example.

The app is split into two parts, the client and server as seen in both folders.

#### Client
Contains the game itself, written in javascript using webpack as the bundler.

#### Server
Contains a simple express server to serve out our front end app and also listening
on a few api routes for the client to initiate retrieving of highscores data and sending new highscores data. It also communicates with a firebase realtime database to read/write data.

## How to Run
#### Development
*cd into client and 'npm install', then 'npm start'*
*cd into server and 'npm install', then 'npm start'*

the webpack-dev-server serving the front end app will run the app at **localhost:8080** and the api server will be running at **localhost:8081**
webpack-dev-server proxies the api requests to port 8081 as seen in the webpack.config.js below.
```
devServer: {
        proxy: {
            '/api': 'http://localhost:8081'
        }
    }
```
Remeber to get your own service account private key and replace it into privatekey.json on the server side if you are using firebase as your storage of choice. You can otherwise use any other data storage provideder but the data access logic will have to be re written.

#### Production
*cd into server and 'npm run build'*

this will trigger the build process in client and output the files into the dist folder in the server. After which, you can
*'npm start'* and browse to localhost:8081 for the game to be served.
You can choose to add the build script into the start script if you wish and deploy the entire application on heroku
```
"start": "npm run build && node index.js"
```
otherwise, pushing only the server dir up to heroku after building the files into the dist folder is fine as well.
