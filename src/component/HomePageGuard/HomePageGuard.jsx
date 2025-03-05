import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePageGuard = (props) => {

  const { Comp } = props;
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState(false)
 

//   useEffect(() => {
//     var isValidUser = sessionStorage.getItem("token");

//     if (
//       isValidUser === null
//     ) {
//       return navigate("/");
//     } else {
//         return navigate(-1)
//     }
//   });

//   return <div><Comp/></div>;

useEffect(()=>{
    var isValidUser = sessionStorage.getItem("token");
    if(isValidUser){
        setHasToken(true)
        return navigate(-1)
    } 
}, [navigate])

return (
    <>
    {hasToken===false && <Comp/>}
    </>
)

};

export default HomePageGuard;
