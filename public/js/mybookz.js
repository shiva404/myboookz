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

    $('.addwishlist-btn').click(function(event){
        var idType = $(this).attr("id-type");
        var targetId = $(this).attr("data-target");
        console.log("IdType: targetId" + idType + targetId)
        var posting = $.post('/api/books/' + targetId + '/wishlist?idType=' + idType,"application/json");
        posting.done(function(data){
            $(this).active = false;
        })
    })

    $('.scrollClick').click(function(e){
        e.preventDefault();
        scrollToElement( $(this).attr('scroll-to-id'), 600 );
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

    $("#my-books-tab-owned").on("click", function(event) {
        event.preventDefault();
        var posting = $.get('api/ownedBooks');
        posting.done(function(data){
            $("#")
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
