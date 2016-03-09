$(document).ready(function(){
    $('body').on('pagecreate',':jqmData(role="page")',function(evt,ui){
        //console.log('Create page:', $(this).attr('id'));
        var currentPage = $(this);
        if( currentPage.hasClass('custom-header') )
        {
            
            $.get('templates/custom-header.html',   function(data,status){
               
                var $header = $(data);
                var title = currentPage.jqmData('title');
                $header.find('h1').html(title);
                currentPage.prepend($header);
                $header.toolbar();
            });//read custom header from url
            
        }// if has custom header
        
        if( currentPage.hasClass('custom-footer'))
        {
            $.get('templates/custom-footer.html', function(data,status){
                var $footer = $(data);
                currentPage.append($footer);
                $footer.toolbar();
            });
        }//if has custom footer
        
        if( currentPage.attr('id') === 'categories')
        {
            var c_url = 'http://devise-expert.co.uk/?json=get_category_index';
            
            $.get('./templates/category-list-item.html',function(data,status){
                var $li = $(data);
                $.get(c_url, function(data,status){
                  $.each( data.categories , function(index, category){
                   if( category.parent == 0 && category.post_count > 0 )
                    {
                        var $li_c = $li.clone();
                        $li_c.find('a').prepend(category.title);
                        $li_c.find('span').html(category.post_count);
                        $('#clist').append($li_c);
                    }
                    
                  }); // for each category in categories 
                   console.log('after foreach');
                   $('#clist').listview('refresh');     
                }); //get categories json
                console.log('refresh');
            }); //get li template
            console.log('after get template');
        }//if current page has id categories
    });//on page create
    
    $('body').on('pageshow',':jqmData(role="page")',function(evt,ui){
        //console.log('Show page:', $(this).attr('id'));
         var currentPage = $(this);
          if( currentPage.attr('id') === 'categories')
          { 
            console.log('page show');  
                
          }
         
    });//on page create
    
});//on document ready

//function foo(){console.log('after get');}
function loadRecentPosts(data){
    $.each( data.posts , function( key, post){
        var $li = $('<li></li>');
        var $a = $('<a href="#post"></a>');
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
        $a.data('post-id', post.id);
        $a.on('vclick', showPost);
        $a.append($img);
        $a.append($h2);
        $a.append($p);
        $li.append($a);
        $('#post-list').append($li);
    });// for each post in posts
        //$('#post-list').listview('refresh');
}// load recent posts 

function showPost(){
    //http://devise-expert.co.uk/?json=get_post&post_id=1177
    var post_id = $(this).data('post-id');
    var url = 'http://devise-expert.co.uk/?json=get_post&post_id=' + post_id;
    $.get(url,function(data,status){
        var post = data.post;
        $('#post :jqmData(role="header")').find('h1').html(post.title);
        $('#post-content').html(post.content);
        console.log('post', post.thumbnail_images['post-thumbnail']);
        if( post.thumbnail_images != undefined &&  
            post.thumbnail_images['post-thumbnail'] != undefined &&
            post.thumbnail_images['post-thumbnail'].url != undefined)
        {
        var src = post.thumbnail_images['post-thumbnail'].url;    
        var img ='<img class="img-responsive" src="'+
                        src+'" alt="'+
                        post.title_plain+'">';
            $('#post-content').prepend(img);
        }
        
        $('#post-content img')
                .addClass('img-responsive')
                .removeAttr('width')
                .removeAttr('height')
                .parent()
                .removeAttr('style');
    });//get the post
}