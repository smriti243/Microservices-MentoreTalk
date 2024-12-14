const Feed = require('../models/Feed');

module.exports = (io) => {
  return {
    createPost: async (req, res) => {
      try {
        const { content } = req.body;
        const userId = req.user.id;

        if (!content) {
          return res.status(400).json({ message: 'Content is required' });
        }

        let imageUrl = null;
        if (req.file) {
          imageUrl = `/uploads/feed-images/${req.file.filename}`;
        }

        const post = new Feed({
          author: userId,
          content,
          image: imageUrl
        });

        const savedPost = await post.save();
        const populatedPost = await Feed.findById(savedPost._id).populate('author', 'username role');

        console.log('Emitting newPost event:', populatedPost);
        io.emit('newPost', populatedPost);

        res.status(201).json(savedPost);
      } catch (error) {
        console.error('Error in createPost:', error);
        res.status(500).json({ message: 'Error creating post', error: error.message });
      }
    },

    getPosts: async (req, res) => {
      try {
        const posts = await Feed.find()
          .sort({ createdAt: -1 })
          .populate('author', 'username role')
          .exec();

        res.json(posts);
      } catch (error) {
        console.error('Error in getPosts:', error);
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
      }
    }
  };
};