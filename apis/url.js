export const urls ={
    auth:{
        login: "/auth/login",
        signup: "/auth/signup",  
    },
    user: "/user",
    sneaker: "/sneaker",
    sneakeritm: (id) => `/sneaker/item/${id}`,
    brands:"/sneaker/brands",
};
