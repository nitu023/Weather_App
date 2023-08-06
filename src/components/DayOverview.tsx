import React from 'react';
import { Card, CardContent, Typography, Grid, LinearProgress } from '@mui/material';

interface DayOverviewProps {
  humidity: number;
  cloudcover: number;
}


const DayOverview: React.FC<DayOverviewProps> = ({ humidity, cloudcover }) => {
  return (
      <>
    <h1>Day Overview</h1>
    <Grid container spacing={1} sx={{ marginLeft: '10px' }}>
      <Grid item xs={6} sm={5} md={5}>
        <Card
          sx={{
            minWidth: 275,
            bgcolor: '#1E213A',
            color: '#fff',
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Humidity
            </Typography>
            <Typography variant="h5" component="div">
              {`${Math.round(humidity)}%`}
                <LinearProgress
                variant="determinate"
                value={humidity}
                color= {humidity <= 60 ? 'success' : 'secondary'}
              />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} sm={2} md={1} />
      <Grid item xs={6} sm={4} md={5}>
        <Card
          sx={{
            minWidth: 275,
            bgcolor: '#1E213A',
            color: '#fff',
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Cloud Cover
            </Typography>
            <Typography variant="h5" component="div">
              {`${Math.round(cloudcover)}%`}
              <LinearProgress
                variant="determinate"
                value={Math.round(cloudcover)}
                color= {Math.round(cloudcover) <= 60 ? 'success' : 'secondary'}
              />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </>
  );
};

export default DayOverview;
