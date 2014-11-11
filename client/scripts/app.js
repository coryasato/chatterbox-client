// YOUR CODE HERE:

$(document).ready(function(){
  var user = window.location.search.split('=')[1];
  var friendList = {};
  var roomList = {};
  function getData(){
  var currentTime = new Date().getTime()-1000;

    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      type: 'GET',
      contentType: 'application/json',

      success: function (data) {
        var messages = data.results;
        var newPosts = [];


        _.each(messages, function(message) {
          var roomName = message.roomname;
          if(!roomList[roomName]) {
            roomList[roomName] = roomName;
          }
        });

        _.each(messages, function(message) {
          var updatedAt = Date.parse(message.updatedAt);
          if(updatedAt >=currentTime) {
            newPosts.push(message);
          }
        });
        _.each(newPosts, function(message){
          var encodedUser = htmlEncode(message.username);
          var encodedText = htmlEncode(message.text);
          if(!friendList[message.username]) {
            $('.list').prepend("<li>" + "<a>" + htmlDecode(encodedUser) + "</a>"
              + " : " + htmlDecode(encodedText)  +"</li>");
          } else {
            $('.list').prepend("<li>" + "<a class='friend'>" + htmlDecode(encodedUser) + "</a>"
              + " : " + htmlDecode(encodedText)  +"</li>");
          }
        });
      },

      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });

  }


  getData();
  setInterval(getData, 1000);

  function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  function htmlEncode(string) {
    if(string === undefined) {
      return 'undefined';
    } else if(string === null) {
      return 'null';
    }

    return string.replace(/&/g, '&amp;')
                 .replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;')
                 .replace(/'/g, '&#x27;')
                 .replace(/\//g, '&#x2F;')
                 .replace(/script/g, '');
  }

  // POST
  $('.message-submit').on('click', function(e) {
    e.preventDefault();

    var inputVal = $('#message').val();
    var message = {
      username: user,
      text: inputVal,
      roomname: 'hr20'
    };
    $('#message').val('');

    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  });

  // Friend List Listener
  $('.list').on('click','a', function(e) {
    e.preventDefault();
    var name = $(this).text();
    if(!friendList[name] && name !== user) {
      $('.friend-list').append("<li>" + name + "</li>");
    }
    friendList[name] = name;
  });

  // Append roomList to .room-list on load
  // Add listeners to each room link


});
// Create a filter in get, where user only posts in that room
// Allow user to create room
// Allow to post in room
































