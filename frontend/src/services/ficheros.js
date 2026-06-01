const API_URL = import.meta.env.VITE_API_URL;

export const enviarAlBackend = async (ruta, archivo, campoName, token) => {
    if (!archivo) {
        alert("Por favor, selecciona un archivo primero.");
        return;
    }

    const formData = new FormData();
    formData.append(campoName, archivo);

    try {
        const response = await fetch(`${API_URL}/${ruta}/`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials:'include'
        });

        const data = await response.json();
        if (!response.ok) {
            console.log(data);
            alert("Error en el servidor al procesar el archivo");
            return;
        } 
        alert("Fichero subido con éxito");

    } catch (error) {
        console.error("Error de red:", error);
        alert("Error en el servidor al procesar el archivo");
    }
};