Players = new Mongo.Collection("players");
var playersArray = Players.find().fetch();
var another_player;

if (Meteor.isClient) {
  
  Template.RSP.helpers({
    output: function () {
      return Session.get('output');
    }
  });
  
  Template.RSP.events({
    'click .rock': function () {
    	playersArray = Players.find().fetch();
    	//insert a decision of a player
      Players.insert({
      	player: playersArray.length + 1,
      	decision: "rock"
      });
      
      Session.set('output', "");
      //disable the buttons
      $("button").prop('disabled', true);
      
      //wait until the other player decides
      setTimeout(Result, 1000);
    },
    'click .scissor': function () {
    	playersArray = Players.find().fetch();
    	//insert a decision of a player
      Players.insert({
      	player: playersArray.length + 1,
      	decision: "scissor"
      });
      
      Session.set('output', "");
      //disable the buttons
      $("button").prop('disabled', true);
      
      //wait until the other player decides
      setTimeout(Result, 1000);
    },
    'click .paper': function () {
    	playersArray = Players.find().fetch();
    	//insert a decision of a player
      Players.insert({
      	player: playersArray.length + 1,
      	decision: "paper"
      });
      
      Session.set('output', "");
      //disable the buttons
      $("button").prop('disabled', true);
      
      //wait until the other player decides
      setTimeout(Result, 1000);
    }
  });
}

function Result() {
	var current_player = Players.findOne({
      			player: playersArray.length + 1
    });
    
    //Check if the other player already made a decision or the current player should wait
    if((playersArray.length + 1) % 2 == 0) {
      		another_player = Players.findOne({
      			player: playersArray.length
      		});
    }
    else {
      		another_player = Players.findOne({
      			player: playersArray.length + 2
      		});
    }
    //Wait if another player has not decided yet
    if(another_player == null)
    	setTimeout(Result, 1000);
    
    //If both players made decisions, show the payoff to both players
    else if(current_player.decision == "rock") {
    	if(another_player.decision == "scissor")
      		Session.set('output', "Winner");
      	else if(another_player.decision == "paper")
      		Session.set('output', "Loser");
      	//Enable the buttons again
      	$("button").prop('disabled', false);
    }
    
    else if(current_player.decision == "scissor") {
    	if(another_player.decision == "paper")
      		Session.set('output', "Winner");
      	else if(another_player.decision == "rock")
      		Session.set('output', "Loser");
      	//Enable the buttons again
      	$("button").prop('disabled', false);
    }
      		
    else if(current_player.decision == "paper") {
    	if(another_player.decision == "rock")
      		Session.set('output', "Winner");
      	else if(another_player.decision == "scissor")
      		Session.set('output', "Loser");
      	//Enable the buttons again
      	$("button").prop('disabled', false);
    }
    
}
    

if (Meteor.isServer) {
  Meteor.startup(function () {
    //Initialize the Collections
    var globalObject=Meteor.isClient?window:global;
    for(var property in globalObject){
        var object=globalObject[property];
        if(object instanceof Meteor.Collection){
            object.remove({});
        }
    }
  });
}
