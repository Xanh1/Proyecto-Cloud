import { getToken, removeToken } from "@/hooks/serviceAuth";
import { createReport } from "@/hooks/serviceReport";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";

export default function Create() {
    const router = useRouter();
    const { control, handleSubmit } = useForm();
    const [user, setUser] = useState<string | null>(null);

    const handleLogout = async () => {
        await removeToken();
        router.replace("/");
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

        const datas = {
            ...data,
            user: user
        }

        createReport(datas).then((info) => {
            if (info.code == 201){
                Alert.alert(info.context.msg);
                router.push("/reports");
            } else {
                Alert.alert(info.response.data.datos.error);
            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Reportes
                </Text>
                <TouchableOpacity style={styles.logoutButton} onPress={hendleBack}>
                    <Text style={styles.logoutText}>Regresar</Text>
                </TouchableOpacity>
            </View>
            <View style={{padding: 16}}>
                <Text style={styles.reportTitle}>
                    Agregar Reporte
                </Text>
                <Text style={{fontSize: 15, fontWeight: "bold", marginTop: 20}}>
                    Motivo
                </Text>
                
                <Controller 
                    control={control}
                    name="subject"
                    rules={{ required: "El motivo es obligatorio" }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <TextInput 
                                style={{ 
                                    borderBottomWidth: 1, 
                                    marginTop: 8, 
                                    marginBottom: 20, 
                                    padding: 15, 
                                    width: "100%",
                                    borderWidth: 1,
                                    borderRadius: 5
                                }}
                                placeholder="Incidente servicios básicos"
                                onChangeText={onChange}
                                value={value}  
                            />
                        );
                    }}
                />
                <Text style={{fontSize: 15, fontWeight: "bold"}}>
                    Descripción
                </Text>
                
                <Controller 
                    control={control}
                    name="description"
                    rules={{ required: "LA descripción es obligatoria" }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <TextInput 
                                style={{ 
                                    borderBottomWidth: 1, 
                                    marginTop: 8,  
                                    padding: 15, 
                                    width: "100%",
                                    borderWidth: 1,
                                    borderRadius: 5
                                }}
                                placeholder="No hay agua en el barrio San Pedro"
                                onChangeText={onChange}
                                value={value}  
                            />
                        );
                    }}
                />
                <TouchableOpacity
                    onPress={handleSubmit(create)}
                    style={{ backgroundColor: "black", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 40, marginBottom: 40}}
                >
                    <Text style={{color: "white", fontWeight: "bold"}}>Agregar</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
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
});