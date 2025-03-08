import React, {  createContext,    useState } from "react";



export const AuthContext=createContext()



export const AuthProvider =({children })=>{
  const [userAuthLevel, setUserAuthLevel] = useState(null);


  const login = (role) => {
    setUserAuthLevel({ role });

};

const logout = () => {
    setUserAuthLevel(null);
};

return (
    <AuthContext.Provider value={{ userAuthLevel, login, logout }}>
        {children }
    </AuthContext.Provider>
);
}





