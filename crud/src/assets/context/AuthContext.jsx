import {
    createContext,
    useEffect,
    useState
} from "react";

import { supabase } from "../service/supabase";

import {
    cadastrarUsuario as cadastrarUsuarioService,
    fazerLogin,
    fazerLogout
} from "../service/authService";


export const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null);

    const [carregando, setCarregando] = useState(true);


    // ==========================================
    // VERIFICAR USUÁRIO LOGADO
    // ==========================================

    useEffect(() => {

        async function verificarUsuario() {

            const {
                data: { session }
            } = await supabase.auth.getSession();

            setUsuario(session?.user ?? null);

            setCarregando(false);
        }


        verificarUsuario();


        // ==========================================
        // OBSERVAR ALTERAÇÕES DE AUTENTICAÇÃO
        // ==========================================

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {

                setUsuario(session?.user ?? null);

            }
        );


        // ==========================================
        // LIMPAR LISTENER
        // ==========================================

        return () => {

            subscription.unsubscribe();

        };

    }, []);


    // ==========================================
    // LOGIN
    // ==========================================

    async function login(email, senha) {

        const resultado =
            await fazerLogin(email, senha);


        if (!resultado.sucesso) {

            return resultado;

        }


        setUsuario(resultado.data.user);


        return {
            sucesso: true,
            usuario: resultado.data.user
        };

    }


    // ==========================================
    // LOGOUT
    // ==========================================

    async function logout() {

        const sucesso =
            await fazerLogout();


        if (!sucesso) {

            return false;

        }


        setUsuario(null);

        return true;

    }


    // ==========================================
    // CADASTRO
    // ==========================================

    async function cadastrarUsuario(
        email,
        senha,
        nome
    ) {

        const resultado =
            await cadastrarUsuarioService(
                email,
                senha,
                nome
            );


        if (!resultado.sucesso) {

            return resultado;

        }


        return {
            sucesso: true,
            usuario: resultado.data.user
        };

    }


    return (

        <AuthContext.Provider
            value={{
                usuario,
                carregando,
                login,
                logout,
                cadastrarUsuario
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}