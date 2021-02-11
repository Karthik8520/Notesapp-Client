import {Component} from "react"
import Button from "../ButtonComponent/ButtonComponent"
import axios from "axios";
import {connect} from "react-redux";
import {setNotes} from "../../redux/userReducer/userActions"
import "./notes.css";



class note extends Component{
    constructor(){
        super();
        this.state = {
            description:""
        }
    }

    handleChange = (e)=>{
        this.setState({description : e.target.value });
    }

    handleUpdate = async (e)=>{
        e.preventDefault();
        e.target.disabled = true;
        e.target.style.color = "white";
        e.target.innerText = "...updating";
        const note_id = e.target.id;
        const url ="http://localhost:7000/notesapp/v1/notes/"+note_id;
        const data = {
            description: this.state.description
        }
        const config = {
            headers: {
                token: this.props.token
            }
        }
        
        await axios.patch(url, data, config).then(()=>{
            e.target.disabled = false;
            e.target.style.color = "black";
            e.target.innerText = "Update"
        })
    }

    handleDelete = async (e)=>{
        e.preventDefault();
        console.log(this.props.getNotes)
        e.target.disabled = true;
        e.target.style.color = "white";
        e.target.innerText = "...deleting";

        const note_id = e.target.id;
        const url = "http://localhost:7000/notesapp/v1/notes/"+note_id;
        const config = {
            headers: {
                token: this.props.token
            }
        }

        axios.delete(url, config).then(()=>{
            //for re-rendering notes, change redux state
            e.target.innerText = "Delete";
            this.props.getNotes().then((response)=>{
                this.props.setNotes(response);
            })
        }) 
    }

    render(){
        console.log()
        return (
            <div  class="notes-card" >
                <h3>{this.props.note.title}</h3>
                {
                    this.props.note.description==undefined ? null : 
                    <div>
                        <div className="description">
                            <b>description</b>  <textarea onChange={this.handleChange} rows="5" cols="80" defaultValue={this.props.note.description}></textarea>
                        </div>
                        <div id="note-card-btn">
                            <Button type="submit" id={this.props.note._id} onClick={this.handleUpdate}>Update</Button>
                            <Button type="submit" id={this.props.note._id} onClick={this.handleDelete}>Delete</Button>
                        </div>
                    </div>
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    token: state.user.user.token
})

const mapDispatchToProps = (dispatch)=>({
    setNotes : (notes)=> (dispatch(setNotes(notes)))
})

export default connect(mapStateToProps, mapDispatchToProps)(note);