import {Component} from "react"
import {connect} from "react-redux"
import axios from "axios"
import {setNotes, setCollection} from "../../redux/userReducer/userActions"
import NoteCard from "../NoteCard.component/NoteCard.component"
import Button from "../ButtonComponent/ButtonComponent"
import {withRouter} from "react-router-dom"


class notes extends Component{

    constructor()
    {
        super();
    }

    newNote = ()=>{
        this.props.history.push("/newNote")
    }

    getNotes = async ()=>{
        try{
            if(this.props.collection===null) {return null}
            else{
                const url = "http://localhost:7000/notesapp/v1/notes/collection/"+this.props.collection
                //const token = this.props.user.token;
                let config = {
                    headers: {
                    token: this.props.user.token
                    }
                }
                const res = await axios.get(url, config)
                return res.data.data
            }
        }
        catch(err)
        {
            console.log("Error from getNotes react");
            console.log(err);
        }
    }

    componentDidMount(){
        //every time page refreshes, this will be called
        //After creating new note, when we click on back btn of browser...
        //... and go back to HomePAge, then it also acts same as refresh. ...
        //...So evry time we click back btn, and go to home page,
        //..componentDidMount() method id called.
        console.log("componentDidMount()of notesComponent gets called");
        if(this.props.collection!=null && this.props.collection!="deleted")
        {
            this.getNotes().then((response)=>{
                //console.log("logging notes");
                //console.log(response);
                this.props.setNotes(response);
            })
        }
    }

    async componentDidUpdate(prevProps)
    {
        // By the time this function is called, collection will be already set Redux store,
        //..so now we can get the notes.

        //a has no use
        console.log("componentDidUpdate of NotesComponent get called");
        let a =10;
        console.log("prevProps.collection",prevProps.collection);
        console.log("this.props.collection", this.props.collection);

        //prevProps.collection!=null ? document.getElementById(prevProps.collection).style.backgroundColor="#00bcd4" : a=11;
        
        // this.props.collection!=null ? document.getElementById(this.props.collection).style.backgroundColor="red" : a=13;
        
        //console.log(document.getElementsByClassName(this.props.collection)[0])
        if(this.props.collection !== prevProps.collection )
        {
            this.getNotes().then((response)=>{
                //console.log("logging notes");
                //console.log(response);
                this.props.setNotes(response);
            })
        }
    }


    render(){
        // const notes = await  this.getNotes();
        // console.log("logging notes");
        // console.log(notes);
        // console.log("logging from notes function");
        // console.log(this.props.collection);
        console.log("logging notes from render")
        console.log(this.props.notes);

        return (
            <div>
                {
                    this.props.notes==null ? null : 
                    <div>
                        {this.props.notes.map((note)=>{
                            return (
                                <div>
                                <NoteCard note={note} getNotes={this.getNotes}/>
                                </div>
                            )
                        })}

                        
                        <Button id="new-note-btn" onClick={this.newNote}>New note</Button>
                        
                    </div>
                    
                }
            </div>
        )
    }
    
}   

const mapStateToProps = (state)=>({
    user: state.user.user,
    collection: state.user.collection,
    notes: state.user.notes
})

const mapDispatchToProps = (dispatch)=>({
    setNotes : (notes)=> (dispatch(setNotes(notes))),
    setCollection: (collectionName)=> (dispatch(setCollection(collectionName)))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(notes));