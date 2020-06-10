import React, { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'umi';
import media from '@/assets/media/1.mp4';
import image from '@/assets/media/1.jpeg';
import { loadVideo, loadImage } from '@/utils';

interface HomeProps {

}

const Home: FC<HomeProps> = () => {
  const dispatch = useDispatch();
  const video = useRef<HTMLVideoElement>();
  const canvas = useRef<HTMLCanvasElement>(null);

  const mount = (file: HTMLVideoElement | HTMLImageElement) => {
    if(canvas.current) {
      const context = canvas.current.getContext('2d');
      if (context) {
        context.drawImage(file, 0, 0, 700, 1200, 0, 0, 600,900);
      }
    }
  };

  const loop = () => {
    if (video.current) {
      mount(video.current);
      if (!video.current.paused) {
        requestAnimationFrame(loop);
      }
    }
  };

  const handleClick = () => {
    video.current?.play();
    loop();
  };

  useEffect(() => {
    dispatch({
      type: 'global/query'
    });
    loadImage(image).then(file => {
      mount(file);
    });
    loadVideo(media).then(file => {
      video.current = file;
    });
  }, []);

  return (
    <div>
      <canvas
        width={600}
        height={900}
        ref={canvas}
        onClick={handleClick}
      />
    </div>
  );
};

export default Home;
