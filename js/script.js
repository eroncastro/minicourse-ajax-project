function loadData() {
  var body = $('body');
  var wikiElem = $('#wikipedia-links');
  var nytHeaderElem = $('#nytimes-header');
  var nytElem = $('#nytimes-articles');
  var greeting = $('#greeting');
  var street = $('#street').val();
  var city = $('#city').val();
  var img = document.createElement('img');
  var google_api_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXX';
  var nyt_api_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXX';

  // clear out old data before new request
  wikiElem.text("");
  nytElem.text("");

  $('.bgimg').remove();
  img.src = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' +
    street + ', ' + city + '&key=' + key;
  img.className = 'bgimg';
  body.append(img);


  var nyt_api_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  nyt_api_url += '?' + $.param({
    'api-key': 'XXXXXXXXXXXXXXXXXXXXXXX',
    'q': 'city'
  });

  $.getJSON(nyt_api_url)
    .done(function(data) {
      var items = [];

      $.each(data.response.docs, function(index, obj) {
        var li = $(document.createElement('li'));
        li.addClass('article');

        var link = $(document.createElement('a'));
        link.attr('href', obj.web_url);
        link.html(obj.headline.main)
        li.append(link);

        var paragraph = $(document.createElement('p'));
        paragraph.html(obj.snippet);
        li.append(paragraph);
        items.push(li);
      });

      $('#nytimes-articles').append(items);
    })
    .fail(function() {
      alert('$.getJSON failed!');
    })


  event.preventDefault();
};

$('#form-container').submit(loadData);
