const Post=require('../models/post')


// "Get" all posts
const post_index=(req,res)=>{
    Post.find().sort({createdAt:-1})
      .then(json => res.render('posts/index',{posts:json}))
    .catch(err=>console.log(err))
}

// "Get" a single post with ID
const post_details=(req,res)=>{
    const id=req.params.id;
    Post.findById(id)
    .then((post)=>{
        const date = new Date(post.createdAt);
        const formattedDate = date.toISOString().slice(0, 10);
        const formattedTime = date.toTimeString().slice(0, 8);
        res.render('posts/details',{post:post,createdAt:`${formattedDate} ${formattedTime}`})
    })
    .catch((err)=>{
        console.log(err)
    })
    
}

// "Get" a create form
const post_create_get=(req,res)=>{
    res.render('posts/create')
};

// "Post" Created  a post
const post_create_post=(req,res)=>{
    const data = req.body;
    const post=new Post(data)
    post.save()
    .then((ressponse)=>{
        console.log('new data added');
        res.redirect('/posts')
    })
    .catch(err=>console.log(err))
    
}
// "Delete" a single post with ID
const post_delete=(req,res)=>{
    const id=req.params.id
    Post.findByIdAndDelete(id)
    .then((response)=>{
        res.redirect('/posts')
    })
    .catch(err=>console.log(err))

    console.log('deleted')
}

module.exports={
    post_index,
    post_create_get,
    post_create_post,
    post_details,
    post_delete
}