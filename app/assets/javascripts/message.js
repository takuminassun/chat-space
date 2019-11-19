$(function(){

  function buildHTML(message){
    image = (message.image.url) ?  `<img src =${message.image.url}>`: "";
    
    var html = `<div class="message" data-message-id= "${message.id}">
                  <div class="messages__info">
                    <div class="messages__info__talker">
                      ${message.user_name}
                    </div>
                    <div class="messages__info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="messages__text">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                  </div>
                    ${image}  
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    return false;
  });
  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id")
    
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          if(message.id > last_message_id){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          }
        });
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});
