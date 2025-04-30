import { Navigate } from "react-router-dom";
import { useMainContext } from "../context/MainProvider";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {

const {isLoggedIn} = useMainContext()

    return ( 
        <>
        {isLoggedIn ? children : <Navigate to={"/"} replace/>}
        </>
     );
}
 
export default ProtectedRoute;