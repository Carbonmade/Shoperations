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
  
  
  $('input[type="submit"].confirm').click(function() {
    if(!confirm($(this).val() + ": Are you sure you sure?")) {
      return false;
    }
  });
  
  
  /****************************************************************************************************************
  ****  Order Details
  ****************************************************************************************************************/
  
  // Refunding selected items.
  $('a[rel="refund-order-items"]').click(function() {
    var link = $(this),
        line_ids = $('input[type="checkbox"][name="order-items"]:checked').map(function() { return this.value; });

    if(line_ids.length === 0) {
      alert("You haven't selected any items to refund.");
    } else {
      if(confirm("Are you sure you want to refund " + line_ids.length + " item(s)?\n\nThere's no undo!")) {
        $.ajax({
          url: link.attr('href'),
          type: 'POST',
          data: {lines: $.makeArray(line_ids).join('-')},
          success: function(d, t) { alert(d); }
        });
      }
    }
    return false;
  });

});