import React from 'react';
//import Header from '../components/Header'
import WelcomeText from '../components/Home/HomeText';
import ImageSlider from '../components/Home/ImageSlider';
import ShopNow from '../components/Home/ShopNow';
import BestSales from '../components/Home/BestSales';
//import FullWidthTabs from '../components/Shop/ShopHead';
//import Shop from './Shop';


function HomePage() {

  const images = [
    'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQYALwFaLdWRO4aMfsfPYdnr2vD73VuUr0y1tTiFjYENDXf7XBEIqdYbX1TUPcNy44sYx1wMRrgSM6nBZM4QSU',
    'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRvC27D9KlxeEham1w-Wpd_pu3hd4A-OywxRbdnx9JFLpcTD7dfL0bD_WI6Ro8QkzrPLkBMzA9osrMpi4JSP5Y',
    'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSVby3wf1HYF5NReffKSwxLbZRENM0zRUaM97yz5OYBiJGgFHsq0aVo_iE7di8yzBEW4Z3eEjcR5avNEeF7xv4',
  ];

  return (
    <div>
        
        <ImageSlider images={images} />
        <WelcomeText/>
        <ShopNow/>
        <BestSales/>
        

    </div>
  );
}

export default HomePage;
