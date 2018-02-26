var friendsData = require('../data/friendsData');

module.exports = function(app) {
  app.get("/api/friends", function(req,res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req,res) {
    // survey results and compabitility here

    // adds the submission to the friendsData
    friendsData.push(req.body);
    console.log("You hit the post route at least");
    // logs in our console and in the browser console, for now at least
    console.log(friendsData);
    res.json(friendsData)

    //  logic for sorting friends data and finding a match
    var simpleFriendsArray = [];

    for (var i = 0; i < friendsData.length; i++) {
      var simpleFriend = []
      simpleFriend.push(i);
      simpleFriend.push(friendsData[i].name);
      simpleFriend.push(parseInt(friendsData[i].q1));
      simpleFriend.push(parseInt(friendsData[i].q2));
      simpleFriend.push(parseInt(friendsData[i].q3));
      simpleFriend.push(parseInt(friendsData[i].q4));
      simpleFriendsArray.push(simpleFriend);
    };

    // make an arr for the newest friend in the database to use in the sort function
    var newFriendArr = simpleFriendsArray.slice(-1);
    console.log("The new friend is: " + newFriendArr);

    var matchDiffArr = [];

    for (var i = 0; i < simpleFriendsArray.length-1; i++) {
      var totalDiff = 0;
      // add the absolute value of the difference between new friend and each friend for each question
      console.log("In the logic loop we are using this friend: " + simpleFriendsArray[i]);
      // console.log(Math.abs(newFriendArr[3]));
      diff = newFriendArr[2] - simpleFriendsArray[i][2]
      totalDiff += Math.abs(diff);
      matchDiffArr.push(totalDiff);
    };

    console.log(simpleFriendsArray);
    console.log(matchDiffArr);
  });

  app.post("/api/clear", function() {
    // this is still just useful to clear the data if it gets dumb
    friendsData = [];
    console.log(friendsData);
  });
};
