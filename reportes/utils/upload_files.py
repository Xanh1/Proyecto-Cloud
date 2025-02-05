import os

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def upload_image(image_bytes, filename):
    try:
        if not image_bytes:
            return None
        
        #  Agregar la extensión correcta al archivo
        filepath = os.path.join(UPLOAD_FOLDER, filename)

        #  Guardar la imagen en formato binario
        with open(filepath, 'wb') as f:
            f.write(image_bytes)  #  Ya no usamos base64, escribimos los bytes directamente

        return f"/uploads/{filename}"  #  Devolvemos la ruta con la extensión correcta
    except Exception as e:
        print(f'Error al subir la imagen: {e}')
        
        return None

