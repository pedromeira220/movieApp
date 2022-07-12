import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { OnboardingComponent } from '../../../components/OnboardingComponent';

export function Onboarding1() {

    const subtitle = "No more wasting time looking for a title to watch"

    return (
        <>
            <OnboardingComponent title="Discovery" subtitle={subtitle} />
        </>
    )
}

const styles = StyleSheet.create({

});