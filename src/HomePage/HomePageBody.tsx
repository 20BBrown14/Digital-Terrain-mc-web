import { createStyles, makeStyles, Typography, CardMedia, Paper } from '@material-ui/core';
import Carousel from 'nuka-carousel';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'
import useFeaturedImages from '../hooks/useFeaturedImages';
import { Image as ImageType } from '../../types/api/image';

const defaultCaurselControlsConfig = {
  pagingDotsStyle : {
    fill: 'white',
  },
  nextButtonText: '►',
  prevButtonText: '◄',
}

const useStyles = makeStyles(() => 
  createStyles({
    page: {
      padding: '50px 80px',
    },
    homePageTitle: {
      textAlign: 'center',
    },
    serverDescription: {
      fontSize: '22px',
    },
  })
);

function HomePageBody(): React.ReactElement {
  const classes = useStyles();
  const {data: featuredImages, isLoading: isLoadingFeaturedImages} = useFeaturedImages();
  console.log('featuredImages', featuredImages);
  const carouselItems = featuredImages?.map((image: Required<ImageType>) => {
    return (
      <div style={{display: 'block', margin: '0 auto'}}>
        <img
          src={image.address}
          key={image.key}
          width="100%"
          height="auto"
        />
      </div>
      
    )
  });

  // TODO: Story this in db
  const homePageTitle = 'Welcome to Digital Terrain'

  // TODO: Store this markdown in DB
  const homePageText = "\
  Digital Terrain is an SMP server inspired by Hermitcraft. The server is based on a great community, trust, and of course fun.\
  We aspire to have a playerbase of all play styles that work together in harmony to build\
  things and have a fantastic time together. The server is owned by [Panda_Brah](/about_us) and [faeppuccino](/about_us).\
  Alongside them we have a great team of mods who help make sure everything runs smoothly for everyone.\
  \n\n\
  Be sure to checkout our [gallery](/gallery) and [world map](/map) to get a good feel for the server. Should you\
  decide that Digital Terrain is a right fit for you can [apply](/apply) to play on the server and be a part\
  of our community!"

  return (
    <div className={classes.page}>
      <Typography variant="h1" className={classes.homePageTitle}>
        {homePageTitle}
      </Typography>
      <ReactMarkdown remarkPlugins={[gfm]} children={homePageText} className={classes.serverDescription} />
      <Carousel
        heightMode="current"
        autoplay={true}
        wrapAround={true}
        defaultControlsConfig={defaultCaurselControlsConfig}
        style={{zIndex: -1}}
      >
        {carouselItems || []}
      </Carousel>
    </div>
  )
}

export default HomePageBody;

