import React from "react";
import Admin from "react-crud-admin";
import Form from "react-jsonschema-form";
import Property from './property';
import "react-crud-admin/css";

var XMLParser = require('react-xml-parser');
 
export default class Example extends Admin {
  
  atributo;
  tamAt;
  constructor() {

    let xmlText; // Creamos archivo xml

    xmlText += "<?xml version='1.0' encoding='utf-8'?>";
    xmlText += "<class name='Animal'>";
    xmlText += "<attributes>";
    xmlText += "<attribute id='1' type='string'>Nombre</attribute>";
    xmlText += "<attribute id='2' type='string'>Nombre_Cientifico</attribute>";
    xmlText += "<attribute id='3' type='number'>Edad</attribute>";
    xmlText += "</attributes>";
    xmlText += "<functions>";
    xmlText += "<function id='' type='' description=''>";
    xmlText += "<name>agregar_animal</name>";
    xmlText += "<parameters>";
    xmlText += "</parameters>";
    xmlText += "</function>";
    xmlText += "<function id='' type='' description=''>";
    xmlText += "<name>quitar_animal</name>";
    xmlText += "<parameters>";
    xmlText += "</parameters>";
    xmlText += "</function>";
    xmlText += "</functions>"
    xmlText += "</class>";


    var xml = new XMLParser().parseFromString(xmlText);// Guardamos XML
    let clase = xml.getElementsByTagName("class"); // Obtenemos el arreglo con las clases del XML
    const className = (({name}) => ({name}))(clase[0].attributes); // guardamos el nombre de la clase  
    const tamanoAT=(Object.keys(clase[0].children[0].children).length);// Obtenemos la cantidad de atributos
    const tamanoOP =(Object.keys(clase[0].children[1].children).length); // Obtenemos la cantidad de metodos
    
    super();
    this.atributo = clase[0].children[0].children; //Guardamos los atributos de la clase
    this.tamAt = (Object.keys(clase[0].children[0].children).length); //Obtenemos la cantidad de atributos
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
    for(var j = 0; j<tamanoOP; j++){ //ciclo con tamaño de los metodos
      let clasOp = (({value}) => ({value}))(clase[0].children[1].children[j].children[0]);//obtenemos la accion
      this.actions[clasOp.value]=""; //agregamos a lista de acciones
    }
  
    let arregloAtributos = [];
    console.log(this.list_display);
    let arreglo = Array();
    let pr;

    arregloAtributos.forEach(element => {
      pr = new Property(element.name, element.type, element.type, element.title, element.default);
      arreglo.push(pr);
      });
    arreglo.forEach(element => {
      console.log(element);
      });
  }


  //FALTA LLENAR ESTO
  get_queryset(page_number, list_per_page, queryset) {
    return [
      {
        /*
        id:1,
        Nombre: "Jetta",
        Marca: "VW",
        Serie: 1231231231
        */

       
        id:2,
        Nombre:"Gato",
        Nombre_Cientifico:"Felinus",
        Edad:8
        
/*
        id: 1,
        Nombre : "Rodrigo",
        Nacimiento: "12-10-95",
        Edad: 23*/
      },
      {
        /*
        id:2,
        Nombre: "A1",
        Marca: "Audi",
        Serie: 1231231231
        */

        
        id:2,
        Nombre:"Perro",
        Nombre_Cientifico:"Caninus",
        Edad:10
        
/*
        id: 2,
        Nombre : "Fernando",
        Nacimiento: "20-04-95",
        Edad: 24*/
      }
    ];
  }
  
  get_form(object = null) {
    
    let schema = {
      title: this.name, //nombre de la clase
      type: "object",

      properties: {
        id: {
          type: "number",
          title: "id",
          default: Math.floor(1000 * Math.random()) + 1
        }
      }
    };

    //Aqui agregamos atributos al formulario
    for(var z = 0;z<this.tamAt;z++){
      schema.properties[this.atributo[z].value]=this.atributo[z].attributes;
    }
    console.log(schema);

    if (!object) {
      return <Form schema={schema} />;
    } else {
      return <Form schema={schema} formData={object} />;
    }
  }
}