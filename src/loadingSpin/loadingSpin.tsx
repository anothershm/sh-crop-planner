import React from 'react';
import LoadingSpin from "react-loading-spin";


const Loading = () => (
  <div className="loadingSpinner">
    <LoadingSpin
      animationDirection="alternate"
      primaryColor="yellow"
      secondaryColor="#333"
      numberOfRotationsInAnimation={2} />
  </div>
);

export default Loading;

