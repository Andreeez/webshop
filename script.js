$(document).ready(function(){
    
    var categoryList;
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
//Funktion, tar fram Huvudkategorier (meny rad)
    function showMainCategory(){
        console.log("hejejeje");
        $(".menyList").append("<li><a href='#'>Start</a></li>");
        for(var i = 0; i < categoryList.length; i++){
            var mainCategoryName = "<li class='menuItems' onclick='showUnderCategoryList(" + [i] + "); showProductList(" + [i] + ")'><a href='#'>" + categoryList[i].mainCategory + "</a></li>";
            $(".menyList").append(mainCategoryName);
            console.log(mainCategoryName);
            console.log("heehehe");
        }   
        $(".menyList").append("<li><a href='#'>Kontakt</a></li>");
        $(".menyList").append("<li><a href='#'>Information</a></li>");
//Funktion, ta fram Underkategorier
        showUnderCategoryList = function(i){
            $(".productMenyList").html("");
            for(var index = 0; index < underCategoryList.length; index++){
                var underCategoryName = "<li onclick='showProductList(" + underCategoryList[index].id + ")'><a href='#'>" + underCategoryList[index].subCategory + "</a></li>";
            if(underCategoryList[index].mainCategory == i+1){
                $(".productMenyList").append(underCategoryName);
                console.log(underCategoryName);
            }
            }
        }
//Funktion visa produkter
        console.log("hejejeje");
        showProductList = function(i){
            $(".content").html("");
            for(var index = 0; index < productList.length; index++){
                var productCardName = "<h2>" + productList[index].prodName  + "</h2>";
                var productCardPrice = "<p>" + productList[index].prodPrice + " kr</p>";
                var productDescription = "<p>" + productList[index].prodDesc + "</p>";

                var productCardImage = "<img class='productCardImg' onclick='showProduct(" + productList[index].id + ")' src='/picture/" + productList[index].image + "'>";
                var productCard = "<div class='productCard'>" + productCardImage + productCardName + productCardPrice + "</div>";
                console.log(productCard);

                if(productList[index].mainCategory == i+1){
                    $(".content").append(productCard);
                }
                    else if (productList[index].subCategory == i){
                        $(".content").append(productCard);

                    }   
                }
            }
//Funktoon visa enskild produkt vid knapptryck
            showProduct = function(i){
                $(".content").html("");
                for(var index = 0; index < productList.length; index++){
                    var productName = "<h2>" + productList[index].prodName  + "</h2>";
                    var productPrice = "<p>" + productList[index].prodPrice + " kr</p>";
                    var productImage = "<img class='productCardImg' alt='" + productList[index].prodName + "' src='/picture/" + productList[index].image + "'>";
                    var productDescription = "<p>" + productList[index].prodDesc + "</p>";
                    var productContainer = "<div class='productContainer'>" + productName + "<hr class='productHR'>" + productPrice + productDescription + "</div>";
                    // var productCartButton = "<button class='addToCartButton' onclick='addToCart("+ productList[index].id + ")'> Köp produkt</button>";
                    if (productList[index].id == i){
                        $(".content").append(productImage);
                        $(".content").append(productContainer);
                    }
                }
            }

         
        }
});








    // var categoryList;
    // fetch("huvudkategorier.json")
    //     .then(function(response){
    //         return response.json();
    //     })
    //     .then(function(headCategory){
    //         categoryList = headCategory;
    //         showAllproducts();
    //     });

    // fetch("underkategorier.json")
    //     .then(function(response){
    //         return response.json();
    //     })
    //     .then(function(underCategory){
    //         underCategoryList = underCategory;
            
    //     });

    // fetch("produkter.json")
    //     .then(function(response){
    //         return response.json();
    //     })
    //     .then(function(productCategory){
    //         productList = productCategory;
            
    //     });


    // function showAllproducts(){
    //     $(".menyList").append("<li><a href='#'>Start</a></li>");

    //     for (var i = 0; i < categoryList.length; i++){
    //         var mainCategoryList = "<li class='mainCategoryItem' onclick='underCategory(" + [i] + "); allProductList(" + [i] +")'><a href='#'>" + categoryList[i].maincategory + "</a></li>";
    //         console.log(mainCategoryList);
    //     }

        
    //     $(".menyList").append(mainCategoryList);
    //     $(".menyList").append("<li><a href='#'>Information</a></li>");
    //     $(".menyList").append("<li><a href='#'>Kontakt</a></li>");
    //     $(".menyList").append("<li><a href='#'>kundvagn</a></li>");

    //     underCategory = function(i){
    //         $(".productMenyList").html(" ");
    //         for(var index = 0; index < underCategoryList.length; index++){
    //             var underCategoryName = "<li onlick='allProductList(" + underCategoryList[index].id + ")'><a href='#'>" + underCategoryList[i].subcategory + "</a></li>";
    //             if (underCategoryList[index].maincategory == i+1){
    //                 $(".productMenyList").append(underCategoryName);
    //             }
    //         }
    //     }

    //     allProductList = function(i){
    //         $(".content").html(" ");

    //         for(var index= 0; index < productList.length; index++){

    //             var productCardName = "<h2>" + productList[index].prodName  + "</h2>";
    //             var productCardPrice = "<p>" + productList[index].prodPrice + " kr</p>";
    //             var productCardImage = "<img class='productCardImg' src='/picture" + productList[index].image + "'>";

    //             var productCard = "<div class='productCard'>" + productCardImage + productCardName + productCardPrice + "</div>";

    //             if (productList[index].mainCategory == i+1){
    //                 $(".content").append(productCard);
    //             }
    //             else if (productList[index].subcategory == i ){
    //                 $(".content").append(productCard);
    //             }

    //         }
    //     }



    //     // printProductList = function(i){
    //     //     $(".main").html("");
            
    //     //     for(var index = 0; index < productList.length; index++){
                
    //     //         var productCardName = "<h2>" + productList[index].prodName  + "</h2>";
    //     //         var productCardPrice = "<p>" + productList[index].prodPrice + " kr</p>";
    //     //         var productCardImage = "<img class='productCardImg' src='img/products/" + productList[index].prodImg + "'>";

    //     //         var productCard = "<div class='productCard'>" + productCardImage + productCardName + productCardPrice + "</div>";

    //     //         if (productList[index].mainCategory == i+1){
    //     //             $(".main").append(productCard);
    //     //         }
    //     //         else if (productList[index].subCategory == i ){
    //     //             $(".main").append(productCard);
    //     //         }
                
    //     //     }
    //     // }








    // }

    





    
    
    
    
    // fetch("huvudkategorier.json")
    //     .then(function(response){
    //         return response.json();
    //     })
    //     .then(function(headCategory){
    //         var categoryList = headCategory;
    //         // categoryList.sort(function(a, b){return a.maincategory > b.maincategory });
    //         for (i = 0; i <categoryList.length; i++){
    //             $(".showHeadList").append("<li><a href='#' onclick='showUnderCategory(" + categoryList[i].id + ")'>" + categoryList[i].maincategory + "</a></li>")
    //         }
    //     });

    //     showUnderCategory = function(val){
    //         var showFromHeadCategory = val;
    //         fetch("underkategorier.json")
    //             .then(function(response){
    //                 return response.json();
    //             })
    //         .then(function(underCategory){
    //             var underCategoryList = underCategory;

    //             $(".showUnderList").html(" ");
    //             // underCategoryList.sort(function(a, b){return a.subcategory - b.subcategory});
    //             for (i = 0; i < underCategoryList.length; i++){
    //                 if (underCategoryList[i].huvudkategori == showFromHeadCategory){
    //                     $(".showUnderList").append("<li>" + underCategoryList[i].subcategory + "</li>")
    //                     // $(".showUnderList").append("<li><a href='#' onclick='showProducts(" + categoryList[i].id + ")'>" + categoryList[i].maincategory + "</a></li>")

    //                 }
    //             }
    //             $(".showUnderCategory").show();
    //         });
    //     };

    //     showProducts = function(val){
    //         var showProducts = val;
    //         fetch("produkter.json")
    //         .then(function(response){
    //             return response.json();
    //         })
    //         .then(function(products){
    //             var productList = products;
    //             for (i = 0; i < productList.length; i++){
    //                 if (productList[i])
    //             }
    //         });
    //     };


