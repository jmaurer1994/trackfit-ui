import { useEffect, useState, useRef, createContext, useContext } from "react";
import useInterval from '@use-it/interval';
import jwt_decode from "jwt-decode";
import { GoogleApiProvider, useGoogleApi } from 'react-gapi'
import { chakra } from "@chakra-ui/react";
import { Database } from "../Database";


export const GoogleContext = createContext();
export const UserContext = createContext();
export const ClientContext = createContext();
export const AuthorizedContext = createContext();
export const ConfigContext = createContext();
export const NutritionDatabaseContext = createContext();
export const FitnessDatabaseContext = createContext();
export const AuthorizationClientContext = createContext();

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];


export const InitializationProvider = ({ children, setAuthenticated, setAuthorized, setAppInitialized, authenticated, authorized, appInitialized }) => {
    const [user, setUser] = useState(false);
    const [gapiReady, setGapiReady] = useState(false)
    useEffect(() => {
        if (user) {
            console.log(user)
        }
    }, [user]);

    const [delay, setDelay] = useState(100)
    const [isWaiting, setIsWaiting] = useState(true)

    useInterval(
        () => {

            if (authenticated && authorized && appInitialized) {
                console.log("app is ready")
                setIsWaiting(false)
            }

        },
        // Delay in milliseconds or null to stop it
        isWaiting ? delay : null,
    )

    return (
        <AuthenticationProvider setUser={setUser} authenticate={authenticated} setAuthenticated={setAuthenticated}>
            <UserContext.Provider value={user}>
                <GapiLoader authenticated={authenticated} gapiReady={gapiReady} setGapiReady={setGapiReady} />
                <AuthorizationProvider gapiReady={gapiReady} authenticated={authenticated} authorized={authorized} setAuthorized={setAuthorized} >
                    <DatabaseProvider authorized={authorized} appInitialized={appInitialized} setAppInitialized={setAppInitialized}>
                        {children}
                    </DatabaseProvider>
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
                    console.log("user", jwt_decode(res.credential))
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
        <GoogleContext.Provider value={window.google}>
            <GoogleApiProvider clientId={CLIENT_ID} >
                {children}
            </GoogleApiProvider>
        </GoogleContext.Provider>
    )
}

const AuthorizationProvider = ({ children, gapiReady, authenticated, authorized, setAuthorized }) => {
    const gapi = useGoogleApi();
    const google = useContext(GoogleContext);
    const [authorizationClient, setAuthorizationClient] = useState(false);

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
            setAuthorizationClient(authClient)
        }
    }, [authenticated, authorized, gapiReady])

    return (
        <AuthorizationClientContext.Provider value={authorizationClient}>
            {children}
        </AuthorizationClientContext.Provider>
    )
}


const GapiLoader = ({ setGapiReady, authenticated }) => {
    //lets get our drive data
    const gapi = useGoogleApi();
    const [gapiLoaded, setGapiLoaded] = useState(false);

    useEffect(() => {
        if (!gapiLoaded) {
            gapi?.load('client', (res) => {
                console.log("gapi", res)
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

const DatabaseProvider = ({ authorized, setAppInitialized, children }) => {
    const gapi = useGoogleApi();
    const [configFile, setConfigFile] = useState(false);
    const [config, setConfig] = useState(false)
    const [nutrition_db, setNutrition_db] = useState()
    const [fitness_db, setFitness_db] = useState()
    const [filesReady, setFilesReady] = useState(false)
    const [delay, setDelay] = useState(100)
    const [isLoading, setIsLoading] = useState(true)
    const [configReady, setConfigReady] = useState(false)
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
        if (authorized && !configReady) {
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

                  //  gapi.client.drive.files.delete({ fileId: file.id }).then((res) => console.log(res))
                    if (file.name === "trackfit-config.json") {
                        console.log("found config")
                        match = true
                        setConfigFile(file.id)
                    }
                })

                if (!match) {
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
                            fitness_db: []
                        }

                        createFileWithJSONContent(res.result.id, contents, (res) => {
                            setConfigFile(res.id)
                        })
                    });
                }
            });
        }
    }, [authorized])

    useInterval(
        () => {
                if(authorized){
                    if (nutrition_db?.ready) {
                        console.log("ndb ready")

                        if (fitness_db?.ready) {
                            console.log("fdb ready")
                            setIsLoading(false)
                        } else {
                            console.log("fdb not ready")
                        }
                    } else {
                        console.log("ndb not ready")
                    }
                } 
        },
        // Delay in milliseconds or null to stop it
        isLoading ? delay : null,
    )

    useEffect(() => {
        if (config && !isLoading) {
            console.log("Databases initialized")
            setFilesReady(true)
        } else {

            console.log("Databases not initialized")
        }
    }, [isLoading]);

    useEffect(() => {
        if (configFile) {
            console.log("set config to: ", configFile)

            gapi.client.drive.files.get({
                fileId: configFile,
                alt: 'media'
            }).then((res) => {
                console.log("set config")
                setConfig(res.result)
                setConfigReady(true)
            })
        }
    }, [configFile]);


    useEffect(() => {
        if (configReady) {
            console.log("settings dbs")
            setIsLoading(true)
            setNutrition_db(new Database(gapi, "nutrition"))
            setFitness_db(new Database(gapi, "fitness"))
        }
    }, [configReady]);

    useEffect(() => {
        if (configReady && filesReady) {

            setAppInitialized(true);

        }
    }, [configReady, filesReady])


    return (

        <ConfigContext.Provider value={config}>
            <NutritionDatabaseContext.Provider value={nutrition_db}>
                <FitnessDatabaseContext.Provider value={fitness_db}>
                    {children}
                </FitnessDatabaseContext.Provider>
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
                size: "large",
            });
        } catch (error) {
            console.log({ error })
        }
    }, [google, divRef.current]);

    return <chakra.div ref={divRef} />;
}