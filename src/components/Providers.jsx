import { useEffect, useState, useRef, createContext, useContext } from "react";
import useInterval from '@use-it/interval';
import jwt_decode from "jwt-decode";
import { GoogleApiProvider, useGoogleApi } from 'react-gapi'
import { Button } from "@chakra-ui/react";
import { NutritionDatabase } from "../NutritionDatabase";
import { WorkoutDatabase } from "../WorkoutDatabase";


export const GoogleContext = createContext();
export const UserContext = createContext();
export const ClientContext = createContext();
export const AuthorizedContext = createContext();
export const ConfigContext = createContext();
export const NutritionDatabaseContext = createContext();
export const WorkoutDatabaseContext = createContext();

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];


export const InitializationProvider = ({ children, setAuthenticated, setAuthorized, setAppInitialized, authenticated, authorized, appInitialized }) => {
    const [user, setUser] = useState(false);
    const [gapiReady, setGapiReady] = useState(false)
    useEffect(() => {
        if(user){
            console.log(user)
        }
    }, [user]);

    return (
        <AuthenticationProvider setUser={setUser} authenticate={authenticated} setAuthenticated={setAuthenticated}>
            <UserContext.Provider value={user}>
                <GapiLoader authenticated={authenticated} gapiReady={gapiReady} setGapiReady={setGapiReady} />
                <AuthorizationProvider gapiReady={gapiReady} authenticated={authenticated} authorized={authorized} setAuthorized={setAuthorized} >
                    <FileProvider authorized={authorized} appInitialized={appInitialized} setAppInitialized={setAppInitialized}>
                        {children}
                    </FileProvider>
                </AuthorizationProvider>
            </UserContext.Provider>
        </AuthenticationProvider>
    )
}

const AuthenticationProvider = ({ children, setUser, authenticated, setAuthenticated }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    useEffect(() => {
        if (scriptLoaded || authenticated) {
            return undefined;
        }

        const initializeGoogle = () => {
            if (!window.google || scriptLoaded) {
                console.log("hittit")
                return;
            }
            console.log("initializing google")
            setScriptLoaded(true);

            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: (res) => {
                    console.log("user",jwt_decode(res.credential))
                    setUser(jwt_decode(res.credential))
                    setAuthenticated(true)
                },
            });

        };

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = initializeGoogle;
        script.async = true;
        script.id = "google-client-script";
        document.querySelector("body")?.appendChild(script);

        return () => {
            document.getElementById("google-client-script")?.remove();
        };
    }, [scriptLoaded]);

    return (
        //this can definitely be handled better but google changed the auth api since the last time i've used it and it's completely confused me (again, because the last one was confusing as well)
        <GoogleContext.Provider value={window.google}>
            <GoogleApiProvider clientId={CLIENT_ID} >
                {children}
            </GoogleApiProvider>
        </GoogleContext.Provider>
    )
}

const AuthorizationProvider = ({children, gapiReady, authenticated, authorized, setAuthorized }) => {
    const gapi = useGoogleApi();
    const google = useContext(GoogleContext);

/*                scope: 'https://www.googleapis.com/auth/drive.appdata \
                        https://www.googleapis.com/auth/userinfo.email \
                        https://www.googleapis.com/auth/userinfo.profile',
*/
    useEffect(() => {
        if (authenticated && !authorized && gapiReady) {
            const authClient = google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                prompt: '',
                scope: 'https://www.googleapis.com/auth/drive.appdata',
                callback: (tokenResponse) => {
                    console.log(tokenResponse)

                    if (google.accounts.oauth2.hasGrantedAllScopes(tokenResponse,
                        'https://www.googleapis.com/auth/drive.appdata ')) {
                        console.log("setAuthorized")
                        gapi.client.setToken(tokenResponse)

                        setAuthorized(true)
                    } else {
                        console.log("client failed scope check?")
                    }
                }
            })

            authClient.requestAccessToken();
        }
    }, [authenticated,authorized,gapiReady])



    return (
        children
    )
}


const GapiLoader = ({ setGapiReady, authenticated}) => {
    //lets get our drive data
    const gapi = useGoogleApi();
    const [gapiLoaded, setGapiLoaded] = useState(false);

    useEffect(() => {
        if (!gapiLoaded) {
            gapi?.load('client', (res) => {
                console.log("gapi",res)
                setGapiLoaded(true)
            });
        }
    }, [authenticated]);

    useEffect(() => {
        if (gapiLoaded) {
            console.log("gapi loaded")

            gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: DISCOVERY_DOCS
            }).then(() => {
                setGapiReady(true);
            })

        }
    }, [gapiLoaded]);
    return (
        null
    )
}


const FileProvider = ({ authorized, setAppInitialized, children }) => {
    const gapi = useGoogleApi();
    const [configFile, setConfigFile] = useState(false);
    const [config, setConfig] = useState(false)
    const [nutrition_db, setNutrition_db] = useState(false)
    const [workout_db, setWorkout_db] = useState(false)

    const createFileWithJSONContent = (fileId, data, callback) => {
        const contentType = 'application/json';
        var request = gapi.client.request({
            'path': '/upload/drive/v3/files/' + fileId,
            'method': 'PATCH',
            'params': { 'uploadType': 'media' },
            'headers': {
                'Content-Type': 'application/json;'
            },
            'body': JSON.stringify(data)
        });
        if (!callback) {
            callback = function (file) {
                console.log(file)
            };
        }
        request.execute(callback);
    }

    useEffect(() => {
        if (authorized && !config) {
            console.log("lets see if we can find our config")
            gapi.client.drive.files.list({
                spaces: 'appDataFolder',
                fields: 'nextPageToken, files(id, name)',
                pageSize: 100
            }).then((res) => {
                const files = res.result.files
                console.log(files.length)
                let match = false
                    files.forEach((file) => {

                        //gapi.client.drive.files.delete({ fileId: file.id }).then((res) => console.log(res))
                        if(file.name === "trackfit-config.json"){
                            console.log("found config")
                            match = true
                            setConfigFile(file.id)
                        }
                    })

                    if(!match){
                        console.log("@@@@@@@@@@@created new config@@@@@@@@@@@@@")
                        var fileMetadata = {
                            'name': 'trackfit-config.json',
                            'parents': ['appDataFolder']
                        };


                        gapi.client.drive.files.create({
                            resource: fileMetadata,
                            fields: 'id'
                        }).then((res) => {

                            const contents = {
                                config: {
                                    darkMode: true
                                },
                                nutrition_db: [],
                                workout_db: []
                            }

                            createFileWithJSONContent(res.result.id,contents,(res) =>{
                                console.log(res)
                            })
                        });
                    }
            });
        } 
    }, [authorized])

    useEffect(() => {
        if(config){
            setNutrition_db(new NutritionDatabase(gapi))
            setWorkout_db(true)
        }
    }, [config]);

    useEffect(() => {
        if (configFile) {
            console.log("set config to: ", configFile)

            gapi.client.drive.files.get({
                fileId: configFile,
                alt: 'media'
            }).then((res) => {
                setConfig(res.result.config)
            })
        }
    }, [configFile]);

    useEffect(() => {
        if (config && nutrition_db && workout_db) {

            setAppInitialized(true);

        }
    }, [config, nutrition_db, workout_db])


    return (

        <ConfigContext.Provider value={config}>
            <NutritionDatabaseContext.Provider value={nutrition_db}>
                <WorkoutDatabaseContext.Provider value={workout_db}>
                    {children}
                </WorkoutDatabaseContext.Provider>
            </NutritionDatabaseContext.Provider>
        </ConfigContext.Provider>

    )
}

export const GoogleButton = () => {
    const divRef = useRef(null);
    const google = useContext(GoogleContext);

    useEffect(() => {
        if (typeof window === "undefined" || !google || !divRef.current) {

            return;
        }

        try {
            google.accounts.id.renderButton(divRef.current, {
                type: "standard",
            });
        } catch (error) {
            console.log({ error })
        }
    }, [google, divRef.current]);

    return <div ref={divRef} />;
}