import React from "react"
import {Switch, Route} from "react-router-dom"
import Homepage from "./components/Page/Homepage/Homepage"
import SignUpPage from "./components/Page/SignUpPage/SignUpPage"
import {connect} from "react-redux"
import LoginPage from "./components/Page/LoginPage/LoginPage"
import newNotePage from "./components/Page/NewNotePage/NewNotePage"
import Header from "./components/Header.component/Header.component"



class App extends React.Component {

  render(){
    const user = this.props.currentUser.user;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={ ()=> user!=null ? <Homepage/> : <SignUpPage/> } />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/home" component={Homepage}/>
          <Route exact path="/newNote" component={newNotePage} />
        </Switch>
      </div>  
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    currentUser: state.user
  }
}


export default connect(mapStateToProps)(App);
