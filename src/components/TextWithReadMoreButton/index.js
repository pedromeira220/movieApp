import React, { useState, useEffect, useCallback } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export function TextWithReadMoreButton({ readMoreStyle, text, textStyle }) {
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [textShown, setTextShown] = useState(false);
    const [numLines, setNumLines] = useState(undefined);

    const toggleTextShown = () => {
        setTextShown(!textShown);
    };

    useEffect(() => {
        setNumLines(textShown ? undefined : 4);
    }, [textShown]);

    const onTextLayout = useCallback(
        (e) => {
            if (e.nativeEvent.lines.length > 3 && !textShown) {
                setShowMoreButton(true);
                setNumLines(3);
            }
        },
        [textShown],
    );

    return (
        <>
            <Text onTextLayout={onTextLayout} numberOfLines={numLines} style={textStyle} ellipsizeMode="tail">
                {text}
            </Text>

            {showMoreButton ? (
                <Text onPress={toggleTextShown} style={readMoreStyle}>
                    {textShown ? 'Read Less' : 'Read More'}
                </Text>
            ) : null}
        </>
    );
}


