import React from 'react';

interface Props {
  imageUrl: string;
}

const ProfilePhoto: React.SFC<Props> = ({ imageUrl }) => (
  <img src={imageUrl} alt="My image" />
);

export default ProfilePhoto;
