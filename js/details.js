function showDetails(data) {
  if (data.image === $('#details .bn').attr('src')) {
    return sw();
  }

  $('#details .title').text('Vídeo')
  $('body').css('overflow', 'hidden')

  $('#details .d main a').attr('href', data.link)
  $('#details .d main .bn').attr('src', data.image)
  preview(data, $('#details .d main .bn'))

  $('#details .d main .i .name').text(data.title ? data.title : data.more.title)

  $('#details .ep ol').html('')
  $('#details .ep h4').text('')

  if (data.episodes) {
    $('#details .title').text('Série')
    $('#details .ep h4').text('Episódios')
    const ol = $('#details .ep ol')
    data.episodes.forEach((episode, index) => {
      const li = $('<li />')
      const div = $(`<div><span>#${index+1}</span></div>`)
      const a = $('<a target="blank" class="watch-mini" />').attr('href', episode.link).appendTo(li)
      $(`<img alt="${episode.title}" />`)
        .attr('src', episode.image)
        .appendTo(div)
      div.appendTo(a)
      $('<p />').text(episode.title)
        .appendTo(a)
      li.appendTo(ol)
    })
  }
  if (data.description!==undefined || data.more)
    $('#details .d main .i p').text(data.description ? data.description : data.more.description)
  $('#details .d footer h4 a').text(data.by)
  $('#details .d footer h4 a').attr('href', data.org)

  function sw() {
    $('#details').removeClass('hide')
    $('#details').addClass('show')
    $('#details').css('margin-top', `${$(document).scrollTop()}px`)
  }
  sw()

}
$('#details .close').on('click', hideDetails)

function hideDetails() {
  $('body').css('overflow', 'auto')
  $('#details').removeClass('show')
  $('#details').addClass('hide')
}

function preview(data, element) {
  if (data.preview) {
    element.hover(function({ target }) {
      $(target).attr('src', data.preview)
    }, function({ target }) {
      $(target).attr('src', data.image)
    })
  }
}

export { showDetails, preview }