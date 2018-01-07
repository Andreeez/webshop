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
        var json_str = JSON.stringify(shoppingCart);
        localStorage.shoppingCart = json_str;
        localStorage.setItem("pushProduct", JSON.stringify(shoppingCart));
        loopCart = JSON.parse(localStorage.getItem("pushProduct"));


       
        

        $(".counter").html(shoppingCart.length);

    }

//Visa produkter som är sparade i localstorage 
    showShoppingCart = function(){
        
        $(".content").html("<h1>Kundvagn</h1>");
        $(".content").append("<div class='shoppingCartAllProducts'>"+"</div>")

        $(".shoppingCartAllProducts").append("<div class='shoppingCartProduct'> "+ " </div>")
       
        // var json_str = JSON.stringify(shoppingCart);
        // localStorage.shoppingCart = json_str;

        // var loopCart = JSON.parse(localStorage.shoppingCart);

        

        loopCart = JSON.parse(localStorage.getItem("pushProduct"));
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
        $(".shoppingCartAllProducts").append("<button class='goToCheckOut' onclick='goToCheckOut(" + loopCart[i] + ")'>Gå till Kassan</button>");
             
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
   
    if(sessionStorage.userId != null){
        console.log("Detta hittar den inte");
        addOrderToCheckOut(i);
  
    } else {
        // $(".content").html("Skapa Inlogg");
        registerMember();
        // Ett steg som kan läggas till senare, om ejinloggad välj att kunna logga in och ett formulär öppnas upp på nytt
        // var logInButton = "<button class='logInButton'>Logga in</button>" 

    }

}

//Bli Medlem
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
    content += '<button class="registerButton" onclick="sendRegister()">Regristrera</button>';
    content += '</div>';
    $(".content").append(content);

}

//Lägga produkter i checkout
addOrderToCheckOut = function(i){
    console.log("hittar inte loopcart");
    console.log(loopCart);
    $(".content").html("");
    $(".content").append("<p>Tack för din order</p>");
//Här ska jag puscha in varukoregen i localstorage för att skriva ut den på admin sidan....
    // var sendProduct = loopCart[i];
    // console.log(loopCart);
    // var json_str = JSON.stringify(saveOrder);
    // localStorage.shoppingCart = json_str;
    // localStorage.setItem("order", JSON.stringify(saveOrder));

    // saveOrder.push(sendProduct);

    // var sendProduct = shoppingCart[i]
    // saveOrder.push(sendProduct);
    // console.log(saveOrder);

    // var json_str = JSON.stringify(saveOrder)
    // localStorage.shoppingCart = json_str;
    // localStorage.setItem("order", JSON.stringify(saveOrder));
   

    var sendProduct = loopCart[i];
    saveOrder.push(sendProduct);
    console.log(saveOrder);
    var json_str = JSON.stringify(saveOrder);
    localStorage.saveOrder = json_str;
    localStorage.setItem("order", JSON.stringify(saveOrder));
    console.log(saveOrder);

    






    

}

sendRegister = function(){
    console.log("Skicka till register")
    alert("Skicka till register");
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

function adminLogedIn(){
console.log("hejhej");
    $(".adminLogOutButton").show();

var adminLista
adminLista = '<li><a href="admin.html">Start</a>';
adminLista += '<li onclick="listaKunder()">Kundlista</li>';
adminLista += '<li onclick="showOrder()">Orderlista</li>';
adminLista += '<li>Epostlista</li>';

$("#adminMenyList").append(adminLista);
listaKunder = function(){
    $(".content").html("");
    for(var i = 0; i < kundLista.length; i++) {
        $(".content").append("<li>" + "Användare" + kundLista[i].id + "</br>" + "email: " + kundLista[i].email + "</br>"  + "lösenord: " + kundLista[i].password + "</br>" + "</br>" + "</li>")
    }
}

showOrder = function(i){
    $(".content").html("");
    $(".content").append("<p>Här ska sparade order visas</p>");

    console.log(saveOrder);
    console.log(shoppingCart);
    // loopCart = JSON.parse(localStorage.getItem("order"));
    saveOrder = JSON.parse(localStorage.getItem("order"));
    
    // for (var i = 0; i < loopCart.length; i++){
    //     $(".content").append("<div class='showSavedOrder'>" + loopCart[i].prodName + loopCart[i].length +  "</div>");
    //     console.log(loopCart);
    // }
        for (var i = 0; i < saveOrder.length; i++){
            $(".content").append("<div class='showSavedOrder'>" + saveOrder[i] + saveOrder[i].length +  "</div>");
            console.log(saveOrder);
        }

        // $(".content").append(showSavedOrder);


}
}

$(".adminLogOutButton").click(function(){
    sessionStorage.clear()
    location.reload();
    console.log("Du loggade ut");
});

});

