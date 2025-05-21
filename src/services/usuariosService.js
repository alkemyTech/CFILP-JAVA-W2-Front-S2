import { walletApi } from "../api/walletApi";

export const usuariosService = {

    obtenerUsuarioPorId: async (id) => {
        try {
            const { data } = await walletApi.get(`/usuarios/${id}`);
            return data;
        } catch (error) {
            console.error("Error al obtener el usuario por ID:", error);
            throw error;
        }
    },

    eliminarUsuarioPorId: async (id) => {
        try {
            const { data } = await walletApi.delete(`/usuarios/eliminar/${id}`);
            return data;
        } catch (error) {
            console.error("Error al eliminar el usuario por ID:", error);
            throw error;
        }
    },

};