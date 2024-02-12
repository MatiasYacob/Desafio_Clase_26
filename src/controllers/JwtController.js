import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { isValidPassword, generateJWToken } from "../dirname.js";

const jwtRouter = Router();

jwtRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        console.log("Usuario encontrado para login:");
        console.log(user);
        if (!user) {
            console.warn("User doesn't exist with username: " + email);
            return res.status(204).send({ error: "Not found", message: "Usuario no encontrado con username: " + email });
        }
        if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        }
        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        };
        const access_token = generateJWToken(tokenUser);
        console.log(access_token);

        // Opciones para configurar la cookie
        const cookieOptions = {
            maxAge: 60000, // Duración de la cookie en milisegundos (60 segundos en este caso)
            // httpOnly: true // Comentar o descomentar según tus necesidades
        };

        // Configuración de la cookie con nombre 'jwtCookieToken'
        res.cookie('jwtCookieToken', access_token, cookieOptions);

        res.send({ message: "Login success!!" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Error interno de la aplicación." });
    }
});

export default jwtRouter;
