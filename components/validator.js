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

export function validator(field, type) {
    switch (type) {
      case "name":
        if (field.length <= 2 || field.length > 20) {
          let message = {
            name: "Bad Name",
          };
          throw message;
        }
        return true;
      case "email":
        if (field.length < 2 || field.length > 200) {
          let message = {
            email: "Short Email",
          };
          throw message;
        }
        if (
          !String(field)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          let message = {
            email: "Wrong email",
          };
          throw message;
        }
        return true;
      case "password":
        if (field.length < 8) {
          let message = {
            password: "Too short password",
          };
          throw message;
        }
        return true;
      default:
        return true;
    }
  }
