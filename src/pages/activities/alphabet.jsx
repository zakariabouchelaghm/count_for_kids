import React,{ useRef, useEffect } from "react";
import Canvascomponent1  from "../../components/canvascomponent1";
import "./numbers.css";

function Alphabet() {

    return(
      <div className="activities">
      
      <h2>اسمع وحاول كتابة الحرف </h2>
     <Canvascomponent1 />
    </div>
    )
}
export default Alphabet;