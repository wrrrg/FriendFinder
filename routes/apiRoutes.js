var friendsData = require('../data/friendsData');

module.exports = function(app) {
  app.get("/api/friends", function(req,res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req,res) {
    // survey results and compabitility here

    // we take all the params from the survey and make a new object, to avoid formatting issues, and then push that to the friends database
    var name = req.body['name'];
    var photo = req.body['photoUrl'];
    var scores = req.body['scores[]'];

    var newestFriend = {
      name: name,
      photo: photo,
      scores: scores
    }

    friendsData.push(newestFriend);
    console.log("You hit the post route at least");
    // logs in our console and in the browser console, for now at least
    console.log(friendsData);
    res.json(friendsData)

    //  logic for sorting friends data and finding a match
    var users = friendsData;



    // make an arr for the newest friend in the database to use in the sort function
    console.log("The new friend is: " + newestFriend["name"]);

    // best match so far
    var bestMatch = users[0];
    var bestMatchScore = 50;

    //  This is the sorting function
    for (var i = 0; i < users.length-1; i++) {

      var bestScore = bestMatchScore;
      var friend = newestFriend;
      var testMatch = users[i];

      console.log("The user is: " + friend["name"]);
      console.log("We are comparing them to: " + testMatch["name"]);

      var totalDiff = 0;
      for (var j = 0; j <= 9; j++) {
        diff = Math.abs(parseInt(friend["scores"][j]) - parseInt(testMatch["scores"][j]));
        totalDiff += diff
      }

      if(totalDiff < bestScore) {
        bestMatchScore = totalDiff
        bestMatch = testMatch
      };

      console.log("The difference between " + friend["name"] + " and " + testMatch["name"] + " is " + totalDiff);
      console.log("The new lowest score is: " + bestMatchScore);
      console.log("The new best match is: " + bestMatch["name"]);

    };

  });

  app.post("/api/clear", function() {
    // this is still just useful to clear the data if it gets dumb
    friendsData = [];
    console.log(friendsData);
  });
};
