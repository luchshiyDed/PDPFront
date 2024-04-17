class FormField{
    constructor(name="NoName",defaultValue="",className="formElement"){
        this.name=name;
        this.value=defaultValue;
        this.className=className;
    }
    getJxml(){
        return<input
        className={this.className}        
        key={this.name}
        value={this.value}
        type='text'
        id={this.name} 
    />
    }
}
export default FormField;