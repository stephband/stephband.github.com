// Parallax photo_indexes

jQuery(document).ready(function(){
  // If no photos are active, activate the first
  var photos = jQuery('.photo_tab');
  
  if (photos.filter('.active').length === 0) {
    photos
    .eq(0)
    .trigger('activate');
  }
});