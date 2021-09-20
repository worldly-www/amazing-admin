export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.addEventListener(
      'load',
      () => {
        resolve(image);
      },
      false,
    );
    image.addEventListener(
      'error',
      e => {
        reject(e);
      },
      false,
    );
  });
}

export function loadVideo(src: string) {
  return new Promise<HTMLVideoElement>((resolve, reject) => {
    const video = document.createElement('video');
    video.src = src;
    if (video) {
      resolve(video);
    } else {
      reject();
    }
  });
}

export { default as findRoute } from './findRoute';
export { default as objectToArray } from './objectToArray';
