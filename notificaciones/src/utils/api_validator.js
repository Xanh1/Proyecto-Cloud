exports.successServer = async function (req, res, data, mensaje) {
    var json = {
        mensaje: mensaje ?? 'Sucess',
        tipo: 'Success',
        data: data ?? {},
        url: req.originalUrl,
    };
    await set_header(req, res, json);
    res.status(200).json(json);
}

exports.errorServer = async function (req, res, status, error, mensaje) {
    var json = {
        mensaje: mensaje ?? 'Error',
        tipo: 'Error',
        error: error ?? {},
        url: req.originalUrl,
    };
    await set_header(req, res, json);
    res.status(status ?? 500 ).json(json);
}

exports.validarCampos = function (list) {
    var info = "";
    for (const item in list) { if (list[item] == undefined || list[item] == "") info += `${item}, `; }
    if (info != "") {
        info = info.trim().substring(0, info.length - 2)
        throw { mensaje: `Campos obligatorios: ${info}` };
    }
}
async function set_header(req, res, json) {
    await res.setHeader("Content-Type", "application/json");
    console.log("___________________________ INFORMACIÓN ___________________________ \n");
    console.log(json);
    console.log("\n _______________________FIN INFORMACIóN ___________________________ \n");

}


