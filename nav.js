var nav = module.exports = {};

nav.nav_tabs = [
  {label: 'Dashboard', href: '/'},
  {label: 'Products', href: '/products'},
  {label: 'Orders', href: '/orders'},
  {label: 'Packages', href: '/packages'},
  {label: 'Customers', href: '/customers'}
];

nav.current_tab = function(tab, url) {
  return tab.href.split('/')[1] === url.split('/')[1];
};