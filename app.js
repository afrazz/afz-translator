"use strict";

var words = document.querySelector('.words');
var translate = document.querySelector('.translate');
var textarea = document.querySelector('textarea');
var btn = document.querySelector('button');

var apiRequest = false;

var appRunner = function appRunner() {
  if (words.value !== '' && translate.value !== '') {
    var getTranslation = function getTranslation(languageCode) {
      return fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=".concat(languageCode, "&tl=").concat(translate.value, "&dt=t&q=").concat(words.value.toUpperCase())).then(function (res) {
        return res.json();
      }).then(function (data) {
        return data[0][0][0];
      }).catch(function (err) {
        return 'cannot translate';
      });
    };

    var getlanguageCode = function getlanguageCode() {
      apiRequest = false;
      if (!apiRequest) {
        btn.innerHTML = '<i class="fa fa-spinner fa-pulse loading"></i>';
      }

      return fetch('https://afz-translation.herokuapp.com/translate', {
        method: 'post',
        body: JSON.stringify({
          text: words.value.toUpperCase()
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        apiRequest = true;

        btn.innerHTML = 'Translate';

        console.log(data);
        return data.language;
        btn.innerHTML = 'Translate';
      }).catch(function (err) {
        return 'cannot translate';
      });
    };

    getlanguageCode().then(function (code) {
      return getTranslation(code);
    }).then(function (data) {
      textarea.textContent = data;
    }).catch(function (err) {
      console.log(err);
    });
  }
};

btn.addEventListener('click', function () {
  appRunner();
});

window.addEventListener('keypress', function (e) {
  if (e.keyCode === 13 || e.which === 13) {
    appRunner();
  }
});

document.querySelector('.voice').addEventListener('click', function () {
  if (textarea.value === '') {
    responsiveVoice.speak('Translate your sentence first');
  } else {
    responsiveVoice.speak(textarea.value);
  }
});