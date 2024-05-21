import './formStyles.css';
const FormConstructor = ({formName="NoName",formFieldNames=[],formValues={},save}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        var fetchResult=fetch();
        console.log(event);
    };
    return (
        
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h2>{formName}</h2>
                {formFieldNames.map((e)=>{  
                return<input
                className="FormField"        
                key={e.name}
                type={e.type}
                value={formValues[e.dictName]} 
    />})}
                <button type='submit'>Save</button>
            </form>
        </div>
    );
};
export default FormConstructor;