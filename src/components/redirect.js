import { getAuth } from "firebase/auth";
import { redirect } from "react-router";
import { fb } from "../firebase"




const RedirectWrapper = (props) => {
    const user = getAuth().currentUser;

    if(!user){
        redirect('/login');
    }
    else{
        return(<div>
            {props.children}
        </div>);
    }

}


export default RedirectWrapper;