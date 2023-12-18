import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';


const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      console.log(tokenResponse);
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(res => res.data);
    
      console.log(userInfo);
    },
});
