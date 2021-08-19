import type { NextApiRequest, NextApiResponse } from 'next';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getDB } from '../../modules/database';
import { Image } from '../../types/api/image';
import { ITask } from 'pg-promise';

const AWS_IMAGE_BUCKET_NAME = process.env.AWS_IMAGE_BUCKET_NAME;

// in seconds
const ONE_DAY = 86400

// in seconds
const TWENTY_THREE_HOURS = 82800

const {db} = getDB();
const featuredImagesQuery = "SELECT * from images where is_featured=true;";
const createUpdateImageAddressQuery = (id: number, newAddress: string, addressExpiration: string) => `UPDATE images SET address='${newAddress}', address_expiration='${addressExpiration}' where id = ${id}`

const getDatabaseDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}

const getPresignedUrls = (featuredImages: Image[], res: NextApiResponse<Image[]>) => {
  const client = new S3Client({ region: process.env.AWS_REGION })
  const featuredImagesWithAddresses = Promise.all(featuredImages.map((image) => {
    const currentDate = new Date();
    if (image.address && image.address_expiration) {
      const addressExpiration = new Date(Date.parse(image.address_expiration));

      // Address is not expired
      if (!(currentDate > addressExpiration)) {
        return Promise.resolve(image);
      }
    }

    const command = new GetObjectCommand({ Bucket: AWS_IMAGE_BUCKET_NAME, Key: image.key});
    return getSignedUrl(client, command, { expiresIn: ONE_DAY }).then(
      (presignedUrl) => {
        const addressExpirationDate = new Date(); // current date
        addressExpirationDate.setSeconds(addressExpirationDate.getSeconds() + TWENTY_THREE_HOURS); // 23 hours for buffer
        console.log('date', addressExpirationDate.toString())
        const addressExpirationString = getDatabaseDateString(addressExpirationDate)
        console.log('string', addressExpirationString)
        db.tx(async (t: ITask<{}>) => {
          await t.none(createUpdateImageAddressQuery(image.id, presignedUrl, addressExpirationString))
        }).catch((error: unknown) => {
          console.log(`Failed to update image address with id=${image.id} and address=${presignedUrl}:`, error)
          throw error;
        })

        

        return {
          ...image,
          address: presignedUrl,
          address_expiration: addressExpirationString,
        } as Required<Image>;
      }
    );
  })).then(images => {
    return images;
  }).catch(error => {
    throw error;
  });

  return featuredImagesWithAddresses
}

const queryFeaturedImages = (res: NextApiResponse<Image[] | string>) => {
  return db.any(featuredImagesQuery)
    .then(async (featuredImages: Image[]) => {
      return await getPresignedUrls(featuredImages, res);
    })
    .catch(function(error: unknown) {
      console.log('error', error);
      res.status(500).send('Failed to fetch featured images from database');
  });
}



export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Image[] | string>,
) {
  res.status(200).json(await queryFeaturedImages(res))
}