import { Drawer, List, Toolbar, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import ConnectionLabel from "../ConnectionLabel/ConnectionLabel";
import ConnectionModal from "../Modal/ConnectionModal/ConnectionModal";
import { getAllConnectionLabels, getAllConnections } from "../../services/DatabaseConnectionService";
import { DatabaseConnection } from "../../services/types/DatabaseConnection";
import { DatabaseConnectionLabel } from "../../services/types/DatabaseConnectionLabel";

interface SidebarProps {
  drawerWidth: number;
  setDrawerWidth: (width: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth, setDrawerWidth }) => {
  const [connectionLabels, setConnectionLabels] = useState<DatabaseConnectionLabel[]>([]);
  const [isclickInConnectionLabel, setIsclickInConnectionLabel] = useState<boolean>(false);
  const [selectedConnectionLabel, setSelectedConnectionLabel] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConnection, setEditingConnection] = useState<null | string | any>(null); 
  const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [selectedDb, setSelectedDb] = useState<string | null>(null);

  const handleEditConnection = (dbName: string) => {
    setEditingConnection({ dbName });
    setIsModalOpen(true);
  };

  const handleCreateConnection = () => {
    handleClose();
    setEditingConnection(null);
    setIsModalOpen(true);
  };

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

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleSaveConnection = (data: any) => {
    setIsModalOpen(false);
  };

  const handleRightClickConnectionLabel = (connectionLabelNumber: number) => {
    setIsclickInConnectionLabel(true);
    setSelectedConnectionLabel(connectionLabelNumber);
  };

  const handleDeleteConnection = () => {
    setConnectionLabels(prev => prev.filter((_, i) => i !== selectedConnectionLabel));
    setContextMenu(null);
  }

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const connections:DatabaseConnectionLabel[] = await getAllConnectionLabels();
        const connectionsWithIcons = connections.map(conn => ({
          ...conn,
          iconSrc: "/icons/database/postgresql-logo-svgrepo-com.svg"
        }));
        setConnectionLabels(connectionsWithIcons);
        console.log("getAllConnections - ", connectionLabels);
      } catch (error) {
        console.error("Erro ao buscar conexões:", error);
      }
    };

    fetchConnections();
  }, []);

  useEffect(() => {
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
        {connectionLabels.length === 0 ? (
          <div style={{ padding: '1rem', color: '#888', fontStyle: 'italic' }}>
            Nenhuma conexão encontrada. Clique com o botão direito para adicionar uma.
          </div>
        ) : (
          connectionLabels.map((object, i) => (
            <ConnectionLabel
              key={i}
              dbName={object.label}
              iconSrc="/icons/database/postgresql-logo-svgrepo-com.svg"
              selected={selectedDb === object.label}
              onSelect={handleSelect}
              onRightClick={() => handleRightClickConnectionLabel(i)}
            />
          ))
        )}
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
        <MenuItem onClick={handleCreateConnection}>
          {isclickInConnectionLabel ? 'Editar conexão' : 'Criar nova conexão'}
        </MenuItem>
        {isclickInConnectionLabel && (
          <MenuItem onClick={handleDeleteConnection}>Excluir conexão</MenuItem>
        )}
      </Menu>
      <ConnectionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveConnection}
        initialData={editingConnection}
        edit={isclickInConnectionLabel}
      />
    </Drawer>
  );
};

export default Sidebar;
