import React from 'react';
import PropTypes from 'prop-types';

function Header({ children }) {
  return (
    <header>
      <h1>{children}</h1>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Header;
