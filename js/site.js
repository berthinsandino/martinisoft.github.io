$(document).ready(function() {
  emailLink();

  getRepos('martinisoft', function(repos) {
    if (!repos.length) return;
    $('#repos').replaceWith('<dl id="repos"></dl>');
    repos.each(function() {
      var escapedDesc = $('<div/>').text(this.description).html();
      $('#repos').append(
        '<dt><a href="'+this.url+'">'+this.name+'</a> ('+this.watchers+')</dt>'+
        '<dd>'+escapedDesc+'</dd>'
      );
    });
  });

  function getRepos(username, callback) {
    $.getJSON('https://api.github.com/users/'+username+'/repos', function(data) {
      var repos = data;
      repos = $.grep(repos, function(r) { return !r.fork });
      repos.sort(function(a, b) { return b.watchers_count - a.watchers_count });
      repos = $(repos);
      callback(repos);
    });
  }

  function emailLink() {
    var spt = $('span.mailme');
    var at = / at /;
    var dot = / dot /g;
    var addr = $(spt).text().replace(at,"@").replace(dot,".");
    $(spt).after('<a href="mailto:'+addr+'" title="Send an email">'+addr+'</a>');
    $(spt).remove();
  }
});
