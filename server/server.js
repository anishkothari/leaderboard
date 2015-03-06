Meteor.publish('thePlayers', function(){
  var currentUserId = this.userId;
  return PlayersList.find({createdBy: currentUserId})
});

Meteor.methods({
  'insertPlayerData': function(playerName, playerScore){
    var currentUserId = Meteor.userId();
    PlayersList.insert({
      name: playerName,
      score: playerScore,
      createdBy: currentUserId
    });
  },

  'removePlayerData': function(selectedPlayer){
    PlayersList.remove(selectedPlayer);
  },

  'modifyPlayerScore': function(selectedPlayer, scoreValue){
  PlayersList.update(selectedPlayer, {$inc: {score: scoreValue} });

  },

  'increasePlayerScore': function(selectedPlayer){
  PlayersList.update(selectedPlayer, {$inc: {score: 5} });

  },

  'decreasePlayerScore': function(selectedPlayer){
  PlayersList.update(selectedPlayer, {$inc: {score: -5} });
}

});
