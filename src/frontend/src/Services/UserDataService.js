
import useRestClient from './../Common/RestClient'


const API_URL = 'http://localhost:50001/userData'

const useUserDataService = () => {
    const api = useRestClient();
    
    const getDashboard = async () => 
    {
        return await api.get(API_URL+'/dashboard');
    }

    return {
        getDashboard: getDashboard
    }
}

export default useUserDataService;