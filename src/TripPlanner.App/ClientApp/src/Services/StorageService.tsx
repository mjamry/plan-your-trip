import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import imageCompression from 'browser-image-compression';
import { useRecoilValue } from 'recoil';
import { appSettingsState } from '../State/AppState';

interface IStorageService {
  generateUrlToFile(name: string | undefined): string;
  uploadFile(name: string, file: File): Promise<void>;
}

const useStorageService = (): IStorageService => {
  const appSettings = useRecoilValue(appSettingsState);

  const createBlobInContainer = async (
    containerClient: ContainerClient,
    file: File,
    name: string,
  ) => {
    const blobClient = containerClient.getBlockBlobClient(name);
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    return blobClient.uploadData(file, options);
  };

  const generateUrlToFile = (name: string | undefined) => (name ? `${appSettings.storageUrl}/${appSettings.storageContainerName}/${name}` : '');

  const uploadFile = async (fileName: string, file: File) => {
    if (!file) '';

    const blobService = new BlobServiceClient(
      `${appSettings.storageUrl}/${appSettings.storageToken}`,
    );

    const containerClient = blobService.getContainerClient(appSettings.storageContainerName);

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
