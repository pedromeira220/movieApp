import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { theme } from "../../global/theme";




export function MovieItemBig({ rating, image, title }) {
    return (
    
        <View style={styles.container}>
            <Image
                source={{uri: image}}
                style={styles.img}
                
            />

            <View style={styles.viewBottom}>
                
                <Text style={styles.title}>{title}</Text>
                <Image
                    source={require('../../assets/blurImage.png')}
                    style={styles.imgBlurBig}

                />
            </View>

            <View style={styles.viewTop}>
                <Image
                    source={require('../../assets/blurImage.png')}
                    style={styles.imgBlur}

                />
                
                <AntDesign name="star" size={16} color="#F3BE00" />  
                <Text style={styles.title}>{rating}</Text>  
            
            </View>
                    
            
        </View>
            
    
    )
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: 224,
        marginLeft: 24,
    },
    img: {
        width: 224,
        height: 292,
        resizeMode: 'cover',
        borderRadius: 32
    },
    title: {
        fontSize: 18,
        color: theme.colors.text,
    },
    viewTop: {
        position: 'absolute',
        backgroundColor: "rgba(218, 218, 218, 0.5)",
        top: 16,
        right: 16,
        flexDirection: 'row',
        width: 80,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,

    },
    viewBottom: {
        top: 240 - 44,
        alignItems: 'center',
        justifyContent: 'center',
        height: 72,
        left: 16,
        right: 16,
        position: 'absolute',
        backgroundColor: "rgba(218, 218, 218, 0.5)",
        borderRadius: 16,
        
    },
    imgBlur: {
        position: 'absolute',
        borderRadius: 16,
    },
    imgBlurBig: {
        zIndex: -1,
        position: 'absolute',
        borderRadius: 16,
        height: 72,
        width: "100%",
    }

})