import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Skeleton,
  Box,
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
      <CardMedia>
        <Skeleton variant="rectangular" height={250} />
      </CardMedia>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={<Skeleton variant="text" width="20%" />}
        subheader={<Skeleton variant="text" width="40%" />}
      />
      <CardContent>
        <Skeleton variant="text" width="50%" />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Skeleton variant="rounded" width={60} height={20} />
          <Skeleton variant="rounded" width={60} height={20} />
          <Skeleton variant="rounded" width={60} height={20} />
        </Box>
        <Skeleton
          variant="rounded"
          width={10}
          height={10}
          sx={{ marginTop: 3 }}
        />
      </CardContent>
    </Card>
  );
}

export default PostSkeleton;
