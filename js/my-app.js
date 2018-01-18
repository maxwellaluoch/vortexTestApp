Template7.registerHelper('json_stringify', function(context) {
  return JSON.stringify(context);
});
// Initialize your app
var myApp = new Framework7();
// Export selectors engine
var $$ = Dom7;
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
//login
$$('.login-screen .list-button').on('click', function () {
   var username = $$('.login-screen input[name = "username"]').val();
   var password = $$('.login-screen input[name = "password"]').val();
   var wrongLogin = "Wrong username or password";
   var correctLogin = "Welcome to Vortex Retail Quote ";
   //login validations
   if (username == "vortex" && password == "123") {
     myApp.alert(correctLogin, function () {
       myApp.closeModal('.login-screen');
     })
   }else {
        myApp.alert(wrongLogin, function () {
        })
   }
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});
//list all quotes in the system
myApp.onPageInit('index', function (page) {
  var url = "http://192.168.0.14/vortexapp/config/all_quote.php";
  //for items
  $$.getJSON(url, function (data) {
    console.log(data);
       //looping through the data
       var html = "";
       for(var i = 0; i < data.length; i++)
       {
         //append`ing the data into html
        var Comment = data[i].Comment;
        var ID = data[i].ID;
        html += '<li>';
          html += '<a href="quote.html?id='+ ID +'" class="item-link">';
            html += '<div class="item-content">';
              html += '<div class="item-inner">';
                html += '<div class="item-title">'+ Comment +'</div>';
            html += '</div>';
          html += '</div>';
        html += '</a>';
        html += '</li>';
      }
     document.getElementById('qt').innerHTML = html;
    });
});
//adding quotes and  calucations in quote.html
myApp.onPageInit('add_quote', function (page) {
  //Getting current date and time for the system
  document.getElementById('DateTime').value = new Date().toLocaleString();

    var sub_total =localStorage.sum;
    document.getElementById("Company").value = localStorage.Company;
    document.getElementById("Description").innerHTML = localStorage.Description;
    document.getElementById("sum").value = sub_total;
    document.getElementById('ID').value = ID;

    var SubTotal = parseInt(sub_total)+150;
    document.getElementById("sub_total").value = SubTotal;

    $$('.list-button').on('click', function () {
       var correctLogin = "Do you want to cancel";

         myApp.alert(correctLogin, function () {
           myApp.closeModal('.login-screen');
    });
  });
});

//'customer' is the name that i used in data-page="customer" : page specific js for customer.html
myApp.onPageInit('customer', function (page) {
  var url = "http://192.168.0.14/vortexapp/config/data.php";
  //for items
  $$.getJSON(url, function (data) {
    console.log(data);
    var custo = data;
       //looping through the data
       var html = "";
       for(var i = 0; i < data.length; i++)
       {
         //append`ing the data into html
        var Company = custo[i].Company;
        var ID = custo[i].ID;
        html += '<li data-id="AccountNumber" class="contact-item open-preloader">';
            html += '<a href="quote.html?id='+ ID +'" class="item-link">';
                html += '<div class="item-content">';
                  html += '<div class="item-inner">';
                    html += '<div class="item-title-row">';
                        html += '<div class="item-title">' + Company + '</div>';
                    html += '</div>';
                html += '</div>';
             html += '</div>';
           html += '</a>';
        html += '</li>';
      }
         document.getElementById('custo').innerHTML = html;
         $$('ul.test li').click(function () {
           localStorage.Company = $$(this).text();
           localStorage.Id = ID;
          });
    });
  });
//'products' is the name that i used in data-page="products": page specific js for customer.html
myApp.onPageInit('products', function (page) {
  var url = "http://192.168.0.14/vortexapp/config/items.php";
  //for items
  $$.getJSON(url, function (data) {
    console.log(data);
       //looping through the data
       var html = "";
       var Qty = "Quantity :";
       var Price = "Price :";
       for(var i = 0; i < data.length; i++)
       {
         //appending the data into html
        var Description = data[i].Description;
        var Cost = data[i].Quantity;
        var Quantity = data[i].Cost;
        html += '<li data-id="AccountNumber" class="contact-item ">';
            html += '<a href="add_quote" class="item-link">';
                html += '<div class="item-content">';
                  html += '<div class="item-inner">';
                    html += '<div class="item-title-row">';
                        html += '<div class="item-title">' + Description + '</div>';
                        html += '<div class="item-subtitle">'+ Qty + Quantity +' '+' '+ Price + Cost + '</div>';
                    html += '</div>';
                html += '</div>';
             html += '</div>';
           html += '</a>';
        html += '</li>';
      }
     document.getElementById('items').innerHTML = html;
     var sum = 50 * Quantity;
     $$('ul.item_data li').click(function () {

       var correctLogin = $$(this).text();
       var quantity = '<input type="text" id="myText" value="Quantity">';
         myApp.alert(quantity, correctLogin, function (name) {
           myApp.closeModal('add_quote');
           localStorage.Quantity = document.getElementById("myText").value;
           });

           localStorage.Description = $$(this).text();

           localStorage.sum = sum;
      });
  });
});

 // Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
  mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
  return;
}
