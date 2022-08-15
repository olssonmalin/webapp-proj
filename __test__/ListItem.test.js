import { render } from '@testing-library/react-native';
import ListItem from '../components/station/ListItem';


const navigation = () => false;
const station = {
    "AdvertisedLocationName": "Alingsås",
    "Geometry": {
        "WGS84": "POINT (12.53218546120595 57.92690516993427)"
    },
    "LocationSignature": "A",
    "PlatformLine": [
        "1",
        "2",
        "3",
        "4"
    ]
}

test('ListItem should contain stations AdvertisedLocationName', async () => {
    const { getByText } = render(<ListItem
        navigation={navigation}
        station={station}
        />);
    const header = await getByText('Alingsås');

    expect(header).toBeDefined();
});