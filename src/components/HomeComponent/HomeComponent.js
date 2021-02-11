import {connect} from "react-redux";
import CollectionComponent from "../CollectionComponent/CollectionComponent";
import ErrorPage from "../Page/ErrorPage"
import Notes from "../NotesComponent/NotesComponent";
import Button from "../ButtonComponent/ButtonComponent";
import "./home.css"

const home  = (props)=>{
    if(!props.user) {return (<ErrorPage />)}
    console.log("logging from home component");
    console.log(props.user);
    return (
        <div id="home-comp">
            <CollectionComponent />
            <Notes />
        </div>
    )
}

const mapStateToProps = (state)=>({
    user: state.user.user
})

export default connect(mapStateToProps)(home);