angular.module('Reader').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<epubreader src=\"TDO-2013-08-16T1033/\"></epubreader>"
  );


  $templateCache.put('views/reader.html',
    "<div id=\"sidebar\" ng-class=\"{open: open, single: single}\">\n" +
    "\t<epubtoc toc=\"toc\" current=\"{{currentChapterId}}\" ></epubtoc>\n" +
    "</div>\n" +
    "\n" +
    "<hypothesis id=\"hypothesis\"\n" +
    "\t\t\t\t\t\ton-annotations-loaded=\"afterAnnotationsLoaded(annotator, annotations)\" ></hypothesis>\n" +
    "\n" +
    "<div id=\"main\" ng-class=\"{open: open, single: single}\">\n" +
    "\t<div id=\"opener\">\n" +
    "\t\t<a id=\"open\" ng-click=\"open = !open\" class=\"icon\" ng-class=\"{open: open}\"><img src=\"images/menu-icon.png\"></a>\n" +
    "\t</div>\n" +
    "\t<div id=\"singlepage\">\n" +
    "\t</div>\n" +
    "\t<div id=\"titlebar\">\n" +
    "\t\t<span id=\"book-title\">{{metadata.bookTitle}}</span>\n" +
    "\t\t<span id=\"title-seperator\" ng-class=\"{hidden: !metadata.bookTitle}\">&nbsp;&nbsp;–&nbsp;&nbsp;</span>\n" +
    "\t\t<span id=\"chapter-title\">{{metadata.creator}}</span>\n" +
    "\t</div>\n" +
    "\t<epubviewer src=\"{{src}}\"\n" +
    "\t\t\t\t\t\t\tpath=\"{{path}}\"\n" +
    "\t\t\t\t\t\t\tcfi=\"{{cfi}}\"\n" +
    "\t\t\t\t\t\t\tmetadata=\"metadata\" \n" +
    "\t\t\t\t\t\t\ttoc=\"toc\"\n" +
    "\t\t\t\t\t\t\ton-ready=\"afterReady(book)\"\n" +
    "\t\t\t\t\t\t\ton-chapter-displayed=\"afterChapterDisplayed(e)\"\n" +
    "\t\t\t\t\t\t\ton-page-changed=\"afterPageChanged(e)\"\n" +
    "\t\t\t\t\t\t\t></epubviewer>\n" +
    "</div>\n"
  );


  $templateCache.put('views/sidebar.html',
    "<div id=\"toclist\">\n" +
    "\t\t<h3>Table of Contents</h3>\n" +
    "\t\t<ul>\n" +
    "\t\t\t\t<li ng-repeat=\"item in toc\">{{item}}</li>\n" +
    "\t\t</ul>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('views/toc-item.html',
    "<a class=\"toc_toggle\" ng-click=\"toggleItem(item.id)\" ng-class=\"{display: item.subitems.length > 0}\">&nbsp;</a>\n" +
    "<a ng-href=\"{{item.href}}\" \n" +
    "\t class=\"toc_link{{ item.type }}\" \n" +
    "\t ng-click=\"updateCurrent(item.id)\"\n" +
    "\t post-click >{{item.label}}</a>\n" +
    "\n" +
    "<ul>\n" +
    "\t\t<li ng-repeat=\"item in item.subitems\" \n" +
    "\t\t\t\tng-include=\"'views/toc-item.html'\"\n" +
    "\t\t\t\tid=\"toc-{{item.id}}\"\n" +
    "\t\t\t\tng-class=\"{currentChapter: active == item.id}\"\n" +
    "\t\t\t\tdata-parent=\"{{item.parent}}\"></li>\n" +
    "</ul>"
  );


  $templateCache.put('views/toc.html',
    "<div id=\"toclist\">\n" +
    "\t\t<h3>Table of Contents</h3>\n" +
    "\t\t<ul>\n" +
    "\t\t\t\t<li id=\"toc-{{item.id}}\" \n" +
    "\t\t\t\t\t\tng-repeat=\"item in toc\" \n" +
    "\t\t\t\t\t\tng-include=\"'views/toc-item.html'\" \n" +
    "\t\t\t\t\t\tng-class=\"{currentChapter: active == item.id}\"\n" +
    "\t\t\t\t\t\tdata-parent=\"{item.parent}\"\n" +
    "\t\t\t\t\t\t></li>\n" +
    "\t\t</ul>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('views/viewer.html',
    "<div id=\"prev\" class=\"arrow {{prevArrowState}}\" ng-click=\"book.prevPage()\">‹</div>\n" +
    "\n" +
    "<div id=\"area\" ng-swipe-right=\"book.prevPage()\" ng-swipe-left=\"book.nextPage()\"></div>\n" +
    "\n" +
    "<div id=\"next\" class=\"arrow {{nextArrowState}}\" ng-click=\"book.nextPage()\">›</div>\n" +
    "\n" +
    "<div id=\"loader\" ng-class=\"{hide: isReady}\"><img src=\"images/loader.gif\"></div>\n" +
    "\n" +
    "<div id=\"divider\" ng-class=\"{show: isReady}\"></div>\n" +
    "\n" +
    "<!-- <div id=\"swipeArea\" ng-swipe-left=\"book.prevPage()\" ng-swipe-right=\"book.nextPage()\"></div> -->"
  );

}]);
