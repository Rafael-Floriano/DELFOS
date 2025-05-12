import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Grid,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  
  export type DatabaseType = "PostgreSQL" | "MariaDB" | "Firebird";
  
  export interface ConnectionData {
    id?: string;
    name: string;
    host: string;
    port: string;
    database: string;
    user: string;
    password: string;
    type: DatabaseType;
  }
  
  export interface ConnectionLabelProps {
    dbName: string;
    iconSrc: string;
    selected: boolean;
    edit:boolean;
    onSelect: (dbName: string) => void;
    onEdit: (dbName: string) => void;
  }
  
  