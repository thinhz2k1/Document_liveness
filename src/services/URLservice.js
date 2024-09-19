import instance from "axios";

const fetchUser = () => {
    return instance.get('api/users/');
}

export {fetchUser};