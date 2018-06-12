import React from 'react';
import DefaultPhoto from 'atoms/Photos/DefaultPhoto';
import ProfilePhoto from 'atoms/Photos/ProfilePhoto';
import { Flex } from 'grid-styled';
import Label from 'atoms/Label';

interface Props {
  imageUrl?: string;
}

const PhotoUpload: React.SFC<Props> = ({ imageUrl }) => (
  <Flex alignItems="center">
    {imageUrl ? <ProfilePhoto imageUrl={imageUrl} /> : <DefaultPhoto />}
    <a href="#">
      {/* TODO: Add photo Upload */}
      <Label>Upload Photo</Label>
    </a>
  </Flex>
);

export default PhotoUpload;
