import { formSettings } from "./formHelper";
export function check(type,value) {
    let errors = [];
    let settings = formSettings[type];
    if(settings && settings.min){
        if(value.length < settings.min) errors.push(type+" is too short should be longer than "+settings.min+" characters");
    }
    if(settings && settings.NaN){
        if(!isNaN(value)) errors.push(type + " should include characters too");
    }
    let obj={};
    obj[type] = errors;
    return obj;
}
export function DisplayErrors(props) {
    let list = null
    if(!props.errors) return null;
    if(Array.isArray(props.errors)){
        list = props.errors.map((input,index)=>{
          return <li key={index}>{input}</li>
        });
    }
    else {
        return props.errors;
    }
    return <ul>{list}</ul>
}

