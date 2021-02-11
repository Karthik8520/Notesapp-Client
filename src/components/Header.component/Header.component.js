import "./header-style.css"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom";
import {Component} from "react";



class header extends Component{

    constructor(){
        super();
    }

    signout = (e)=>{
        e.preventDefault();
        console.log("signout clicked");
        window.localStorage.removeItem("persist:root");
        this.props.history.push("/login");
    }

    render(){
        console.log("header component");
        console.log(this.props.user);
        return(
            <div id="header-div">
                <div>
                    <h2>NotesApp📝</h2>
                </div>
                <div>
                    {
                        this.props.user ? <a href="#" onClick={this.signout}>Sign-out</a> : <div></div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    user: state.user.user
})

export default withRouter(connect(mapStateToProps)(header));