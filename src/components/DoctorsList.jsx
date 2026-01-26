import React, { memo } from 'react';
import { Paper, Typography, Avatar, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Memoized component to prevent re-renders when parent state (symptoms) changes
const DoctorsList = memo(({ doctors, translations }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{translations.topDoctors}</Typography>
      {doctors.map((doc) => (
        <Paper key={doc.id} elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2, borderRadius: 2 }}>
          <Avatar src={doc.img} alt={doc.name} sx={{ width: 56, height: 56, mr: 2, borderRadius: 3 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {doc.name} <CheckCircleIcon fontSize="small" sx={{ color: 'green', verticalAlign: 'middle', ml: 0.5 }} />
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{translations.specialty}</Typography>
            <Typography variant="body2" sx={{ color: doc.status === 'Available' ? 'green' : 'orange' }}>
              {doc.status === 'Available' ? translations.available : translations.busy}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Paper>
  );
});

export default DoctorsList;
