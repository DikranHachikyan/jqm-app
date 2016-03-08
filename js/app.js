$(document).ready(function(){
    $('body').on('pagecreate',':jqmData(role="page")',function(evt,ui){
        //console.log('Create page:', $(this).attr('id'));
        var currentPage = $(this);
        if( currentPage.hasClass('custom-header') )
        {
            console.log('before get');
            $.get('templates/custom-header.html', function(data,status){
                console.log('get function');
                var $header = $(data);
                var title = currentPage.jqmData('title');
                $header.find('h1').html(title);
                currentPage.prepend($header);
                $header.toolbar();
            });//read custom header from url
            console.log('after get');
        }
    });//on page create
    
    $('body').on('pageshow',':jqmData(role="page")',function(evt,ui){
        //console.log('Show page:', $(this).attr('id'));
    });//on page create
    
});//on document ready

//function foo(){console.log('after get');}
function loadRecentPosts(data){
    $.each( data.posts , function( key, post){
        var $li = $('<li></li>');
        var $a = $('<a href="#"></a>');
        var $img = $('<img src="" alt="">');
        var $h2  = $('<h2></h2>');
        var $p   = $('<p></p>');
        
        var url = '';
        
        if( post.thumbnail_images != undefined &&  
            post.thumbnail_images.thumbnail != undefined &&
            post.thumbnail_images.thumbnail.url != undefined)
        {
            url = post.thumbnail_images.thumbnail.url;
        }
        else
        {
            url = 'images/default.png';
        }
        $img.attr({'alt': post.title_plain, 'src': url});
        $h2.html( post.title_plain );
        $p.html(post.excerpt);
        var txt = $p.text();
        $p.text(txt);
        $a.append($img);
        $a.append($h2);
        $a.append($p);
        $li.append($a);
        $('#post-list').append($li);
    });// for each post in posts
        //$('#post-list').listview('refresh');
}// load recent posts 
