(function() {

  var scripts = document.getElementsByTagName('script')
    , url = scripts[scripts.length-1].src 
    , baseUrl = url.match(/.+\//)[0] // everything up to the last slash 
    , head = document.getElementsByTagName('head')[0]
    , scripts = [
      // lodash (underscore replacement)
      '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js',

      // hypothes.is
      '//static.hypothes.is/lib/d3.min.js',
      '//static.hypothes.is/lib/dom_text.min.js',
      '//static.hypothes.is/lib/jquery.scrollintoview.min.js',
      '//static.hypothes.is/lib/jquery.ui.core.min.js',
      '//static.hypothes.is/lib/jquery.ui.effect.min.js',
      '//static.hypothes.is/lib/jquery.ui.effect-blind.min.js',
      '//static.hypothes.is/lib/jquery.ui.effect-highlight.min.js',
      '//static.hypothes.is/lib/jquery.ui.widget.min.js',
      '//static.hypothes.is/lib/jquery.ui.menu.min.js',
      '//static.hypothes.is/lib/jschannel.min.js',
      '//static.hypothes.is/lib/gettext.min.js',
      '//static.hypothes.is/locale/data.js',
      '//static.hypothes.is/lib/annotator.min.js',
      '//static.hypothes.is/lib/annotator.document.js',
      '//static.hypothes.is/js/plugin/bridge.js',
      '//static.hypothes.is/js/plugin/heatmap.js',
      '//static.hypothes.is/js/plugin/toolbar.js',
      '//static.hypothes.is/js/inject.min.js',

      // epub.js
      baseUrl + 'scripts/libs/epubjs/epub.js',

      // epub.js hooks
      baseUrl + 'scripts/libs/epubjs/hooks.js',
      baseUrl + 'scripts/libs/epubjs/base.js',
      baseUrl + 'scripts/libs/epubjs/hypothesis.js',
      baseUrl + 'scripts/libs/epubjs/pageturns.js',
      
      // angular core
      '//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js',
     
      // angular touch plugin 
      baseUrl + 'scripts/libs/angular/angular-touch.min.js',

      // epub.js angular modules
      baseUrl + 'scripts/app.js',
      baseUrl + 'scripts/factories/ga_factory.js',
      baseUrl + 'scripts/directives/epub-reader.js',
      baseUrl + 'scripts/directives/epub-viewer.js',
      baseUrl + 'scripts/directives/epub-toc.js',
      baseUrl + 'scripts/directives/hypothesis.js',

      // compiled angular templates
      baseUrl + 'templates.js'
    ]
    , styles = [
      '//static.hypothes.is/css/inject.css',
      baseUrl + 'styles/main.css'
    ]
    , loadScript = function(link, cb) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = link;
        script.onload = cb; 
        head.appendChild(script);
    }
    , loadStyle = function(link) {
        var script = document.createElement('link');
        script.rel = 'stylesheet';
        script.href = link;
        head.appendChild(script);
    }
    , loadScripts = function(index, cb) {
      // dependency resolution in these scripts is a little rocky
      // so we load the files sequentially, this could probably be 
      // better

      if (scripts.length > index) {
        loadScript(scripts[index], function() {
          loadScripts(index+1, cb);
        })
      } else {
        cb();
      }
    }
    , initialize = function() {
      // only in here is it safe to assume the document is ready and jquery is loaded

      $('html').attr('ng-app', 'Reader');

      $('body').append(
        $('<epubreader src="moby-dick/">')
      );
      
      $.each(styles, function(i, link) {
        loadStyle(link);
      });

      // defer angular bootstrap until all scripts are loaded
      window.name = 'NG_DEFER_BOOTSTRAP!' + window.name;
      loadScripts(0, function() {
        angular.resumeBootstrap();
      });
    }
    ;

  loadScript(
    'https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
    function() {
      $(document).ready(function() {
        initialize();
      });
    }
  );

}());
