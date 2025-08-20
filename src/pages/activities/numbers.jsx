import React,{ useRef, useEffect } from "react";
import Canvascomponent  from "../../components/canvascomponent";
import "./numbers.css";

function Numbers() {

    return(
      <div className="activities">
      
      <h2>اسمع وحاول كتابة الرقم </h2>
     <Canvascomponent />
    </div>
    )
}
export default Numbers;