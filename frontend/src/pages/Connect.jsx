import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, Send, Image, X, User, AlertCircle, Shield, Calendar, Share2 } from 'lucide-react';

const Connect = () => {
  const [currentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('currentUser') || '{"name":"Cadet","username":"cadet"}');
    } catch {
      return { name: 'Cadet', username: 'cadet' };
    }
  });

  const [userRole] = useState(() => localStorage.getItem('userRole') || 'cadet');

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('connect_posts');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        author: 'Cadet Amit Kumar',
        role: 'cadet',
        category: 'Camp Photo',
        content: 'Felt proud representing our unit at the Annual Training Camp. The early morning drills and leadership sessions were challenging but truly rewarding! 🇮🇳 #YOUTHIndia #UnityAndDiscipline',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60',
        timestamp: '2 hours ago',
        likes: ['cadet123', 'admin'],
        comments: [
          { id: 1, author: 'Cadet Sneha Reddy', text: 'Amazing photo Amit! Keep making us proud.', timestamp: '1 hour ago' },
          { id: 2, author: 'Lt. Col. Sandeep', text: 'Excellent discipline displayed by the unit.', timestamp: '30 mins ago' }
        ]
      },
      {
        id: 2,
        author: 'Cadet Sneha Reddy',
        role: 'cadet',
        category: 'Social Issue',
        content: 'Initiated a local plastic cleanup drive near Central Park today. Plastic waste is harming our street animals and clogging drains. Let us spread awareness! 🚫🥤',
        image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&auto=format&fit=crop&q=60',
        timestamp: '5 hours ago',
        likes: ['amit_k', 'cadet'],
        comments: [
          { id: 1, author: 'Cadet Rajesh Kumar', text: 'Count me in for the next drive Sneha!', timestamp: '4 hours ago' }
        ]
      },
      {
        id: 3,
        author: 'Lt. Col. Sandeep',
        role: 'admin',
        category: 'Thoughts',
        content: 'Leadership is not about a position or a title. It is about leadership, influence, and impact. In the tri-service YOUTH wings, we build character first.',
        image: null,
        timestamp: '1 day ago',
        likes: ['cadet', 'amit_k', 'sneha_r'],
        comments: []
      }
    ];
  });

  const [newPost, setNewPost] = useState({
    content: '',
    category: 'Thoughts',
    image: null
  });

  const [commentInputs, setCommentInputs] = useState({}); // { [postId]: '' }
  const [activeCommentPost, setActiveCommentPost] = useState(null); // ID of post with open comments

  useEffect(() => {
    localStorage.setItem('connect_posts', JSON.stringify(posts));
  }, [posts]);

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Post
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.content.trim() && !newPost.image) {
      alert('Please enter some text or add an image.');
      return;
    }

    const post = {
      id: posts.length + 1,
      author: currentUser.name || currentUser.username || 'Anonymous',
      role: userRole,
      category: newPost.category,
      content: newPost.content,
      image: newPost.image,
      timestamp: 'Just now',
      likes: [],
      comments: []
    };

    setPosts([post, ...posts]);
    setNewPost({ content: '', category: 'Thoughts', image: null });
  };

  // Handle Likes
  const handleLikeToggle = (postId) => {
    const username = currentUser.username || 'anonymous';
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(username);
        return {
          ...post,
          likes: hasLiked 
            ? post.likes.filter(u => u !== username) 
            : [...post.likes, username]
        };
      }
      return post;
    }));
  };

  // Handle Comments Submit
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const commentText = commentInputs[postId] || '';
    if (!commentText.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: post.comments.length + 1,
              author: currentUser.name || currentUser.username || 'Anonymous',
              text: commentText,
              timestamp: 'Just now'
            }
          ]
        };
      }
      return post;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const getCategoryColor = (category) => {
    if (category === 'Camp Photo') return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border-green-200';
    if (category === 'Social Issue') return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-200';
    return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10 animate-fade-in">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Cadet Connection Hub</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Share camp experiences, report social concerns, and connect with fellow cadets nationwide.</p>
      </div>

      {/* Create Post Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#0B3D91] text-white flex items-center justify-center font-bold text-sm">
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'C'}
          </div>
          <div className="flex-1">
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Share your thoughts, camp experience, or a social issue..."
                rows={3}
                className="w-full text-sm border-0 focus:ring-0 p-0 resize-none dark:bg-gray-800 dark:text-white placeholder-gray-400"
              />
              
              {newPost.image && (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 h-64">
                  <img src={newPost.image} alt="Upload preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setNewPost({ ...newPost, image: null })}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center pt-3 border-t border-gray-100 dark:border-gray-700 gap-3">
                <div className="flex items-center space-x-3">
                  {/* Category Selection */}
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md py-1.5 px-2 text-gray-700 dark:text-gray-300 font-medium focus:outline-none"
                  >
                    <option value="Thoughts">Thought / General</option>
                    <option value="Camp Photo">Camp Photo</option>
                    <option value="Social Issue">Social Issue</option>
                  </select>

                  {/* Photo upload button */}
                  <label className="flex items-center space-x-1.5 text-xs text-[#0B3D91] dark:text-blue-400 hover:text-blue-800 cursor-pointer font-semibold py-1.5 px-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <Image size={16} />
                    <span>Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-[#556B2F] hover:bg-[#435525] text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Send size={12} />
                  <span>Post Hub</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map(post => {
          const isLiked = post.likes.includes(currentUser.username || 'anonymous');
          const isCommentsOpen = activeCommentPost === post.id;

          return (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
              
              {/* Post Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-[#0B3D91] dark:text-blue-400">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-sm text-gray-800 dark:text-white">{post.author}</span>
                      {post.role === 'admin' && (
                        <span className="bg-blue-100 text-[#0B3D91] dark:bg-blue-950 dark:text-blue-300 text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                          <Shield size={10} /> Officer
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500 block mt-0.5">{post.timestamp}</span>
                  </div>
                </div>
                
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
              </div>

              {/* Post Content */}
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Post Image */}
              {post.image && (
                <div className="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 max-h-96">
                  <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Interactions */}
              <div className="flex items-center space-x-6 pt-3 border-t border-gray-50 dark:border-gray-700 text-xs font-semibold text-gray-500">
                <button
                  onClick={() => handleLikeToggle(post.id)}
                  className={`flex items-center space-x-1.5 transition-colors focus:outline-none ${
                    isLiked ? 'text-red-500' : 'hover:text-red-500'
                  }`}
                >
                  <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                  <span>{post.likes.length} Likes</span>
                </button>

                <button
                  onClick={() => setActiveCommentPost(isCommentsOpen ? null : post.id)}
                  className="flex items-center space-x-1.5 hover:text-[#0B3D91] dark:hover:text-blue-400 transition-colors focus:outline-none"
                >
                  <MessageSquare size={16} />
                  <span>{post.comments.length} Comments</span>
                </button>
              </div>

              {/* Comments Section (collapsible) */}
              {isCommentsOpen && (
                <div className="space-y-4 pt-4 border-t border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20 -mx-5 -mb-5 p-5 rounded-b-xl">
                  {/* Comments list */}
                  <div className="space-y-3">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="flex items-start space-x-2.5">
                        <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-[10px] text-gray-700 dark:text-gray-300 mt-0.5">
                          {comment.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg py-2 px-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-xs text-gray-800 dark:text-white">{comment.author}</span>
                            <span className="text-[9px] text-gray-400">{comment.timestamp}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                    {post.comments.length === 0 && (
                      <p className="text-xs text-gray-400 italic text-center py-2">No comments yet. Be the first to comment!</p>
                    )}
                  </div>

                  {/* Add Comment */}
                  <form
                    onSubmit={(e) => handleCommentSubmit(e, post.id)}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      className="flex-1 text-xs border border-gray-200 dark:border-gray-700 rounded-md py-2 px-3 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#0B3D91]"
                    />
                    <button
                      type="submit"
                      className="bg-[#0B3D91] hover:bg-[#092e6e] text-white p-2 rounded-md transition-colors"
                    >
                      <Send size={12} />
                    </button>
                  </form>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connect;
