import React,{ useRef, useEffect } from "react";
import Canvascomponent  from "../components/canvascomponent";


function Activities() {

    return(
      <div className="activities">
      
      <h1>الأنشطة</h1>
      <h2>اسمع وحاول كتابة الرقم </h2>
     <Canvascomponent />
    </div>
    )
}
export default Activities;