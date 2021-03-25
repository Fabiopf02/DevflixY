$(document).scroll(() => {
  let position = $(document).scrollTop()
  let header = $('#header')
  if (position >= 2 && !header.hasClass('c')) {
    $(header).addClass('c')
  }
  if (position < 2 && header.hasClass('c')) {
    $(header).removeClass('c')
  }
})
