import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
} from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import { useSelector } from 'react-redux';
import { tagsSlice } from '../redux/slices/tags.slice';

function Tags() {
  const tags = useSelector(tagsSlice.selectors.selectTags);
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tags:
      </Typography>
      <Divider />
      <List>
        {tags.map((tag) => (
          <ListItemButton key={tag} sx={{ padding: 0 }}>
            <ListItem sx={{ padding: 0 }}>
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              <ListItemText primary={`${tag}`} />
            </ListItem>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Tags;
