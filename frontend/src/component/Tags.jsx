import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';

function Tags({ tags }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tags:
      </Typography>
      <Divider />
      <List>
        {tags.map((tag) => (
          <ListItem key={tag} sx={{ paddingLeft: 0 }}>
            <ListItemIcon>
              <TagIcon />
            </ListItemIcon>
            <ListItemText primary={`${tag}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Tags;
