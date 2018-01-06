$(document).ready(function(){
var categoryList;
var shoppingCart = [];
var kundLista;
var saveOrder= [];

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

//Kolla om kund är inloggad


$(".testKnapp").click(function(){
console.log("hej");
});



$(".loggaUtKnapp").hide();
if(sessionStorage.userId !=null){
    goToCheckOut();
    $(".loggaUtKnapp").show();
    
    
    
    console.log("Du är redan inloggad");
} else {
    $(".testKnapp").click(function(){
        console.log("Logga in?!?!?!?!?!");
        for(var i = 0; i < kundLista.length; i++){
            if($("#username").val() == kundLista[i].email && $("#password").val() == kundLista[i].password){
                // sessionStorage.setItem("userId",$("#username").val() );
                sessionStorage.userId == kundLista[i].email;
                $(".loggaUtKnapp").show();
                $("#username").hide();
                $("#password").hide();
                $(".testKnapp").hide();
                    goToCheckOut();
                    console.log("rätt");
            } else {
               
                console.log("fellösen");
                var forGotPassword = "<p>Har du glömt lösenord?</p>"
                $("#header").append(forGotPassword);
                
            }
        }
    });
}

$(".loggaUtKnapp").click(function(){
    sessionStorage.clear()
    location.reload();
    console.log("Töm local storage");

});


// logIn(function(){
//     if(kundLista.email == $("#username").val() && kundLista.password == $("#password").val(){
//         sessionStorage.setItem("userId");
//         goToCheckOut();
//     })
// });

// var logIn = function(){
//     var html
//     html += "<div class='loginForm'>";
//     html += "<form>";
//     html += "<label>Användarnamn</label>";
//     html += "<input id='username' type='text'/>";
//     html += "<label>Lösenord</label>";
//     html += "<input id='password' type='text'/>";
//     html += "<div class='logOut' onclick='signOut()'><i class='fa fa-sign-out'></i><br/>Logga ut</div>"
//     html += "</div>";
//     $("#header").append(html);
// }



// logIn();

// $('#header').append('<button class="logIn">Logga in</button>');
//Visa huvudkategorier    
    function showMainCategory(){
        
        // $('#header').append("<label>Användarnamn</label><input id='username' type='text'/>");
        // console.log("#username");
        // $('#header').append("<label>Lösenord</label><input id='password' type='password'/>");
        // $('#header').append('<div class="logOut" onclick="signOut()"><i class="fa fa-sign-out"></i><br/>Logga ut</div>');
        // $('#header').append('<div class="logIn" onclick="logIn()"><i class="fa fa-sign-out"></i><br/>Logga In</div>');
        // $('#header').append('<div class="logIn"><i class="fa fa-sign-out"></i><br/>Logga In</div>');
        

        $(".menyList").append("<li><a href='index.html'>Start</a></li>");
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
        var product = productList[i-1]

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
        console.log("Innan for loop");
        console.log(loopCart[i]);
        for (var i = 0; i < loopCart.length; i++){
            $(".shoppingCartProduct").append("<div class='shoppingCart'>" + loopCart[i].prodName + " " +  loopCart[i].prodPrice + " kr" + "<a href='#' onClick='delCartItem(" + i + ")'>Ta bort</a>" + "</div>");
            console.log("I for loop");
            console.log(loopCart[i].prodName);
            console.log(loopCart[i].id);
        }
        var totalPrice = 0;
        var freightPrice = 55;

        for(var i = 0; i < loopCart.length; i++ ){
            totalPrice += loopCart[i].prodPrice;
        }
        totalPrice += freightPrice;

        $(".shoppingCartAllProducts").append("<p>" + " Totalpris (varav frakt: 55kr) " + totalPrice  + " kr " + "</p>");
        $(".shoppingCartAllProducts").append("<button class='goToCheckOut' onclick='goToCheckOut()'>Gå till Kassan</button>");
        
        console.log(totalPrice);       
    }

// Ta bort produkter i varukorgen
    delCartItem = function(i){
        shoppingCart.splice(i,1);
        $(".counter").html(shoppingCart.length);
        
        showShoppingCart();
    } 


//Gå till kassan/skicka order
goToCheckOut = function (){
    console.log("Inloggad- Gå till kassan");
   
    if(sessionStorage.userId != null){

    }

}


});