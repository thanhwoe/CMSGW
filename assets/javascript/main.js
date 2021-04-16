// change background home header navbar
$(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
        document.querySelector(".background-navbar").setAttribute(
            "style", "background-color: rgba(255, 255, 255, .15);backdrop-filter: blur(5px); animation: headerGrowth ease-in 0.3s;"
        );
    }
    else {
        document.querySelector(".background-navbar").setAttribute("style", "");
    }
});
/*Interactivity to determine when an animated element in in view. In view elements trigger our animation*/
$(document).ready(function () {

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
        $.each(animation_elements, function () {

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

    // auto complete search keywords
    var searchKeywords = ["design", "information technology", "business", "tourism", "vũ óc chó"]
    $(".search-input").autocomplete({
        delay: 100,
        source: searchKeywords,
        _resizeMenu: function () {
            this.menu.element.outerWidth(100);
        }
    });
    //on or scroll, detect elements in view
    $(window).on('scroll resize', function () {
        check_if_in_view()
    })
    //trigger our scroll event on initial load
    $(window).trigger('scroll');

    // click event
    $(".search-btn").on("click", function () {
        $(".search-input").toggleClass("inclicked");
        $(".search-btn").toggleClass("close");

    });
    $("#login").on("click", function (e) {
        e.preventDefault();
        $(".popup").addClass("show-popup")
    });
    $("#close-login").on("click", function () {
        $(".popup").removeClass("show-popup")
    });
    $(".documentBox").on("click", function (e) {
        console.log("text");
        $(".popup-document").addClass("show-popup")
    });
    $("#showDocument-box").on("click", function (e) {
        $(".popup-document").addClass("show-popup")
    });
    $('.popup-overlay').on("click", function () {
        var popDocEvent = $(".popup-document").hasClass("show-popup");
        var popLoginEvent = $(".popup").hasClass("show-popup");
        if (popDocEvent) {
            $(".popup-document").removeClass("show-popup")
        } else if (popLoginEvent) {
            $(".popup").removeClass("show-popup")
        }
    });
    // upload event
    var acceptUpload;

    $('input[type="checkbox"]').on("change",function () {
        if ($("#uploadCheckbox").prop('checked') === true) {
            $("#call-to-action").attr("style","display:block")
        } 
        if($("#uploadCheckbox").prop('checked') === false) {
            $("#call-to-action").attr("style","display:none")
        }
    });


    let state = {};

    // state management
    function updateState(newState) {
        state = { ...state, ...newState };
    }

    // event handlers
    $("#uploadInput").change(function (e) {
        let files = $("#uploadInput")[0].files;
        let filesArr = Array.from(files);
        updateState({ files: files, filesArr: filesArr });

        renderFileList();
    });

    $(".selectedFiles").on("click", "li > i", function (e) {
        let key = $(this)
            .parent()
            .attr("key");
        let curArr = state.filesArr;
        curArr.splice(key, 1);
        updateState({ filesArr: curArr });
        renderFileList();
    });

    // $("form").on("submit", function(e) {
    // 	e.preventDefault();
    // 	console.log(state);
    // 	renderFileList();
    // });

    // render functions
    function renderFileList() {
        let fileMap = state.filesArr.map((file, index) => {
            let suffix = "bytes";
            let size = file.size;
            if (size >= 1024 && size < 1024000) {
                suffix = "KB";
                size = Math.round(size / 1024 * 100) / 100;
            } else if (size >= 1024000) {
                suffix = "MB";
                size = Math.round(size / 1024000 * 100) / 100;
            }

            return `<li key="${index}">${file.name
                } <span class="file-size">${size} ${suffix}</span><i class="fas fa-trash"></i></li>`;
        });
        $("#list-Files-Upload").html(fileMap);
    }
    $("#uploadInput").on("change", function () {
        $(".uploadBox").attr("style","height:auto")
        
    })
    // navbar fix layout
    if (!$("#nav-user-box").length) {
        document.querySelector(".search-box").setAttribute(
            "style", "transform: translateY(5%);"
        );
    }
    // show container content data
    var categoryList = ["All", "Design", "Information Technology", "Business", "Tourism", "Chart"];
    var cateSidebar = document.querySelectorAll(".category-sidebar");
    var contentData = document.querySelectorAll(".content-container-data");
    var mobileSibar = document.querySelectorAll(".mSidebar-item");
    // category pc
    for (var i = 0; i < cateSidebar.length; i++) {
        cateSidebar[i].addEventListener('click', function () {
            document.querySelector("#selectCate").innerText = categoryList[this.id - 1]
            for (var i = 0; i < contentData.length; i++) {
                contentData[i].className = 'content-container-data'
            }
            document.getElementById(this.dataset.id).className = 'content-container-data active';
            for (var i = 0; i < cateSidebar.length; i++) {
                cateSidebar[i].className = 'category-sidebar'
            }
            this.className = 'category-sidebar active';
        });
    }
    // category mobile
    for (var i = 0; i < mobileSibar.length; i++) {
        mobileSibar[i].addEventListener('click', function () {
            document.querySelector("#selectCate").innerText = categoryList[this.id - 1]
            for (var i = 0; i < contentData.length; i++) {
                contentData[i].className = 'content-container-data'
            }
            document.getElementById(this.dataset.id).className = 'content-container-data active';
            for (var i = 0; i < mobileSibar.length; i++) {
                mobileSibar[i].className = 'mSidebar-item'
            }
            this.className = 'mSidebar-item active';
        });
    }
    // reponsive navbar
    $("#navFaculties").on("click", function () {
        $(".list-faculty").attr("display", "block")
    })
    $("#nav-user-box").on("click", function () {
        $(".user-menu").attr("display", "block")
    })
    $(".main-logo").on("click", function () {
        $(".navbar").toggleClass("open");
    })
    $(window).resize(function () {
        var width = $(window).width();
        if (width < 768) {
            $("#link-logo").removeAttr("href");
            $(".logo").attr("src", "../assets/img/icon.png");
            $(".logo").attr("style", "height:40px;width:40px; margin-left:5px")
        }
    });
    // alert handel
    $("#call-to-action").on("click", function () {
        var textDanger = $(".text-danger").children().children().html();
        var textDangerLength = textDanger.length;
        
        if(textDangerLength>2){
            alert(textDanger)
        }
    })
    // handle action comment-like
    $("#action-like").on("click", function () {
        $("#action-like").toggleClass("active-like");
    })
    $("#action-comment").on("click", function () {
        // $("#action-comment").toggleClass("active-comment");
        $("#action-comment").attr("style","color:#00a8ff")
        $("#input-comment").focus();
    })
    $("#input-comment").on("blur", function () {
        // $("#action-comment").toggleClass("active-comment");
        $("#action-comment").attr("style","color:#ADB5BD")
    })
    // mobi
    $("#action-like-mobi").on("click", function () {
        $("#action-like-mobi").toggleClass("active-like");
    })
    $("#action-comment-mobi").on("click", function () {
        // $("#action-comment").toggleClass("active-comment");
        $("#action-comment-mobi").attr("style","color:#00a8ff")
        $("#input-comment-mobi").focus();
    })
    $("#input-comment-mobi").on("blur", function () {
        // $("#action-comment").toggleClass("active-comment");
        $("#action-comment-mobi").attr("style","color:#ADB5BD")
    })
    $("#comment-active").on("click", function () {
        $(".document-comment-mobi").toggleClass("document-comment-mobi-active")
    })
});
// validator form login
function validator(options) {
    function validate(inputElement, rule) {

        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        if (errorMessage) {
            //   document.querySelector(".input-effect").setAttribute("style", `content:'${errorMessage}'`)
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        }
        else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
        return !errorMessage;

    }
    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function (e) {
            options.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    e.preventDefault();
                }
            });
        }
    }
    if (formElement) {
        options.rules.forEach(rule => {
            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
};
validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Please enter your information'
        }
    }
};
validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Please enter at least ${min} characters`
        }
    }
};
// chart handler




