import { useCallback } from "react";

class SoccerService{
 _apiKey = process.env.REACT_APP_API_KEY;
     request = useCallback(async (url, method = 'GET', body = null, headers = {'X-Auth-Token' : this._apiKey,}) => {
        try {
            const response = await fetch(url, {method, body, headers});
                if (!response.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                }
            const data = await response.json();
            return data;
        } 
          catch(e) {
            throw e;
        }
    }, []);

    //return {request}
}

export default SoccerService;