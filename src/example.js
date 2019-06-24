import React from "react";
import Admin from "react-crud-admin";
import Form from "react-jsonschema-form";
import Property from './property';

import "react-crud-admin/css"; //optional css import


var XMLParser = require('react-xml-parser');
 
export default class Example extends Admin {
  constructor() {

    let xmlText; // Creamos archivo xml

    xmlText += "<?xml version='1.0' encoding='utf-8'?>";
    xmlText += "<class name='student'>";
    xmlText += "<attributes>";
    xmlText += "<attribute id='1'> Name </attribute>";
    xmlText += "<attribute id='2' type='string' >Surname </attribute>";
    xmlText += "</attributes>";
    xmlText += "<functions>";
    xmlText += "<function id='' type='' description=''>";
    xmlText += "<name>Add_user</name>";
    xmlText += "<parameters>";
    xmlText += "<paramater type='string'>Name</paramater>";
    xmlText += "<paramater type='string'>Surname</paramater>";
    xmlText += "</parameters>";
    xmlText += "</function>";
    xmlText += "<function id='' type='' description=''>";
    xmlText += "<name>function1</name>";
    xmlText += "<parameters>";
    xmlText += "<paramater type='string'>name</paramater>";
    xmlText += "<paramater type='string'>Surname</paramater>";
    xmlText += "</parameters>";
    xmlText += "</function>";
    xmlText += "</functions>"
    xmlText += "</class>";
    
    var xml = new XMLParser().parseFromString(xmlText);// Guardamos XML

    let clase = xml.getElementsByTagName("class"); // Obtenemos el arreglo con las clases

    const className = (({name}) => ({name}))(clase[0].attributes); // nombre de la clase
      
    const tamanoAT=(Object.keys(clase[0].children[0].children).length);//cantidad de atributos
  
    const tamanoOP =(Object.keys(clase[0].children[1].children).length); //cantidad de metodos

    console.log(clase);
    
    super();
    // nombre para la clase principal
    this.name = className.name;

    this.name_plural = className.name+"s";
    // atributo para hacerlo clickeable y mostrar información
    this.list_display_links = ["name"];
    // lista para desplegar los nombres de los campos(atributos de clase)
    for (var i = 0; i < tamanoAT; i++){
      let clasAt =(({value }) => ({value}))(clase[0].children[0].children[i]);
      this.list_display.push (clasAt.value);
    }


    // lista para desplegar las acciones al dropdown de acciones de
    for(var j = 0; j<tamanoOP; j++){
      let clasOp = (({value}) => ({value}))(clase[0].children[1].children[j].children[0]);

      /*this.actions = { 
        clasOp.value :(selected_objects)=>{}
      };*/
      console.log(clasOp);
      this.actions[clasOp.value]="";

      
    }
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
    /*
    let readArchive = new XMLparser();
    readArchive.getFile("uml.xml");
    */
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