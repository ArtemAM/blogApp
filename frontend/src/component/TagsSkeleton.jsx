import React from 'react';
import {
  Skeleton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from '@mui/material';

function TagsSkeleton() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        <Skeleton variant="text" width="20%" />
      </Typography>
      <Divider />
      <List>
        {[...Array(5)].map((_, index) => (
          <ListItem key={index} sx={{ padding: 0 }}>
            <ListItemIcon>
              <Skeleton variant="circular" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary={<Skeleton variant="text" width="40%" />} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TagsSkeleton;
