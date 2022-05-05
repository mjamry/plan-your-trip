import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import imageCompression from 'browser-image-compression';

interface IStorageService {
  generateUrlToFile(name: string | undefined): string;
  uploadFile(name: string, file: File): Promise<void>;
}

const sasToken = 'sv=2020-08-04&ss=b&srt=sco&sp=rwdlacx&se=2022-05-02T19:55:36Z&st=2022-04-25T11:55:36Z&spr=https&sig=dH4pKT0nYeJRcyfSB2YHpcuqKxymwreX3mc7NmG%2FGXw%3D';
const storageAccountName = 'planyourtripstorage';
const containerName = 'images';

const useStorageService = (): IStorageService => {
  const createBlobInContainer = async (
    containerClient: ContainerClient,
    file: File,
    name: string,
  ) => {
    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadData(file, options);
  };

  const generateUrlToFile = (name: string | undefined) => (name ? `https://${storageAccountName}.blob.core.windows.net/${containerName}/${name}` : '');

  const uploadFile = async (fileName: string, file: File) => {
    if (!file) '';

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`,
    );

    // get Container - full public read access
    const containerClient: ContainerClient = blobService.getContainerClient(containerName);

    // image compression
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 512,
      useWebWorker: false,
    };
    const compressedFile = await imageCompression(file, options);

    await createBlobInContainer(containerClient, compressedFile, fileName);
  };

  return {
    generateUrlToFile,
    uploadFile,
  };
};

export default useStorageService;
