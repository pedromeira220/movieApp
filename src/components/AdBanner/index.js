import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { View } from 'react-native';
import { config } from '../../global/config';



export function AdBanner({ ...rest }) {

    const { canShowAds } = config.ads;

    if (canShowAds) {
        return (
            <View
                {...rest}
            >
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                    servePersonalizedAds // true or false
                    onDidFailToReceiveAdWithError={(error) => {
                        console.log(error)
                    }} />
            </View>

        )
    }

    return (
        <>

        </>
    )


}