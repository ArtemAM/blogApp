import { Grid } from '@mui/material';
import Tags from '../component/Tags';
import Post from '../component/Post';
function Home() {
  return (
    <Grid container spacing={2} alignItems="flex-start" sx={{ paddingTop: 4 }}>
      <Grid size={9}></Grid>
      <Grid size={3} sx={{ alignSelf: 'flex-start' }}>
        <Tags tags={['react', 'mui', 'mern']} />
      </Grid>
    </Grid>
  );
}

export default Home;
