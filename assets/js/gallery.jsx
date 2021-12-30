import React from "react";
import ReactDOM from "react-dom";
import ImageGallery from "react-image-gallery";

var images = window.images;

class MyGallery extends React.Component {
  render() {
    return <ImageGallery items={images} />;
  }
}

window.addEventListener("load", () => {
  let imgContainer = document.getElementById("galleryContainer");
  ReactDOM.render(<MyGallery />, imgContainer);
});
