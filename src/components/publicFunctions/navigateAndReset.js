export function navigateAndReset(navigation, screen) {
    navigation.navigate(screen);
    navigation.reset({
        index: 0,
        routes: [{ name: screen }],
    });
}