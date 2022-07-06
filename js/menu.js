$(document).ready(function() {
    var menu = new Menu();
    menu.init('#menu',{allclick: false});
});




var Menu = function(){
    var $menu = null;
    var menunav = null;
    var isMobile = false;
    var MOBILE_WINDOW_SIZE = 580;
    
    function init(menu, options){
        menunav = menu;
        $menu = $(menu).find('ul').find('li');
        var actionClickAll = false;
        
        if(options){
            if(options.allclick !== undefined){
                actionClickAll = options.allclick;
            }
        }
        
        if($(window).width() <= MOBILE_WINDOW_SIZE){
            isMobile = true;
        }
    
        //si el usuario hace click fuera del menú ocultamos todos los submenus
        $(document).on("click", function(){
            $menu.each(function(){
                $(this).removeClass("selected");
                $(this).children('ul').removeClass("show");
                $(this).children('ul').removeClass("showback");
            });
        });

        //el usuario redimensiona la pantalla del navegador. Actualizamos la posición de los submenus
        $(window).resize(function(){
            if($(window).width() <= MOBILE_WINDOW_SIZE){
                if(!isMobile){
                    isMobile = true;
                    $('#menu').find('ul').find(".iconselect").each(function(){
                        $(this).find('ul').css("max-height",0);
                    });
                }
                $menu.each(function(){
                    $(this).children('ul').css("left", "0");
                });
            }else{
                if(isMobile){
                    isMobile = false;
                    $('#menu .iconselect').each(function(){
                        //console.log("hola")
                        $(this).find('ul').css("max-height","initial");
                        updateMenu($menu,this, false);
                    });
                }
                $menu.each(function(){
                    var el = $(this).children('ul');
                    if(el.length){
                        if($(this).parents("ul").length > 1){
                            if(isOutScreen(el)){
                                $(this).children('ul').css("left", -el.outerWidth());
                            }else{
                                $(this).children('ul').css("left", "100%");
                                if(isOutScreen(el)){
                                    $(this).children('ul').css("left", -el.outerWidth());
                                }
                            }
                        }
                    }
                });
            }
        });

        //el usuario cuando el cursor del ratón sale del menú ocultamos el menú visible. Solo pantallas mayores a 580 pixeles
        $(document).on("mouseover", function(e){
            if($(window).width() > MOBILE_WINDOW_SIZE && !actionClickAll){
                $('#menu').find('ul').find(".iconselect").each(function(){
                    $(this).removeClass("selected");
                    $(this).children('ul').removeClass("show");
                    $(this).children('ul').removeClass("showback");
                    if(isMobile){
                        $(this).find('ul').css("max-height",0);
                    }
                });
            }
        });

        //el usuario pasa el ratón por encima del menú. Solo para pantallas mayores a 580 pixeles
        $menu.on("mouseover", function(e){
            if($(window).width() > MOBILE_WINDOW_SIZE && !actionClickAll){
                updateMenu($menu,this, true);
                e.stopPropagation();
            }
        });

        //el usuario hace click en un item del menú funcional para pantallas menores a 580 pixeles
        $menu.on("click", function(e){
            if($(window).width() <= MOBILE_WINDOW_SIZE || actionClickAll){
                //actualiza el menu
                if(!updateMenu($menu,this, true)){
                    //si el icono ya estaba visible. Ocultamos el mismo
                    if($(this).hasClass("selected")){
                        $(this).removeClass("selected");
                        $(this).find("ul").removeClass("showback");
                        $(this).find("li").removeClass("selected");
                        $(this).find('ul').removeClass("show");
                        if(isMobile){
                            $(this).find('ul').css("max-height",0);
                        }
                    }
                }
                //detenemos la propagación del evento para que no afecte a otras capas del menú
                e.stopPropagation();
            }
        });

        //insertamos la clase iconselect para mostrar una flecha en el menú
        $menu.each(function(){
            var ul = $(this).find("ul");
            if(ul.length > 0){
                $(this).addClass("iconselect");
            }
            updateMenu($menu, this, false);
        });
        
        //visualizar el menu
        $(".spinner-master").click(function(){
            showMenu();
        });
    }
    
    function updateMenu($menu, element, show){
        if($(element).parent('ul').hasClass("showback") && !$(element).hasClass("iconselect")){
            $(element).parent('ul').removeClass("showback");
            $(element).parent('ul').addClass("show");
            $(element).parent('ul').find("li").each(function(){
                $(this).children("ul").removeClass("show");
            });
        }
        if($(element).parent('ul').hasClass("show") && !$(element).hasClass("iconselect")){
            $(element).parent('ul').find('li').removeClass("selected");
        }
        if($(element).hasClass("selected") || !$(element).hasClass("iconselect")){
            return false;
        }

        $menu.each(function(){
            $(this).children('ul').removeClass("show");
            $(this).parents('ul').removeClass("showback");
            $(this).removeClass("selected");
        });
        
        
        if(show){
            $(element).children('ul').addClass("show");
        }else{
            $(element).children('ul').show();
        }
        
        
        if(isMobile && show){
            $(menunav + " > ul > li").each(function(){
                var t = $(element).children("ul").children("li:visible").length;
                $(element).children("ul").css("max-height", ($(element).height() * t));

                var ul = $(element).parents("ul");
                var s = 0;
                ul.each(function(){
                    s += parseInt($(this).css("max-height"));
                    $(this).css("max-height", s + ($(element).height() * t));
                });
            });
        }
        
        if(show){
            if($(element).hasClass("iconselect")){
                $(element).parents("ul").addClass("showback");
            }
        }else{
            $(element).parents('ul').show();
        }

        $(element).addClass("selected");
        $(element).parents("li").addClass("selected");

        var el = $(element).children('ul');

        if(el.length){
            if($(window).width() > MOBILE_WINDOW_SIZE){
                if($(element).parents("ul").length > 1){
                    if(isOutScreen(el)){
                        $(element).children('ul').css("left", -el.outerWidth());
                    }else{
                        $(element).children('ul').css("left", "100%");
                        if(isOutScreen(el)){
                            $(element).children('ul').css("left", -el.outerWidth());
                        }
                    }
                }else{
                    if(isOutScreen(el)){
                        $(element).children('ul').css("left", "initial");
                        $(element).children('ul').css("right", "0");
                    }else{
                        $(element).children('ul').css("left", "0");
                        $(element).children('ul').css("right", "initial");
                        if(isOutScreen(el)){
                            $(element).children('ul').css("left", "initial");
                            $(element).children('ul').css("right", "0");
                        }
                    }
                }
            }
        }
        if(isMobile){
            $('#menu ul > li').each(function(){
                if(!$(this).hasClass("selected")){
                    $(this).children('ul').css("max-height",0);
                }
            });
        }

        return true;
    }


    function isOutScreen(el){
        var sw = $(window).width();
        var x = el.offset().left;
        var w = el.width();
        if(x+w > sw){
            return true;
        }else{
            return false;
        }
    }
    
    function showMenu(){
        if(!$(".slider-content").hasClass("slider-menu-show-left")){
            $(".slider-content").addClass("slider-menu-show-left");
            $('.spinner-master').addClass("slider-menu-show-left");
        }else{
            $(".slider-content").removeClass("slider-menu-show-left");
            $('.spinner-master').removeClass("slider-menu-show-left");
        }
    }
    
    return {
        init : init,
        updateMenu : updateMenu,
        isOutScreen : isOutScreen,
        showMenu : showMenu
    };
};