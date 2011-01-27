$(function() {

  $('ul.tabs li a').click(function() {
    // Hide everything except this tab's panel.
    var tab = $(this),
        tabs = tab.parent().parent();
        
    tabs.find('a').removeClass('active').each(function(i, o) {
      o = $(o);
      console.log("tab:");
      console.log(tab);
      console.log("o:");
      console.log(o);
      if(tab[0] === o[0]) {
        $(o.attr('href')).addClass('active');
      } else {
        $(o.attr('href')).removeClass('active'); 
      }
    });
    
    tab.addClass('active');
    return false;
  });

});