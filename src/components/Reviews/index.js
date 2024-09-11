// src/components/Reviews.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import commentService from '~/services/commentService';

function Reviews({ reviews, productId, currentUser, handleGetProductByName }) {
  const [editingReviewId, setEditingReviewId] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState('');

  const handleEditClick = (review) => {
    setEditingReviewId(review?._id);
    setRating(review?.star);
    setComment(review?.content);
  };

  const handleUpdateReview = async () => {
    try {
      const res = await commentService.updateComment(currentUser?._id, productId, rating, comment);
      handleGetProductByName();
      toast.success(res.message);
    } catch (error) {
      console.error('Failed to update comment', error);
    }
    setEditingReviewId(null);
  };

  const handleDeleteReview = async () => {
    try {
      const res = await commentService.deleteComment(currentUser?._id, productId);
      handleGetProductByName();
      toast.success(res.message);
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
    setOpen(false);
  };

  const handleClickOpen = (reviewId) => {
    setDeleteReviewId(reviewId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ pb: 2 }}>
      {reviews?.map((review, index) => (
        <Paper key={index} sx={{ p: 2, mb: 3, boxShadow: 1 }} className="comment-user">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                <strong>{review?.user_id?.username}</strong>
              </Typography>
              <Rating value={review?.star} readOnly size="small" />
            </Box>
            {review?.user_id?._id === currentUser?._id && (
              <Box>
                <IconButton size="small" sx={{ color: '#303f9f' }} onClick={() => handleEditClick(review)}>
                  <EditIcon />
                </IconButton>
                <IconButton sx={{ color: 'red' }} size="small" onClick={() => handleClickOpen(review._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            {review?.comment_date}
          </Typography>
          <Typography variant="body1">{review?.content}</Typography>
          {editingReviewId === review?._id && (
            <Box sx={{ mt: 2 }}>
              <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} />
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="outlined"
                sx={{ mt: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button sx={{ color: '#fff' }} variant="contained" onClick={handleUpdateReview}>
                  Lưu
                </Button>
              </Box>
            </Box>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Xóa đánh giá</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có chắc chắn muốn xóa đánh giá này không?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button onClick={handleDeleteReview}>Xóa</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      ))}
    </Box>
  );
}

export default Reviews;
