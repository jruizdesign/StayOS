import React, { useState, useEffect } from 'react';
import { getSystemLogs } from '../services/dataService';
import { SystemLog } from '../types';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Paper, Divider, Chip } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

const SystemLogs = () => {
  const [logs, setLogs] = useState<SystemLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await getSystemLogs();
      setLogs(data);
    };
    fetchLogs();
  }, []);

  const getIcon = (module: string) => {
    switch (module) {
      case 'AUTH': return <LoginIcon />;
      case 'ROOMS': return <MeetingRoomIcon />;
      case 'SYSTEM': return <SettingsSystemDaydreamIcon />;
      default: return <HistoryIcon />;
    }
  };

  const getModuleColor = (module: string) => {
      switch (module) {
          case 'AUTH': return 'primary';
          case 'ROOMS': return 'secondary';
          case 'SYSTEM': return 'default';
          default: return 'default';
      }
  }

  return (
    <Paper elevation={3} className="p-4 rounded-xl shadow-sm border border-gray-100 bg-white">
      <Typography variant="h6" className="mb-4 font-bold text-gray-800 flex items-center gap-2">
        <HistoryIcon className="text-blue-600" /> System Activity Logs
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '400px', overflow: 'auto' }}>
        {logs.map((log) => (
          <React.Fragment key={log.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#2563EB' }}>
                  {getIcon(log.module)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">{log.action}</span>
                        <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      className="block mt-1"
                    >
                      {log.userName}
                    </Typography>
                     <span className="text-gray-600 text-sm block mb-1">{log.details}</span>
                     <Chip label={log.module} size="small" color={getModuleColor(log.module) as any} variant="outlined" className="mt-1" />
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default SystemLogs;
