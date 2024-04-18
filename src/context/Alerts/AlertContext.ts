import { createContext } from "react";
import Alert from "../../types/alert";

interface AlertContextType { 
    alertState: Alert;
    setAlertState: React.Dispatch<React.SetStateAction<Alert>>; 
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export default AlertContext;