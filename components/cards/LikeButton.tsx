import React, { useState, useEffect } from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import Like from './LikeModel';

interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialLikeCount }) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Fetch initial like status
    const fetchLikeStatus = async () => {
      try {
        const response = await Like.findOne({ postId, userId: 'yourUserId' });
        if (response) {
          setIsLiked(response.isLiked);
        }
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };
    fetchLikeStatus();
  }, [postId]);

  const handleLikeClick = async () => {
    try {
      const like = await Like.findOne({ postId, userId: 'yourUserId' });
      if (like) {
        // Update existing like
        like.isLiked = !like.isLiked;
        await like.save();
      } else {
        // Create new like
        const newLike = new Like({ postId, userId: 'yourUserId' });
        await newLike.save();
      }

      setLikeCount(likeCount + (isLiked ? -1 : 1));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error handling like click:', error);
    }
  };

  return (
    <button onClick={handleLikeClick}>
      {isLiked ? <FaHeart /> : <FaHeartBroken />}
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;
