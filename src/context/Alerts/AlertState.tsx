import React, { useMemo, useState } from 'react'
import AlertContext from './AlertContext'
import Alert from '../../types/alert';
import initialAlert from '../../constants/initialAlertState';

interface PropType {
  children: React.ReactNode;
}

export default function AlertState(props: Readonly<PropType>) {
  const [alertState, setAlertState] = useState<Alert>(initialAlert);

  const contextValue = useMemo(() => ({ alertState, setAlertState }), [alertState, setAlertState]);

  return (
    <AlertContext.Provider value={contextValue}>
      {props.children}
    </AlertContext.Provider>
  )
}
