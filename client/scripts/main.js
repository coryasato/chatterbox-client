var Message = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/chatterbox/'
});

var Messages = Backbone.Collection.extend({

  model: Message,

  url: 'https://api.parse.com/1/classes/chatterbox/',

  loadMsgs: function() {
    this.fetch({data: {order: '-createdAt'}});
  },

  parse: function(response) {
    console.log(response.results);
  }

});

var MessageView = Backbone.View.extend({
  el: 'li',
  //template = _.template(),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

var MessagesView = Backbone.View.extend({

});

// Form View
var FormView = Backbone.View.extend({

});

$(document).ready(function() {

  var message = new Messages();
  //var messageView = new MessageView({model: message});

});

