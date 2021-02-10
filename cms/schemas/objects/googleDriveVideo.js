import React from "react";
import googleDriveLogo from "../../images/google-drive-logo-96x96.png";

const Preview = ({ value }) => {
  const { id } = value;
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://drive.google.com/file/d/${id}/preview" width="100%" height="auto"></iframe>`,
      }}
    />
  );
};

export default {
  name: "googleDriveVideo",
  type: "object",
  title: "Google Drive Video",
  icon: () => (
    <img
      src={googleDriveLogo}
      alt="Google Drive Logo"
      style={{ maxWidth: "16px", maxHeight: "16px" }}
    />
  ),
  fields: [
    {
      name: "id",
      type: "string",
      title: "Google Drive file ID",
    },
  ],
  preview: {
    select: {
      id: "id",
    },
    component: Preview,
  },
};
