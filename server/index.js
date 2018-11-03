const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const fbase = require("firebase-admin");
const serviceAccount = require("./ks-games-space-out-firebase-adminsdk-fke0c-2b53d02fe5");

fbase.initializeApp({
    credential: fbase.credential.cert(serviceAccount),
    databaseURL: 'https://ks-games-space-out.firebaseio.com'
});
const firebaseDB = fbase.database();
const ref = firebaseDB.ref("Highscore");




app.use(bodyParser.json())
app.use(express.static("./dist"));
app.post("/api/sendScore", function (req, res) {
    if(req.body.recurringPlayer){
        sendScore(req,res)
        return
    }
    ref.orderByKey().equalTo(req.body.username).once("value", function (snapshot) {
        console.log(snapshot.val());
        if (snapshot.val()) {
            res.json({
                success: false,
                reason: req.body.username + " is taken"
            })
        } else {
            sendScore(req,res)
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    })
    console.log(req.body)
})
app.get("/api/getScores", function (req, res) {
   
    ref.orderByKey().once("value", function (snapshot) {
       res.send(snapshot.val())
      
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    })
})
function sendScore(req,res) {
    let newEntry = {}
    newEntry[req.body.username] = {
        "score": req.body.score
    }
    ref.update(newEntry
        , function (error) {
            if (error) {
                console.log("The write failed: " + error.code);
                res.json({ success: false, reason: "Encountered network issues, please try again" })
            } else {
                // Data saved successfully!
                res.json({ success: true })
            }
        });
}
const port = (process.env.PORT || 8081)
app.listen(port, function () {
    console.log("listening at port " + port)
})