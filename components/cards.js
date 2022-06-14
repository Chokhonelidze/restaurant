import React from "react";
export function RestaurantCard(props) {
  return (
   
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={props.image} alt="Card image cap" />
        <div className="card-header">{props.name}</div>
        <div className="card-body">
          <p className="card-text">{props.description}</p>
        </div>
      </div>
   
  );
}
export function DishCard(props) {
  return (

      <div className="card" style={{ width: "10rem" }}>
        <img className="card-img-left" src={props.image} alt="Card image cap" />
        <div className="card-header">{props.name}</div>
        <div className="card-body">
          <p className="card-text">{props.description}</p>
          {props.price?<p className="card-text price">{props.price}</p>:''}
        </div>
      </div>
  
  );
}
export function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "20rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
