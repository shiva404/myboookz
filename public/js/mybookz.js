$(document).ready(function() {
    $('#grimportmodalbtnYes').click(function() {
        window.location = "/auth/goodreads";
    });
    
    $('#grim-modalbtn-cancel').click(function(){
        var posting = $.post('/api/goodreads/sync?status=NO',"application/json");
        posting.done(function(data){
            $('#goodreadsimportmodal').modal('hide');
        })
    })
    
    $('#add-group-save').click(function(){
        var posting = $.post('api/groups', {group: {name: $('#add-group-name').val()}},"application/json");
        posting.done(function(data){
            $('#add-group-modal').modal('hide');
        })
    });
    
    $('#grim-modalbtnrmd-later').click(function(){
        var posting = $.post('/api/goodreads/sync?status=YES',"application/json");
        posting.done(function(data){
            $('#goodreadsimportmodal').modal('hide');
        })
    })

    $('#search-members-group-button').click(function(event){
        event.preventDefault();
        const groupId = $(this).attr("data-target");
        searchMembersGroup(groupId);
    })

     $("#add-members-group-form").on("submit", function(event) {
        event.preventDefault();
        const groupId = $(this).attr("data-target");
        searchMembersGroup(groupId);
    });

    var searchMembersGroup = function(groupId){
        const searchString = $('#search-members-group-text').val();
        var posting = $.post('/api/friends/search/group?q=' + searchString + "&groupId=" + groupId, "application/json");
        posting.done(function(data){
             $("#group-search-users-data-div").html(data);
        })
    };

    $('.addwishlist-btn').click(function(event){
        event.preventDefault();
        var idType = $(this).attr("id-type");
        var targetId = $(this).attr("data-target");
        var posting = $.post('/api/books/' + targetId + '?listingType=wishlist&idType=' + idType,"application/json");
        posting.done(function(data){
            //TODO: disable button or change ui screen
            $(this).active = false;
        })
    })
    
    $('.js-read-and-own').click(function(event){
        event.preventDefault();
        var idType = $(this).attr("id-type");
        var targetId = $(this).attr("data-target");
        var posting = $.post('/api/books/' + targetId + '?listingType=readAndOwn&idType=' + idType,"application/json");
        posting.done(function(data){
            //TODO: disable button or change ui screen
            $(this).active = false;
        })
    });
    
    $('.js-read').click(function(event){
        event.preventDefault();
        var idType = $(this).attr("id-type");
        var targetId = $(this).attr("data-target");
        var posting = $.post('/api/books/' + targetId + '?listingType=read&idType=' + idType,"application/json");
        posting.done(function(data){
            //TODO: disable button or change ui screen
            $(this).active = false;
        })
    });

    $('.js-own').click(function(event){
        event.preventDefault();
        var idType = $(this).attr("id-type");
        var targetId = $(this).attr("data-target");
        var posting = $.post('/api/books/' + targetId + '?listingType=own&idType=' + idType,"application/json");
        posting.done(function(data){
            //TODO: disable button or change ui screen
            $(this).active = false;
        })
    });

    $('.scrollClick').click(function(e){
        e.preventDefault();
        scrollToElement($(this).attr('scroll-to-id'), 600 );
    });

    var scrollToElement = function(el, ms){
        var speed = (ms) ? ms : 600;
        $('html,body').animate({
            scrollTop: $(el).offset().top
        }, speed);
    };
    
    $('#search-button').click(function(e){
        var searchText = $('#search-text').val();
        if(searchText) {
            $(location).attr('href',"/search?q=" + searchText);
        }
    })

    $("#address-add-save").on("click", function(event) {
        event.preventDefault();
        
        var params = {address: {type: $('#address-add-type').val(), latitude: $('#address-add-lat').val(), longitude: $('#address-add-long').val(), landmark: $('#address-add-landmark').val()}};
        var str = jQuery.param( params );
        console.log(str);
        var posting = $.post('api/address', str,"application/json");
        posting.done(function(data){
            //add the stuff back to
        })
    });

    $("#my-books-tab-wishlist").on("click", function(event) {
        event.preventDefault();
        var posting = $.get('api/wishlist');
        posting.done(function(data){
            console.log(data)
            $('#my-books-tab-wishlist-content-div').replaceWith(data)
        })
    });
    
    
    $("#my-books-tab-borrowed").on("click", function(event) {
        event.preventDefault();
        var posting = $.get('api/borrowedBooks');
        posting.done(function(data){
            console.log(data)
            $('#my-books-tab-borrowed-content-div').replaceWith(data)
        })
    });

    $("#my-books-tab-owned").on("click", function(event) {
        event.preventDefault();
        var posting = $.get('api/ownedBooks');
        posting.done(function(data){
            $("#my-books-tab-owned-content-div").replaceWith(data);
        })
    });
    
    $("#search-users-nav").on("click", function(event) {
        event.preventDefault();
        var searchText = $("#search-users-nav").attr("data-string");
        var posting = $.get('api/search/users?q=' + searchText);
        posting.done(function(data){
            $('#search-result').replaceWith(data)
        })
    });
    
    
    $(".fbLikePopUp").on("click", function(event){
        event.preventDefault();
    })
});
