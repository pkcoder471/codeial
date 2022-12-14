{
    let createPost= function(){
        let newPostform= $('#new-post-form');
        newPostform.submit(function(e){
            e.preventdefault();
            $.ajax({
                type: 'post',
                url:'/post/create',
                data: newPostform.serialize(),
                success:function(data){
                    let newPost= newPostdom(data.data.post);
                    $('#posts-l ist-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));
                },error:function(err){
                    console.log(error.responseText);
                }
            })
        })


        
    }

    let newPostdom= function(post){
        return $(`<li id="post-${post.id} %> ">
        
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id} ">X</a>
        </small>
    <p>
        ${post.content} 
    <br>
        <small>${ post.user.name }</small> 
    </p>
    </li>
    <div class="post-comments">
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="Type here to add commnet..." required>
                <input type="hidden" name="post" value=" ${post._id}">
                <input type="submit" value="Add Comment">
            </form> 
        
        <div class="post-comments-list">
            <ul id="post-comments-${ post._id }">
                
            </ul>
    
    
        </div>
    </div>`)
    }

    let deletePost = function(deletelink){
        $(deletelink).click(function(e){
            e.preventdefault();

            $.ajax({
                type: 'get',
                url: $(deletelink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove(); 
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();
}