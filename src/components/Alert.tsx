import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import AlertContext from '../context/Alerts/AlertContext';
import initialAlert from '../constants/initialAlertState';

export default function AlertNotifier() {

  const alertContext = useContext(AlertContext);

  const handleOnClose = () => {
    alertContext?.setAlertState(initialAlert);
  };

  if(!alertContext) return null;

  return (
    alertContext.alertState && <Alert show={alertContext.alertState.show} variant={alertContext.alertState.variant} onClose={handleOnClose} dismissible>
      <Alert.Heading>{alertContext.alertState.title}</Alert.Heading>
      <p>{alertContext.alertState.message}</p>
    </Alert>
  )
}
