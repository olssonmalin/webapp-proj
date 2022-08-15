import { render } from '@testing-library/react-native';
import UserPage from '../components/user/UserPage';


const navigation = () => false;
const favorites = [];
const setFavorites = () => false;
const setStations = () => false;
const setIsLoggedIn = () => false;

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({}),
//   })
// );


test('When Logged in, a button with text Logga ut should exist in userPage', async () => {
    const { findByText } = render(<UserPage
        isLoggedIn={true}
        navigation={navigation}
        favorites ={favorites}
        setFavorites={setFavorites}
        setIsLoggedIn={setIsLoggedIn}
        setStations={setStations}
        />);
    const header = await findByText('Logga ut');

    expect(header).toBeDefined();
});