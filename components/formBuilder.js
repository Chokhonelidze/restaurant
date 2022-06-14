
import React from "react";
import {
    Input,
    Form,
    FormGroup,
    FormFeedback,
    FormText,
    Button,
  } from "reactstrap";
  import { check, DisplayErrors } from "./validator";
  import {formSettings} from "./formHelper";

export function FormBuilder(props){
    const [errors,setErrors] = React.useState([]);
    if(!props)return(<></>);
    let inputs = Object.keys(props).map((item,index)=>{
        let settings = formSettings[item];
        let type = settings.type.toLowerCase();
        if(settings && settings.type && (settings.type ==='text'||settings.type === 'url' || settings.type ==='number'))
        return <FormGroup key={"form"+index}><Input
        type={type} 
        value={props[item][0]} 
        placeholder={settings.placeholder?settings.placeholder:''}
        onChange={(e) => {
            
            let error = check(item, e.target.value);
            if (error[item].length) {
                e.target.classList.remove('is-valid');
                e.target.classList.add('is-invalid');
                e.target.removeAttribute('valid');
                e.target.setAttribute('invalid','true');
              setErrors(error);
              console.log(error);
            }
            else{
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid');
                e.target.removeAttribute('invalid');
                e.target.setAttribute("valid","true");

            }
            props[item][1](e.target.value);
            e.preventDefault();
          }}
        />
        <FormFeedback invalid='true'>
          <DisplayErrors errors={errors[item]} />
        </FormFeedback>
        <FormFeedback valid>
          OK
        </FormFeedback>
        {settings.label?
        <FormText>{settings.label}</FormText>:<></>
        }

        </FormGroup>
        if(settings && settings.type && (settings.type ==='button')){
          return <Button color='primary' key={"button"+{index}} onClick={props[item][1]} >{item}</Button>
        }

    }) 

return(
    <>
    <Form>
        <br></br>
        {inputs}
    </Form>
    </>
)
}