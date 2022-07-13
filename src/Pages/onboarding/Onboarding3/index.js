import React from 'react';
import { OnboardingComponent } from '../../../components/OnboardingComponent';
import The_searchSvg from '../../../assets/undraw_note_list_re_r4u9.svg';

export function Onboarding3() {

    const page = 3;

    const subtitle = "Create multiple lists to organize your movies"

    return (
        <>
            <OnboardingComponent title="Create" subtitle={subtitle} page={page} Icon={<The_searchSvg height={328} />} />
        </>
    )
}
