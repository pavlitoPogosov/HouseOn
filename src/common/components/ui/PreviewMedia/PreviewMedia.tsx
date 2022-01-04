import React, { useRef, useState, useEffect, useMemo } from 'react';

import { useToggle } from '@proscom/ui-react';
import { PlayerVideo } from 'common/components/ui/PlayerVideo/PlayerVideo';
import { ViewerWrapper } from 'common/components/ui/PreviewMedia/ViewerWrapper';
import ReactPlayer from 'react-player/lazy';
import { EMediaTypes } from 'variables/media';

import s from './PreviewMedia.module.scss';

type TPreviewMedia = {
  author?: string;
  date?: string;
  isPreviewDisabled?: boolean;
  link: string;
  linkThumb?: string;
  mediaType: EMediaTypes;
  title?: string;
};

type TViewerContainer = {
  height: number;
  width: number;
};

const viewerContainerInitial: TViewerContainer = {
  height: 0,
  width: 0
};

export const PreviewMedia: React.FC<TPreviewMedia> = (props) => {
  const { author, date, isPreviewDisabled, link, linkThumb, mediaType, title } = props;

  const [viewerContainer, setViewerContainer] = useState<TViewerContainer>(viewerContainerInitial);

  const viewerContainerRef = useRef<HTMLDivElement | null>(null);

  const imageViewerToggle = useToggle();
  const videoViewerToggle = useToggle();

  const isImage = mediaType === EMediaTypes.IMAGE;
  const isVideo = mediaType === EMediaTypes.VIDEO;

  useEffect(() => {
    const { clientHeight, clientWidth } = viewerContainerRef?.current || {};
    const { height, width } = viewerContainer || {};

    if (clientHeight && clientWidth) {
      if (clientHeight !== height) {
        if (clientWidth !== width) {
          setViewerContainer({
            height: clientHeight,
            width: clientWidth
          });
        } else {
          setViewerContainer({
            ...viewerContainer,
            height: clientHeight
          });
        }
      }
    }
  }, [viewerContainerRef, imageViewerToggle.value, videoViewerToggle.value]);

  const onImageThumbClick = isPreviewDisabled ? undefined : () => imageViewerToggle.set();
  const onImageBackClick = isPreviewDisabled ? undefined : () => imageViewerToggle.unset();

  const onVideoThumbClick = isPreviewDisabled ? undefined : () => videoViewerToggle.set();
  const onVideoBackClick = isPreviewDisabled ? undefined : () => videoViewerToggle.unset();

  const viewContainerStyle = useMemo(
    () => ({
      height: viewerContainer.height,
      maxHeight: viewerContainer.height,
      maxWidth: viewerContainer.width,
      width: viewerContainer.width
    }),
    [viewerContainer]
  );

  return (
    <div className={s.PreviewMedia__container}>
      {isImage && (
        <div
          className={s.image_preview__container}
          onClick={onImageThumbClick}
          style={{ backgroundImage: `url(${linkThumb || link})` }}
        />
      )}

      {imageViewerToggle.value && (
        <ViewerWrapper
          author={author}
          date={date}
          onBack={onImageBackClick}
          onClose={onImageBackClick}
          ref={viewerContainerRef}
          title={title}>
          {!!viewerContainer.height && (
            <img
              alt={title}
              className={s.image_viewer__img}
              src={link}
              style={{ maxHeight: viewerContainer.height * 0.8 }}
            />
          )}
        </ViewerWrapper>
      )}

      {isVideo && (
        <div
          className={s.video_preview__container}
          onClick={isPreviewDisabled ? undefined : () => videoViewerToggle.set()}>
          <ReactPlayer className={s.video_preview__player} controls={false} height={180} url={link} width={320} />
        </div>
      )}

      {videoViewerToggle.value && (
        <ViewerWrapper
          author={author}
          date={date}
          onBack={onVideoBackClick}
          onClose={onVideoBackClick}
          ref={viewerContainerRef}
          title={title}>
          {!!viewerContainer.height && !!viewerContainer.width && (
            <div className={s.video_viewer__player_container} style={viewContainerStyle}>
              <PlayerVideo src={link} />
            </div>
          )}
        </ViewerWrapper>
      )}
    </div>
  );
};
