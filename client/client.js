Meteor.subscribe('thePlayers');

  Template.leaderboard.helpers({

    'player': function(){
      var currentUserId = Meteor.userId();
      return PlayersList.find({}, {sort: {score: -1, name: 1}})

    },

    'total': function(){
      return PlayersList.find().count()

    },

    'selectedClass': function(){
      var playerID = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerID == selectedPlayer){
        return "selected"
      }
    },

      'showSelectedPlayer': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.findOne(selectedPlayer)
      }

  });

  Template.leaderboard.events({

    'mouseover p': function(){
      console.log("Your mouse moved over a p element");

    },

    'dblclick.player': function(){
      var playerID = this._id;
      Session.set('selectedPlayer', playerID);

    },

    'click .increment': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, 5);

    },

    'click .decrement': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, -5);

    },

    'click .remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlayer);
      }

  });

  Template.addPlayerForm.events({
    'submit form': function(event){
      event.preventDefault();
      var playerName = event.target.playerName.value;
      var playerScore = parseInt(event.target.playerScore.value);
      Meteor.call('insertPlayerData', playerName, playerScore);
    }
  });
