import { getToken, removeToken } from "@/hooks/serviceAuth";
import { getReports } from "@/hooks/serviceReport";
import { useFocusEffect, useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from "react-native";

export default function Reports () {
    const router = useRouter();
    const [user, setUser] = useState<string | null>(null);
    const [reports, setReports] = useState(null);

    type Report = {
      status: 'pending' | 'in_progress' | 'resolved' | 'closed';
    };
    
    const statusMap: Record<Report['status'], string> = {
      pending: 'Pendiente',
      in_progress: 'En progreso',
      resolved: 'Resuelto',
      closed: 'Cerrado',
    };

    const getBackgroundColor = (status: Report['status']) => {
      switch (status) {
        case 'pending':
          return '#FFEB3B'; 
        case 'in_progress':
          return '#2196F3'; 
        case 'resolved':
          return '#4CAF50'; 
        case 'closed':
          return '#9E9E9E'; 
        default:
          return '#FFFFFF'; 
      }
    };
    
    useEffect(() => {
      const fetchToken = async () => {
        const token = await getToken();
        setUser(token);
      };
      fetchToken();
    }, []);

    useFocusEffect(
      useCallback(() => {
          if (user) {
              getReports(user).then((info) => {
                  if (info.code === 200) {
                      setReports(info.context);
                  }
              });
          }
      }, [user])
    );
    /*
    useEffect(() => {
        const fetchToken = async () => {
          const token = await getToken();
          setUser(token);
        };
    
        fetchToken();
      }, []);
      
      useEffect(() => {
        getReports(user).then((info) => {
            if(info.code === 200) {
                setReports(info.context);
            }
        })
    }, [user]);
    */
    const handleLogout = async () => {
      await removeToken();
      router.push("/");
    };

    const handleCreate = async () => {
      await removeToken();
      router.push("/create");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>
                  Reportes
              </Text>
              <TouchableOpacity style={styles.logoutButton} onPress={handleCreate}>
                <Text style={styles.logoutText}>Agregar</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={reports}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.reportTitle}>{item.subject}</Text>
                  <Text style={styles.reportContent}>{item.description}</Text>
                  <Text style={{ 
                          backgroundColor: getBackgroundColor(item.status),
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 4,
                          alignSelf: 'flex-start',
                  }}>
                    {statusMap[item.status as keyof typeof statusMap] || 'Desconocido'}
                  </Text>
                </View>
              )}
            />
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