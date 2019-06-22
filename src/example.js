import React from "react";
import Admin from "react-crud-admin";
import Form from "react-jsonschema-form";
import Property from './property';
import XMLparser from './ejemplo_xml';
import "react-crud-admin/css"; //optional css import
 
export default class Example extends Admin {
  constructor() {
 
    super();
    // nombre para la clase principal
    this.name = "Animal";

    this.name_plural = "Animales";
    // atributo para hacerlo clickeable y mostrar información
    this.list_display_links = ["name"];
    // lista para desplegar los nombres de los campos(atributos de clase)
    this.list_display = ["name", "number", "address.street", "age"];
    // lista para desplegar las acciones al dropdown de acciones de 
    this.actions = {
      "delete" : (selected_objects)=>{ }, "update": (selected_objects)=>{ }
    };

    // definir una interfaz o estructura para definir un atributo del esquema
    // requerido para propiedades
    /*
    * para cada elemento ownedAttribute
    * get name
    * get type
    * title, name with capital
    * default ""
    */
    
    let arregloAtributos = [
      { "name": "age", "type": "int", "title": "Age", "default": ""},
      { "name": "age", "type": "int", "title": "Age", "default": ""},
  ];
    let arreglo = Array();
   let pr;

    let arregloMetodos = {
      "primerElemento" : { "name" : "age"},
      "segundoElemento" : { "name" : "tipo"},
    };
    let titulo = "Animal";
    // add to schema
   /* let schema;
    schema = {
      title: titulo,
      type: "object",
      required: [],
      properties: {

      }
    };
    */
    arregloAtributos.forEach(element => {
      pr = new Property(element.name, element.type, element.type, element.title, element.default);
      arreglo.push(pr);
    });
    arreglo.forEach(element => {
      console.log(element);
    });

    // leer archivo xml 
    // let readArchive = new XMLparser();
    // readArchive.getFile("clase_animal.xml");
  }

  get_queryset(page_number, list_per_page, queryset) {
    return [
      {
        id: 1,
        name: "Ken Next",
        number: "08939303003",
        address: { street: "Hallmark Street" },
        age: "13"
      },
      {
        id: 2,
        name: "Isa Yoll",
        number: "0908839202",
        address: { street: "Barbican Street" },
        age: "19"
      }
    ];
  }
  
  get_form(object = null) {
    
    let schema = {
      // esquema para el CRUD
      // titulo del 
      title: this.name,
      type: "object",
      required: ["name"],
      // propiedades de cada clase, obtener del archivo xml las propiedades para poder 
      // añadirlas 
      properties: {
        id: {
          type: "number",
          title: "id",
          default: Math.floor(1000 * Math.random()) + 1
        },
        name: { type: "string", title: "Name", default: "" },
        number: { type: "string", title: "Number", default: "" },
        address: {
          type: "object",
          title: "Address",
          properties: {
            street: { type: "string", title: "Street" }
          }
        },
        age : { type: "string", title: "Age", default: "" }
      }
    };
    
    
    if (!object) {
      return <Form schema={schema} />;
    } else {
      return <Form schema={schema} formData={object} />;
    }
  }
}