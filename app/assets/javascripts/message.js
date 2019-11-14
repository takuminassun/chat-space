$(function(){

  function buildHTML(message){
    if ( message.image.url){
      var html = `<div class="message">
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
                    <img src =${message.image.url}>
                  </div>`
      return html;
    }else {
      var html = `<div class="message">
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
                  </div>`
      return html;
    };
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
});