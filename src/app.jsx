import React, { useEffect } from "react";
import { useRoutes } from 'react-router-dom';
import { getToken } from 'utils/cookie'
import { useNavigate } from "react-router-dom";
import routes from "./router"

const App = () => {

  const navigate = useNavigate()

  useEffect(() => {

    // 对路由进行拦截- 未有token则登录,没有token 则跳转到登录页面.
    if (!getToken()) {
      navigate('/login')
    }
    
  }, [])
  return (<div>
    {useRoutes(routes)}
  </div>)
};

export default App;