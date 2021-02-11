import {connect} from "react-redux";
import {Component} from "react";
import axios from "axios"
import {setCollection} from "../../redux/userReducer/userActions"
import Button from "../ButtonComponent/ButtonComponent"
import {withRouter} from "react-router-dom"
import "./collection.css"

class Collection extends Component{
    constructor()
    {
        super();
        this.state = {
            collections: null,
            newcollection: "",
            trigger: ""
        }
        this.addNewCollection = false;
    }

    newcollection = async (e)=>{
        
        e.preventDefault();
        console.log("logging addNewCollection  ", Collection.addNewCollection);
        console.log("New collection cliked");
        console.log(this.state.newcollection);

        // //logic
        const data = {
            collection: this.state.newcollection
        }

        let config = {
            headers: {
              token: this.props.user.token
            }
        }
        const url = "http://localhost:7000/notesapp/v1/notes/addCollection/"

        await axios.post(url, data, config).then(()=>{
            //this.props.history.push("/home");
            this.addNewCollection = true;
            this.forceUpdate(); 
        })

        // this.addNewCollection = true;
        // this.setState({trigger: ""});
    }

    getCollections = async()=>{
        const url = "http://localhost:7000/notesapp/v1/notes/getCollections";
        let config = {
                headers: {
                token: this.props.user.token
                }
          }
        try{
            const res = await axios.get(url, config)
            return res;
        }
        catch(err)
        {
            console.log("Error from getCollctions in react");
            console.log(err);
        }
        
    }


    //ComponentDidMount is called whenever we refresh page, ...
    //... In stackOverflow, it is written that On refresh, componentDidMount() won't be called,...
    //.. But it is not correct

    async componentDidMount()
    {   
        console.log("componentDidMount() of Collection Component gets called");
        const res = await this.getCollections();
        this.setState({collections: res.data.data})
        //console.log("collections data: ", res.data.data);
    }


    async componentDidUpdate(prevProps){
        console.log("componentDidUpdate() called of CollectionComponent");
        console.log("logging collection of redux store", this.props.collection);
        if(this.addNewCollection===true)
        {
            this.getCollections().then((res)=>{
                this.addNewCollection = false;
                this.setState({collections: res.data.data});
            })
        }
        let a=10;
        const result = this.state.collections.includes(prevProps.collection);
        console.log("prevProps.collection", prevProps.collection);
        console.log("this.props.collection", this.props.collection, this.props.collection!=null);
        prevProps.collection!=null&&result ? document.getElementById(prevProps.collection).style.backgroundColor="#00bcd4" : a=11;
        this.props.collection!=null&&result ? document.getElementById(this.props.collection).style.backgroundColor="red" : a=13;
    }

    handleCLick=async (event)=>{
        const collectionName = event.target.innerText;
        this.props.setCollection(collectionName); //this is causing error, it is behaving asynchronously
        //https://stackoverflow.com/questions/42778511/redux-state-not-updating-right-away
        //after action is fired, component wil re-render, so we write the code for getting notes on,
        //..componentDidUpdate method of notesComponent
    }

    handleChange = async (e)=>{
        //only applies to necollection input
        this.setState({newcollection: e.target.value});
    }

    deleteCollection = (e)=>{
        e.preventDefault();
        console.log("delete collection clicked", e.target.name);
        //console.log("token", this.props.user.token)
        const collectionToDelete = e.target.name;

        const url = "http://localhost:7000/notesapp/v1/notes/deleteCollection/"+collectionToDelete;
        let config = {
                headers: {
                token: this.props.user.token
            }
        }

        axios.delete(url, config).then(()=>{
            //delete 'e.target.name' entry from this.state.collections Array
            const newCollections = this.state.collections.filter((collec)=>(
                collec!=collectionToDelete ? true : false
            ))
            this.setState({collections: newCollections}, ()=>{
                this.props.setCollection(null);
            })
        })
    }
    

    render(){
        console.log("rendering Collection component");
        console.log(this.state.collections);
        return(
            <div id="collection">
                <h3>Collections</h3>
                {
                    
                    this.state.collections==null? null : this.state.collections.map((collec)=>(
                        <div id="del-grid">
                            <Button key={collec} id={collec} onClick={this.handleCLick} >{collec}</Button>
                            <a href="#" name={collec} onClick={this.deleteCollection}>❌</a>
                        </div>
                        
                        // <button key={collec} onClick={this.handleCLick}>{collec}</button>
                    ))
                }
                <div id="new-collec">
                    <input name="new-collection" placeholder="new collection" onChange={this.handleChange} />
                    <Button id="new-collection" onClick={this.newcollection}>Add +</Button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    user: state.user.user,
    collection: state.user.collection
})

const mapDispatchToProps = (dispatch)=>({
    setCollection : (collectionName)=> (dispatch(setCollection(collectionName)))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Collection))