import HomeComponent from "../../HomeComponent/HomeComponent"
import {Component} from "react"

class homepage extends Component{
    
    render()
    {
        console.log("homePage gets called");
        return(
            <div>
                <HomeComponent />
            </div>
        )
    }
}

export default homepage;