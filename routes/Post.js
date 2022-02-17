const router = require("express").Router();
let Post = require("../models/PostModel");

router.route("/").get(async (req, res) => {
  await Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post(async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    username: req.body.username,
    postContent: req.body.postContent,
    category: req.body.category,
    private: req.body.private
  });

  await newPost
    .save()
    .then(() => res.json("Post added!"))
    .catch((err) => res.status(400).json("Error:" + err));
  console.log("This the body im receiving" + req.body.postContent);
});

router.route("/comment/:id").post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      console.log(req.body.comments);
      post.comments.push(req.body.comments);
      post
        .save()
        .then(() => res.json("Post updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/like/:id").post((req, res) => {
//   const id = req.params.id;
//   const user = req.body.usersLiked

//   if (!ObjectID.isValid(id)) {
// 		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
// 		return;  // so that we don't run the rest of the handler.
// 	}

//   try {
//     const post = await Post.findById(id)
//     if (!post) {
// 			res.status(404).send();
//     } else {
//       const likedUsers = await post.find(user)
//       if (!likedUsers) {
//         post.usersLiked.push(likedUsers);

//         const result = await post.save()
//         if (!result) {
//           res.status(404).send();
//         }

//       } else {
//         post.likedUsers.remove(likedUsers)
//         const result = await post.save()
//         if (!result) {
//           res.status(404).send();
//         }
//       }
//     }

//   } catch (error){
//     log(error)
// 		res.status(500).send('Internal Server Error')  // server error
//   }
// })

router.route("/like/:id").post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      // check if the user has liked the post
      if (post.usersLiked.some((user) => user.username == req.body.username)) {
        // if we're here it means the user has liked the post so we just filer the user object from the userLiked list
        // and update usersLiked
        let tempLiked = post.usersLiked;
        tempLiked = tempLiked.filter(
          (user) => user.username != req.body.username
        );
        post.usersLiked = tempLiked;
      } else {
        // if we're here, it means the user hasn't liked the post, so just add his object to the userLiked list
        post.usersLiked.push({ username: req.body.username });
      }
      post
        .save()
        .then(() => res.json("Like updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/like/:id").delete(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).send();
  } else {
    // ERROR HERE WITH DELETING THE USER FROM LIKED LIST
    //const user = await post.usersLiked.find( {username: req.body.username} )
    //const update = await post.usersLiked.findByIdAndDelete(user._id)
    const update = ""; // for sake of running
    if (!update) {
      res.status(404).send();
    } else {
      //post.save()
      //post.usersLiked.save()
      res.send({ update });
    }
  }
  // Post.findById(req.params.id)
  //   .then((post) => {
  //     console.log(post)
  //     post.usersLiked.remove( {username: req.body.usersLiked.username } ).then(() => res.json("Like deleted!"))
  //     post
  //       .save()
  //       .then(() => res.json("Like deleted!"))
  //       .catch((err) => res.status(400).json("Error: " + err));
  //   })
  //   .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete(async (req, res) => {
  console.log(req.body.id);
  console.log(req.id);
  const student = await Post.findByIdAndRemove(req.body.id);
  if (!student) {
    res.status(404).send();
  } else {
    res.send(student);
  }
});
module.exports = router;
