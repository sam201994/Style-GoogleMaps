import styles from '../constants/styles';

function getStyles(styleName) {
    switch (styleName) {
        case 'NIGHT_MODE':
            return styles.nightMode;
        case 'DARK':
            return styles.dark;
        case 'STANDARD':
            return [];
        default:
            return [];
    }
}

export default getStyles;
