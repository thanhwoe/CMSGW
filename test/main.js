// change background home header navbar
$(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {       
        document.querySelector(".background-navbar").setAttribute( 
            "style", "background-color: rgba(255, 255, 255, .15);backdrop-filter: blur(5px); animation: headerGrowth ease-in 0.3s;"
            );
    }
    else{
        document.querySelector(".background-navbar").setAttribute("style", "");
    }
});
/*Interactivity to determine when an animated element in in view. In view elements trigger our animation*/
$(document).ready(function() {

    //window and animation items
    var animation_elements = $.find('.content-block, .content-block2');
    var web_window = $(window);
  
    //check to see if any animation containers are currently in view
    function check_if_in_view() {
      //get current window information
      var window_height = web_window.height();
      var window_top_position = web_window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);
  
      //iterate through elements to see if its in view
      $.each(animation_elements, function() {
  
        //get the element sinformation
        var element = $(this);
        var element_height = $(element).outerHeight();
        var element_top_position = $(element).offset().top;
        var element_bottom_position = (element_top_position + element_height);
  
        //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
        if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
          element.addClass('in-view');
        } else {
          element.removeClass('in-view');
        }
      });
  
    }
  
    //on or scroll, detect elements in view
    $(window).on('scroll resize', function() {
        check_if_in_view()
      })
      //trigger our scroll event on initial load
    $(window).trigger('scroll');
  
    $(".search-btn").on("click", function(){
        $(".search-input").toggleClass("inclicked");
        $(".search-btn").toggleClass("close");

    });
    // click event
    $("#login").on("click", function(e){
        e.preventDefault();
        $(".popup").addClass("show-popup")
    });
    $("#close-login").on("click", function(){
        $(".popup").removeClass("show-popup")
    });
    $(".documentBox").on("click", function(e){
        console.log("text");
        $(".popup-document").addClass("show-popup")
    });
  });
// validator form login
function validator(options){
  function validate(inputElement, rule){
     
          var errorMessage = rule.test(inputElement.value)
          var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
          if(errorMessage){
              errorElement.innerText= errorMessage;
              inputElement.parentElement.classList.add('invalid')
          }
          else{
              errorElement.innerText= '';
              inputElement.parentElement.classList.remove('invalid');
          }
          return !errorMessage;
     
  }
  var formElement = document.querySelector(options.form);
  if(formElement){
      formElement.onsubmit = function(e){
          options.rules.forEach(rule => {
              var inputElement = formElement.querySelector(rule.selector);
              var isValid = validate(inputElement, rule);
              if(!isValid){
                  e.preventDefault();
              }
          });
      }
  }
  if (formElement){
      options.rules.forEach(rule => {
          var inputElement = formElement.querySelector(rule.selector);
          
          if(inputElement){
              inputElement.onblur= function(){
                  validate(inputElement, rule);
              }
              inputElement.oninput = function(){
                  var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                  errorElement.innerText= '';
                  inputElement.parentElement.classList.remove('invalid');
              }
          }
      });
  }
};
validator.isRequired = function(selector){
  return{
      selector : selector,
      test: function(value){
          return value.trim() ? undefined : 'Please enter your information'
      }
  }
};
validator.minLength = function(selector, min){
  return{
      selector : selector,
      test: function(value){
          return value.length >= min ? undefined : `Please enter at least ${min} characters`
      }
  }
};
