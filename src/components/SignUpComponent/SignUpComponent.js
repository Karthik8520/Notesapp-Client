import FormInput from "../FormInput/FormInputComponent";
import { withRouter } from 'react-router-dom'
import axios from "axios"
import React from "react"
import Button from "../ButtonComponent/ButtonComponent"




class signUp extends React.Component{
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }
    handleSubmit =  async (event)=>{
        event.preventDefault();
        //console.log("submit clicked");
        const {name, email, password} = this.state;
        const url = "http://localhost:7000/notesapp/v1/signup";
        const data = {
            name, 
            email, 
            password
        }
        try{
            const res = await axios.post(url, data);
            console.log(res);
            if(res.data.status.toLowerCase()==="success")
            {
                alert("Account created Successfully, Login to continue");
                this.props.history.push('/login');
            }
            else{
                alert("Error");
            }
        }
        catch(err)
        {
            console.log(err.response.data);
        }
        
    }

    render()
    {
        return (
            <div>
                <h3>Sign up.</h3>
                <FormInput label="name" type="text" onChange={(e)=>{this.setState({name:e.target.value})}}  />
                <FormInput label="email" type="email" onChange={(e)=>{this.setState({email:e.target.value})}} />
                <FormInput label="password" type="password" onChange={(e)=>{this.setState({password:e.target.value})}} />
                <Button type="submit" onClick={this.handleSubmit}>Sign up</Button>
            </div>
        )
    }
}

export default withRouter(signUp);