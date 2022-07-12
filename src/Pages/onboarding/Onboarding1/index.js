import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { OnboardingComponent } from '../../../components/OnboardingComponent';
import The_searchSvg from '../../../assets/undraw_the_search_s0xf.svg';

export function Onboarding1() {

    const subtitle = "No more wasting time looking for a title to watch"

    return (
        <>
            <OnboardingComponent title="Discovery" subtitle={subtitle} activeBullet={1} Icon={<The_searchSvg height={328} />} />
        </>
    )
}

const styles = StyleSheet.create({

});