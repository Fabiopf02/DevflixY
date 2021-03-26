import movies from '../data/movies.js'
import series from '../data/series.js'
import { showDetails } from './details.js'

const owlCarousel = $('.movie-carousel .owl-carousel')
const owlCarousel2 = $('.movie-carousel2 .owl-carousel')
const mainMovieImg = $('.main-movie img')
const mainMovieTitle = $('.main-movie .s .title')
const mainMovieDescription = $('.main-movie .s .description')
const watch = $('.btn.bg-white')
const info = $('.btn.info')
const options = $('nav a')
let show = false

function mainMovie(data) {
  //main: buttons
  mainMovieImg.attr("src", data.image)
  watch.attr('href', data.link)
  info.on('click', function() {
    showDetails(data)
  })
  //

  if (data.title) {
    mainMovieTitle.text(data.title)
  }
  let description = data.description;
  if (description) {
    let mx = 80
    if (description.length > mx) {
      description = description.slice(0, mx) + "..."
    }
    mainMovieDescription.text(description)
  }
  show = true
}

function createItems(data, owl) {
  let index = Math.floor(Math.random() * movies.length)
  if (!show)
    mainMovie(movies[index])

  data.forEach(movie => {
    const item = $('<div/>', { class: 'item' })
    $(item).on('click', function() {showDetails(movie)})

    $('<img />', { class: 'movie-box', src: movie.image, alt: movie.title })
      .appendTo(item)

    item.appendTo(owl)
  })

  owl.owlCarousel({
    loop: true,
    margin: 5,
    dots: false,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    }
  })
}

$.each(options, function(_, option) {
  $(option).on('click', function() {
    if ($(option).hasClass('active')) {
      return
    }
    mainMovieTitle.text('')
    mainMovieDescription.text('')
    const name = $(option).attr('href').replace('#', '')
    $('.active').removeClass('active')
    $(option).addClass('active')

    function visibility(col, value) {
      $(`.${col}`).css('display', value)
    }

    if (name === 'series') {
      mainMovie(series[Math.floor(Math.random() * series.length)])
      visibility('videos', 'none')
    }
    if (name === 'videos' || !name) {
      mainMovie(movies[Math.floor(Math.random() * movies.length)])
      visibility('series', 'none')
    }
    if (name === '') {
      visibility('videos', 'block')
      visibility('series', 'block')
    }
    else {
      visibility(name, 'block')
    }
  })
})

window.addEventListener('DOMContentLoaded', () => {
  createItems(movies, owlCarousel)
  createItems(series, owlCarousel2)
})