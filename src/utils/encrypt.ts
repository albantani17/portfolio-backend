import crypto from "crypto";
import env from "./env";

const encrypt = (password : string) => {
    const encrypted = crypto
        .pbkdf2Sync(password, env.SECRET_KEY, 10000, 64, "sha512")
        .toString("hex")
    return encrypted
}

export default encrypt