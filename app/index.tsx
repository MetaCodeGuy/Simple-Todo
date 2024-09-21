import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet,StatusBar, TouchableOpacity, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';

import Header from '@/components/Header';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Today from '@/components/Today';
import Tomorrow from '@/components/Tomorrow';
import ThemedModal from '@/components/ui/Modal';
import FloatingButton from '@/components/ui/FloatingButton';

const Home = () => {
    const [todos, setTodos] = useState<Todos[]>([]);
    const [loaded, setLoaded] = useState(false);

    const [showModal, setShowModal] = useState<boolean>(false);


    // Schedule daily notifications only once when the component mounts
    useEffect(() => {
        const scheduleDailyNotification = async () => {
            const isScheduled = await AsyncStorage.getItem('@scheduled')
            if(JSON.parse(isScheduled)){
                // skip it 
                
            }else{
                // schedule it  
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Daily Reminder!',
                        body: 'This is a reminder to check your tasks.',
                    },
                    trigger: {
                        hour: 9,    // Trigger at 9 AM
                        minute: 0,  // Trigger at 00 minutes
                        repeats: true, // Repeat this notification daily
                    },
                });
              
              await AsyncStorage.setItem("@scheduled","true")  
            };
            }
            

        scheduleDailyNotification();
    }, []); // Empty dependency array ensures this runs once

    // Load Todos from AsyncStorage on mount and whenever a task is updated
    useEffect(() => {
        const fetchTodos = async () => {
            setLoaded(false);
            const storedTodos = await AsyncStorage.getItem('@Todo');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
            setLoaded(true);
        };

        fetchTodos();
    }, []); // Dependency array removed since this should run only once on mount

    // Function to refresh the tasks, use useCallback to avoid re-defining it on every render
    const refreshTodos = useCallback(async () => {
        const storedTodos = await AsyncStorage.getItem('@Todo');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    return (
        <ThemedView style={styles.wrapper}>
            <ScrollView>
                <Header />
                {loaded ? (
                    <>
                        <Today 
                            todos={todos}      
                            refreshTodos={refreshTodos}
                        />
                        <Tomorrow
                            todos={todos}
                            refreshTodos={refreshTodos}
                        />
                    </>
                ) : (
                    <ThemedText>Loading...</ThemedText>
                )}
                <ThemedModal
                    refreshTodos={refreshTodos}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </ScrollView>
            <FloatingButton
                onPress={() =>{
                setShowModal(true);
                console.log('working')}}
            />
            <StatusBar style="auto" />
        </ThemedView>
    );
};

export default Home;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});

