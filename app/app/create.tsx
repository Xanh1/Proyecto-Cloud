import { getToken, removeToken } from "@/hooks/serviceAuth";
import { createReport } from "@/hooks/serviceReport";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { ScrollView, KeyboardAvoidingView } from 'react-native';


export default function Create() {
    const router = useRouter();
    const { control, handleSubmit } = useForm();
    const [user, setUser] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permiso denegado', 'Lo sentimos, necesitamos permisos para acceder a la galería.');
            }
          }
        })();
    }, []);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });
        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };

    const hendleBack = () => {
        router.back();
    }

    useEffect(() => {
            const fetchToken = async () => {
              const token = await getToken();
              setUser(token);
            };
            fetchToken();
    }, []);

    const create = (data:any) => {

        const formData = new FormData();

        formData.append("subject", data.subject);
        formData.append("description", data.description);
        formData.append("direccion", data.direccion);
        formData.append("email", data.email);
        formData.append("telefono", data.telefono);

        if (user) {
            formData.append("user", user);
        }

        if (image) {
            formData.append("imagen", {
                uri: image,
                name: "report_image.jpg",
                type: "image/jpeg"
            } as any);
        }
        
        console.log(formData);

        createReport(formData).then((info) => {
            if (info.code == 201){
                Alert.alert(info.context.msg);
                router.push("/reports");
            } else {
                console.log(info.respose.data);
                Alert.alert(info.response.data.datos.error);
            }
        });

    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} 
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Reportes</Text>
                        <TouchableOpacity style={styles.logoutButton} onPress={hendleBack}>
                            <Text style={styles.logoutText}>Regresar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ padding: 16 }}>
                        <Text style={styles.reportTitle}>Agregar Reporte</Text>

                        <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 20 }}>
                            Motivo
                        </Text>
                        <Controller 
                            control={control}
                            name="subject"
                            rules={{ required: "Campo obligatorio" }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Incidente servicios básicos"
                                    onChangeText={onChange}
                                    value={value}  
                                />
                            )}
                        />

                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Descripción</Text>
                        <Controller 
                            control={control}
                            name="description"
                            rules={{ required: "Campo obligatorio" }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput 
                                    style={styles.input}
                                    placeholder="No hay agua en el barrio San Pedro"
                                    onChangeText={onChange}
                                    value={value}  
                                />
                            )}
                        />

                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Dirección</Text>
                        <Controller 
                            control={control}
                            name="direccion"
                            rules={{ required: "Campo obligatorio" }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput 
                                    style={styles.input}
                                    placeholder="La Argelia"
                                    onChangeText={onChange}
                                    value={value}  
                                />
                            )}
                        />

                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Correo Electrónico</Text>
                        <Controller 
                            control={control}
                            name="email"
                            rules={{ required: "Campo obligatorio" }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Tu número de contacto"
                                    onChangeText={onChange}
                                    value={value}  
                                />
                            )}
                        />

                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Contácto</Text>
                        <Controller 
                            control={control}
                            name="telefono"
                            rules={{ required: "Campo obligatorio" }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput 
                                    style={styles.input}
                                    placeholder="Tu número de contacto"
                                    onChangeText={onChange}
                                    value={value}  
                                />
                            )}
                        />

                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Archivo Adjunto</Text>
                        <View>
                            <TouchableOpacity
                                onPress={pickImage}
                                style={{ backgroundColor: "white", padding: 15, borderWidth: 1, borderColor: "#000", borderRadius: 5, alignItems: "center", marginTop: 12, marginBottom: 20}}
                            >
                                <Text style={{ color: "black", fontWeight: "bold" }}>Seleccionar Imágen</Text>
                            </TouchableOpacity>
                            <View style={styles.container_img}>
                                {image && <Image source={{ uri: image }} style={styles.image} />}
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit(create)}
                            style={{ backgroundColor: "black", padding: 15, borderRadius: 5, alignItems: "center", marginBottom: 40}}
                        >
                            <Text style={{ color: "white", fontWeight: "bold" }}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    width: "100%"
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10
  },
  logoutButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  reportContainer: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  reportContent: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10
  },
  container_img: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  input: {
    borderBottomWidth: 1, 
    marginTop: 8,
    marginBottom: 20,  
    padding: 15, 
    width: "100%",
    borderWidth: 1,
    borderRadius: 5
  }
});