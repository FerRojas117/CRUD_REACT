//var XMLpars = require('react-xml-parser');

export default class XMLparser {

    constructor() {}
    archive;

    getFile(archive) {
        this.archive = archive;
        console.log(this.archive);
        var reader = new FileReader(); 
        reader.onload = function(e) {
            var text = reader.result;

            console.log(text);
        }
        reader.readAsText(this.archive);

    }
}
