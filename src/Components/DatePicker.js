import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useAlert } from 'react-alert';
import Alert from '@mui/material/Alert';


const DatePicker = ({
    startDate,
    endDate,
    isStartDate,
    setStartDate,
    setEndDate,
    maxDate
}) => {
  const alert = useAlert()

  const handleChange = (newValue) => {
    if (isStartDate) {
      if(newValue > maxDate){
          alert.show( 
            <Alert variant='filled' severity='error' sx={{marginBottom: 5, width: 600,  fontSize: 18, fontFamily:'Segoe UI'}} > Pictures cannot be retrieved for days in the future</Alert>);
      } else if (newValue > endDate) {
          alert.show( 
            <Alert variant='filled' severity='error' sx={{marginBottom: 5, width: 600,  fontSize: 18, fontFamily:'Segoe UI'}} > Cannot set Start Date that is more recent than current End Date</Alert>);
      } else {
      setStartDate(newValue);
      }
    } else {
        if(newValue > maxDate){
          alert.show( 
            <Alert variant='filled' severity='error' sx={{marginBottom: 5, width: 600,  fontSize: 18, fontFamily:'Segoe UI'}} > Pictures cannot be retrieved for days in the future</Alert>);
        } else if (newValue < startDate) {
          alert.show( 
            <Alert variant='filled' severity='error' sx={{marginBottom: 5, width: 600,  fontSize: 18, fontFamily:'Segoe UI'}} > Cannot set End Date that is older than current Start Date</Alert>);
        }
        else {
          setEndDate(newValue);
        }
    }
};

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label= {isStartDate ? "Start Date" : "End Date"}
          inputFormat="yyyy-MM-dd"
          value={ isStartDate ? startDate.toISOString().substring(0,10) : endDate.toISOString().substring(0,10)}
          onChange={ handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}

export default DatePicker;