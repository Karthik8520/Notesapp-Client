import "./newNote.css"
import {Component} from "react"
import Button from "../../ButtonComponent/ButtonComponent"
import {connect} from "react-redux"
import axios from "axios"

class newNotePage extends Component{
    

    constructor(){
        super();
        this.state = {
            title: "",
            description: ""
        }
    }

    handleChange = (e)=>{
        const key = String(e.target.name);
        //console.log(key);
        let obj = {};
        obj[key] = String(e.target.value);
        this.setState(obj);
        console.log(this.state);

        // console.log(typeof e.target.value)
        // let key = String(e.target.name);
        // let obj = {};
        // obj[key] = String(e.target.value)
        // this.setState(obj);
        // console.log(this.state);
    }

    handleSubmit = async (e)=>{
        //this os causing error, It says description is necessary
        e.preventDefault();
        e.target.disabled = true;
        e.target.innerText = "...creating";
        // console.log("logging state description");
        // console.log(this.state.description);

        // console.log("collection : ", this.props.user.collection)
        const data = {
            title: this.state.title,
            description: this.state.description,
            priority:3,
            collection: this.props.user.collection
        }
        const url = "http://localhost:7000/notesapp/v1/notes/"
        let config = {
            headers: {
              token: this.props.user.user.token
            }
          }
        await axios.post(url, data, config ).then(()=>{
            e.target.style.backgroundColor="green";
            e.target.style.color="white";
            e.target.innerText = "Note Saved ✔✔✔";
        })
    }

    render(){

        return(
            <div id="newNotePage">
                <h1>New note</h1>
                <div id="new-note-div">
                    <div>Title</div>
                    <div><input onChange={this.handleChange} name="title" type="text" /></div>
    
                    <div>Description</div>
                    <div><textarea name="description" onChange={this.handleChange} rows="5" cols="100" type="text" /> </div>
                </div>
                <Button onClick={this.handleSubmit}>Create</Button>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    user: state.user
})

export default connect(mapStateToProps)(newNotePage)