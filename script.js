// var logginModal = function() {
//     var content, title = 'Logga in';
//     content  = '<form><label>Användarnamn</label>';
//     content += '<input id="username" type="text" />';
//     content += '<label>Lösenord</label>';
//     content += '<input id="password" type="password" />';
//     content += '<div class="button" onclick="signIn()">Logga in</div><form>';
//     showModal(title, content);
// };

// var signIn = function(){
//     if(sessionStorage.userId !=null){
//         inLogged();
//     } else {
//         $(".button").click(function(){
//             var username = $("#username").val()
//             for(var i = 0; i < kundLista.length; i++){
//                 if(kundLista[i].email == username){
//                     var password = $("#password").val()
//                         if(kundLista[i].username == password){
//                             sessionStorage.setItem("userID",username);
//                             window.location.reload();
//                         } else {
//                             Alert("fel lösen");
//                             console.log("fel lösen");
//                         } 
//                 } else {
//                     alert("fel användarnamn");
//                     console.log("fel användarnamn");
//                 }
//             }
//         })
//     }
// }

// var showModal = function(title, content) {
//     var html;
//     closeModal();
//     html  = '<div class="modal"><div class="mcontent">';
//     html += '<div class="mtitle">'+title+'<i class="fa fa-times" onclick="closeModal()"></i></div>';
//     html += '<div class="mhtml">'+content+'</div></div></div>';
//     $('body').prepend(html);
// };
// var closeModal = function(){ $('.modal').remove(); };

$(document).ready(function(){
var categoryList;
// var shoppingCart = [];
var kundLista;
var members = [];
// var saveOrder = [];


//Fetch huvudkategori
fetch("huvudkategorier.json")
    .then(function(response){
        return response.json();
    })
    .then(function(huvudkategori){
        categoryList = huvudkategori;
        showMainCategory();
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


    if (localStorage.pushProdukt == null){
        cart = [];
        localStorage.setItem("pushProduct", JSON.stringify(cart));
        createCart = JSON.parse(localStorage.getItem("pushProduct"));
        

    }

    if (localStorage.order == null){
        saveOrder = [];
        localStorage.setItem("order", JSON.stringify(saveOrder));
        createOrder = JSON.parse(localStorage.getItem("order"));

    }

//Kolla om kund är inloggad
$("#logInForm").hide();
$("#forGotPassword").hide();
$(".loggaUtKnapp").hide();

if(sessionStorage.getItem("userId") !=null){
    inLogged();
} else{
    $(".logInButton2").click(function(){
        var userCorrect = false;
        for(var i = 0; i < kundLista.length; i++){
            if($("#username").val() == kundLista[i].email && $("#password").val() == kundLista[i].password){
                inLogged();
                sessionStorage.setItem("userId",$("#username").val());
                userCorrect = true;
                break;
            }
        }

        if(!userCorrect) {
            alert("Fel användarnamn, eller lösenord");
            $("#forGotPassword").show();

           }
    })

}
    
function inLogged(){
    $("#logInForm").hide();


    $(".logOut").show();
    $(".logInButton").hide();
    // $("#username").hide();
    // $("#password").hide();
    $(".logInButton2").hide();
    $(".register").hide();
    $(".register").hide();

  
}


signOut = function(){
    sessionStorage.clear();
    location.reload();
    console.log("Töm local storage");
}

$('#headerForCartandLogin').append('<div class="logInButton" onclick="logginModal()"><i class="fa fa-sign-in"></i><br/>Logga in</div>');
$("#headerForCartandLogin").append("<div class='logOut' onclick='signOut()'><i class='fa fa-sign-out'></i><br/>Logga ut</div>");
$("#headerForCartandLogin").append("<div class='shoppingCartButton' onclick='showShoppingCart()'><a href='#'><i class='fa fa-shopping-cart'></i></br><span class='counter'></span></a></div>");
$("#headerForCartandLogin").append("<div class='shoppingCartAddButton' onclick='showShoppingCart()'><a href='#'><i class='fa fa-cart-plus'></i></br><span class='counter'></span></a></div>");
$(".shoppingCartAddButton").hide();

$("#username").hide();
$("#password").hide();
$(".logInButton2").hide();
$(".register").hide();
$(".logOut").hide();

logginModal = function(){
    $("#logInForm").show();
    $("#username").show();
    $("#password").show();
    $(".logInButton2").show();
    $(".register").show();
}


// $(".logInButton").click(function(){
//     $("#logInForm").show();
//     $("#username").show();
//     $("#password").show();
//     $(".logInButton2").show();
//     $(".register").show();
// })


$(".register").click(function(){
    registerMember();
});

//Visa huvudkategorier    
    function showMainCategory(){
      
        $(".menyList").append("<li><a href='index.html'>Start</a></li>");
        for(var i = 0; i < categoryList.length; i++){
            var mainCategoryName = "<li class='menuItems' onclick='showUnderCategory(" + [i] + "); showProductList(" + [i] + ")'><a href='#'>" + categoryList[i].mainCategory + "</a></li>";
            $(".menyList").append(mainCategoryName);
        }
        $(".menyList").append("<li><a href='#'>Kontakt</a></li>");
        $(".menyList").append("<li><a href='#'>Information</a></li>");
    }

// Visa underkategorier
    showUnderCategory = function(i){
        $(".productMenyList").html("");
        
        for(var index = 0; index < underCategoryList.length; index++){
            var underCatName = "<li onclick='showProductList("+ underCategoryList[index].id +")'><a href='#'>" + underCategoryList[index].subCategory + "</a></li>";
            if(underCategoryList[index].mainCategory == i+1){
                $(".productMenyList").append(underCatName);
                
            }
        }
    }
//Visa produkter
    showProductList = function(i){
        $(".content").html("");
        
        for (var index = 0; index < productList.length; index++){
            var productCardName = "<h2 class='allProductsCardH2'>" + productList[index].prodName + "</h2>";
            var productCardPrice = "<p class='allProductsCardP'>" + productList[index].prodPrice + "  kr</p>";
            var productCardImage = "<img class='productImage' src='./picture/" + productList[index].image + "'>";
            var productCard = "<div class='allProductsCard' onclick='showSpecificProduct(" + productList[index].id + ")'> " + productCardImage + "<br><br><br><br>" + productCardName + productCardPrice  + " </div>"
           
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
            var cardName = "<h2 class='cardProductBoxH2'>" + productList[index].prodName + "</h2>";
            var cardDescription = "<h3 class='cardProductBoxH3'>" + productList[index].prodDesc + "</h3>";
            var cardPrice = "<p='cardProductBoxP'>" + productList[index].prodPrice + "kr</p>";
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

        var product = productList[i];
        createCart = JSON.parse(localStorage.getItem("pushProduct"));
        createCart.push(product);
        localStorage.setItem("pushProduct", JSON.stringify(createCart));
        
        $(".counter").html(createCart.length + "   Produkt Tillagd");
        $(".shoppingCartButton").hide();
        $(".shoppingCartAddButton").show();

    }

//Visa produkter som är sparade i localstorage 
    showShoppingCart = function(){
        $(".content").html("");
        // $(".content").html("<h1>Kundvagn</h1>");
        $(".content").append("<div class='shoppingCartAllProducts'><h1>Kundvagn</h1></div>")

        $(".shoppingCartAllProducts").append("<div class='shoppingCartProduct'> "+ " </div>")
      
        createCart = JSON.parse(localStorage.getItem("pushProduct"));

        for(var i = 0; i < createCart.length; i++){
            var cartProductImage = "<img class='cartProductImage' src='./picture/" + createCart[i].image + "'>";
            var cartProductName = "<p class='cartProductBoxH2'>" + createCart[i].prodName + "</p>";
            var cartProductPrice = "<p='cartProductBoxP'>" + createCart[i].prodPrice + "kr</p>";
            var cartProductProductBox = "<div class='cartProductBox'>" + cartProductImage + cartProductName + cartProductPrice + "</div>";
            $(".shoppingCartProduct").append("<div class='shoppingCart'>" + cartProductProductBox + "<div class='deleteCartItemDiv'><a class='delCartItem' href='#' onClick='delCartItem(" + i + ")'>Ta bort</a></div>" + "</div>");

        } 
   
        var totalPrice = 0;
        var freightPrice = 55;

        for(var i = 0; i < createCart.length; i++ ){
            totalPrice += createCart[i].prodPrice;
        }
    
        totalPrice += freightPrice;
        $(".shoppingCartAllProducts").append("<p>" + " Totalpris (varav frakt: 55kr) " + totalPrice  + " kr " + "</p>");
        $(".shoppingCartAllProducts").append("<button class='goToCheckOut' onclick='goToCheckOut(" + createCart[i] + ")'>Skicka beställning</button>");
     
        
    }

//Ta bort produkter i varukorgen
    delCartItem = function(){
        //Jag måste parca igen här !!!

        // shoppingCart.removeItem = JSON.parse(localStorage.getItem("pushProduct"));
        
        // // shoppingCart.remove(i,1);
        // createCart = JSON.parse(localStorage.getItem("pushProduct"));
        // createCart.splice(i,1);
        // localStorage.getItem("pushProduct", JSON.stringify(createCart));

        
        // // shoppingCart.splice(i,1);
        // $(".counter").html(createCart.length);
        // showShoppingCart();
        // localStorage.removeItem("pushProduct");

      

    } 


//Gå till kassan/skicka order
    goToCheckOut = function (){

        
        if(sessionStorage.getItem("userId") !=null){
            createCart = JSON.parse(localStorage.getItem("pushProduct"));
            for(var i = 0; i < createCart.length; i++){
            createOrder = JSON.parse(localStorage.getItem("order"));
            createOrder.push({Produktnamn: createCart[i].prodName});
            localStorage.setItem("order", JSON.stringify(createOrder));
            alert("Tack för din order");
            
        }
        localStorage.setItem("pushProduct", JSON.stringify([]));
        showShoppingCart();
        
        
        }else{
            alert("Du måste logga in för att kunna lägga en order");
            registerMember();

        }

      }      

////Bli Medlem formulär
    registerMember = function(){
        $(".content").html("");
        console.log("Bli medlem");
        
        var content;
        content = '<div class="registerForm">';
        content += '<h1>Bli Medlem</h1>'
        content += '<form>';
        content += '<label>Namn</label>'
        content += '<input class="registerName" text="text"></input>';
        content += '<label>Email</label>';
        content += '<input class="registerEmail text="text></input>';
        content += '<label>Lösenord</label>';
        content += '<input class="registerPassword" text="password"></input>';
        content += '<label>Nyhetsbrev?</label>'
        content += '<input class="newsLetterYes" type="checkbox">JA</input>';
        content += '<button class="registerButton" onclick="sendRegister()">Skapa konto</button>';
        content += '</div>';
        $(".content").append(content);

    }
//Funktion för att skicka nya användaruppgifter in i LocalStorage
    sendRegister = function(){


        // members 
        if($("newsLetterYes").is(':checked')){
            kundLista.push({id: 4, name: $(".registerName").val(), email: $(".registerEmail").val(), password: $(".registerPassword").val(), nyhetsbrev: "JA"});
            localStorage.setItem("newMember", JSON.stringify(kundLista));
            kundLista = JSON.parse(localStorage.getItem("newMember"));
        } else {
            kundLista.push({id: 4, name: $(".registerName").val(), email: $(".registerEmail").val(), password: $(".registerPassword").val(), nyhetsbrev: "Nej"});
            localStorage.setItem("newMember", JSON.stringify(kundLista));
            kundLista = JSON.parse(localStorage.getItem("newMember"));
        }


        // // var newUser = [];
        // newUser.push({id: 4, name: $(".registerName").val(), email: $(".registerEmail").val(), password: $(".registerPassword").val(), nyhetsbrev: "Nej"});
        // localStorage.setItem("pushNewMember", JSON.stringify(newUser));
        // newUser = JSON.parse(localStorage.getItem("pushNewMember"));
    }


///
/// ****** Kod för admin sida  ***********
///

//Skapa inlogg för admin
var adminUserName ="admin";
var adminUserPassword = "admin";

var adminContent
adminContent = '<div class="adminLoginForm">';
adminContent += '<form>';
adminContent += '<label>Användarnamn</label>';
adminContent += '<input id="adminName" type="text"></input>';
adminContent += '<label>Lösenord</label>';
adminContent += '<input id="adminPassword" type="password"></inout>';
adminContent += '<button class="adminLoginButton">Logga In</button>';
adminContent += '<button class="adminLogOutButton">Logga Ut</button>';
adminContent += '</form>';
adminContent += '</div>';

$("#headerAdmin").append(adminContent);

$(".adminLogOutButton").hide();
if(sessionStorage.admin != null ){
    adminLogedIn();
    console.log("admin är inloggad");
    $("#adminName").hide();
    $("#adminPassword").hide();
    $(".adminLoginButton").hide();
    
    
} else {
    
    $(".adminLoginButton").click(function(){
        if(adminUserName == $("#adminName").val() && adminUserPassword == $("#adminPassword").val()){
            sessionStorage.setItem("admin", $("#adminName").val());
            adminLogedIn();
            console.log("Du loggade in korrekt");
            
        } else {
            alert("fel lösenord");
            console.log("detta var fel lösen");
        }
    });
  
}
///Funktion, när admin är inloggad körs nedan
    function adminLogedIn(){

        $(".adminLogOutButton").show();

        var adminLista
        adminLista = '<li><a href="admin.html">Start</a>';
        adminLista += '<li onclick="listaKunder()">Kundlista</li>';
        adminLista += '<li onclick="showOrder()">Orderlista</li>';
        adminLista += '<li onclick="showCustomerNewsLetter()">Epostlista</li>';

        $("#adminMenyList").append(adminLista);

        listaKunder = function(){
            $(".content").html("");

            if(localStorage.newMember=!null){
                newMember = JSON.parse(localStorage.getItem("newMember"));

                for(var i=0; i < newMember.length; i++){
                    $(".content").append("<li>" + "Användare" + newMember[i].id + "</br>" + "email: " + newMember[i].email + "</br>"  + "lösenord: " + newMember[i].password + "</br>" + "</br>" + "</li>");
                }

            } else {
                for(var i= 0; i < kundLista.length; i++){
                    $(".content").append("<li>" + "Användare" + kundLista[i].id + "</br>" + "email: " + kundLista[i].email + "</br>"  + "lösenord: " + kundLista[i].password + "</br>" + "</br>" + "</li>");

                }
            }
    
        }
            // newUser= JSON.parse(localStorage.getItem("pushNewMember"));
            // for(var i = 0; i < kundLista.length; i++) {
            //     $(".content").append("<li>" + "Användare" + kundLista[i].id + "</br>" + "email: " + kundLista[i].email + "</br>"  + "lösenord: " + kundLista[i].password + "</br>" + "</br>" + "</li>");
            // }
        
            // for(var i = 0; i < newUser.length; i++){
            //     $(".content").append("<li>" + "Användare" + newUser[i].name + "</br>" + "email: " + newUser[i].email + "</br>" + "lösenord: " + newUser[i].password + "</br>" + "</br>" + "</br>" + "</li>");
      
            // }
showCustomerNewsLetter = function(){

    member = JSON.parse(localStorage.getItem("newMember"));
    for(var i = 0; i < member.length; i++){
        if(member[i].nyhetsbrev == "JA");
        $(".content").append("<li>" + member[i].email + "," + "</li>");
    }
  
    
    // newUser= JSON.parse(localStorage.getItem("pushNewMember"));
    // $(".content").append("<p>Nedan kunder vill ha nyhetsbrev");
    // if($(".newsLetterYes").is(':checked')){
    //     for(var i = 0; i < newUser.length; i++){
    //         $(".content").append("<li>" + "Användare" + newUser[i].name + "</br>" + "email: " + newUser[i].email + "</br>" +"</li>");
    //         console.log(newUser);
        
    //         }
    // }
}

//Här körs funktion för att visa order på Admin-sida
    showOrder = function(){
        $(".content").html("");
        $(".content").append("<p>Här ska sparade order visas</p>");

        createOrder = JSON.parse(localStorage.getItem("order"));

        for(var i = 0; i < createOrder.length; i++){
            $(".content").append("<div class='showSavedOrder'>" + "<li>" + createOrder[i].Produktnamn + "</li></div>");
            console.log(createOrder);
        }

    }   
} // Här stängs admininloggningsfunktion


/// FUnktion för admin utloggning
    $(".adminLogOutButton").click(function(){
        sessionStorage.clear()
        location.reload();
        console.log("Du loggade ut");
    });

});

