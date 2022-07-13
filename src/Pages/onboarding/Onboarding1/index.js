import React from 'react';
import { OnboardingComponent } from '../../../components/OnboardingComponent';
import The_searchSvg from '../../../assets/undraw_the_search_s0xf.svg';

export function Onboarding1() {

    const page = 1;

    const subtitle = "No more wasting time looking for a title to watch"

    return (
        <>
            <OnboardingComponent title="Discovery" subtitle={subtitle} page={page} Icon={<The_searchSvg height={328} />} />
        </>
    )
}
