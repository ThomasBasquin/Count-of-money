import React from 'react';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}


const HomePage = () => {
  return (
    <div>
      <h1>Page d'accueil</h1>
        <p>boiuboiubobibbiobpoiobbo</p>
    </div>
  );
};

export default HomePage;
