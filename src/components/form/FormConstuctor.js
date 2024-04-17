import './formStyles.css';
const FormConstructor = ({formName="NoName",formFieldNames=[],fetchAddress=""}) => {
    const fetch=()=>{
        if (fetchAddress===""){
            return
        }
    }
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
                key={e}
                type='text'
                id={e} 
    />})}
                <button type='submit'>SEND</button>
            </form>
        </div>
    );
};
export default FormConstructor;