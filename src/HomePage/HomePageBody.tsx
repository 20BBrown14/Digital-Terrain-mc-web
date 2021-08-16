import { createStyles, makeStyles, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'

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
  decide that Digital Terrain is a right fit for you can [apply](/apply) to lpay on the server and be a part\
  of our community!"

  return (
    <div className={classes.page}>
      <Typography variant="h1" className={classes.homePageTitle}>
        {homePageTitle}
      </Typography>
      <ReactMarkdown remarkPlugins={[gfm]} children={homePageText} className={classes.serverDescription} />
    </div>
  )
}

export default HomePageBody;