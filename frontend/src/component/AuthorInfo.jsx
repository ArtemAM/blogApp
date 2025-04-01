import { CardHeader, Avatar } from '@mui/material';
import React from 'react';

function AuthorInfo({ avatar, author, date }) {
  return (
    <CardHeader
      avatar={<Avatar src={avatar} alt={author} />}
      title={author}
      subheader={date}
      sx={{ paddingBottom: 0 }}
    />
  );
}

export default AuthorInfo;
