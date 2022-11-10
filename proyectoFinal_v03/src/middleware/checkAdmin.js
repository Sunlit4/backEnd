const isAdmin = true; 

const checkAdmin = (req, res, next)=>{
    if(!isAdmin){
        return res.json({
            error: `No puede acceder por falta de permiso`,
            descripcion: `No tiene permiso a la ruta ${req.originalUrl}`,
            code: `403`,
        });
    }
    return next();
};

export default checkAdmin;