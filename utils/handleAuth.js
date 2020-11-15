import Router from "next/router";
import {Cookies} from "react-cookie";
import API from "../utils/API";

const cookie = new Cookies();

export const handleAuth = async (ctx) => {
    let token = null;

    if(ctx.req){
        token = ctx.req.headers.cookie.split("token=").pop();
        console.log(token);
    }else{
        token = cookie.get("token");
        console.log(token);
    }

    const res = await API.get("/token/ping", {
        headers: {
            Authorization: token
        }
    });

    if(res.data.status === 401){
        if(ctx.req){
            ctx.res.writeHead(302, {
                Location: "/"
            });
            ctx.res.end();
        }else{
            Router.push("/");
        }  
    }
};
