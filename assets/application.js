(function() {
  var Anchor;

  $(function() {
    var vH, vpH;
    $("a.menu").click(function() {
      $(".site-header nav").slideToggle(100);
      return preventDefault;
    });
    $(window).resize(function() {
      var menu, w;
      w = $(window).width();
      menu = $(".site-header nav");
      if (w > 680 && menu.is(":hidden")) {
        return menu.removeAttr("style");
      }
    });
    $("article.post iframe").wrap("<div class=\"video-container\" />");
    vpH = $(window).height();
    vH = vpH - 350;
    $(".overlay").css("height", vH);
    $(".featured-image").css("height", vH);
    $("<img>").attr("src", function() {
      var imgUrl;
      imgUrl = $("div.featured-image").css("background-image");
      if (!imgUrl) {
        return;
      }
      imgUrl = imgUrl.substring(4, imgUrl.length - 1);
      return imgUrl;
    }).load(function() {
      $("img.loading").fadeOut(500);
      return $("div.overlay").fadeTo("slow", 0.6);
    });
    return $(".post-list li").each(function(i) {
      var t;
      t = $(this);
      return setTimeout((function() {
        return t.addClass("slider");
      }), (i + 1) * 330);
    });
  });

  Anchor = {
    init: function() {
      Anchor.slidey = $(".slidey");
      $(window).resize(Anchor.bindResize).trigger("resize");
      Anchor.linky = $(".linky").click(Anchor.toggleSlidey);
      setTimeout((function() {
        Anchor.hideSlidey();
        return $("body").addClass("js-enabled");
      }), 10);
      return $("a[href=\"#search\"]").click(function() {
        if (!Anchor.linky.hasClass("active")) {
          return Anchor.toggleSlidey.call(Anchor.linky);
        }
      });
    },
    hideSlidey: function() {
      Anchor.slidey.css("margin-top", this._slideyHeight);
      Anchor.linky && Anchor.linky.removeClass("active");
      return this;
    },
    toggleSlidey: function() {
      var me, self;
      self = Anchor;
      me = $(this);
      me.toggleClass("active");
      self.slidey.css("margin-top", (me.hasClass("active") ? 0 : self._slideyHeight));
      return false;
    },
    bindResize: function() {
      Anchor._slideyHeight = -(Anchor.slidey.height() + 1);
      return Anchor.hideSlidey();
    }
  };

  $(Anchor.init);

}).call(this);
