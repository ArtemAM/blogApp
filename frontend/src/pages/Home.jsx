import { Grid, Box, ButtonGroup, Button, Typography } from '@mui/material';
import Tags from '../component/Tags';
import Post from '../component/Post';
import PostSkeleton from '../component/PostSkeleton';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postsSlice } from '../redux/slices/posts.slice';
import { tagsSlice } from '../redux/slices/tags.slice';

function Home() {
  const [sortType, setSortType] = useState('new');
  const [selectedTag, setSelectedTag] = useState(null);
  const filteredAndSortedPosts = useSelector((state) =>
    postsSlice.selectors.selectFilteredAndSortedPosts(
      state,
      sortType,
      selectedTag,
    ),
  );
  const isLoadingPosts = useSelector(
    postsSlice.selectors.selectIsFetchPostsPending,
  );
  const isLoadingTags = useSelector(
    tagsSlice.selectors.selectIsFetchTagsPending,
  );
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };
  return (
    <Grid container spacing={2} alignItems="flex-start" sx={{ paddingTop: 4 }}>
      <Grid size={9}>
        {selectedTag && (
          <ActiveTagDisplay
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        )}
        <SortButtonGroup setSortType={setSortType} sortType={sortType} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <PostList posts={filteredAndSortedPosts} isLoading={isLoadingPosts} />
        </Box>
      </Grid>
      <Grid size={3} sx={{ alignSelf: 'flex-start' }}>
        <Tags onTagClick={handleTagClick} isLoading={isLoadingTags} />
      </Grid>
    </Grid>
  );
}

function PostList({ posts, isLoading }) {
  if (isLoading) {
    return [...Array(5)].map((_, index) => <PostSkeleton key={index} />);
  }
  return posts.map((post) => (
    <Post
      key={post.id}
      id={post.id}
      image={post.imageUrl}
      title={post.title}
      text={post.text}
      author={post.author}
      date={post.createdAt}
      tags={post.tags}
      views={post.viewsCount}
      avatar={post.avatar}
      authorId={post.authorId}
    />
  ));
}

function ActiveTagDisplay({ selectedTag, setSelectedTag }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">
        #{selectedTag}
        <Button
          onClick={() => setSelectedTag(null)}
          size="small"
          sx={{ ml: 2 }}
        >
          Reset
        </Button>
      </Typography>
    </Box>
  );
}

function SortButtonGroup({ setSortType, sortType }) {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <ButtonGroup aria-label="sort buttons">
        <Button
          onClick={() => setSortType('new')}
          variant={sortType === 'new' ? 'contained' : 'text'}
        >
          Newest
        </Button>
        <Button
          onClick={() => setSortType('popular')}
          variant={sortType === 'popular' ? 'contained' : 'text'}
        >
          Popular
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default Home;
