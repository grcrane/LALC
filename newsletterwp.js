/* ----------------------------------------------------------- */
/* Get the requested data                                      */
/* Called from various places to fetch Google Sheets data      */
/* ----------------------------------------------------------- */

function getAjaxData(theurl) {
  var result="";

  jQuery.ajax({
    url: theurl,
    dataType: 'text',
    async: false,  
    success:function(data) {
      i = data.indexOf('(');
    j = data.lastIndexOf(')');
    data = data.substr(i+1,j-1-i);
    var data = JSON.parse(data);
    var data = data.table.rows;
       result = data; 
    }
 });
 return result;
}

/* ----------------------------------------------------------- */
/* Initialize                                                  */
/* ----------------------------------------------------------- */

var list = [];
//var dataarray = [];
//var retlist = [];
//var service_data = [];
var file_id = '1JSsbzbMY07vZzVO_u3E8wu7JOJruiQt7wXmo4LV_ALQ';
//var preachlist = [];
var datelist = [];
var thedate = '';
var prevyear = '';
var str = '';
var months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
  
function fillnewsList(showpreacher) {
  jQuery('#newsList').empty();
  str = '';
  var testlist = datelist;
  if (showpreacher && showpreacher != '') { 
    testlist = datelist.filter(function(e) {
      return e.c[1].v == showpreacher;
    })
  }
  var prevyear = ''; 
  var str = ''; 
  testlist.forEach(function(item, key) {
    if (item.c[0] != null) {

      var themonth = item.c[0].v; 
      var res = themonth.match(/^(\d{4,4})[-_](\d{1,2})$/g);
      if (res) {
        var parts = themonth.split('-');
        var year = themonth.substr(0,4);
        var month = themonth.substr(5);
        if (prevyear != year) {
          if (!prevyear) { str += '</ul></li>';}
          prevyear = year;
          str += "</ul></li><li class='liYear'><div>" + year + "</div><ul>";
        }
        
        var link = months[(+month)-1] + " " + year;
        if (item.c[3] != null) {
        var link = '<a class="pdf" href="https://drive.google.com/file/d/' + item.c[3].v + 
        '/view?usp=sharing" target="_blank">' + link + '</a>';
        }
        str += '<li>' + link + '</li>';
      
      }
    }
  })

  jQuery(str).appendTo('#newsList');
  jQuery("#newsList > li > div").unbind('click');
  jQuery("#newsList > li > div").click(function(){
    if (jQuery(this).next().is(":visible")) {
      jQuery(this).next().slideUp();
    }
    else {
      jQuery('#newsList ul').slideUp();
      jQuery(this).next().slideDown();
    }
  });
  jQuery('#newsList ul:eq(0)').slideDown();

}

jQuery( document ).ready(function() {

//Get a list of available audio recordings   
var query = 'SELECT * WHERE C IS NOT NULL AND D IS NOT NULL ORDER BY A DESC'
var url = 'https://docs.google.com/spreadsheets/u/0/d/' 
  + file_id + '/gviz/tq?tqx=&sheet=newsletter&tq=' + escape(query);
datelist = getAjaxData(url);

  // Populate the service dates
  fillnewsList(null);

  // Flop between service list and details display
  jQuery('#closeDetails').click( function(e) {
    e.preventDefault(); 
    jQuery('#details').css('display','none');
    jQuery('#yearsList').css('display','block');
  });

  jQuery('#sermonby').on('change',function(e) {
    fillnewsList(jQuery(this).val());
  })

  jQuery('#yearsList').css('display','block');

});