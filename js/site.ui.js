// Tweet this page

jQuery(document)
.delegate('.window', 'click', function(e) {
  var width   = 575,
      height = 400,
      win = $(window),
      left   = (win.width()   - width)   / 2,
      top     = (win.height() - height) / 2,
      url     = e.target.href,
      opts   = 'status=1' +
               ',width='  + width   +
               ',height=' + height +
               ',top='    + top     +
               ',left='    + left;
  
  window.open(url, 'twitter', opts);
  e.preventDefault();
});

// Comments by Disqus, when var disqus_url has been defined

var disqus_developer = 1; // developer mode is on

if (window.disqus_url) {
  (function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
}