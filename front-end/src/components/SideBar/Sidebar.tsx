import { Drawer, List, Toolbar } from "@mui/material";
import ConnectionLabel from "../ConnectionLabel/ConnectionLabel";
import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import ConnectionModal from "../Modal/ConnectionModal/ConnectionModal";

interface SidebarProps {
  drawerWidth: number;
  setDrawerWidth: (width: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth, setDrawerWidth }) => {

  const [connectionLabels, setConnectionLabels] = useState<any[]>([
    {
      dbName: "SenacDatabase",
      iconSrc: "/icons/database/postgresql-logo-svgrepo-com.svg",
    },
    {
      dbName: "MyEcommerce",
      iconSrc: "/icons/database/postgresql-logo-svgrepo-com.svg",
    },
    {
      dbName: "TCS",
      iconSrc: "/icons/database/postgresql-logo-svgrepo-com.svg",
    },
  ])

  const handleEditConnection = (dbName: string) => {
    setEditingConnection({ dbName })
    setIsModalOpen(true);
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConnection, setEditingConnection] = useState<null | any>(null); 

  const handleCreateConnection = () => {
    handleClose();
    setEditingConnection(null);
    setIsModalOpen(true);
  };

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  
  const handleContextMenu = (
    event: React.MouseEvent,
    dbName?: string
  ) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });
    setEditingConnection(dbName ? { dbName } : null);
  };
  
  const handleClose = () => {
    setContextMenu(null);
  };

  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const [selectedDb, setSelectedDb] = useState<string | null>(null);

  const handleSelect = (dbName: string) => {
    setSelectedDb(dbName);
  };

  const handleMouseDown = (e: any) => {
    setDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: any) => {
    if (dragging) {
      const newWidth = drawerWidth + (e.clientX - startX);
      if (newWidth > 100) {
        setDrawerWidth(newWidth);
        setStartX(e.clientX);
      }
    }
  };

  const handleSaveConnection = (data: any) => {
    setIsModalOpen(false);
    setConnectionLabels(
      prevItems => [
        ...prevItems,
         {
          dbName: data.name,
          iconSrc: "/icons/database/postgresql-logo-svgrepo-com.svg",
         }
        ]
      );
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
      onContextMenu={handleContextMenu}
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
        {
          connectionLabels.map((object, i) => 
          <ConnectionLabel
            dbName={object.dbName}
            iconSrc={object.iconSrc}
            selected={selectedDb === object.dbName}
            onSelect={handleSelect}
          />
          )
        }
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
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleCreateConnection}>{editingConnection ? 'Editar conexão' : 'Criar nova conexão'}</MenuItem>
      </Menu>
      <ConnectionModal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSave={handleSaveConnection}
      initialData={editingConnection}
    />
    </Drawer>
  );
};

export default Sidebar;
