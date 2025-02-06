import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useForm, Controller } from "react-hook-form"
import { useState } from "react";
import { useRouter } from "expo-router";
import { authPerson, saveToken } from "@/hooks/serviceAuth";


export default function Index (){

    const { control, handleSubmit } = useForm();

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const goToList = () => {
        router.push("/reports");
    }

    const logIn = (data:any) => {
        setLoading(true);
        authPerson(data).then((info) => {
            if (info.code == 200){
                saveToken(info.necesary);
                goToList();
            } else {
                Alert.alert(info.response.data.datos.error);
            }
        });
        setLoading(false);
    }

    return (
        <View>
            <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center", marginTop: 40, marginBottom: 40}}>Inicio de Sesión</Text>
            <Controller 
                control={control}
                name="email"
                rules={{ required: "El email es obligatorio" }}
                render={({ field: { onChange, value } }) => {
                    return (
                        <TextInput 
                            style={{ 
                                borderBottomWidth: 1, 
                                marginTop: 20, 
                                marginBottom: 20, 
                                padding: 15, 
                                width: 250,
                                borderWidth: 1,
                                borderRadius: 5
                            }}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={onChange}
                            value={value}  
                        />
                    );
                }}
            />

            <Controller 
                control={control}
                name="password"
                rules={{ required: "La contraseña es obligatorio" }}
                render={({ field: { onChange, value } }) => {
                    return (
                        <TextInput 
                            style={{ 
                                borderBottomWidth: 1, 
                                marginTop: 20, 
                                marginBottom: 20, 
                                padding: 15, 
                                width: 250,
                                borderWidth: 1,
                                borderRadius: 5
                            }}
                            placeholder="Contraseña"
                            secureTextEntry
                            onChangeText={onChange}
                            value={value}  
                        />
                    );
                }}
            />
            
            <TouchableOpacity
                onPress={handleSubmit(logIn)}
                style={{ backgroundColor: "black", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 40, marginBottom: 40}}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={{color: "white"}}>Iniciar Sesión</Text> }
            </TouchableOpacity>

        </View>
    );
}

 