import axios from "axios";

export const url = "https://fares-ai-jsp4.vercel.app/routes";

export const getUserBySignIn = async (email: string, password: string) => {
    try {

        const res = await axios.get(`${url}/getUserBySignIn`, {params: {email, password}});
        
        if (res.data.status == 404) return 404
        if (res.data.status == 401) return 401

        return res.data.user;

    } catch (err) {
        console.log({err});
        throw err;
    }
}