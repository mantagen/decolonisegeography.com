import React from "react";
import EmbedHtml from "./embed-iframe";

interface GoogleDriveVideoProps {
  id: string;
}
const GoogleDriveVideo: React.FC<GoogleDriveVideoProps> = props => {
  const { id } = props;

  return (
    <EmbedHtml
      src={`https://drive.google.com/file/d/${id}/preview`}
    ></EmbedHtml>
  );
};

export default GoogleDriveVideo;
