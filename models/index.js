const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

//The relation of User to Post is One-To-Many 
User.hasMany(Post,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User,{
    foreignKey: 'user_id'
});

//The relation of Post to Comment is One-To-Many 
Post.hasMany(Comment,{
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post,{
    foreignKey: 'post_id'
});

//The relation of User to Comment is One-To-Many 
User.hasMany(Comment,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User,{
    foreignKey: 'user_id'
});

module.exports = {User, Post, Comment};
