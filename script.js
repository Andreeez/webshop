var userID;
$(document).ready(function(){
var categoryList;
var shoppingCart = [];
var kundLista;
userID   = sessionStorage.getItem('userID');
//Fetch huvudkategori
fetch("huvudkategorier.json")
    .then(function(response){
        return response.json();
    })
    .then(function(huvudkategori){
        categoryList = huvudkategori;
        showMainCategory();
        console.log(showMainCategory);
    });
//Fetch Underkatergori   
fetch("underkategorier.json")
    .then(function(response){
        return response.json();
    })
    .then(function(underkategori){
        underCategoryList = underkategori;
    });
//Fetch Produkter
fetch("produkter.json")
    .then(function(response){
        return response.json();
    })
    .then(function(produkter){
        productList = produkter;
    });

//Fetch Kunder
fetch("kunder.json")
    .then(function(response){
        return response.json();
    })
    .then(function(kunder){
       kundLista = kunder; 
    });

//Visa huvudkategorier    
    function showMainCategory(){
        


        // $("#header").append("<form><input type='text'>Användarnamn</input></form>");
        // $("#header").append("<form><input type='password'>Lösenord</input></form>");
        // $("#header").append("<form><button class='logIn'>Logga in</button></form>");
        // $(".menyList").append("<li><a href='index.html'>Start</a></li>");
        var content;
        content  = '<form><label>Användarnamn</label>';
        content += '<input id="username" type="text" />';
        content += '<label>Lösenord</label>';
        content += '<input id="password" type="password" />';
        content += '<div class="sigInbutton" ">Logga in</div><form>';
        
        $('#header').append('<div class="logOut" onclick="signOut()"><i class="fa fa-sign-out"></i><br/>Logga ut</div>');
        $("#header").append(content);
        
        for(var i = 0; i < categoryList.length; i++){
            var mainCategoryName = "<li class='menuItems' onclick='showUnderCategory(" + [i] + "); showProductList(" + [i] + ")'><a href='#'>" + categoryList[i].mainCategory + "</a></li>";
            $(".menyList").append(mainCategoryName);
        }
        $(".menyList").append("<li><a href='#'>Kontakt</a></li>");
        $(".menyList").append("<li><a href='#'>Information</a></li>");
        $(".menyList").append("<li onclick='showShoppingCart()'><span class='counter'></span><a href='#'>Kundvagn</a></li>");

    }






// Visa underkategorier
    showUnderCategory = function(i){
        $(".productMenyList").html("");
        
        for(var index = 0; index < underCategoryList.length; index++){
            var underCatName = "<li onclick='showProductList("+ underCategoryList[index].id +")'><a href='#'>" + underCategoryList[index].subCategory + "</a></li>";
            if(underCategoryList[index].mainCategory == i+1){
                $(".productMenyList").append(underCatName);
                console.log(underCatName);
            }

        }
    }
//Visa produkter
    showProductList = function(i){
        $(".content").html("");
        
        for (var index = 0; index < productList.length; index++){
            var productCardName = "<h2>" + productList[index].prodName + "</h2>";
            var productCardPrice = "<p>" + productList[index].prodPrice + "</p>";
            var productCardImage = "<img class='productImage' src='./picture/" + productList[index].image + "'>";
            var productCard = "<div class='allProductsCard' onclick='showSpecificProduct(" + productList[index].id + ")'> " + productCardImage + productCardName + productCardPrice  + " </div>"
           
            if (productList[index].mainCategory == i+1) {
                $(".content").append(productCard);
                
            } 
            else if(productList[index].subCategory == i){
                $(".content").append(productCard);
                
             }
        }   
    }

//Visa specifik produkt
    showSpecificProduct = function(i){
        $(".content").html("");

        for(var index = 0; index < productList.length; index++){
            var cardName = "<h2>" + productList[index].prodName + "</h2>";
            var cardDescription = "<h3>" + productList[index].prodDesc + "</h3>";
            var cardPrice = "<p>" + productList[index].prodPrice + "kr</p>";
            var cardImage = "<img class='cardProductImage' src='./picture/" + productList[index].image + "'>";
            var cartButton = "<button class='cartButton' onclick='addToCart(" + productList[index].id + ")'>Köp Produkt</button>";
            var cardProductBox = "<div class='cardProductBox'>" + cardName + cardImage + cardDescription + cardPrice  + cartButton + "</div>";
            
            if (productList[index].id == i){
                $(".content").append(cardProductBox);
                
            }
        } 
    }


//Lägg till produkter i localstorage för att visas i Varukorgen
    addToCart = function(i){
        var product = productList[i]

        shoppingCart.push(product);

        $(".counter").html(shoppingCart.length);

    }

// Visa produkter som är sparade i localstorage 
    showShoppingCart = function(){
        
        $(".content").html("<h1>Kundvagn</h1>");
        $(".content").append("<div class='shoppingCartAllProducts'>"+"</div>")

        $(".shoppingCartAllProducts").append("<div class='shoppingCartProduct'> "+ " </div>")
        
        var json_str = JSON.stringify(shoppingCart);
        localStorage.shoppingCart = json_str;

        var loopCart = JSON.parse(localStorage.shoppingCart);
        for (var i = 0; i < loopCart.length; i++){
            $(".shoppingCartProduct").append("<div class='shoppingCart'>" + loopCart[i].prodName + " " +  loopCart[i].prodPrice + " kr" + "<a href='#' onClick='delCartItem(" + i + ")'>Ta bort</a>" + "</div>");

        }
        var totalPrice = 0;
        var freightPrice = 55;

        for(var i = 0; i < loopCart.length; i++ ){
            totalPrice += loopCart[i].prodPrice;
        }
        totalPrice += freightPrice;

        $(".shoppingCartAllProducts").append("<p>" + " Totalpris (varav frakt: 55kr) " + totalPrice  + " kr " + "</p>");
        $(".shoppingCartAllProducts").append("<button class='goToCheckOut'>Gå till Kassan</button>");
        
        console.log(totalPrice);       
    }

// Ta bort produkter i varukorgen
    delCartItem = function(i){
        shoppingCart.splice(i,1);
        $(".counter").html(shoppingCart.length);
        
        showShoppingCart();
    }


    $(".logOut").hide();
        
        if (sessionStorage.username!= null) {//om nån är inne
            inloggad();
        } else {

            $(".sigInbutton").click(function(){
                console.log("hejhej");
                for(var i = 0; i < kundLista.length; i++){
                    //var user = listOfKunder[i].email;
                    //var password = listOfKunder[i].password;
                
            
                if(kundLista[i].email == $("#username").val() && kundLista[i].password == $("#password").val()){
                    sessionStorage.username = kundLista[i].email;
                    inloggad();
                    console.log("rätt");
                } else {
                    console.log("fel");
                    $(".logOut").hide();
                    alert("Fel lösen! Försök igen");
                    }
                }
            });

        }
        inloggad(); {
            $(".logOut").show();
        }


//     signIn = function() {

//         if (sessionStorage.username !=null){
//             logedIn();
            
//         } else {
//             for(var i = 0; i < kundLista.length; i++){
//             if(kundLista[i].email == $("#username").val() && kundLista[i].password == $("#password").val() ){
//                 sessionStorage.username = kundLista[i].email;
//                 logedIn();
//             } else {
//                 showMessage();
//             }
        
//         }
//     }
// }

// logedIn = function(){
//     console.log("hej");
// }



    //     var username = $('#username').val().toLowerCase().trim();
    //     if(kundLista[username]) {
    //         var password = $('#password').val();
            
    //         if(kundLista[username].password == password) {
    //             sessionStorage.setItem('userID', username);
    //             window.location.reload();
                
    //         } else showMessage('error', 'Fel lösenord.');
            
    //     } else showMessage('error', 'Fel användarnamn.');
    // };

    // var showMessage = function(status, message) {
    //     $(window).scrollTop(0);
    //     $('#message').html('<div class="'+status+'">'+message+'</div>');
    //     $('#message div').slideDown(400);
    //     $('.'+status).delay(4000).slideUp(400, function(){ $(this).remove(); });
    // };
    // signOut = function() {
    //     sessionStorage.removeItem('userID');
    //     window.location.reload();
    // };

    // var logginModal = function() {
    //     var content;
    //     content  = '<form><label>Användarnamn</label>';
    //     content += '<input id="username" type="text" />';
    //     content += '<label>Lösenord</label>';
    //     content += '<input id="password" type="password" />';
    //     content += '<div class="button" onclick="signIn()">Logga in</div><form>';
    //     $("#header").append(content);
    // };



});