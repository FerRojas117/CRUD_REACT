export default class Property {
     name;
     type;
     title;
     default_attr;
     Property(name, type, title, default_attr) {
        this.name = name;
        this.type = type;
        this.title = title;
        this.default_attr = default_attr;
     }
}
