$(document).ready(function(){
var categoryList;
var shoppingCart = [];
var kundLista;
var saveOrder = [];

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

//Kolla om kund är inloggad


$(".loggaUtKnapp").hide();
if(sessionStorage.userId !=null){
    // goToCheckOut();
    $(".loggaUtKnapp").show();
    $("#username").hide();
    $("#password").hide();
    $(".testKnapp").hide();
    $(".register").hide();
    
    console.log("Du är redan inloggad");
} else {
    $(".testKnapp").click(function(){
        console.log("Logga in?!?!?!?!?!");
        for(var i = 0; i < kundLista.length; i++){
            if($("#username").val() == kundLista[i].email && $("#password").val() == kundLista[i].password){
                sessionStorage.setItem("userId",$("#username").val() );
                // sessionStorage.userId == kundLista[i].email;
                $(".loggaUtKnapp").show();
                $("#username").hide();
                $("#password").hide();
                $(".testKnapp").hide();
                $(".register").hide();
                   
                    console.log("rätt");
            } else {
                alert("Fel lösen");
                console.log("fellösen");
                // var forGotPassword = "<p class='forGotPasswordLink'>Har du glömt lösenord?</p>"
                // $("#header").append(forGotPassword);
                // $(".forGotPasswordLink").click(function(){
                //     registerMember();
                // });
            }
        }
    });
}

$(".loggaUtKnapp").click(function(){
    sessionStorage.clear()
    location.reload();
    console.log("Töm local storage");

});

$(".register").click(function(){
    registerMember();
});


// logIn(function(){
//     if(kundLista.email == $("#username").val() && kundLista.password == $("#password").val(){
//         sessionStorage.setItem("userId");
//         goToCheckOut();
//     })
// });

// var logIn = function(){
//     var html
//     html = "<div class='loginForm'>";
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
        localStorage.setItem("pushProduct", JSON.stringify(shoppingCart));
        shoppingCart = JSON.parse(localStorage.getItem("pushProduct"));
        
        $(".counter").html(shoppingCart.length);

    }

//Visa produkter som är sparade i localstorage 
    showShoppingCart = function(){
        
        $(".content").html("<h1>Kundvagn</h1>");
        $(".content").append("<div class='shoppingCartAllProducts'>"+"</div>")

        $(".shoppingCartAllProducts").append("<div class='shoppingCartProduct'> "+ " </div>")
      
        shoppingCart = JSON.parse(localStorage.getItem("pushProduct"));
 
        for (var i = 0; i < shoppingCart.length; i++){
            $(".shoppingCartProduct").append("<div class='shoppingCart'>" + shoppingCart[i].prodName + " " +  shoppingCart[i].prodPrice + " kr" + "<a href='#' onClick='delCartItem(" + i + ")'>Ta bort</a>" + "</div>");

        }
       
        var totalPrice = 0;
        var freightPrice = 55;

        for(var i = 0; i < shoppingCart.length; i++ ){
            totalPrice += shoppingCart[i].prodPrice;
        }
        totalPrice += freightPrice;

        $(".shoppingCartAllProducts").append("<p>" + " Totalpris (varav frakt: 55kr) " + totalPrice  + " kr " + "</p>");
        $(".shoppingCartAllProducts").append("<button class='goToCheckOut' onclick='goToCheckOut(" + shoppingCart[i] + ")'>Skicka beställning</button>");
             
    }

//Ta bort produkter i varukorgen
    delCartItem = function(i){
        shoppingCart.splice(i,1);
        $(".counter").html(shoppingCart.length);
        showShoppingCart();
    } 


//Gå till kassan/skicka order
    goToCheckOut = function (i){
        console.log("Inloggad- Gå till kassan"); 
        console.log(shoppingCart);
        var sendProduct = shoppingCart;
        console.log("Detta finns med??!!!!!");
        saveOrder.push(sendProduct);
        console.log("Detta finns med??");
        console.log(saveOrder);
        console.log("detta är efter push");
        localStorage.setItem("order",JSON.stringify(saveOrder));
        saveOrder = JSON.parse(localStorage.getItem("order"));
        console.log("hej");
        console.log(saveOrder);
    }      

////Bli Medlem formulär
    registerMember = function(){
        $(".content").html("");
        console.log("Bli medlem");
        $(".content").append("<p>Bli medlem</p>");
        var content;
        content = '<div class="registerForm">';
        content += '<form>';
        content += '<label>Namn</label>'
        content += '<input class="registerName" text="text"></input>';
        content += '<label>Email</label>';
        content += '<input class="registerEmail text="text></input>';
        content += '<label>Lösenord</label>';
        content += '<input class="registerPassword" text="password"></input>';
        content += '<input class="newsLetterYes" type="checkbox">Nyhetsbrev, JA</input>';
        content += '<button class="registerButton" onclick="sendRegister()">Regristrera</button>';
        content += '</div>';
        $(".content").append(content);

    }
//Funktion för att skicka nya användaruppgifter in i LocalStorage
    sendRegister = function(){

        var newUser = [];
        newUser.push({id: 4, name: $(".registerName").val(), email: $(".registerEmail").val(), password: $(".registerPassword").val(), nyhetsbrev: $(".newsLetterYes").val()});
        localStorage.setItem("pushNewMember", JSON.stringify(newUser));
        newUser = JSON.parse(localStorage.getItem("pushNewMember"));
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
    
            newUser= JSON.parse(localStorage.getItem("pushNewMember"));
            for(var i = 0; i < kundLista.length; i++) {
                $(".content").append("<li>" + "Användare" + kundLista[i].id + "</br>" + "email: " + kundLista[i].email + "</br>"  + "lösenord: " + kundLista[i].password + "</br>" + "</br>" + "</li>");
            }
        
            for(var i = 0; i < newUser.length; i++){
                $(".content").append("<li>" + "Användare" + newUser[i].name + "</br>" + "email: " + newUser[i].email + "</br>" + "lösenord: " + newUser[i].password + "</br>" + "</br>" + "</br>" + "</li>");
      
            }
        }

// showCustomerNewsLetter = function(){
    
//     newUser= JSON.parse(localStorage.getItem("pushNewMember"));
//     $(".content").append("<p>Nedan kunder vill ha nyhetsbrev");
//     if($(".newsLetterYes").is(':checked')){
//         for(var i = 0; i < newUser.length; i++){
//             $(".content").append("<li>" + "Användare" + newUser[i].name + "</br>" + "email: " + newUser[i].email + "</br>" +"</li>");
//             console.log(newUser);
        
//             }
//     }
// }

//Här körs funktion för att visa order på Admin-sida
    showOrder = function(i){
        $(".content").html("");
        $(".content").append("<p>Här ska sparade order visas</p>");

        saveOrder = JSON.parse(localStorage.getItem("order"));
        
        for (var i = 0; i < saveOrder.length; i++){
            $(".content").append("<div class='showSavedOrder'>" + "<li>" + saveOrder[i][i].prodName + "</li>" + saveOrder[i].length +  "</div>");

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

