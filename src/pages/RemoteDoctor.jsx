import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Switch,
  FormControlLabel,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  AppBar,
  Toolbar,
  Collapse,
  Divider,
} from '@mui/material';
import { Verified, DarkMode, LightMode } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const doctors = [
    {
      name: 'Dr. Anjali Verma',
      specialty: 'General Physician',
      image: '/assets/doctors/anjali.jpg',
      verified: true,
      bio: 'Experienced general physician with 10+ years of practice.',
      availability: 'Mon-Fri, 9 AM - 5 PM',
    },
    {
      name: 'Dr. Rohan Mehta',
      specialty: 'Cardiologist',
      image: '/assets/doctors/rohan.jpg',
      verified: true,
      bio: 'Cardiology specialist focused on heart health and care.',
      availability: 'Tue-Thu, 10 AM - 4 PM',
    },
    {
      name: 'Dr. Pooja Sharma',
      specialty: 'Pediatrician',
      image: '/assets/doctors/pooja.jpg',
      verified: false,
      bio: 'Loves working with children and promoting healthy growth.',
      availability: 'Mon-Wed, 11 AM - 3 PM',
    },
    {
      name: 'Dr. Vikram Singh',
      specialty: 'Dermatologist',
      image: '/assets/doctors/vikram.jpg',
      verified: true,
      bio: 'Skin care expert helping patients with various skin concerns.',
      availability: 'Wed-Fri, 1 PM - 6 PM',
    },
    {
      name: 'Dr. Nisha Patel',
      specialty: 'Neurologist',
      image: '/assets/doctors/nisha.jpg',
      verified: false,
      bio: 'Dedicated to diagnosing and treating nervous system disorders.',
      availability: 'Mon, Wed, Fri, 10 AM - 2 PM',
    },
    {
      name: 'Dr. Rahul Das',
      specialty: 'Orthopedic Surgeon',
      image: '/assets/doctors/rahul.jpg',
      verified: true,
      bio: 'Specialist in bone, joint, and spine care with surgical expertise.',
      availability: 'Tue-Thu, 9 AM - 1 PM',
    },
    {
      name: 'Dr. Meera Kapoor',
      specialty: 'Psychiatrist',
      image: '/assets/doctors/meera.jpg',
      verified: true,
      bio: 'Mental health advocate with a passion for patient wellness.',
      availability: 'Mon-Fri, 12 PM - 6 PM',
    },
    {
      name: 'Dr. Arjun Nair',
      specialty: 'ENT Specialist',
      image: '/assets/doctors/arjun.jpg',
      verified: false,
      bio: 'Expert in treating ear, nose, and throat conditions effectively.',
      availability: 'Wed-Sat, 10 AM - 2 PM',
    },
  ];

const RemoteDoctor = ({ toggleTheme, mode }) => {
  const navigate = useNavigate();
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const theme=mode
  

  const handleBackToHome = () => {
    navigate('/');
  };
  const Header = () => {
    return (
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            HeaLink<span style={{ color: '#1976D2' }}>AI</span>
          </Typography>
          <Button color="inherit" onClick={handleBackToHome}>Back to Home</Button>
        </Toolbar>
      </AppBar>
    );
  };
  
  const handleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const specialties = [...new Set(doctors.map((doc) => doc.specialty))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesVerification = showVerifiedOnly ? doctor.verified : true;
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
    return matchesVerification && matchesSearch && matchesSpecialty;
  });

  return (
    <Box>
    <AppBar position="static" color="transparent" elevation={0}>
    <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
      HeaLink<span style={{ color: '#1976D2' }}>AI</span>
      </Typography>
      </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LightMode sx={{ color: theme === 'light' ? '#FFA500' : 'grey.500' }} />
            <Switch onChange={toggleTheme} checked={theme === 'dark'} />
         <DarkMode sx={{ color: theme === 'dark' ? '#90CAF9' : 'grey.500' }} />
        </Box>
      <Button color="inherit" onClick={() => navigate('/')}>
            Back to Home
      </Button>
    </Toolbar>
    </AppBar>
    <Container sx={{ pt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Connect with a Remote Doctor
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <TextField
          label="Search by name or specialty"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Filter by Specialty</InputLabel>
          <Select
            value={selectedSpecialty}
            label="Filter by Specialty"
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <MenuItem value="">All Specialties</MenuItem>
            {specialties.map((spec, idx) => (
              <MenuItem key={idx} value={spec}>
                {spec}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={showVerifiedOnly}
              onChange={() => setShowVerifiedOnly((prev) => !prev)}
              color="primary"
            />
          }
          label="Show Verified Doctors Only"
        />
      </Box>

      {/* Doctors Grid */}
      <Grid container spacing={4}>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card elevation={3} onClick={() => handleExpand(idx)} sx={{ cursor: 'pointer', minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                  <Avatar
                  src={doctor.image}
                  alt={doctor.name}
                  sx={{ width: 80, height: 80, margin: '0 auto 1rem' }}
                />
                  <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography variant="h6">{doctor.name}</Typography>
                  {doctor.verified && (
                    <Verified sx={{ color: "green", ml: 0.5, fontSize: "1.2rem" }} />
                  )}
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {doctor.specialty}
                  </Typography>
                
                </CardContent>

                <Collapse in={expandedIndex === idx} timeout="auto" unmountOnExit>
                  <Divider />
                  <CardContent>
                  <Typography variant="body2" gutterBottom>
                      <strong>About:</strong> {doctor.bio}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Availability:</strong> {doctor.availability}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Consultation booked with ${doctor.name}`);
                      }}
                    >
                      Book Consultation
                    </Button>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 4, mx: 'auto' }}>
            No doctors found matching the filters.
          </Typography>
        )}
      </Grid>
      </Container>
    </Box>
  );
};

export default RemoteDoctor;
