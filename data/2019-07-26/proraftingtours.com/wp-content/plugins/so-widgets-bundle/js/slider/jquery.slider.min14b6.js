var sowb=window.sowb||{};sowb.SiteOriginSlider=function(l){return{playSlideVideo:function(e){l(e).find("video").each(function(){void 0!==this.play&&this.play()})},pauseSlideVideo:function(e){l(e).find("video").each(function(){void 0!==this.pause&&this.pause()})},setupActiveSlide:function(e,i,t){var s=l(e).find(".cycle-sentinel"),n=l(i),o=n.find("video.sow-background-element");if(void 0===t?s.css("height",n.outerHeight()):s.animate({height:n.outerHeight()},t),o.length){var d=n.outerWidth()/n.outerHeight();o.outerWidth()/o.outerHeight()<d?o.css({width:"100%",height:"auto"}):o.css({width:"auto",height:"100%"}),o.css({"margin-left":-Math.ceil(o.width()/2),"margin-top":-Math.ceil(o.height()/2)})}}}},jQuery(function(f){sowb.setupSliders=sowb.setupSlider=function(){var u=new sowb.SiteOriginSlider(f);f(".sow-slider-images").each(function(){var n=f(this);if(n.data("initialized"))return n;var d=n.siblings(".sow-slider-pagination"),o=n.closest(".sow-slider-base"),l=o.find(".sow-slide-nav"),a=n.find(".sow-slider-image"),c=n.data("settings");a.each(function(e,i){var t=f(i),s=t.data("url");void 0!==s&&s.hasOwnProperty("url")&&(t.click(function(e){e.preventDefault(),window.open(s.url,s.hasOwnProperty("new_window")&&s.new_window?"_blank":"_self").opener=null}),t.find("a").click(function(e){e.stopPropagation()}))});var r=function(){var e=n.closest(".so-widget-fittext-wrapper");if(0<e.length&&!e.data("fitTextDone"))e.on("fitTextDone",function(){r()});else{o.show();var t=function(){n.find(".sow-slider-image").each(function(){var e=f(this);e.css("height",e.find(".sow-slider-image-wrapper").outerHeight())})};if(f(window).on("resize panelsStretchRows",t).resize(),f(sowb).on("setup_widgets",t),n.on({"cycle-after":function(e,i,t,s,n){var o=f(this);u.playSlideVideo(s),u.setupActiveSlide(o,s),f(s).trigger("sowSlideCycleAfter")},"cycle-before":function(e,i,t,s,n){var o=f(this);d.find("> li").removeClass("sow-active").eq(i.slideNum-1).addClass("sow-active"),u.pauseSlideVideo(t),u.setupActiveSlide(o,s,i.speed),f(s).trigger("sowSlideCycleBefore")},"cycle-initialized":function(e,i){u.playSlideVideo(f(this).find(".cycle-slide-active")),u.setupActiveSlide(n,i.slides[0]),d.find(">li").removeClass("sow-active").eq(0).addClass("sow-active"),f(this).find(".cycle-slide-active").trigger("sowSlideInitial"),i.slideCount<=1&&(d.hide(),l.hide()),f(window).resize(),setTimeout(function(){t(),u.setupActiveSlide(n,i.slides[0]),n.find(".cycle-sentinel").empty()},200)}}).cycle({slides:"> .sow-slider-image",speed:c.speed,timeout:c.timeout,swipe:c.swipe,"swipe-fx":"scrollHorz",log:!1}),n.find("video.sow-background-element").on("loadeddata",function(){u.setupActiveSlide(n,n.find(".cycle-slide-active"))}),d.add(l).hide(),!o.hasClass("sow-slider-is-mobile")&&1<a.length){var i=!1;o.mouseenter(function(){d.add(l).clearQueue().fadeIn(150),i=!1}).mouseleave(function(){i=!0,setTimeout(function(){i&&d.add(l).clearQueue().fadeOut(150),i=!1},750)})}var s=function(){u.setupActiveSlide(n,n.find(".cycle-slide-active"))};f(window).on("resize",s),f(sowb).on("setup_widgets",s),d.find("> li > a").click(function(e){e.preventDefault(),n.cycle("goto",f(this).data("goto"))}),l.find("> a").click(function(e){e.preventDefault(),n.cycle(f(this).data("action"))}),o.keydown(function(e){37===e.which?n.cycle("prev"):39===e.which&&n.cycle("next")})}},e=n.find("img"),i=0,t=!1;e.each(function(){f(this);this.complete?i++:f(this).one("load",function(){++i!==e.length||t||(r(),t=!0)}).attr("src",f(this).attr("src")),i!==e.length||t||(r(),t=!0)}),0===e.length&&r(),n.data("initialized",!0)})},sowb.setupSliders(),f(sowb).on("setup_widgets",sowb.setupSliders)}),window.sowb=sowb;