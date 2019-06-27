import React from "react";
import Admin from "react-crud-admin";
import Form from "react-jsonschema-form";
import Property from './property';
import "react-crud-admin/css";

//Todas son librerias las de arriba

// DE AQUI HICIMOS
var XMLParser = require('react-xml-parser');
 
export default class Example extends Admin {
  
  constructor() {

    let xmlText; // Creamos archivo xml

    xmlText += "<?xml version='1.0' encoding='utf-8'?>";
    xmlText += "<class name='Animal'>";
    xmlText += "<attributes>";
    xmlText += "<attribute id='1' > Nombre </attribute>";
    xmlText += "<attribute id='2' type='string' >Nombre Cientifico </attribute>";
    xmlText += "<attribute id='3'> Edad </attribute>";
    xmlText += "</attributes>";
    xmlText += "<functions>";
    xmlText += "<function id='' type='' description=''>";
    xmlText += "<name>agregar_animal</name>";
    xmlText += "<parameters>";
    xmlText += "<paramater type='string'>Name</paramater>";
    xmlText += "</parameters>";
    xmlText += "</function>";
    xmlText += "<function id='' type='' description=''>";
    xmlText += "<name>quitar_animal</name>";
    xmlText += "<parameters>";
    xmlText += "<paramater type='string'>Nombre</paramater>";
    xmlText += "</parameters>";
    xmlText += "</function>";
    xmlText += "</functions>"
    xmlText += "</class>";
    
    var xml = new XMLParser().parseFromString(xmlText);// Guardamos XML

    let clase = xml.getElementsByTagName("class"); // Obtenemos el arreglo con las clases del XML

    const className = (({name}) => ({name}))(clase[0].attributes); // guardamos el nombre de la clase
      
    const tamanoAT=(Object.keys(clase[0].children[0].children).length);// Obtenemos la cantidad de atributos
  
    const tamanoOP =(Object.keys(clase[0].children[1].children).length); // Obtenemos la cantidad de metodos

    console.log(clase);
    
    super();
    // nombre para la clase principal obtenido de la variable className en el atributo name
    this.name = className.name;
    // plural de la clase
    this.name_plural = className.name+"s";
    // atributo para hacerlo clickeable y mostrar información
    this.list_display_links = ["name"];
    // lista para desplegar los nombres de los campos (atributos de clase)
    for (var i = 0; i < tamanoAT; i++){// ciclo con tamaño de los atributos
      let clasAt =(({value }) => ({value}))(clase[0].children[0].children[i]); //Obtenemos el valor de los atributos
      this.list_display.push (clasAt.value); //lo metemos a la lista de atributos del CRUD
    }


    // lista para desplegar las acciones en 
    for(var j = 0; j<tamanoOP; j++){ //cico con tamaño de los metodos
      let clasOp = (({value}) => ({value}))(clase[0].children[1].children[j].children[0]);

      /*this.actions = { 
        clasOp.value :(selected_objects)=>{}
      };*/
      console.log(clasOp);
      this.actions[clasOp.value]="";

      
    }
// HASTA AQUI 


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
      title: this.name, //nombre de la clase
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
        }
      }
    };
    
    
    if (!object) {
      return <Form schema={schema} />;
    } else {
      return <Form schema={schema} formData={object} />;
    }
  }
}