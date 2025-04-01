import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Skeleton,
  Box,
  Typography,
} from '@mui/material';

function PostSkeleton() {
  return (
    <Card
      sx={{
        maxWidth: '100%',
        position: 'relative',
        '&:hover .post-actions': { opacity: 1 },
      }}
    >
      <CardMedia height={250}>
        <Skeleton variant="rectangular" height={250} />
      </CardMedia>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={<Skeleton variant="text" width="20%" />}
        subheader={<Skeleton variant="text" width="40%" />}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Skeleton variant="text" width="50%" />
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {[...Array(3)].map((tag, index) => (
            <Skeleton key={index} width={40} height={30} />
          ))}
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: 'flex', gap: 0.5, marginTop: 1 }}
        >
          <Skeleton variant="text" width="5%" />
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostSkeleton;
