import "./button.css"

const button = (props)=>{
    return(
        <div className="btn-comp" >
            <button className={props.className} id={props.id} type={props.type} onClick={props.onClick}>{props.children}</button>
        </div>
    )
}

export default button 