interface ICameraProvider {
  canUseCamera: boolean;
  getCameraStream: () => Promise<MediaStream>;
}

const useCameraProvider = (): ICameraProvider => {
  const getCameraStream = async () => navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  return {
    canUseCamera: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    getCameraStream,
  };
};

export default useCameraProvider;
