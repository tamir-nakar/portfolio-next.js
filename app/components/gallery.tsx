import React, { useState } from "react";
import Grid from "@mui/material/Grid"; // Importing Grid from MUI
import Dialog from "@mui/material/Dialog"; // Importing Dialog from MUI
import IconButton from "@mui/material/IconButton"; // Importing IconButton from MUI
import CloseIcon from "@mui/icons-material/Close"; // Importing CloseIcon from MUI icons
import YouTubeIcon from "@mui/icons-material/YouTube";

export interface MediaDescriptor {
  description?: string;
  src: string;
  type: Type;
}

type Type = "video" | "image";
interface GalleryProps {
  images: MediaDescriptor[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<MediaDescriptor | null>(
    null
  );

  const handleClickOpen = (image: MediaDescriptor) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Grid container spacing={1}>
        {images.slice(0, 5).map((image, index) => {
          let gridProps;
          switch (images.length) {
            case 1:
              gridProps = { xs: 12, sm: 12, md: 12 };
              break;
            case 2:
              gridProps = { xs: 12, sm: 6, md: 6 };
              break;
            default:
              gridProps =
                index === 0
                  ? { xs: 12, sm: 12, md: 12 }
                  : { xs: 6, sm: 6, md: 12 / (images.length - 1) };
              break;
          }
          return (
            <Grid item {...gridProps} key={index}>

              {image.type === "video" ? (
                <React.Fragment>
                <iframe
                width="100%"
                height="315"
                src={image.src}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
                {/* <YouTubeIcon
                  sx={{
                    position: "relative",
                    top: -60,
                    right: -5,
                    fontSize: 30,
                    color: "#ff8080",
                  }}
                /> */}
                </React.Fragment>
              ) : (
                <img
                  src={image.src}
                  alt={`Image ${image.description || `image: ${index + 1}`}`}
                  style={{ width: "100%", height: "auto", cursor: "pointer" }}
                  onClick={() => handleClickOpen(image)}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="image-dialog-title"
        aria-describedby="image-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {selectedImage && (
          <img
            src={selectedImage.src}
            alt="Enlarged"
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Gallery;
