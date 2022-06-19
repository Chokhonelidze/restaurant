export const formSettings = {
  "Restaurant Name": {
    min: 3,
    NaN: true,
    type: "text",
    label: "Enter Restaurant Name",
    placeholder: "Restaurant Name",
  },
  "Restaurant Description": {
    min: 10,
    NaN: true,
    type: "textarea",
    label: "Enter Restaurant Description",
    placeholder: "Restaurant Description",
  },
  Image: {
    type: "url",
    NaN: true,
    label: "Enter URL of image",
    placeholder: "Your Images URL",
  },
  "Create Restaurant": { type: "button" },
  "Dish Name": {
    min: 3,
    NaN: true,
    type: "text",
    label: "Enter Dish Name",
    placeholder: "Dish Name",
  },
  "Dish Description": {
    min: 10,
    NaN: true,
    type: "text",
    label: "Enter Dish Description",
    placeholder: "Dish Description",
  },
  "Dish Image": {
    type: "url",
    NaN: true,
    label: "Enter URL of Dish image",
    placeholder: "Your Images URL",
  },
  "Dish Price":{
    type: "number",
    label: "Enter Dish's Price",
    placeholder: "Price"
  },
  "Add Dish To Restaurant": { type: "button" },
  "Name":{
    min:4,
    type:"text",
    label: "Enter your name",
    placeholder:"Name"
  },
  "Password":{
    min: 8,
    type:"password",
    label:"Enter your password",
    placeholder:"Password"
  },
  "Email":{
    min:6,
    type:"email",
    label:"Enter your Email address",
    placeholder:"Email"
  },
  "Is Admin":{
    type:"checkbox",
    label:"Is User Admin"
  },
  "Create User":{
    type: "button"
  }
};
