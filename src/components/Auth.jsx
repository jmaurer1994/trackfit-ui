import { GoogleContext } from "./Google";

export const CredentialContext = createContext();


export const CredentialProvider = (props) => {

    const google = useContext(GoogleContext);

    if(google){
        console.log("ifgoogle")
    } else {

        console.log("ifnotgoogle")
    }



    return <CredentialContext.Provider value={credential}>{props.children}</CredentialContext.Provider>
}