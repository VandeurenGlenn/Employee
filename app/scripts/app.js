/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  var splash = document.createElement('span');

  splash.classList.add('splash');
  splash.setAttribute('id', 'splash');
  var h = document.createElement('h1');
  h.innerHTML = 'Loading';
  splash.appendChild(h);
  document.querySelector('body').appendChild(splash);

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for a loaded-changed event to know when bindings
  // have resolved, content has been stamped to the page and all data is loaded
  window.addEventListener('loaded-changed', function (e) {
    var loaded = e.detail;

      console.log(app.user);

    if (loaded.user && loaded.employees?loaded.employees:true) {
      app.fire('start-routing');

      var splash = document.querySelector('#splash');
      app.debounce('fadeOut', function () {

        splash.classList.add('hide');

      }, 800);

      app.debounce('removeSplash', function () {
        document.querySelector('body').removeChild(splash);
      }, 1200);

    }
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  addEventListener('paper-header-transform', function(e) {
    var appName = document.querySelector('.app-name');
    var middleContainer = document.querySelector('.middle-container');
    var bottomContainer = document.querySelector('.bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  app._computeEmployeeLink = function (id) {
    return 'employees/' + id;
  };

  app.AddEmployeeDialog = function () {
    app.querySelector('#addEmployeeDialog').open();
  };

})(document);
