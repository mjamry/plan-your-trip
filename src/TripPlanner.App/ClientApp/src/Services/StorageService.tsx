import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import imageCompression from 'browser-image-compression';

interface IStorageService {
  generateUrlToFile(name: string | undefined): string;
  uploadFile(name: string, file: File): Promise<void>;
}

const sasToken = '?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupx&se=2022-06-05T22:01:41Z&st=2022-05-05T14:01:41Z&spr=https,http&sig=yASHNy1wldVvvB2HoDTzmZ0Mt1VdVvi4xFAe4EFDdXY%3D';
const storageAccountName = 'planyourtripstorage';
const containerName = 'images';

const useStorageService = (): IStorageService => {
  const createBlobInContainer = async (
    containerClient: ContainerClient,
    file: File,
    name: string,
  ) => {
    const blobClient = containerClient.getBlockBlobClient(name);
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    return blobClient.uploadData(file, options);
  };

  const generateUrlToFile = (name: string | undefined) => (name ? `https://${storageAccountName}.blob.core.windows.net/${containerName}/${name}` : '');

  const uploadFile = async (fileName: string, file: File) => {
    if (!file) '';

    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/${sasToken}`,
    );

    const containerClient: ContainerClient = blobService.getContainerClient(containerName);

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
