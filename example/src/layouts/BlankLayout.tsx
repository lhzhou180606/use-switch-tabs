import React from 'react';
import Block from '@/components/Block';

const Layout: React.FC = ({ children }) => {
  return (
    <Block>
      <h2>use switch tabs</h2>
      {children}
    </Block>
  );
};

export default Layout;
