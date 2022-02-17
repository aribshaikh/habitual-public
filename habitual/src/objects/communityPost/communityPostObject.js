class communityPostObj {
    constructor(name, handle, postContent, comments, likedUsers) {
        this.name = name;
        this.handle = handle;
        this.postContent = postContent;
        
        this.comments = comments;
        this.likedUsers = [];
    }
}

export default communityPostObj;