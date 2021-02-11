import "./form.css"

const formInput = (props)=>{
    return (
        <div id="form-input">
            <div id="label">
                <label>{props.label}</label>
            </div>
            <div id="input">
                <input id={props.id} type={props.type} onChange={props.onChange} placeholder={props.placeholder}/>    
            </div>
        </div>
    )
}

export default formInput;