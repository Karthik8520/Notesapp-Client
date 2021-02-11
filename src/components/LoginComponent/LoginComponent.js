import FormInput from "../FormInput/FormInputComponent"
import { Component } from "react";
import axios from "axios";
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {setUser} from "../../redux/userReducer/userActions"
import Button from "../ButtonComponent/ButtonComponent"
import "./login.css"

class login extends Component 
{
    constructor(){
        super();
        this.state = {
            email:"",
            password: ""
        }
    }

    handleSubmit =  async (event)=>{
        event.preventDefault();
        //console.log("submit clicked");
        const {email, password} = this.state;
        const url = "http://localhost:7000/notesapp/v1/login";
        const data = {
            email, 
            password
        }
        try{
            const res = await axios.post(url, data);
            console.log(res);
            if(res.data.status.toLowerCase()==="success")
            {
                this.props.setCurrentUser(res.data);
                this.props.history.push('/home');
            }
        }
        catch(err)
        {
            console.log(err.response.data);
            alert(err.response.data.err);
        }
    }

    render()
    {
        return (
            <div id="login">
                <div id="login-card">
                    <h1>Login</h1>
                    <FormInput id="email" placeholder="john@example.com" type="email" label="Email"  onChange={(e)=>{this.setState({email:e.target.value})}} />
                    <FormInput id="pswd" placeholder="********" type="password" label="Password" onChange={(e)=>{this.setState({password:e.target.value})}}  />
                    <Button type="submit" onClick={this.handleSubmit} >Login</Button>
                    {/* <button type="submit" onClick={this.handleSubmit}>Login</button> */}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>({
    setCurrentUser : (user)=>{dispatch(setUser(user))}
})

export default connect(null, mapDispatchToProps)(withRouter(login));