import React, { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'react-toastify';
import commentService from '~/services/commentService';

const Comment = ({
  reviews,
  currentUser,
  productDetail,
  isShowWriteComment,
  handleGetProductByName,
  handleGetCommentByProductId,
}) => {
  const [editingReviewId, setEditingReviewId] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);

  // UseCallback for stable function references
  const handleEditClick = useCallback((review) => {
    setEditingReviewId(review?._id);
    setRating(review?.star);
    setComment(review?.content);
  }, []);

  const handleUpdateReview = useCallback(async () => {
    try {
      const res = await commentService.updateComment(currentUser?._id, productDetail?._id, rating, comment);
      handleGetProductByName();
      handleGetCommentByProductId(productDetail?._id);
      toast.success(res.message);
    } catch (error) {
      console.error('Failed to update comment', error);
    }
    setEditingReviewId(null);
  }, [currentUser, productDetail, rating, comment, handleGetProductByName, handleGetCommentByProductId]);

  const handleDeleteReview = useCallback(async () => {
    try {
      const res = await commentService.deleteComment(currentUser?._id, productDetail?._id);
      setRating(0);
      setComment('');
      handleGetProductByName();
      handleGetCommentByProductId(productDetail?._id);
      handleClose();
      toast.success(res.message);
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, productDetail, handleGetProductByName, handleGetCommentByProductId]);

  const handleSubmitReview = useCallback(async () => {
    try {
      const res = await commentService.createComment(currentUser?._id, productDetail?._id, rating, comment);
      handleGetProductByName();
      handleGetCommentByProductId(productDetail?._id);
      toast.success(res.message);
    } catch (error) {
      console.error('Failed to submit comment', error);
    }
  }, [currentUser, productDetail, rating, comment, handleGetProductByName, handleGetCommentByProductId]);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const renderedComments = useMemo(
    () =>
      reviews?.map((review, index) => (
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
                <IconButton sx={{ color: 'red' }} size="small" onClick={handleClickOpen}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            {formatDistanceToNow(new Date(review.comment_date), { addSuffix: true, locale: vi })}
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
        </Paper>
      )),
    [reviews, currentUser, handleEditClick, handleClickOpen, editingReviewId, rating, comment, handleUpdateReview],
  );

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '20px', mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, margin: '0 16px 0 0' }}>
          ĐÁNH GIÁ CỦA KHÁCH HÀNG
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '-2px' }}>
          <Rating value={parseFloat(productDetail?.average_star)} readOnly precision={0.5} />
          <Typography sx={{ mr: 1, fontWeight: '700', color: '#f7bf09' }}>{productDetail?.average_star}</Typography>
          <Typography variant="body1" className="rating-count">
            {productDetail?.comment_count} Đánh giá
          </Typography>
        </Box>
      </Box>
      <Box sx={{ pb: 2 }}>{renderedComments}</Box>
      {!reviews?.some((item) => item.user_id._id === currentUser?._id) && isShowWriteComment && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Viết Đánh giá
          </Typography>
          <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} />
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
            placeholder="Viết đánh giá của bạn tại đây..."
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            sx={{ mt: 2, color: '#fff', float: 'right' }}
            onClick={handleSubmitReview}
            disabled={rating === 0 || comment?.trim() === ''}
          >
            Lưu đánh giá
          </Button>
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Xóa đánh giá?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa đánh giá này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'black', borderColor: '#ccc' }} variant="outlined" onClick={handleClose}>
            Hủy
          </Button>
          <Button sx={{ color: '#fff', background: 'red' }} variant="contained" onClick={handleDeleteReview}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Comment;
