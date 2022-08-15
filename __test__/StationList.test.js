import { render } from '@testing-library/react-native';
import StationList from '../components/station/StationList';

jest.mock("../components/auth/Auth", () => "Auth");
jest.mock("../components/auth/Login", () => "Login");

const isLoggedIn = false;
const stations = [];
const favorites = [];
const setStations = () => false;
const navigation = () => false;
const setFavorites = () => false;
const setIsLoggedIn = () => false;



test('StationList should contain headers Favoriter and Stationer', async () => {
    const { getByText } = render(<StationList
            isLoggedIn={isLoggedIn}
            stations={stations}
            setStations={setStations}
            navigation={navigation}
            setIsLoggedIn={setIsLoggedIn}
            favorites={favorites}
            setFavorites={setFavorites}
        />);
    const headerFavorites = await getByText('Favoriter');
    const headerStations = await getByText('Stationer');

    expect(headerFavorites).toBeDefined();
    expect(headerStations).toBeDefined();
});