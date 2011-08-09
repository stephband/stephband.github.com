// Parallax photo_indexes

jQuery(document).ready(function(){
  // Declare parallax on layers
  jQuery('.photos_wrap').each(function(){
    var wrap = jQuery(this);
    
    wrap.children('.photos_index').parallax({
      mouseport: wrap,
      yparallax: false
    });
  });
});