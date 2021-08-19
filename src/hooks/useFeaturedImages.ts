import { useQuery } from 'react-query';
import { Image } from '../../types/api/image';
import { fetchWrapper } from '../utils/fetchWrapper';

const FEATURED_IMAGES_URL = '/api/featured_images'

const useFeaturedImages = () => {
  return useQuery(
    'featuredImages',
    (): Promise<Required<Image>[]> => fetchWrapper({
      url: FEATURED_IMAGES_URL,
    })
  )
}

export default useFeaturedImages;