import React from 'react';
import Grid from '@mui/material/Grid';

// Step 1: Define an interface for the props
interface MyComponentProps {
  images: string[]; // Specifies that `images` is an array of strings
}

// Step 2: Use the interface to type the component's props
const MyComponent: React.FC<MyComponentProps> = ({ images }) => {
  return (
    <Grid container spacing={2}>
      {images.map((url, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <img src={url} alt={`Image ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
        </Grid>
      ))}
    </Grid>
  );
}; 

export default MyComponent;
