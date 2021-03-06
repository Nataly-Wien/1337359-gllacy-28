var feedbackOpenButton = document.querySelector('.contacts__button');
var feedbackCloseButton = document.querySelector('.feedback__close-btn');
var feedbackPopup = document.querySelector('.modal');
var feedbackWindow = document.querySelector('.feedback');
var feedbackForm = document.forms.feed;
var userName = feedbackForm.username;
var userMail = feedbackForm.email;
var userText = feedbackForm.usertext;
var sliderButtons = document.querySelectorAll('.slider-section__ctrl');
var pageBackground = document.querySelector('.main-body');
var feedbackSubmitButton = document.querySelector('.feedback__button');
var isStorage = true;

try {
  var email = localStorage.getItem('email');
} catch (err) {
  isStorage = false;
}

function closeWin() {
  if (feedbackWindow.classList.contains('appear')) {
    feedbackWindow.classList.remove('appear');
  }
  if (feedbackWindow.classList.contains('submit-error')) {
    feedbackWindow.classList.remove('submit-error');
  }
  feedbackPopup.classList.remove('show');
  window.removeEventListener('keydown', keyHandler);
}

feedbackOpenButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  feedbackPopup.classList.add('show');
  feedbackWindow.classList.add('appear');
  if (isStorage) {
    userMail.value = email;
  }
  userName.focus();
});

feedbackCloseButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeWin();
});

feedbackForm.addEventListener('submit', function (evt) {
  if (feedbackWindow.classList.contains('appear')) {
    feedbackWindow.classList.remove('appear');
  }
  if (feedbackWindow.classList.contains('submit-error')) {
    feedbackWindow.classList.remove('submit-error');
  }
  if (!userName.value || !userMail.value ||
    !userText.value || userText.value === 'В свободной форме') {
    evt.preventDefault();
    if (!userName.value) {
      userName.focus();
    } else
      if (!userMail.value) {
        userMail.focus();
      } else {
        userText.focus();
      }
    feedbackWindow.classList.add('submit-error');
  } else {
    localStorage.setItem('email', userMail.value);
    closeWin();
  }
});

function keyHandler(evt) {
  if (evt.code === 'Escape' && feedbackPopup.classList.contains('show')) {
    evt.preventDefault();
    closeWin();
  } else
    if (evt.code === 'Tab' && !evt.shiftKey && evt.target === feedbackSubmitButton) {
      evt.preventDefault();
      feedbackCloseButton.focus();
    } else
      if (evt.code === 'Tab' && evt.shiftKey && evt.target === feedbackCloseButton) {
        evt.preventDefault();
        feedbackSubmitButton.focus();
      }
};

window.addEventListener('keydown', keyHandler);

feedbackPopup.addEventListener('click', function (evt) {
  if (!feedbackWindow.contains(evt.target)) {
    closeWin();
  }
});

for (let i = 0; i < sliderButtons.length; i++) {
  sliderButtons[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    let currentSlide = document.querySelector('.slider__slide--current');
    currentSlide.classList.remove('slider__slide--current');
    let newSlide = document.querySelector('.slide' + (i + 1));
    newSlide.classList.add('slider__slide--current');
    let currentButton = document.querySelector('.slider-section__ctrl--current');
    currentButton.classList.remove('slider-section__ctrl--current');
    sliderButtons[i].classList.add('slider-section__ctrl--current');
    pageBackground.classList.remove(pageBackground.className.match(/page\d+/));
    pageBackground.classList.add('page' + (i + 1));
  });
}

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
    center: [59.93929, 30.32942],
    zoom: 16
  }),
    icePin = new ymaps.Placemark([59.938635, 30.323118], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/pin.svg',
      iconImageSize: [80, 140],
      iconImageOffset: [-40, -140]
    });
  myMap.geoObjects.add(icePin);
});
