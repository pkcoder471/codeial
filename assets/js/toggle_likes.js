class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data){
                let LikesCount = parseInt($(self).attr('data-Likes'));
                console.log(LikesCount);
                if(data.data.deleted == true){
                    LikesCount-=1;
                }else{
                    LikesCount+=1;
                }

                $(self).attr('data-likes',LikesCount);
                $(self).html(`${LikesCount} Likes`)
            })
            .fail(function(errData){
                console.log('error in completing the request');
            })
        })
    }
}