$(function() {
  /****************************************************************************************************************
  ****  General purpose
  ****************************************************************************************************************/

  // Tabs
  $('ul.tabs li a').click(function() {
    var tab = $(this),
        tabs = tab.parent().parent();
        
    tabs.find('a').removeClass('active').each(function(i, o) {
      o = $(o);
      if(tab[0] === o[0]) {
        $(o.attr('href')).addClass('active');
      } else {
        $(o.attr('href')).removeClass('active'); 
      }
    });
    
    tab.addClass('active');
    return false;
  }).filter(":first").click();
  
  // "Select All" checkboxes
  $('input[type="checkbox"].select-all').click(function() {
    $('input[type="checkbox"][name="' + this.value + '"]')
      .attr('checked', this.checked ? 'checked' : '');
  });
  

  // Show a confirmation alert on some submit buttons.
  $('input[type="submit"].confirm').click(function() {
    if(!confirm($(this).val() + ": Are you sure you sure?")) {
      return false;
    }
  });

});