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
    root: {
      "& a": {
        color: '#1890ff'
      },
    },
    page: {
      padding: '50px 80px',
      width: '80%',
      margin: '0 auto',
    },
    homePageTitle: {
      textAlign: 'center',
      marginBottom: '6px',
      fontWeight: 600,
      fontSize: '38px',
      lineHeight: 1.23
    },
    serverDescription: {
      fontSize: '22px',
      color: 'rgba(0, 0, 0, 0.65)'
    }
  })
);

function HomePageBody(): React.ReactElement {
  const classes = useStyles();
  const {data: featuredImages, isLoading: isLoadingFeaturedImages} = useFeaturedImages();
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
  things and have a fantastic time together. The server is owned by [Panda_Brah](/about_us) and accompanied by [faeppuccino](/about_us) as a second admin.\
  Alongside them we have a great team of mods who help make sure everything runs smoothly for everyone.\
  \n\n\
  Be sure to checkout our [gallery](/gallery) and [world map](/map) to get a good feel for the server. Should you\
  decide that Digital Terrain is a right fit for you can [apply](/apply) to play on the server and be a part\
  of our community!"

  return (
    <div className={`${classes.page} ${classes.root}`}>
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

