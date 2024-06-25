import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="testt">
      <h1 className="app__header-h1">The Key To Fine Dining</h1>
      <SubHeading title="Chase the new flavour" />
      <div className='paratest'>
         <p className="p__opensans" style={{ margin: '2rem 0' }}>Sit tellus lobortis sed senectus vivamus molestie. Condimentum volutpat morbi facilisis quam scelerisque sapien. Et, penatibus aliquam amet tellus </p>
      </div>
      <button type="button" className="button-17">Explore Menu</button>
    </div>

    
  </div>
);

export default Header;
