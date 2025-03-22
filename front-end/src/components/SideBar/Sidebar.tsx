import React, { useState } from 'react';
import { Drawer, List, Toolbar } from '@mui/material';
import ConnectionLabel from '../ConnectionLabel/ConnectionLabel';

export default function Sidebar() {
  const [drawerWidth, setDrawerWidth] = useState(240);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e:any) => {
    setDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e:any) => {
    if (dragging) {
      const newWidth = drawerWidth + (e.clientX - startX);
      if (newWidth > 100) { 
        setDrawerWidth(newWidth);
        setStartX(e.clientX);
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  React.useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        <ConnectionLabel dbName="SenacDatabase" iconSrc="/icons/mysql-logo.svg" />
        <ConnectionLabel dbName="MyEcommerce" iconSrc="/icons/mysql-logo.svg" />
        <ConnectionLabel dbName="TCS" iconSrc="/icons/mysql-logo.svg" />
      </List>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '5px',
          cursor: 'ew-resize',
        }}
        onMouseDown={handleMouseDown}
      />
    </Drawer>
  );
}
